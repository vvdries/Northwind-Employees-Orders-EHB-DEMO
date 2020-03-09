sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"be/flexso/ehb/Northwind-Employees/model/models",
	"be/flexso/ehb/Northwind-Employees/service/OrderService"
], function (UIComponent, Device, models, OrderService) {
	"use strict";

	return UIComponent.extend("be.flexso.ehb.Northwind-Employees.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			sap.ui.getCore().applyTheme("sap_fiori_3_dark");
			
			OrderService.setModel(this.getModel());
		}
	});
});