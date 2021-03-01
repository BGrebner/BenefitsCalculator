﻿using BenefitsCalculatorApi.Models;
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
        public void CalculateStandardEmployeeCostBasedWhenNotBeginningWithA(string firstName, string lastName)
        {
            var employee = new Employee { FirstName = firstName, LastName = lastName, Dependents = new List<Dependent>()};

            var actualCost = benefitsPreviewService.CalculateBenefitsCost(employee);

            actualCost.Should().Be(1000);
        }
    }
}
