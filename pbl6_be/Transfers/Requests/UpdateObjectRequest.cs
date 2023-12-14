using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Transfers.Requests
{
    public class UpdateObjectRequest
    {
        [Required]
        public double Rotation { get; set; }
        [Required]
        public ObjectType Type { get; set; } = ObjectType.Rectangle;
        [Required]
        public string ShapeType { get; set; }
        [Required]
        public double Width { get; set; }
        [Required]
        public double Height { get; set; }
        [Required]
        public double Depth { get; set; }
        [Required]
        public double X { get; set; }
        [Required]
        public double Y { get; set; }
        [Required]
        public double Z { get; set; }
        [Required]
        public string Color { get; set; } = "#e57f58";
        [Required]
        public string Text { get; set; } = "";
        public string Path {get; set;} = "";
    }
}