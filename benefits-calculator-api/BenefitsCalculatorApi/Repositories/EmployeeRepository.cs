using BenefitsCalculatorApi.Database;
using BenefitsCalculatorApi.Models;
using Dapper;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsCalculatorApi.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();

        Task<Employee> CreateEmployee(Employee employee);
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DatabaseConfig _config;
        private readonly IDependentRepository _dependentRepository;

        public EmployeeRepository(DatabaseConfig config, IDependentRepository dependentRepository)
        {
            _config = config;
            _dependentRepository = dependentRepository;
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QueryAsync<Employee>("Select Id, FirstName, LastName FROM Employees;");
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            using var connection = new SqliteConnection(_config.Name);

            var newEmployee = await connection.QuerySingleAsync<Employee>("INSERT INTO Employees (FirstName, LastName) OUTPUT INSERTED.* VALUES (@FirstName, @LastName)", employee);

            var dependentSaveTasks = employee.Dependents.Select(dependent => _dependentRepository.CreateDependent(dependent, (int)newEmployee.Id));

            newEmployee.Dependents = (await Task.WhenAll(dependentSaveTasks)).ToList();

            return newEmployee;
        }
    }
}
