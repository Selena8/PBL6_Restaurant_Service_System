using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using pbl6_be.Domain.Models.Schemas;
using static pbl6_be.Common.Enum;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class UserTypeFilterAttribute : Attribute, IAuthorizationFilter
{

    public UserTypeFilterAttribute(params UserType[] args)
    {
        Args = args;
    }

    public UserType[] Args { get; }
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.Items["User"] as User;
        var tableid = context.HttpContext.Items["TableId"];
        if (tableid != null)
        {
            if (Args.Contains(UserType.Table))
                return;
            else
            {
                context.Result = new JsonResult(new { message = "Permission denied!" }) { StatusCode = StatusCodes.Status403Forbidden };
                return;
            }
        }
        try
        {
            bool isCheck = false;
            for (int i = 0; i < Args.Length; i++)
            {
                if (user?.RoleId == Convert.ToUInt32(Args[i])) { isCheck = true; break; }
            }
            if (Args.Length == 0)
            {
                isCheck = true;
            }
            if (!isCheck)
            {
                context.Result = new JsonResult(new { message = "Permission denied!" }) { StatusCode = StatusCodes.Status403Forbidden };
            }
        }
        catch (Exception err)
        {
            Console.WriteLine(err.ToString());
        }
    }
}
