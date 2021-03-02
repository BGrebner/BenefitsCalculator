using BenefitsCalculatorApi.Controllers;
using BenefitsCalculatorApi.Models;
using BenefitsCalculatorApi.Services;
using FakeItEasy;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BenefitsCalculatorApi.Tests.Controllers
{
    public class BenefitPreviewControllerShould
    {
        private readonly IBenefitsPreviewService benefitsPreviewService;
        private readonly BenefitsPreviewController controller;

        public BenefitPreviewControllerShould()
        {
            benefitsPreviewService = A.Fake<IBenefitsPreviewService>();
            controller = new BenefitsPreviewController(benefitsPreviewService);
        }

        [Fact]
        public void BeAPost() => controller.Should().BePost(nameof(controller.GetBenefitPreview), "benefitsPreview");

        [Fact]
        public void ReturnBenefitsCost()
        {
            var employee = A.Dummy<Employee>();
            decimal expectedBenefitsCost = 2500;

            A.CallTo(() => benefitsPreviewService.CalculateBenefitsCost(employee)).Returns(expectedBenefitsCost);

            var actualBenefitsPreview = controller.GetBenefitPreview(employee);

            Assert.Equal(actualBenefitsPreview.YearlyBenefitCost, expectedBenefitsCost);
        }
    }
}
