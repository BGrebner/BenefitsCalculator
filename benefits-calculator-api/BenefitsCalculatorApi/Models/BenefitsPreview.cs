using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsCalculatorApi.Models
{
    public class BenefitsPreview
    {
        public decimal PaycheckSalary { get; set; } = 2000;
        public decimal YearlyBenefitCost { get; set; }

        public decimal PaycheckBenefitCost => YearlyBenefitCost / 26;
    }
}
