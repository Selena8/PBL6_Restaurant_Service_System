using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class Pagination<T>
    {
        public Pagination(IEnumerable<T> _data, int _count)
        {
            data = _data;
            count = _count;
        }

        public Pagination() { }
        public IEnumerable<T> data { get; set; }
        public int count { get; set; }
    }
}
