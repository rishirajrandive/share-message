/**
 * Created by rishi on 5/30/17.
 */

var app = angular.module('messages', []);

// app.config(function ($routeProvider) {
//     $routeProvider
//         .when('/', {
//                 templateUrl: '/partials/home.html',
//                 controller: 'Home'
//             })
//         .when('/show', {
//                 templateUrl: '/partials/show_message.html',
//                 controller: 'ShowMessage'
//             })
//         .otherwise({
//             redirectTo: '/'
//         });
// });

var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var MOBILE_REGEX = /^\+?\d{1}\d{3}\d{3}\d{4}$/;
app.directive('contact', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.contact = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    console.log('First true');
                    return true;
                }

                if(EMAIL_REGEX.test(viewValue) || MOBILE_REGEX.test(viewValue)) {
                    console.log('Valid data');
                    return true;
                }
                console.log('Second false');
                return false;
            };
        }
    };
});

app.controller('Home', function ($scope, $http) {
    $scope.error_msg = "";
    $scope.error = false;
    $scope.details = {};

    $scope.validateAndSend = function (details) {
        $scope.details = angular.copy(details);
        console.log("Input data " + JSON.stringify($scope.details));
        var contact = $scope.details.contact;
        console.log('Email regex '+ EMAIL_REGEX.test(contact));
        console.log('Mobile regex '+ MOBILE_REGEX.test(contact));
        if(EMAIL_REGEX.test(contact)) {
            $scope.sendEmail();
        }else if(MOBILE_REGEX.test(contact)){
            $scope.sendSMS();
        }else {
            console.log('Invalid details')
        }
    };

    $scope.sendSMS = function(){
        console.log(JSON.stringify($scope.details));
        $http({
            method : "POST",
            url : '/sendsms',
            data : $scope.details,
            headers : {'Content-Type': 'application/json'}
        }).then(function successCallback(data) {
            //checking the response data for statusCode
            console.log("Status code " + data.status_code);
            console.log("Status code " + data.status_code == 200);

        }, function errorCallback(error) {
            console.log("Error "+ error);
            // $scope.error_msg = error;
            // $scope.error = true;
        });
    };

    $scope.sendEmail = function(){
        $http({
            method : "POST",
            url : '/sendemail',
            data : $scope.details,
            headers : {'Content-Type': 'application/json'}
        }).then(function successCallback(data) {
            //checking the response data for statusCode
            console.log("Status code " + data.status_code);
            console.log("Status code " + data.status_code == 200);

        }, function errorCallback(error) {
            console.log("Error "+ error);
            // $scope.error_msg = error;
            // $scope.error = true;
        });
    };

});
