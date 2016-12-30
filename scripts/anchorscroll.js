(function () {
	'use strict';

	var myApp = angular.module('myApp', []);


	(function () {
		'use strict';

		myApp.controller('commonController', ControllerController);

		ControllerController.inject = ['$location','$anchorscroll'];
		function ControllerController($location,$anchorScroll) {
			var vm = this;
			vm.scrollTo = function (scrollLocation) {
				$location.hash(scrollLocation);
				$anchorScroll.yOffset = 50;
				$anchorScroll();
			}

		}

	})();

})();