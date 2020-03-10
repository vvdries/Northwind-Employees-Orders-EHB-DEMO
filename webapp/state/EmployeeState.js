/* global _:true */
sap.ui.define([
	"../object/BaseObject",
	"../object/EmployeeObject",
	"../service/OrderService",
	"../object/OrderObject",
], function (BaseObject, EmployeeObject, OrderService, OrderObject) {
	"use strict";
	var EmployeeState = BaseObject.extend("be.flexso.ehb.Northwind-Employees.state.EmployeeState", {

		aEmployees: [],
		oSelectedEmployee: {},

		constructor: function (data) {
			BaseObject.call(this, data);
		},

		setEmployees: function (aEmployees) {
			var oPromise = new Promise(function (resolve, reject) {
				this.aEmployees = aEmployees.map(oEmployee => {
					var newEmployeeObject = new EmployeeObject(oEmployee);
					newEmployeeObject.setManager(aEmployees.find(oEmployee => oEmployee.EmployeeID === newEmployeeObject.getManagerId()));
					return newEmployeeObject;
				});
				this.updateModel();
				resolve(this.aEmployees);
			}.bind(this));
			return oPromise;
		},

		getEmployeesOrders: function () {
			var aPromises = this.aEmployees.map(oEmployee => OrderService.getEmployeesOrders(oEmployee.getEmployeeId()));
			return Promise.all(aPromises).then(function (result) {
				this.setEmployeeOrders(result);
				return this.aEmployees;
			}.bind(this));
		},

		setEmployeeOrders: function (aEmployeeOrders) {
			this.aEmployees.forEach(oEmployee => oEmployee.setOrders(aEmployeeOrders.map(oResult => oResult.data).find(emp => emp.EmployeeID ===
				oEmployee.getEmployeeId()).Orders.results.map(oOrder => new OrderObject(oOrder))));
			this.updateModel();
		},
		
		getSelectedEmployee: function(){
			return this.oSelectedEmployee;
		},

		setSelectedEmployee: function (oEmployee) {
			this.oSelectedEmployee = oEmployee;
			this.updateModel();
		}

	});
	return new EmployeeState();
});