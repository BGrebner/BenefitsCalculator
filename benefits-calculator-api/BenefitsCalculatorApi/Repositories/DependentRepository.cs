using BenefitsCalculatorApi.Database;
using BenefitsCalculatorApi.Models;
using Dapper;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BenefitsCalculatorApi.Repositories
{
    public interface IDependentRepository
    {
        Task<IEnumerable<Dependent>> GetDependents(int employeeId);

        Task<Dependent> CreateDependent(IPerson dependent, int employeeId);
    }

    public class DependentRepository : IDependentRepository
    {
        private readonly DatabaseConfig _config;
        public DependentRepository(DatabaseConfig config) => _config = config;

        public async Task<Dependent> CreateDependent(IPerson dependent, int employeeId)
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QuerySingleAsync<Dependent>("INSERT INTO Dependents (FirstName, LastName, EmployeeId) VALUES (@FirstName, @LastName, @EmployeeId); SELECT last_insert_rowid() AS Id, @FirstName AS FirstName, @LastName AS LastName", new { FirstName = dependent.FirstName, LastName = dependent.LastName, EmployeeId = employeeId });
        }

        public async Task<IEnumerable<Dependent>> GetDependents(int employeeId)
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QueryAsync<Dependent>("Select Id, FirstName, LastName FROM Depenedents WHERE EmployeeId = @EmployeeId;", employeeId);
        }
    }
}
