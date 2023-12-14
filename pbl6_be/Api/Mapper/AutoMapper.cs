using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using AutoMapper;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Api.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserResponse>().ForMember(u => u.UserType, u => u.MapFrom(u => u.RoleId));
            CreateMap<Category, GetCategoryResponse>();
            CreateMap<Food, GetFoodResponse>();
            CreateMap<Food, GetFoodDetailResponse>();
            CreateMap<CreateFoodRequest, Food>();
            CreateMap<CreateFoodMakingProcessRequest, FoodMakingProcess>();
            CreateMap<CreateIngredientsOfFoodRequest, IngredientsOfFood>();
            CreateMap<FoodMakingProcess, GetFoodMakingProcessResponse>();
            CreateMap<IngredientsOfFood, GetIngredientsOfFoodResponse>();
            CreateMap<BookingRequestInfo, Booking>();
            CreateMap<User, GetStaffResponse>().ForMember(u => u.UserType, u => u.MapFrom(u => u.RoleId));
            CreateMap<Order, OrderResponse>()
            .ForMember(o => o.TableName, o => o.MapFrom(o => o.Table.Name))
            .ForMember(o => o.Orderedfoods, o => o.MapFrom(o => o.OrderDetails.Select(o => new OrderDetailResponse()
            {
                OrderDetailId = o.Id,
                Quantity = o.Quantity,
                OrderStatus = o.Status,
                FoodId = o.FoodId
            })))
            .ForMember(o => o.Total, o => o.MapFrom(o => GetTotalOfOrder(o)))
            .ForMember(o => o.PaymentType, o => o.MapFrom(o => GetPaymentTye(o)));
            CreateMap<Request, GetRequestTableResponse>()
            .ForMember(r => r.TableName, r => r.MapFrom(r => r.Table.Name))
            ;
            CreateMap<CreateRequestTableRequest, Request>();
            CreateMap<Shift, ShiftResponse>()
            .ForMember(s => s.StaffName, s => s.MapFrom(s => s.User.FirstName + s.User.LastName))
            .ForMember(s => s.WorkLog, s => s.MapFrom(s => RelayMethod(s.WorkLog)))
            ;
            CreateMap<Table, TableResponse>()
                .ForMember(u => u.CurrentStatus, u => u.MapFrom(u => u.Orders.All(o => (o.OrderStatus == OrderStatus.Done || o.OrderStatus == OrderStatus.Cancel)) ? TableStatus.Free : TableStatus.InUse))
                .ForMember(t => t.Bookings, t => t.MapFrom(t => t.Bookings
                                                                        .Where(bk => bk.OrderDate >= DateTime.Now)
                                                                        .AsEnumerable()
                                                                        .Select(

                                                                             b => RelayMethod(b)).ToList()));
            CreateMap<RequestToChangeWorklog, RequestToChangeWorklogResponse>()
            .ForMember(cr => cr.StaffName,cr => cr.MapFrom(cr => cr.Shift.User.FirstName + cr.Shift.User.LastName));
        }

        private Booking RelayMethod(Booking bk)
        {
            string name = bk.Table.Name;
            bk.Table = null;
            bk.Table = new Table();
            bk.Table.TableName = name;
            return bk;
        }
        private WorkLog RelayMethod(WorkLog wk)
        {
            wk.Shift = null;
            wk.User = null;
            return wk;
        }

        private double GetTotalOfOrder(Order o)
        {
            try
            {
                if (o.OrderStatus != OrderStatus.Cancel)
                {
                    Double total = 0;

                    foreach (var od in o.OrderDetails)
                    {
                        if (od.Status != OrderDetailStatus.Cancel)
                            total += Convert.ToDouble(od.Food.Price) * Convert.ToDouble(od.Quantity);
                    }

                    return Math.Round(total,3);
                }
                else
                    return 0;
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        private PaymentType? GetPaymentTye(Order o)
        {
            try
            {
                if (o.OrderStatus == OrderStatus.Done)
                {
                    return o.Payments.FirstOrDefault(x => x.Status == PaymentStatus.Paid)?.Type;
                }
                else
                    return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}