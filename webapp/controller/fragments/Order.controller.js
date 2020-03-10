/* global _:true */
sap.ui.define([
	"be/flexso/ehb/Northwind-Employees/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"../../state/EmployeeState",
], function (BaseController, JSONModel, Filter, FilterOperator, EmployeeState) {
	"use strict";
	return BaseController.extend("be.flexso.ehb.Northwind-Employees.controller.fragment.Order", {

		onBeforeShow: function (parent, fragment, callback, data) {
			this.parent = parent;
			this.fragment = fragment;
			this.callback = callback;

			this.fragment.setModel(data.i18n, "i18n");
			this.hideBusyIndicator();
		},
		
		clearSearchFilter: function(oEvent) {
			var aFilters = [];
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(aFilters);
		},

		onClose: function (oEvent) {
			this.clearSearchFilter(oEvent);
		},

		handleSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter({
				filters: [
					new Filter("OrderID", FilterOperator.EQ, sValue), // metadata -> orderid int -> cannot be contains (only string contains)
					new Filter("ShipName", FilterOperator.Contains, sValue),
					new Filter("ShipCountry", FilterOperator.Contains, sValue)
				],
				and: false
			});
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		onOrderSelect: function (oEvent) {
			this.clearSearchFilter(oEvent);
			var selectedOrderId = oEvent.getParameter("selectedItem").getBindingContext("EmployeeState").getProperty("OrderID");
			this.callback.call(this.parent, selectedOrderId);
		}


	});

});