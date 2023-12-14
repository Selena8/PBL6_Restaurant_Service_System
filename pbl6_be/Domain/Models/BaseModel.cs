using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models
{
    public class BaseModel
    {
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.Now;
        public bool IsDeleted { get; set; } = false;
    }
}