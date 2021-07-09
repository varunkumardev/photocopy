var app = angular.module('myapp', [])
app.controller('myctrl', function ($scope, $http) {
    $scope.reg = {};
    $scope.log = {};
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
                alert('Please fill the below details correctly')
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
            alert("Invalid Details")
        })
    }

    // ============================================== //login ==========================================

    // =========================================== statistics form ====================================
    $scope.info = {};
    $scope.stat = function (val) {
        if (val.Date == null || val.Single_Side_Pages == null || val.Double_Side_Pages == null || val.Employee_Name == null || val.Employee_Id == null || val.Mobile_Number == null) {
            alert('Empty form can\'t be submitted ')
        } else {
            $http({
                method: 'post',
                url: '/inform',
                data: val
            }).then(function (success) {
                $scope.info = {};
                alert('success')
                $scope.userdata.push(val);
            }, function (error) {
                alert(error)
            })
        }
    }

    // =========================================== //statistics form ================================================================

    // =========================================== tablelist fetch ==================================================================

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

    // ================================================= //tablelist fetch ===========================================================

    // =================================================== Dashboard count ===========================================================
    $scope.aggre = [];
    $scope.count = function () {
        $http({
            method: 'get',
            url: '/countdata'
        }).then(function (success) {
            console.log(success.data)
            $scope.aggre = success.data;
        }, function (error) {
            alert(error)
        })
    }
    //=================================================== //count =============================================================-=======
})