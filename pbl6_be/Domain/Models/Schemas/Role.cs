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
    [Table("role")]
    public class Role : TableWithIntId
    {
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; } = null!;
        
        [Column("description")]
        [StringLength(300)]
        public string Description { get; set; } = null!;

        public ICollection<User> Users { get; set; }

        public Role()
        {
            Users =  new HashSet<User>();
        } 
    }
}