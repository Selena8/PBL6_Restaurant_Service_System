using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Domain.Models.Schemas 
{
    [Table("user")]
    public class User : BaseModel
    {
        [Key]
        public int Id { get; set; }
        [StringLength(300)]
        public string Email { get; set; } = null!;
        [StringLength(50)]
        public string DisplayName { get; set; } = null!;
        [StringLength(128)]
        public string Password { get; set; } = null!;
        [StringLength(50)]
        public string FirstName { get; set; } = null!;
        [StringLength(50)]
        public string LastName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public AccountStatus AccountStatus { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; } = null!;
        public string? Avatar {get;set;}

        [ForeignKey("role")]
        public int RoleId { get; set; }        
        public virtual Role Role { get; set; } 
        public ICollection<Shift> Shifts { get; set; }
        public ICollection<WorkLog> WorkLogs { get; set; }
        public ICollection<Request> Requests { get; set; }
        public ICollection<Food> Foods { get; set; }

        public User()
        {
            WorkLogs = new HashSet<WorkLog>();
            Requests = new HashSet<Request>();
            Foods = new HashSet<Food>();
        }
    }
}