using System.ComponentModel.DataAnnotations;

namespace pbl6_be.Common
{
    public static class Enum
    {
        public enum Gender
        {
            Male,
            Female,
            Other
        }

        public enum AccountStatus
        {
            New,
            EmailConfirmed,
            InActive
        }

        public enum UserType
        {
            [Display(Name = "Admin")]
            Admin = 1,
            [Display(Name = "Staff")]
            Staff = 2,
            [Display(Name = "Table")]
            Table = 3,
        }
    }
}
