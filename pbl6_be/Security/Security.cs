using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace pbl6_be.Security
{
    public static class Security
    {
        public static string GetMD5(string str, string firstStr = "", string lastStr = "")
        {
            str = firstStr + str + lastStr;
            string str_md5 = "";
            byte[] mang = System.Text.Encoding.UTF8.GetBytes(str);
            MD5 my_md5 = MD5.Create();
            mang = my_md5.ComputeHash(mang);
            foreach (byte b in mang)
            {
                str_md5 += b.ToString("x2");
            }
            return str_md5;
        }
    }
}