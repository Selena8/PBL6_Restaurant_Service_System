using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("food_making_process")]
    public class FoodMakingProcess : TableWithIntId
    {
        [Column("description")]
        [StringLength(300)]
        public string Description { get; set; } = null!;

        [Column("seq")]
        public int Seq { get; set; }

        [ForeignKey("food")]
        [Column("food_id", Order = 2)]
        public int FoodId { get; set; }

        public virtual Food Food { get; set; }
    }
}