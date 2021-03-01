using BenefitsCalculatorApi.Models;
using BenefitsCalculatorApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BenefitsCalculatorApi.Controllers
{
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeRepository employeeRepository)
        {
            _logger = logger;
            _employeeRepository = employeeRepository;
        }

        [HttpGet("Employee")]
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _employeeRepository.GetEmployees();
        }

        [HttpPost("Employee")]
        public async Task<Employee> Create(Employee employee)
        {
            return await _employeeRepository.CreateEmployee(employee);
        }
    }
}
