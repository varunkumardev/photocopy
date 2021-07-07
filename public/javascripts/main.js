var app = angular.module('myapp', [])
app.controller('myctrl', function ($scope, $http) {
    $scope.reg = {};
    $scope.log = {};
    $scope.info = {};
    $scope.userdata = [];

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

    // ===================================================================================================

    // ============================================= Login ===============================================

    $scope.login = function (val) {
        $http({
            method: 'post',
            url: '/login',
            data: val
        }).then(function (success) {
            console.log(success)
            $scope.log = {};
            window.location.href = "/dashboard"
        }, function (error) {
            alert(error)
        })
    }

    // ============================================== //login ==========================================

    // =========================================== statistics form ====================================

    $scope.stat = function (val) {
        $http({
            method: 'post',
            url: '/info',
            data: val
        }).then(function (success) {
            alert('success')
            $scope.fetch.push(val);
            $scope.info = {};
        }, function (error) {
            alert(error)
        })
    }

    // =========================================== //statistics form ====================================

    // =========================================== tablelist fetch ====================================

    $scope.getdata = function () {
        $http({
            method: 'get',
            url: '/tablelist',
        }).then(function (success) {
            console.log(success.data)
            $scope.userdata = success.data;
        }, function (error) {
            alert(error)
        })
    }

    // =========================================== //tablelist fetch ====================================

})