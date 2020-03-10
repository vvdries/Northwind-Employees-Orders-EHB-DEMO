/* global _:true */
sap.ui.define([
	"./BaseObject"
], function (BaseObject) {
	"use strict";
	return BaseObject.extend("be.flexso.ehb.Northwind-Employees.object.EmployeeObject", {
		constructor: function (data) {
			BaseObject.call(this, data);
			if (data) {
				// Perform custom actions
			}
		},

		getEmployeeId: function () {
			return this.EmployeeID;
		},

		getFirstName: function (firstName) {
			return this.FirstName;
		},

		getLastName: function (lastName) {
			return this.LastName;
		},

		getManagerId: function () {
			return this.ReportsTo;
		},

		setManager: function (manager) {
			this.Manager = manager;
		},
		
		getOrders: function() {
			return this.Orders;
		},
		
		setOrders: function(aOrders){
			this.Orders = aOrders;
		}

	});
});
