using BenefitsCalculatorApi.Models;
using BenefitsCalculatorApi.Services;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BenefitsCalculatorApi.Tests.Services
{
    public class BenefitsPreviewServiceShould
    {
        private readonly BenefitsPreviewService benefitsPreviewService;

        public BenefitsPreviewServiceShould()
        {
            benefitsPreviewService = new BenefitsPreviewService();
        }

        [Theory]
        [InlineData("Kathryn", "Janeway")]
        [InlineData("Jean Luc", "Picard")]
        [InlineData("James", "Kirk")]
        public void CalculateStandardEmployeeCostWhenNameNotBeginningWithA(string firstName, string lastName)
        {
            var employee = new Employee { FirstName = firstName, LastName = lastName, Dependents = new List<Dependent>()};

            var actualCost = benefitsPreviewService.CalculateBenefitsCost(employee);

            actualCost.Should().Be(1000);
        }

        [Theory]
        [InlineData("Jonathan", "Archer")]
        [InlineData("Alexander", "Rozhenko")]
        public void CalculateDiscountedEmployeeCostWhenNameBeginningWithA(string firstName, string lastName)
        {
            var employee = new Employee { FirstName = firstName, LastName = lastName, Dependents = new List<Dependent>() };

            var actualCost = benefitsPreviewService.CalculateBenefitsCost(employee);

            actualCost.Should().Be(900);
        }

        [Fact]
        public void CalculateStandardDependentCostWhenNameNotBeginningWithA()
        {
            var employee = new Employee {
                FirstName = "Darth",
                LastName = "Vader",
                Dependents = new List<Dependent>() 
            };

            employee.Dependents.Add(new Dependent { FirstName = "Leia", LastName = "Organa" });
            employee.Dependents.Add(new Dependent { FirstName = "Luke", LastName = "Skywalker" });

            var actualCost = benefitsPreviewService.CalculateBenefitsCost(employee);

            actualCost.Should().Be(2000);
        }

        [Fact]
        public void CalculateDiscountedDependentCostWhenNameBeginningWithA()
        {
            var employee = new Employee
            {
                FirstName = "Worf",
                LastName = "Rozhenko",
                Dependents = new List<Dependent>()
            };

            employee.Dependents.Add(new Dependent { FirstName = "Alexander", LastName = "Rozhenko" });
            employee.Dependents.Add(new Dependent { FirstName = "Wesley", LastName = "Crusher" });
            employee.Dependents.Add(new Dependent { FirstName = "Jonathan", LastName = "Archer" });

            var actualCost = benefitsPreviewService.CalculateBenefitsCost(employee);

            actualCost.Should().Be(2400);
        }
    }
}
