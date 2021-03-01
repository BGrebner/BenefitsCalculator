using FluentAssertions;
using FluentAssertions.Primitives;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BenefitsCalculatorApi.Tests
{
    public static class ControllerTestExtensions
    {
        public static ControllerAssertions Should(this ControllerBase controller) => new ControllerAssertions(controller);
    }

	public class ControllerAssertions : ReferenceTypeAssertions<ControllerBase, ControllerAssertions>
	{
		private readonly ControllerBase controller;

		protected override string Identifier => "cinenet controller";

		public ControllerAssertions(ControllerBase controller) => this.controller = controller;

		public AndConstraint<ControllerAssertions> BeDelete(string methodName, string template = null) => HaveHttpAttribute<HttpDeleteAttribute>(methodName, template);

		public AndConstraint<ControllerAssertions> BeGet(string methodName, string template = null) => HaveHttpAttribute<HttpGetAttribute>(methodName, template);

		public AndConstraint<ControllerAssertions> BePost(string methodName, string template = null) => HaveHttpAttribute<HttpPostAttribute>(methodName, template);

		public AndConstraint<ControllerAssertions> HaveHttpAttribute<THttpAttribute>(string methodName, string template = null) where THttpAttribute : HttpMethodAttribute, IActionHttpMethodProvider
		{
			var attributes = GetAttributes<THttpAttribute>(methodName, controller.GetType());

			attributes.Count.Should().BeGreaterThan(0, $"did not find Http attribute {typeof(THttpAttribute).Name}");

			if (template != string.Empty && template != null) attributes.Any(i => i.Template.Equals(template, StringComparison.OrdinalIgnoreCase)).Should().BeTrue();

			return new AndConstraint<ControllerAssertions>(this);
		}

		private static List<TAttribute> GetAttributes<TAttribute>(string methodName, Type controllerType) where TAttribute : Attribute
		{
			var method = controllerType.GetMethod(methodName);

			return method.GetCustomAttributes(typeof(TAttribute), true).Cast<TAttribute>().ToList();
		}
	}
}
