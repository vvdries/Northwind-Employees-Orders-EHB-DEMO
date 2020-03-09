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
		}

	});
	return new EmployeeState();
});