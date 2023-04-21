﻿using Application.Models.ExceptionModels;
using Application.Models.GenericRepo;
using Application.Models.ImageModels.Dtos;
using Domain.Entities;
using Domain.Enums;
using System.Net;

namespace Application.Services
{
    public static class ThrowExceptionService
    {
        public static async Task ThrowExceptionWhenIdNotFound<T>(int id, IGenericRepository<T> repo)
        {
            var entity = await repo.GetByIdAsync(id);

            if (entity == null)
            {
                throw new HttpException($"{typeof(T).Name} Id not found!", HttpStatusCode.NotFound);
            }
        }

        public static void ThrowExceptionWhenOrderIsNotPending(Order order)
        {
            if (order.Status != OrderStatus.Pending)
            {
                throw new HttpException("Order cannot be rejected, because it is not pending!", HttpStatusCode.BadRequest);
            }
        }

        public static void ThrowExceptionWhenNotEnoughQuantity(int saleQty, int orderQty)
        {
            if (orderQty > saleQty)
            {
                throw new HttpException("Not enough quantity for sale!", HttpStatusCode.BadRequest);
            }
        }
    }
}
