using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("category")]
    public class Category : TableWithIntId
    {
        [Column("name")]
        public string Name { get; set; } = null!;   

        [Column("description")]
        public string Description { get; set; } = null!;

        public ICollection<Food> Foods { get; set; }

        public Category()
        {
            Foods = new HashSet<Food>();
        }
    }
}