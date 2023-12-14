using System.ComponentModel.DataAnnotations;

namespace Api.Common
{
    public enum RequestStatus
    {
        [Display(Name = "In Progress")]
        in_progress,

        [Display(Name = "Done")]
        done
    }
}