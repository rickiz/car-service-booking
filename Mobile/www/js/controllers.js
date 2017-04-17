angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicLoading) {
    var logon = app.isLogin();
    if (logon) {
        $state.go('app.home');
    }

    $scope.vm = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        var logon = app.setLogon(this.vm.username, this.vm.password);
        if (logon){
            $state.go('app.home');
        }
        else {
            Failed("Login Failed", "Invalid Username and Password");
        }
    };

    function Failed(title, message) {
        $ionicPopup.alert({
            title: title,
            template: "<center>" + message + "</center>"
        });
    }
})

.controller('MenuCtrl', function ($scope, $state) {
    $scope.logout = function () {
        app.logout();
        $state.go('login');
    }

    $scope.goto = function (state) {
        $state.go(state);
    };
})

.controller('ProfileCtrl', function ($scope, $state) {
    $scope.vm = app.profile;

    $scope.Save = function () {
        var profile = $scope.vm;
        app.setProfile(profile);

        $state.go("app.home");
    }
})

.controller('HistoryCtrl', function ($scope, $state) {

})

.controller('HomeCtrl', function ($scope, $state, $ionicHistory) {

})

.controller('VehicleMileageCtrl', function ($scope, $state, $ionicHistory) {
    var vehicleInfos = app.getVehicleInfos();

    $scope.vm = {
        name: app.profile.name,
        vehicleInfos: vehicleInfos,
        model: vehicleInfos[0],
        mileage: ""
    };

    $scope.Next = function () {
        var vm = $scope.vm;
        $state.go("app.workshop_timeslot");
    }

    $scope.topBackBtn = function () {
        $state.go('app.home');
    }
})

.controller('WorkshopTimeslotCtrl', function ($scope, $state, $ionicHistory) {
    var workshops = app.getWorkshops();
    var stateList = app.stateList;

    $scope.vm = {
        workshops: workshops,
        stateList: stateList,
        state: stateList[0],
        workshop: null
    };

    $scope.topBackBtn = function () {
        $state.go("app.vehicle_mileage");
    }
})

.controller('ServicePackageCtrl', function ($scope, $state, $ionicHistory) {
    $scope.topBackBtn = function () {
        
    }
})

.controller('ConfirmationCtrl', function ($scope, $state, $ionicHistory) {
    $scope.topBackBtn = function () {
        
    }
})
