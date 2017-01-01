(function () {
    'use strict';

    var routeApp = angular.module('routeApp', ['ui.router'
        ]);

    routeApp.inject =['ui.router'];

    routeApp.config(["$stateProvider","$urlRouterProvider","$urlMatcherFactoryProvider", function ($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider) {

        $urlRouterProvider.otherwise('/home');
        $urlMatcherFactoryProvider.caseInsensitive(true);

        $stateProvider.state("home", {
            url:"/home",
            templateUrl: "template/homeState.html",
            controller: "homeController",
            controllerAs: 'vm',
            data: {
                variable1 : 'Home 1',
                variable2 : 'Home 2'
            }
        }).state("employees", {
            url:"/employees",
            templateUrl: "template/employee.html",
            controller: "employeeController",
            controllerAs: 'vm'
        }).state("students", {
            url:"/students",
            templateUrl: "template/studentState.html",
            controller: "studentController",
            controllerAs: 'vm',
            data: {
                variable1 : 'Student 1',
                variable2 : 'Student 2'
            }
        }).state("studentDetail", {
            url:"/students/:id",
            templateUrl: "template/studentDetail.html",
            controller: "studentDetailController",
            controllerAs: 'vm'
        });


    }]);

    (function() {
        'use strict';

        routeApp
        .controller('homeController', ControllerController);

        ControllerController.inject =['$rootScope','$state'];
        function ControllerController($rootScope,$state) {
            var vm = this;
            vm.message = 'Route Application';
            $rootScope.message = 'Root scope properties'
            vm.homeVariable1 = $state.current.data.variable1;
            vm.homeVariable2 = $state.current.data.variable2;
            vm.studentVariable1 = $state.get("students").data.variable1;
            vm.studentVariable2 = $state.get("students").data.variable2;

            $state.current.data.variable1 = 'changed';

            // $state.go("studentDetail",{id:1});

            $rootScope.$on('$routeChangeStart',function(event,next,current){
                if(!confirm('Do you want to navigate')){
                    event.preventDefault();
                }
            });


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

        ControllerController.inject = ['$state','studentService'];

        function ControllerController($state, studentService) {
            var vm = this;

            vm.studentVariable1 = $state.current.data.variable1;
            vm.studentVariable2 = $state.current.data.variable2;
            vm.homeVariable1 = $state.get("home").data.variable1;
            vm.homeVariable2 = $state.get("home").data.variable2;


            
            studentService.getAllStudents().then(function (response) {
                vm.students = response.data.records;
            });

        }
    })();



    (function() {
        'use strict';

        routeApp
        .controller('studentDetailController', ControllerController);

        ControllerController.inject = ['studentService'];

        function ControllerController(studentService) {
            var vm = this;
            studentService.getStudentById().then(function (response) {
                vm.student = response.data;
            }, function(reason){
                vm.error = 'Unable to get details please contact system admin.'
            });

        }
    })();


    (function () {
        'use strict';

        routeApp.service('studentService', Service);

        Service.init = ['$http'];;
        function Service($http, $stateParams) {

            this.getAllStudents = getAllStudents;
            this.getStudentById = getStudentById;

            function getStudentById() {
                return $http.get('/AngularJS-1.6/data/json/customers/'+$stateParams.id+'.json');
            }

            function getAllStudents() {
                return $http.get('/AngularJS-1.6/data/json/customers.json');
            }


        }
    })();    


})();