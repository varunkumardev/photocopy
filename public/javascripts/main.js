var app = angular.module('myapp', [])
app.controller('myctrl', function ($scope, $http) {
    $scope.reg = {};
    $scope.log = {};
    // var regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/

    // ==================================================registration=================================================================== 

    $scope.register = function (val) {
        if (val.Username == null || val.Email == null || val.Password == null || val.Confirm_Password == null) {
            alert('Please Fill The Below Details')
        } else if (val.Password != val.Confirm_Password) {
            alert('Password and Confirm Password Not Matched');
        } else {
            console.log(val);
            $http({
                method: 'post',
                url: '/register',
                data: val
            }).then(function (success) {
                console.log(success)
                $scope.reg = {};
            }, function (error) {
                alert('Email Already Exist Please Enter another Email')
            })
        }
    }

    // =================================================================================================================================
    // =======================================================Login=====================================================================

    $scope.login = function (val) {
        $http({
            method: 'post',
            url: '/login',
            data: val
        }).then(function (success) {
            console.log(success)
            $scope.log = {};
            window.location.href = "/index"
        }, function (error) {
            alert(error)
        })
    }
    // =================================================================================================================================
})