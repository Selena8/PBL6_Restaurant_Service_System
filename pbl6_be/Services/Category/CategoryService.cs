using AutoMapper;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Extensions;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;

namespace pbl6_be.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private ILogger<CategoryService> _logger;
        private readonly Context _context;
        public CategoryService(Context context,
            IMapper mapper,
            ILogger<CategoryService> logger
            )
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<Pagination<GetCategoryResponse>> GetAll(GetCategoryRequest request)
        {
            try
            {
                _logger.LogInformation("====== Start get all category ======" +
                  "\nRequest: {@request}", request);
                Pagination<GetCategoryResponse> response = new Pagination<GetCategoryResponse>();
                var query = _context.Categories.OrderByExt(request.SortBy, request.Direction);
                if (!string.IsNullOrEmpty(request.Search))
                {
                    query = query.Where(c => c.Name.Contains(request.Search));
                }
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var categories = await query.Select(c => _mapper.Map<Category, GetCategoryResponse>(c)).ToListAsync();
                response.data = categories;
                response.count = count;
                _logger.LogInformation("Get all category successfully");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get All Category with request = {@request} failed. Error = {Message}", request, ex.Message);
                throw;
            }
        }

        public async Task<Category> GetOne(int id)
        {
            try
            {
                _logger.LogInformation("====== Start get category id = {@id} ======", id);
                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (category == null)
                {
                    _logger.LogInformation("Get jobcategory id = {@id} failed: category not found", id);
                    throw new NotFoundException("category not found by Id: " + id);
                }
                _logger.LogInformation("Get category id = {@id} succesfully", id);
                return category;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get Category with id = {@id} failed. Error = {Message}", id, ex.Message);
                throw;
            }
        }

        public async Task<Category> Update(int id, UpdateCategoryRequest request)
        {
            try
            {
                _logger.LogInformation("====== Start Update category id = {@id} \n " +
                    "with UpdateCategoryRequest = {@request} ======", id, request);

                var category = await GetOne(id);
                if (!CheckUniqueCategory(request.Name))
                    Assign.Omit(request, category,new string[]{"Name"});
                else
                    Assign.Partial(request, category);
                _context.Entry(category).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Update category id = {@id} succesfully", id);
                return category;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Update Category with id = {@id} failed . Error = {Message}", id, ex.Message);
                throw;
            }

        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                _logger.LogInformation("====== Start Delete category id = {@id} ======", id);
                var category = await GetOne(id);
                _context.Categories.Remove(category);
                _context.Entry(category).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Delete Delete id = {@id} succesfully", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Delete Category with id = {@id}  failed . Error = {Message}", id, ex.Message);
                throw;
            }
        }

        public async Task<bool> Delete(IEnumerable<int> ids)
        {
            var listid = "-";
            _logger.LogInformation("====== Start Delete many category ===============");
            var count = ids.Count();

            try
            {
                using (var tran = _context.Database.BeginTransaction())
                {
                    for (int i = 0; i < count; i++)
                    {
                        try
                        {
                            await Delete(ids.ElementAt(i));
                            listid += ids.ElementAt(i) + "-";
                        }
                        catch (Exception)
                        {
                            tran.Rollback();
                            return false;
                        }
                    }
                    tran.Commit();
                }
                _logger.LogInformation("Delete Category id = {@id} succesfully", listid);
                return true;

            }
            catch (Exception ex)
            {
                _logger.LogInformation("Delete id = {@id} failed . Error = {@Message} ", listid, ex.Message);
                throw;
            }
        }

        public async Task<Category> Create(CreateCategoryRequest request)
        {
            _logger.LogInformation("====== Start Create category \n with  request = {@request} ======", request);
            try
            {
                if (!CheckUniqueCategory(request.Name)) throw new BadRequestException($"Category with name = '{request.Name}' already exists");
                var category = new Category();
                Assign.Partial(request, category);
                await _context.Categories.AddAsync(category);
                _context.Entry(category).State = EntityState.Added;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Create category id = {@id} succesfully with request = {@request} ", category.Id, request);
                return category;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Create category with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw;
            }
        }

        public bool CheckUniqueCategory(string name)
        {
            Category category = _context.Categories.FirstOrDefault(c => c.Name == name);
            return category == null;
        }

        public async Task<bool> Exist(int id)
        {
            if ((await this._context.Categories.FirstOrDefaultAsync(c => c.Id == id)) is null)
                return false;
            return true;
        }
    }
}
