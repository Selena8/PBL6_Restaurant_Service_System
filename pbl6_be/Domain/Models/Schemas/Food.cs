using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using pbl6_be.Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("food")]
    public class Food : TableWithIntId
    {
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; } = null!;

        [Column("description")]
        [StringLength(300)]
        public string Description { get; set; } = null!;

        [Column("price")]
        public decimal Price { get; set; }

        [ForeignKey("user")]
        [Column("created_user_id", Order = 2)]
        public int CreatedUserId { get; set; }

        [ForeignKey("category")]
        [Column("category_id", Order = 3)]
        public int CategoryId { get; set; }
        public string Image { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<IngredientsOfFood> IngredientsOfFoods { get; set; }
        public ICollection<FoodMakingProcess> FoodMakingProcesses { get; set; }
        public virtual User User { get; set; }
        public virtual Category Category { get; set; }

        public Food()
        {
            OrderDetails = new HashSet<OrderDetail>();
            IngredientsOfFoods =  new HashSet<IngredientsOfFood>();
            FoodMakingProcesses = new HashSet<FoodMakingProcess>();
        }
    }
}