sap.ui.define([], function () {
	"use strict";

	return {
		getFunctionIcon: function (functionCode) {
			var resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			return resourceBundle.getText(functionCode);
		}
	};
});