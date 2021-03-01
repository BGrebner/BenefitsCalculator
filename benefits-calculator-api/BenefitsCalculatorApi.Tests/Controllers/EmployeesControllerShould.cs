using BenefitsCalculatorApi.Controllers;
using BenefitsCalculatorApi.Models;
using BenefitsCalculatorApi.Repositories;
using FakeItEasy;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Xunit;

namespace BenefitsCalculatorApi.Tests
{
    public class EmployeesControllerShould
    {
        private readonly EmployeeController controller;
        private readonly IEmployeeRepository employeeRepository;

        public EmployeesControllerShould()
        {
            var logger = A.Fake<ILogger<EmployeeController>>();
            employeeRepository = A.Fake<IEmployeeRepository>();

            controller = new EmployeeController(logger, employeeRepository);
        }

        [Fact]
        public void BeAGet() => controller.Should().BeGet(nameof(controller.Get), "Employee");

        [Fact]
        public async Task ReturnEmployee()
        {
            var expectedEmployees = A.CollectionOfDummy<Employee>(10);

            A.CallTo(() => employeeRepository.GetEmployees()).Returns(expectedEmployees);

            var actualEmployees = await controller.Get();

            actualEmployees.Should().BeEquivalentTo(expectedEmployees);
        } 
        
    }
}
