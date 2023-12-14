using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("point")]
    public class Point : TableWithIntId
    {
        [Column("coordinate_axis")]
        public int CoordinateAxis { get; set; }
        
        [Column("horizontal_axis")]
        public int HorizontalAxis { get; set; }

        [Column("is_occupy")]
        public bool IsOccupy { get; set; }

        [Column("is_fixed")]
        public bool IsFixed { get; set; }
    }
}