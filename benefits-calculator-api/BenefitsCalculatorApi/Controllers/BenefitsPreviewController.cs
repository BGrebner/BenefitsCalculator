using BenefitsCalculatorApi.Models;
using BenefitsCalculatorApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BenefitsCalculatorApi.Controllers
{
    [ApiController]
    public class BenefitsPreviewController : ControllerBase
    {
        private readonly IBenefitsPreviewService _benefitsPreviewService;

        public BenefitsPreviewController(IBenefitsPreviewService benefitsPreviewService) => _benefitsPreviewService = benefitsPreviewService;

        [HttpPost("BenefitsPreview")]
        public BenefitsPreview GetBenefitPreview(Employee employee)
        {
            var benefitsPreview = new BenefitsPreview();

            benefitsPreview.YearlyBenefitCost = _benefitsPreviewService.CalculateBenefitsCost(employee);

            return benefitsPreview;
        }
    }
}
