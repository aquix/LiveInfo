using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LiveInfo.Web.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace LiveInfo.Web.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private IList<Item> data;

        public DataController() {
            data = new List<Item> {
                new Item {
                    Id = 1,
                    Name = "Something",
                    Rating = 1
                },
                new Item {
                    Id = 2,
                    Name = "Something1",
                    Rating = 5
                },
                new Item {
                    Id = 3,
                    Name = "Something231",
                    Rating = 4
                },
                new Item {
                    Id = 4,
                    Name = "Something32132",
                    Rating = 3
                },
                new Item {
                    Id = 5,
                    Name = "Something321",
                    Rating = 2
                },
            };
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Item> Get() {
            return data;
        }
    }
}
