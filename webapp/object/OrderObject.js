/* global _:true */
sap.ui.define([
	"./BaseObject"
], function (BaseObject) {
	"use strict";
	return BaseObject.extend("be.flexso.ehb.Northwind-Employees.object.OrderObject", {
		constructor: function (data) {
			BaseObject.call(this, data);

			if (data) {
				// Perform custom actions
			}
		},
		
		getOrderId: function () {
			return this.OrderID;
		},
	});
});
