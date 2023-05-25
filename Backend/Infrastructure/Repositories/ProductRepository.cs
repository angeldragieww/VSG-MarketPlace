﻿using Application.Models.GenericRepo;
using Application.Models.ImageModels.Dtos;
using Application.Models.ProductModels.Dtos;
using Application.Models.ProductModels.Intefaces;
using Dapper;
using Domain.Entities;
using Infrastructure.Repositories.GenericRepository.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(IMarketPlaceContext marketPlaceContext)
            : base(marketPlaceContext)
        {
        }

        public async Task<List<ProductMarketPlaceGetDto>> GetAllIndexProductsAsync()
        {
            var sql = @" SELECT p.Id, p.Name, p.Description, c.Name AS Category, p.Price, p.SaleQty, i.PublicId AS Image
                                        FROM 
                                        Product AS p 
                                        JOIN Category AS c ON p.CategoryId = c.Id 
                                        LEFT JOIN Image AS i ON i.ProductId = p.Id
                                        WHERE p.SaleQty > 0";

            var products = await connection.QueryAsync<ProductMarketPlaceGetDto>(sql, null, transaction);
            return products.ToList();
        }

        public async Task<List<ProductInventoryGetDto>> GetAllInventoryProductsAsync()
        {
            var sql = @"SELECT p.Id, p.Code, p.Name, p.Price, p.Description, c.Name AS Category, p.CategoryId, p.SaleQty, p.CombinedQty, i.PublicId AS Image, l.Name AS Location, p.LocationId
                                            FROM
                                            [Product] AS p
                                            JOIN [Category] AS c ON p.CategoryId = c.Id
                                            JOIN [Location] AS l ON p.LocationId = l.Id
                                            LEFT JOIN [Image] AS i ON i.ProductId = p.Id";

            var products = await connection.QueryAsync<ProductInventoryGetDto>(sql, null, transaction);

            return products.ToList();
        }
    }
}
