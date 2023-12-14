using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("object")]
    public class Object
    {
        [Key]
        [Column("id")]
        public string Id { get; set; }
        [Column("rotation")]
        [Required]
        public double Rotation { get; set; }
        [Column("type")]
        [Required]
        public ObjectType Type { get; set; } = ObjectType.Rectangle;
        [Column("shapetype")]
        [Required]
        public string ShapeType { get; set; }
        [Column("width")]
        [Required]
        public double Width { get; set; }
        [Column("height")]
        [Required]
        public double Height { get; set; }
        [Column("depth")]
        [Required]
        public double Depth { get; set; }
        [Column("x")]
        [Required]
        public double X { get; set; }
        [Column("y")]
        [Required]
        public double Y { get; set; }
        [Column("z")]
        [Required]
        public double Z { get; set; }
        [Column("color")]
        [Required]
        public string Color { get; set; } = "#e57f58";
        [Column("text")]
        [Required]
        public string Text { get; set; } = "";
        [Column("path")]
        public string Path {get; set;} = "";
    }

    public enum ObjectType
    {
        Rectangle,
        Circle,
    }
}