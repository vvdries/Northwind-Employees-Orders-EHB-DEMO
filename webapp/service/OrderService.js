sap.ui.define([
	"./CoreService",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (CoreService, Filter, FilterOperator) {
	"use strict";

	var OrderService = CoreService.extend("be.flexso.ehb.Northwind-Employees.service.OrderService", {

		constructor: function () {},

		setModel: function (model) {
			this.model = model;
		},

		getEmployeesOrders: function (employeeId) {
			
			var sObjectPath = this.model.createKey("/Employees", { EmployeeID: employeeId});
			
			var oParams = {
				"$expand": "Orders"
			};
			
			return this.odata(this.model, sObjectPath, "read", false, oParams);
		}

	});
	return new OrderService();
});