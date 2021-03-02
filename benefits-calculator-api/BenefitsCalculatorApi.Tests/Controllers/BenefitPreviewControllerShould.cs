using BenefitsCalculatorApi.Controllers;
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
        private readonly BenefitsPreviewController benefitsPreviewController;

        public BenefitPreviewControllerShould()
        {
            benefitsPreviewService = A.Fake<IBenefitsPreviewService>();
            benefitsPreviewController = new BenefitsPreviewController(benefitsPreviewService);
        }

        [Fact]
        public void BeAPost() => benefitsPreviewController.Should().BePost(nameof(benefitsPreviewController.GetBenefitPreview), "benefitsPreview");
    }
}
