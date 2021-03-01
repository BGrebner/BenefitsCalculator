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
        Task<IEnumerable<IPerson>> GetDependents(int employeeId);

        Task<IPerson> CreateDependent(IPerson dependent, int employeeId);
    }

    public class DependentRepository : IDependentRepository
    {
        private readonly DatabaseConfig _config;
        public DependentRepository(DatabaseConfig config) => _config = config;

        public async Task<IPerson> CreateDependent(IPerson dependent, int employeeId)
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QuerySingleAsync<IPerson>("INSERT INTO Dependents (FirstName, LastName, EmployeeId) OUTPUT INSERTED.* VALUES (@FirstName, @LastName, @EmployeeId)", new { dependent.FirstName, dependent.LastName, employeeId });
        }

        public async Task<IEnumerable<IPerson>> GetDependents(int employeeId)
        {
            using var connection = new SqliteConnection(_config.Name);

            return await connection.QueryAsync<IPerson>("Select Id, FirstName, LastName FROM Depenedents WHERE EmployeeId = @EmployeeId;", employeeId);
        }
    }
}
