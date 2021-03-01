using BenefitsCalculatorApi.Controllers;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Xunit;

namespace BenefitsCalculatorApi.Tests
{
    public class EmployeesControllerShould
    {
        private readonly EmployeeController controller;

        public EmployeesControllerShould()
        {
            ILogger<EmployeeController> logger = A.Fake<ILogger<EmployeeController>>();

            controller = new EmployeeController(logger);
        }

        [Fact]
        public void BeAGet() => controller.Should().BeGet(nameof(controller.Get), "Employee");
        
    }
}
