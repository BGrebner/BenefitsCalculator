using Dapper;
using Microsoft.Data.Sqlite;
using System.Linq;

namespace BenefitsCalculatorApi.Database
{
    public interface IDatabaseBootstrap
    {
        void Setup();
    }
    public class DatabaseBootstrap : IDatabaseBootstrap
    {
        private readonly DatabaseConfig databaseConfig;

        public DatabaseBootstrap(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;
        }

        public void Setup()
        {
            using var connection = new SqliteConnection(databaseConfig.Name);

            var table = connection.Query<string>("SELECT name FROM sqlite_master WHERE type='table' AND name = 'Employees';");
            var tableName = table.FirstOrDefault();
            if (!string.IsNullOrEmpty(tableName) && tableName == "Employees")
            return;

            connection.Execute("Create Table Employees (FirstName NVARCHAR(50) NOT NULL LastName NVARCHAR(50) NOT NULL);");
        }
    }
}
