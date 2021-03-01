using BenefitsCalculatorApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace BenefitsCalculatorApi.Controllers
{
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Employee")]
        public IEnumerable<Employee> Get()
        {
            throw new NotImplementedException();
        }
    }
}
