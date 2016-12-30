(function () {
	'use strict';

	var myApp = angular.module('myApp', []);


	(function () {
		'use strict';

		myApp.controller('commonController', ControllerController);

		function ControllerController() {
			var vm = this;
			init();
			function init() {
				vm.title = "Survey App";
				vm.technologies = [
					{ name: 'Java', likes: 0, dislikes: 0 },
					{ name: 'Angular', likes: 0, dislikes: 0 },
					{ name: 'C#', likes: 0, dislikes: 0 },
					{ name: 'C++', likes: 0, dislikes: 0 }
				]
			}

			vm.like= function(technology){
				technology.likes++;
			} 

			vm.dislike= function(technology){
				technology.dislikes++;
			} 

		}

	})();


})();