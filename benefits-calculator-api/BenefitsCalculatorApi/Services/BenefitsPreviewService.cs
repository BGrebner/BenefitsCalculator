using BenefitsCalculatorApi.Models;
using System;

namespace BenefitsCalculatorApi.Services
{
    public interface IBenefitsPreviewService
    {
        decimal CalculateBenefitsCost(Employee employee);
    }

    public class BenefitsPreviewService : IBenefitsPreviewService
    {
        public decimal CalculateBenefitsCost(Employee employee)
        {
            return 1000;
        }
    }
}
