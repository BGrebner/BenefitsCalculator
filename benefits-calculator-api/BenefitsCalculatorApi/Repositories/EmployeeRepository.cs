using BenefitsCalculatorApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsCalculatorApi.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetEmployees()
        {
            throw new NotImplementedException();
        }
    }
}
