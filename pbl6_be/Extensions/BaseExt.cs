using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq.Dynamic.Core;
using System.Reflection;

namespace Trouble_Resolving_SystemBackEnd.Extensions
{
    public static class BaseExt
    {
        // This is the extension method.
        // The first parameter takes the "this" modifier
        // and specifies the type for which the method is defined.
        public static IQueryable<T> Pagination<T>(this IQueryable<T> query, int offset, int limit)
        {
            if (limit > 0)
            {
                return query.Skip(offset).Take(limit);
            }
            return query;
        }

        public static IQueryable<T> OrderByExt<T>(this IQueryable<T> query, string sortBy, string direction)
        {
            return query.OrderBy($"{sortBy.ToLower()} {direction.ToLower()}");
        }
        public static IQueryable<T> SearchByExt<T>(this IQueryable<T> query, string SearchBy, string search, bool IsContain = true)
        {
            if (query.FirstOrDefault() == null) return query;
            else
            {
                try
                {
                    var value = EF.Property<string>(query.First(), SearchBy);
                    return query.Where(t => (IsContain) ? Convert.ToString(EF.Property<string>(t, SearchBy)).Contains(search)
                : Convert.ToString(EF.Property<string>(t, SearchBy)) == search);
                }
                catch (Exception)
                {
                    return query.Where(t => (IsContain) ? Convert.ToString(EF.Property<int>(t, SearchBy)).Contains(search)
    : Convert.ToString(EF.Property<int>(t, SearchBy)) == search);
                }
            }
        }
        public static string GetDisplayName(this Enum enumValue)
        {
            return enumValue.GetType()
              .GetMember(enumValue.ToString())
              .First()
              .GetCustomAttribute<DisplayAttribute>()
              ?.GetName();
        }

        public static DateTime GetCurrentTime()
        {
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            return now.DateTime;
        }
    }
}
