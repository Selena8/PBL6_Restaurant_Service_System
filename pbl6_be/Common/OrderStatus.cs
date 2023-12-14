using System.ComponentModel.DataAnnotations;
namespace Api.Common
{
    public enum OrderStatus
    {
        Open = 0,
        Progress = 1,
        Payment = 2,
        Done = 3,
        Cancel = 4
    }

    public enum OrderDetailStatus
    {
        Open = 0,
        InProgress = 1,
        Done = 2,
        Cancel
    }
}