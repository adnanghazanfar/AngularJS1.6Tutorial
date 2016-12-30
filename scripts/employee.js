(function () {
	'use strict';

	var myApp = angular.module('myApp', []);


	(function () {
		'use strict';

		myApp.controller('commonController', ControllerController);

		ControllerController.inject = ['employeeService'];
		function ControllerController(employeeService) {
			var vm = this;
			vm.searchText = '';
			vm.pageSize = 10;

			init();

			function init() {
				vm.title = "Employee App";
				employeeService.exposedFn().then(function (response) {
					vm.students = response.data.records;
				});

				vm.employees = [
					{ name: 'Majid', dob: new Date(), gender: 0, salary: 50000 },
					{ name: 'Kashif', dob: new Date(), gender: 0, salary: 100000 },
					{ name: 'Adnan', dob: new Date(), gender: 0, salary: 50000 },
					{ name: 'Asif', dob: new Date(), gender: 0, salary: 800000 },
					{ name: 'Nadeem', dob: new Date(), gender: 0, salary: 50000 },
					{ name: 'Waseem Ghazanfar', dob: new Date(), gender: 0, salary: 100000 },
					{ name: 'Reshahil', dob: new Date(), gender: 0, salary: 50000 },
					{ name: 'Awais', dob: new Date(), salary: 800000 }
				];
			}

			vm.search = function (employee) {
				if (employee.name.toLowerCase().indexOf(vm.searchText) != -1) {
					return true;
				}
				return false;
			}

		}

	})();


	(function () {
		'use strict';

		myApp.service('employeeService', Service);

		Service.init = ['$http'];;
		function Service($http) {
			this.exposedFn = exposedFn;
			function exposedFn() {

				return $http.get('http://www.w3schools.com/angular/customers.php');
			}
		}


	})();


	(function () {
		'use strict';

		myApp.filter('genderFilter', Filter);

		function Filter() {
			return FilterFilter;

			function FilterFilter(gender) {
				switch (gender) {
					case 0:
						return 'Male';
					case 1:
						return 'Female';
					default:
						return 'No Mentioned';
				}
				return gender;
			}
		}
	})();


})();