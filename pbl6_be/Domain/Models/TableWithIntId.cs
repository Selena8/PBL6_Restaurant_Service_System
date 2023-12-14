using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models;

namespace Domain.Models
{
    public class TableWithIntId : BaseModel
    {
        [Key]
        [Column("id", Order = 1)]
        public int Id { get; set; }
    }
}