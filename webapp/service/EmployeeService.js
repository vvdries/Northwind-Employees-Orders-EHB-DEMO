sap.ui.define([
	"./CoreService",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (CoreService, Filter, FilterOperator) {
	"use strict";

	var EmployeeService = CoreService.extend("be.flexso.ehb.Northwind-Employees.service.EmployeeService", {

		constructor: function () {},

		setModel: function (model) {
			this.model = model;
		}

	});
	return new EmployeeService();
});


