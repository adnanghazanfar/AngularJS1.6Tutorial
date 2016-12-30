(function () {
	'use strict';

	var myApp = angular.module('myApp', []);


	(function () {
		'use strict';

		myApp.controller('commonController', ControllerController);

		ControllerController.inject = ['customService'];
		function ControllerController(customService) {
			var vm = this;

			vm.input = 'TestAppCode';
			vm.output = '';

			vm.process = function (input) {
				vm.output = customService.processString(input);
			}

		}

	})();


	(function () {
		'use strict';

		myApp
			.service('customService', Service);

		function Service() {
			this.processString = processString;
			function processString(input) {
				var output = '';
				for (var i = 0; i < input.length; i++) {
					if (i > 0 && input[i] == input[i].toUpperCase()) {
						output = output + ' ';
					}
					output = output + input[i];
				}
				return output;
			}
		}
	})();


})();