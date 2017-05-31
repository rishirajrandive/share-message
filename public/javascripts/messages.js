/**
 * Created by rishi on 5/30/17.
 */

var app = angular.module('messages', ['ngRoute']);
/* Regex to check for valid Email and Mobile number */
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var MOBILE_REGEX = /^\+?\d{1}\d{3}\d{3}\d{4}$/;

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
                templateUrl: '/partials/home.html',
                controller: 'Home'
            })
        .when('/show/:id', {
                templateUrl: '/partials/show_message.html',
                controller: 'ShowMessage'
            })
        .otherwise({
            redirectTo: '/'
        });
});



app.controller('Home', function ($scope, $http) {
    $scope.success = false;
    $scope.success_msg = "";
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
        }).then(function successCallback(success) {
            //checking the response data for statusCode
            console.log("Status code " + success.data.status_code);
            if(success.data.status_code == 200){
                $scope.success = true;
                $scope.success_msg = success.data.response;
            }else {
                $scope.error_msg = success.data.response;
                $scope.error = true;
            }
        }, function errorCallback(error) {
            console.log("Error "+ JSON.stringify(error));
            $scope.error_msg = error.data.response;
            $scope.error = true;
        });
    };

    $scope.sendEmail = function(){
        $http({
            method : "POST",
            url : '/sendemail',
            data : $scope.details,
            headers : {'Content-Type': 'application/json'}
        }).then(function successCallback(success) {
            //checking the response data for statusCode
            console.log("Status code " + success.data.status_code);
            if(success.data.status_code == 200){
                $scope.success = true;
                $scope.success_msg = success.data.response;
            }else {
                $scope.error_msg = success.data.response;
                $scope.error = true;
            }
        }, function errorCallback(error) {
            console.log("Error "+ JSON.stringify(error));
            $scope.error_msg = error.data.response;
            $scope.error = true;
        });
    };

});

app.controller('ShowMessage', function ($scope, $http, $routeParams) {
    console.log('Controller started');
    $scope.error = false;
    $scope.message = '';
    console.log("Value "+ $routeParams.id);

    $http({
        method : "GET",
        url : '/getmsg',
        params: {
            "id": $routeParams.id
        },
        headers : {'Content-Type': 'application/json'}
    }).then(function successCallback(success) {
        //checking the response data for statusCode
        console.log("Status code " + success.data.status_code);
        if(success.data.status_code == 200){
            $scope.message = success.data.response;
        }else {
            $scope.error_msg = success.data.response;
            $scope.error = true;
        }
    }, function errorCallback(error) {
        console.log("Error "+ JSON.stringify(error));
        $scope.error_msg = error.data.response;
        $scope.error = true;
    });

});