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

.controller('WorkshopTimeslotCtrl', function ($scope, $state, $ionicHistory, $filter) {
    var workshops = app.getWorkshops();
    var stateList = app.stateList;

    $scope.vm = {
        workshops: workshops,
        stateList: stateList,
        state: stateList[0],
        workshop: null,
        bookDate: null,
        timeslot: "",
        timeslotList: [],
        selectedDate: ""
    };

    $scope.onChangeWorkshop = function () {
        $scope.vm.bookDate = null;
        $scope.vm.timeslot = "";
        $scope.vm.selectedDate = "";
    }

    $scope.selectDate = function () {
        var today = new Date();
        var minDate = today.setDate(today.getDate() + 1);

        var options = {
            date: new Date(),
            mode: 'date',
            androidTheme: 4,
            minDate: (new Date(minDate)).valueOf()
        };

        function onSuccess(date) {
            $scope.vm.bookDate = date;

            var selectedDate = moment(date).format('YYYYMMDD');
            //var selectedDate = "20170427";
            var selectedWorkshop = $scope.vm.workshop;
            var timeslotList = app.timeslot;
            var workShopBookingList = $filter('filter')(selectedWorkshop.booking, { date: selectedDate }, true);

            if (workShopBookingList.length > 0) {
                var workshopBooking = workShopBookingList[0];
                var filteredTimeslotList = timeslotList.filter(function (item) {
                    return workshopBooking.timeslot.indexOf(item) === -1;
                });

                $scope.vm.timeslotList = filteredTimeslotList;
            }
            else {
                $scope.vm.timeslotList = timeslotList;
            }

            $scope.vm.selectedDate = selectedDate;

            $scope.$digest();
        }

        datePicker.show(options, onSuccess);
    };

    $scope.Next = function () {
        var vm = $scope.vm;
        $state.go("app.service_package");
    }

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
