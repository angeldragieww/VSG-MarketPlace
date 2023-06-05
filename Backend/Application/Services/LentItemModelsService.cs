﻿using Application.Models.ExceptionModels;
using Application.Models.GenericModels.Dtos;
using Application.Models.LentItemModels.Dtos;
using Application.Models.LentItemModels.Interfaces;
using Application.Models.OrderModels.Dtos;
using Application.Models.ProductModels.Intefaces;
using Application.Models.UserModels.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LentItemModelsService : ILentItemService
    {
        private readonly ILentItemRepository lentItemRepo;
        private readonly IProductRepository productRepo;
        private readonly IMapper mapper;
        private readonly IUserService userService;

        public LentItemModelsService(ILentItemRepository lentItemRepo,
            IProductRepository productRepo, 
            IMapper mapper,
            IUserService userService)
        {
            this.lentItemRepo = lentItemRepo;
            this.productRepo = productRepo;
            this.mapper = mapper;
            this.userService = userService;
        }
        public async Task CreateAsync(LentItemCreateDto dto)
        {
            var product = await productRepo.GetByIdAsync(dto.ProductId);

            if (product == null || product.IsDeleted)
            {
                throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
            }

            if (dto.Qty > product.LendQty)
            {
                throw new HttpException("Not enough quantity for lend!", HttpStatusCode.BadRequest);
            }

            var newLendQty = product.LendQty - dto.Qty;
            await productRepo.SetFieldAsync(product.Id, "LendQty", newLendQty);

            var newCombinedQty = product.CombinedQty - dto.Qty;
            await productRepo.SetFieldAsync(product.Id, "CombinedQty", newCombinedQty);

            var lendedItem = mapper.Map<LentItem>(dto);
            await lentItemRepo.CreateAsync(lendedItem);
        }

        public async Task<Dictionary<string, List<LentItemForGroupGetDto>>> GetAllLentItemsGroupedByLenderAsync()
        {
            var lendedItems = await lentItemRepo.GetAllLentItemsAsync();

            return lendedItems.GroupBy(l => l.LentBy)
                .ToDictionary(g => g.Key, g => mapper.Map<List<LentItemForGroupGetDto>>(g.ToList()));
        }

        public async Task<List<LentItemGetMineDto>> GetMyLentItemsAsync()
        {
            var user = userService.GetUserEmail();
            var myLentItems = await lentItemRepo.GetMyLentItemsAsync(user);
            return mapper.Map<List<LentItemGetMineDto>>(myLentItems);
        }

        public async Task ReturnItemAsync(int id)
        {
            var lendedItem = await lentItemRepo.GetByIdAsync(id);


            if (lendedItem == null)
            {
                throw new HttpException($"Lended item Id not found!", HttpStatusCode.NotFound);
            }

            if (lendedItem.EndDate != null)
            {
                throw new HttpException("Only lended items without end date can be returnded!", HttpStatusCode.BadRequest);
            }

            var product = await productRepo.GetByIdAsync(lendedItem.ProductId);

            var newLendQty = product.LendQty + lendedItem.Qty;
            await productRepo.SetFieldAsync(product.Id, "LendQty", newLendQty);

            var newCombinedQty = product.CombinedQty + lendedItem.Qty;
            await productRepo.SetFieldAsync(product.Id, "CombinedQty", newCombinedQty);

            await lentItemRepo.SetFieldAsync(id, "EndDate", DateTime.Now);

        }
    }
}
