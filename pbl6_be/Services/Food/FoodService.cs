using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Extensions;
using pbl6_be.Transfers.DTOs;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;

namespace pbl6_be.Services
{
    public class FoodService : IFoodService
    {
        private readonly IMapper _mapper;
        private ILogger<FoodService> _logger;   
        private readonly Context _context;
        private readonly IUploadFileService _uploadFileService;
        public FoodService(Context context,
            IMapper mapper,
            ILogger<FoodService> logger,
            IUploadFileService uploadFileService
            )
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _uploadFileService = uploadFileService;
        }


        public async Task<Pagination<GetFoodResponse>> GetAll(GetFoodRequest request)
        {
            try
            {
                _logger.LogInformation("====== Start get all food by category ======" +
                  "\nRequest: {@request}", request);
                Pagination<GetFoodResponse> response = new Pagination<GetFoodResponse>();
                var query = _context.Foods.OrderByExt(request.SortBy, request.Direction);
                if (!string.IsNullOrEmpty(request.Search))
                {
                    query = query.Where(c => c.Name.Contains(request.Search));
                }
                if (request.CategoryId != 0)
                {
                    query = query.Where(c => c.CategoryId == request.CategoryId);
                }
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var foods = await query.Select(c => _mapper.Map<Food, GetFoodResponse>(c)).ToListAsync();
                response.data = foods;
                response.count = count;
                _logger.LogInformation("Get all food successfully");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get All Food with request = {@request} failed. Error = {Message}", request, ex.Message);
                throw;
            }
        }

        public async Task<GetFoodDetailResponse> GetOne(int id)
        {
            try
            {
                _logger.LogInformation("====== Start get food id = {@id} ======", id);
                var query = await _context.Foods.FirstOrDefaultAsync(c => c.Id == id);
                if (query == null)
                {
                    _logger.LogInformation("Get jobfood id = {@id} failed: food not found", id);
                    throw new NotFoundException("food not found by Id: " + id);
                }
                var queryFoodMakingProcess = await _context.FoodMakingProcesses.Where(c => c.FoodId == id).OrderBy(c => c.Seq).ToListAsync();
                var listFoodMakingProcess = queryFoodMakingProcess.Select(f => _mapper.Map<FoodMakingProcess, GetFoodMakingProcessResponse>(f)).ToList();

                var queryIngredientsOfFood = await _context.IngredientsOfFoods.Where(c => c.FoodId == id).OrderBy(c => c.Seq).ToListAsync();
                var listIngredientsOfFood = queryIngredientsOfFood.Select(f => _mapper.Map<IngredientsOfFood, GetIngredientsOfFoodResponse>(f)).ToList();

                var food = _mapper.Map<Food, GetFoodDetailResponse>(query);
                food.FoodMakingProcessResponse = listFoodMakingProcess;
                food.IngredientsOfFoodResponse = listIngredientsOfFood;

                _logger.LogInformation("Get food id = {@id} succesfully", id);
                return food;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get Food with id = {@id} failed. Error = {Message}", id, ex.Message);
                throw;
            }
        }

        public async Task<Food> Create(CreateFoodRequest request)
        {
            _logger.LogInformation("====== Start Create category \n with  request = {@request} ======", request);
            var tran = _context.Database.BeginTransaction();
            try
            {
                if(_context.Categories.FirstOrDefault(x => x.Id == request.CategoryId) is null)
                {
                    throw new BadRequestException("Category is not exist");
                }
                if (!CheckUniqueFood(request.Name)) throw new BadRequestException($"Food with name = '{request.Name}' already exists");
                // Add food first
                var food = _mapper.Map<CreateFoodRequest, Food>(request);
                var listFoodMakingProcess = new List<FoodMakingProcess>();
                var listIngredientsOfFood = new List<IngredientsOfFood>();
                food.Image = "";
                food.CreatedUserId = 1;
                _context.Foods.Add(food);
                _context.Entry(food).State = EntityState.Added;
                await _context.SaveChangesAsync();

                foreach (var foodMaking in request.FoodMakingProcessRequest)
                {
                    var fMP = new FoodMakingProcess();
                    fMP = _mapper.Map<CreateFoodMakingProcessRequest, FoodMakingProcess>(foodMaking);
                    fMP.FoodId = food.Id;
                    _context.FoodMakingProcesses.Add(fMP);
                    _context.Entry(fMP).State = EntityState.Added;
                    food.FoodMakingProcesses.Add(fMP);
                }

                foreach (var ingredient in request.IngredientsOfFoodRequest)
                {
                    var ingreOfFood = new IngredientsOfFood();
                    ingreOfFood = _mapper.Map<CreateIngredientsOfFoodRequest, IngredientsOfFood>(ingredient);
                    ingreOfFood.FoodId = food.Id;
                    _context.IngredientsOfFoods.Add(ingreOfFood);
                    _context.Entry(ingreOfFood).State = EntityState.Added;
                    food.IngredientsOfFoods.Add(ingreOfFood);
                }
                await _context.SaveChangesAsync();
                _logger.LogInformation("Create category id = {@id} succesfully with request = {@request} ", food.Id, request);
                tran.Commit();
                return food;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                _logger.LogInformation("Create category with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw;
            }
        }

        private bool CheckUniqueFood(string name)
        {
            Food food = _context.Foods.FirstOrDefault(c => c.Name == name);
            return food == null;
        }

        public async Task<Food> Update(int id, CreateFoodRequest request)
        {
            try
            {
                var food = _context.Foods
                .Include(f => f.FoodMakingProcesses)
                .Include(f => f.IngredientsOfFoods)
                .FirstOrDefault(f => f.Id == id);
                if (food == null)
                {
                    throw new NotFoundException("food not found by Id: " + id);
                }
                Assign.Partial(request, food);
                _context.FoodMakingProcesses.RemoveRange(food.FoodMakingProcesses);
                food.FoodMakingProcesses.Clear();
                _context.IngredientsOfFoods.RemoveRange(food.IngredientsOfFoods);
                food.IngredientsOfFoods.Clear();
                foreach (var foodMaking in request.FoodMakingProcessRequest)
                {
                    var fMP = new FoodMakingProcess();
                    fMP = _mapper.Map<CreateFoodMakingProcessRequest, FoodMakingProcess>(foodMaking);
                    fMP.FoodId = food.Id;
                    _context.FoodMakingProcesses.Add(fMP);
                    _context.Entry(fMP).State = EntityState.Added;
                    food.FoodMakingProcesses.Add(fMP);
                }

                foreach (var ingredient in request.IngredientsOfFoodRequest)
                {
                    var ingreOfFood = new IngredientsOfFood();
                    ingreOfFood = _mapper.Map<CreateIngredientsOfFoodRequest, IngredientsOfFood>(ingredient);
                    ingreOfFood.FoodId = food.Id;
                    _context.IngredientsOfFoods.Add(ingreOfFood);
                    _context.Entry(ingreOfFood).State = EntityState.Added;
                    food.IngredientsOfFoods.Add(ingreOfFood);
                }
                _context.Entry(food).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return food;
            }
            catch (System.Exception ex)
            {
                _logger.LogInformation("update food with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw;
            }
        }

        public async Task<Boolean> Delete(int id)
        {
            try
            {
                var food = _context.Foods.FirstOrDefault(f => f.Id == id);
                if (food == null)
                {
                    throw new NotFoundException("food not found by Id: " + id);
                }

                _context.Entry(food).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<Boolean> Delete(IEnumerable<int> ids)
        {
            var tran = _context.Database.BeginTransaction();
            try
            {
                foreach (var id in ids)
                {
                    await this.Delete(id);
                }
                tran.Commit();
                return true;
            }
            catch (System.Exception)
            {
                tran.Rollback();
                throw;
            }
        }

        public async Task<bool> UploadImage(int id, UploadFileDto dt)
        {
            var food = _context.Foods.FirstOrDefault(f => f.Id == id);
            if (food == null)
            {
                throw new NotFoundException("food not found by Id: " + id);
            }
            food.Image = (await _uploadFileService.UploadFile(dt)).Url;
            _context.Entry(food).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}