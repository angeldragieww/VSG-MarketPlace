﻿using Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Order : BaseEntity
    {
        public string ProductCode { get; set; }

        public string ProductName { get; set; }

        public decimal Price { get; set; }
        public int Qty { get; set; }

        public string OrderedBy { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        public int? ProductId { get; set; }
    }
}
