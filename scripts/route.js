(function () {
    'use strict';

    var routeApp = angular.module('routeApp', ['ngRoute'
        ]);


    routeApp.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "template/home.html",
            controller: "homeController"
        }).when("/employee", {
            templateUrl: "template/employee.html",
            controller: "employeeController"
        }).when("/student", {
            templateUrl: "template/student.html",
            controller: "studentController"
        }).otherwise({
            template: "Don't have any routes associated with this"
        });
    }]);

    (function() {
        'use strict';

        routeApp
        .controller('homeController', ControllerController);

        function ControllerController() {
            var vm = this;
            vm.message = 'Route Application';
        }

    })();


    (function() {
        'use strict';

        routeApp
        .controller('employeeController', ControllerController);

        function ControllerController() {
            var vm = this;
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
    })();

    (function() {
        'use strict';

        routeApp
        .controller('studentController', ControllerController);

        ControllerController.inject = ['studentService'];

        function ControllerController(studentService) {
            var vm = this;
            studentService.exposedFn().then(function (response) {
                vm.students = response.data.records;
            });

        }
    })();

    (function () {
        'use strict';

        routeApp.service('studentService', Service);

        Service.init = ['$http'];;
        function Service($http) {
            this.exposedFn = exposedFn;
            function exposedFn() {
                return $http.get('http://www.w3schools.com/angular/customers.php');
            }
        }


    })();



})();