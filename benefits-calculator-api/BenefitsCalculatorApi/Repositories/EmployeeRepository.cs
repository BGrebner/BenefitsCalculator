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

        public EmployeeRepository(DatabaseConfig config) => _config = config;

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QueryAsync<Employee>("Select Id, FirstName, LastName FROM Employees;");
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QuerySingleAsync<Employee>("INSERT INTO Employees (FirstName, LastName) OUTPUT INSERTED.I* VALUES (@FirstName, @LastName)", employee);
        }
    }
}
