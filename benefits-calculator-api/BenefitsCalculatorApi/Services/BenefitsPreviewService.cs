using BenefitsCalculatorApi.Models;
using System;
using System.Linq;

namespace BenefitsCalculatorApi.Services
{
    public interface IBenefitsPreviewService
    {
        decimal CalculateBenefitsCost(Employee employee);
    }

    public class BenefitsPreviewService : IBenefitsPreviewService
    {
        private const decimal STANDARD_EMPLOYEE_COST = 1000;
        private const decimal STANDARD_DEPENDENT_COST = 500;

        public decimal CalculateBenefitsCost(Employee employee)
        {
            return ApplyNameRule(employee.FirstName, employee.LastName, STANDARD_EMPLOYEE_COST) + 
                employee.Dependents.Select(d => STANDARD_DEPENDENT_COST).Sum();
        }

        private decimal ApplyNameRule(string firstName, string lastName, decimal benefitCost) => benefitCost * (NameDiscountApplies(firstName, lastName) ? (decimal).9 : 1);

        private bool NameDiscountApplies(string firstName, string lastName) => firstName.StartsWith("a", StringComparison.InvariantCultureIgnoreCase) 
            || lastName.StartsWith("a", StringComparison.InvariantCultureIgnoreCase);

    }
}
