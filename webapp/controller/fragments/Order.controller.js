/* global _:true */
sap.ui.define([
	"be/flexso/ehb/Northwind-Employees/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
], function (BaseController, JSONModel, Filter, FilterOperator) {
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
			
		},
		
		onOrderSelect: function (oEvent) {
			this.clearSearchFilter(oEvent);
			var selectedOrderId = oEvent.getParameter("selectedItem").getBindingContext("EmployeeState").getProperty("OrderID");
			this.callback.call(this.parent, selectedOrderId);
		}


	});

});