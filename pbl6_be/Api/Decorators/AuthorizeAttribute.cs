using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using static pbl6_be.Common.Enum;
using Table = pbl6_be.Domain.Models.Schemas.Table;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]

public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.Items["User"];
        if(context.HttpContext.Items["TableId"] != null)
        {
            return;
        }
        var accountStatus = Convert.ToInt32( context.HttpContext.Items["AccountStatus"]);
        if (user == null)
        {
            // not logged in
            context.Result = new JsonResult(new { message = "Unauthorized. Token Invalid or Expire" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        else if (accountStatus == ((int)AccountStatus.InActive))
            context.Result = new JsonResult(new { message = "Account is not verified or banned" }) { StatusCode = StatusCodes.Status403Forbidden };
    }
}
