sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../state/EmployeeState",
	"../utils/formatter",
	"sap/m/MessageToast"
], function (BaseController, JSONModel, EmployeeState, Formatter, MessageToast) {
	"use strict";

	return BaseController.extend("be.flexso.ehb.Northwind-Employees.controller.Employee", {

		formatter: Formatter,

		onInit: function () {
			this.setModel(EmployeeState.getModel(), "EmployeeState");
			this.showBusyIndicator();
			var aEmployees = this.getOwnerComponent().getModel("employeeModel").getProperty("/employees");
			EmployeeState.setEmployees(aEmployees).then(function () {
				EmployeeState.getEmployeesOrders().then(aEmployeesOrders => {
					this.hideBusyIndicator();
				});
			}.bind(this));
		},

		onShowOrders: function (oEvent) {
			EmployeeState.setSelectedEmployee(oEvent.getSource().getBindingContext("EmployeeState").getObject());
			console.log(EmployeeState.getSelectedEmployee()); //=> remove this just for debugging purpose
			this.showBusyIndicator();
			this.openFragment(
				"Order",
				this.getView().getModel("EmployeeState"),
				true,
				this.showSelectedOrder, {
					"i18n": this.getView().getModel("i18n")
				}
			);
		},

		showSelectedOrder: function (selectedOrderId) {
			var resourceBundle = this.getResourceBundle();
			MessageToast.show(resourceBundle.getText("youSelectedOrderId", [selectedOrderId]));
		}
	});
});





// var cardManifests = new JSONModel();
// cardManifests.loadData(sap.ui.require.toUrl("be/flexso/ehb/Northwind-Employees/userCards/manifestCards.json"));
// this.getView().setModel(cardManifests, "cardsModel");