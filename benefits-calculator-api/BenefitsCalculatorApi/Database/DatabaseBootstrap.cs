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

            connection.Execute("CREATE TABLE IF NOT EXISTS Employees (Id INTEGER PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL);");
            connection.Execute("CREATE TABLE IF NOT EXISTS Dependents (Id INTEGER PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL, EmployeeId INTEGER NOT NULL, FOREIGN KEY (EmployeeId) REFERENCES Employees (id) ON DELETE CASCADE ON UPDATE NO ACTION);");
        }
    }
}
