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
        public BenefitPreview GetBenefitPreview(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
