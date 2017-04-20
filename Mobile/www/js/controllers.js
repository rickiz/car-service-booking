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
    $scope.Next = function () {
        app.setStep1VM(null);
        app.setStep2VM(null);
        app.setStep3VM(null);

        $state.go("app.vehicle_mileage");
    }
})

.controller('VehicleMileageCtrl', function ($scope, $state, $ionicHistory) {
    var vm = app.getStep1VM();

    if (vm === undefined || vm === null) {
        var vehicleInfos = app.getVehicleInfos();

        $scope.vm = {
            name: app.profile.name,
            vehicleInfos: vehicleInfos,
            model: vehicleInfos[0],
            mileage: ""
        };
    }
    else {
        $scope.vm = vm;
    }    

    $scope.Next = function () {
        app.setStep1VM($scope.vm);

        $state.go("app.workshop_timeslot");
    }

    $scope.topBackBtn = function () {
        $state.go('app.home');
    }
})

.controller('WorkshopTimeslotCtrl', function ($scope, $state, $ionicHistory, $filter) {
    var workshops = app.getWorkshops();
    var stateList = app.stateList;
    var vm = app.getStep2VM();

    if (vm === undefined || vm === null) {
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
    }
    else {
        $scope.vm = vm;

        var selectedDate = moment(vm.selectedDate, "YYYYMMDD").toDate();

        $scope.vm.bookDate = selectedDate;
    }    

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
        app.setStep2VM($scope.vm);
        $state.go("app.service_package");
    }

    $scope.topBackBtn = function () {
        $state.go("app.vehicle_mileage");
    }
})

.controller('ServicePackageCtrl', function ($scope, $state, $ionicHistory) {    
    var vm = app.getStep3VM();

    if (vm === undefined || vm === null) {
        var packages = app.servicePackages;

        $scope.vm = {
            servicePackages: packages,
            selectedService: packages[0]
        };
    }
    else {
        $scope.vm = vm;
    }    

    $scope.Next = function () {
        app.setStep3VM($scope.vm);
        $state.go("app.confirmation");
    }

    $scope.topBackBtn = function () {
        $state.go("app.workshop_timeslot");
    }
})

.controller('ConfirmationCtrl', function ($scope, $state, $ionicHistory) {
    var vm1 = app.getStep1VM();
    var vm2 = app.getStep2VM();
    var selectedDate = moment(vm2.selectedDate, "YYYYMMDD").format("MM/DD/YYYY");

    $scope.vm = {
        vehicleNo: vm1.model.vehicleNo,
        workshop: vm2.workshop.name,
        date: selectedDate,
        time: vm2.timeslot
    };

    $scope.Confirm = function () {
        var vm = $scope.vm;

        $state.go("app.home");
    }

    $scope.topBackBtn = function () {
        $state.go("app.service_package");
    }
})
