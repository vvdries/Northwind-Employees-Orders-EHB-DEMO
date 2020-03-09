sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/BusyDialog"
], function(Object, BusyDialog) {
	"use strict";

	var Service = Object.extend("be.flexso.ehb.Northwind-Employees.service.CoreService", {
		myBusyDialog: new BusyDialog({
			showCancelButton: false
		}).addStyleClass("busy_indicator"),
		constructor: function() {

		},
		odata: function(model, url, type, data, params, filters, method) {
			var me = this;
			var promise = new Promise(function(resolve, reject) {
				var args = [];
				if (params) {
					var parameters = {};
					for (var p in params) {
						parameters[p] = params[p];
					}
				}
				args.push(url);
				var successFn = function(result, response) {
					resolve({
						data: result,
						response: response
					});
				};
				var errorFn = function(error) {
					reject(error);
				};
				if (data) {
					args.push(data);
				}
				var additionalParams = {
					urlParameters: parameters,
					success: successFn,
					error: errorFn
				};
				
				if (filters) {
					additionalParams.filters = filters;
				}
				if (method) {
					additionalParams.method = method;
				}
				args.push(additionalParams);
				me.model[type].apply(me.model, args);
			});
			return promise;
		},
		http: function (url) {
			var core = {
				ajax: function (method, url, headers, args, mimetype) {
					var promise = new Promise(function (resolve, reject) {
						var client = new XMLHttpRequest();
						var uri = url;
						if (args && method === 'GET') {
							uri += '?';
							var argcount = 0;
							for (var key in args) {
								if (args.hasOwnProperty(key)) {
									if (argcount++) {
										uri += '&';
									}
									uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
								}
							}
						}
						if (args && (method === 'POST' || method === 'PUT')) {
							var data = {};
							for (var keyp in args) {
								if (args.hasOwnProperty(keyp)) {
									data[keyp] = args[keyp];
								}
							}
						}
						client.open(method, uri);
						if (method === 'POST' || method === 'PUT') {
							client.setRequestHeader("accept", "application/json");
							client.setRequestHeader("content-type", "application/json");
						}
						for (var keyh in headers) {
							if (headers.hasOwnProperty(keyh)) {
								client.setRequestHeader(keyh, headers[keyh]);
							}
						}
						if (data) {
							client.send(JSON.stringify(data));
						} else {
							client.send();
						}
						client.onload = function () {
							if (this.status == 200 || this.status == 201) {
								resolve(this.response);
							} else {
								reject(this.statusText);
							}
						};
						client.onerror = function () {
							reject(this.statusText);
						};
					});
					return promise;
				}
			};

			return {
				'get': function (headers, args) {
					return core.ajax('GET', url, headers, args);
				},
				'post': function (headers, args) {
					return core.ajax('POST', url, headers, args);
				},
				'put': function (headers, args) {
					return core.ajax('PUT', url, headers, args);
				},
				'delete': function (headers, args) {
					return core.ajax('DELETE', url, headers, args);
				}
			};
		}
	});
	return Service;
});