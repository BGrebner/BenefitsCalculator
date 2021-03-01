using System.Collections.Generic;

namespace BenefitsCalculatorApi.Models
{
    public class Employee: IPerson
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Dependent> Dependents { get; set; } = new List<Dependent>();
    }

    public class Dependent : IPerson
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
