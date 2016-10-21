using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveInfo.Web.Models;

namespace LiveInfo.Web.Utils
{
    public static class DataUtils
    {
        public static void ChangeRatings(this IList<Item> items) {
            Random random = new Random(DateTime.Now.Millisecond);
            foreach (var item in items) {
                item.Rating += random.Next(-2, 2);
                if (item.Rating < 0) {
                    item.Rating = 0;
                }
            }
        }
    }
}
