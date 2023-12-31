using System.Globalization;

namespace pbl6_be.Common.Utilities.Exceptions
{
    public class ForbiddenException : Exception
    {

        public ForbiddenException() : base()
        {
        }
        public ForbiddenException(string message) : base(message) { }
        public ForbiddenException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}