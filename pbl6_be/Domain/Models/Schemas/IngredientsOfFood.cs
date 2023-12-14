using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("ingredients_of_food")]
    public class IngredientsOfFood : TableWithIntId
    {
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; } = null!;

        [Column("seq")]
        public int Seq { get; set; }

        [ForeignKey("food")]
        [Column("food_id", Order = 2)]
        public int FoodId { get; set; }

        public virtual Food Food { get; set; }
    }
}