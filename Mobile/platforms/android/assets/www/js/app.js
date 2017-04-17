// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {

//  });
//})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',

    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('app.history', {
        url: '/history',
        views: {
            'menuContent': {
                templateUrl: 'templates/history.html',
                controller: 'HistoryCtrl'
            }
        }
    })

    .state('app.vehicle_mileage', {
        url: '/vehicle_mileage',
        views: {
            'menuContent': {
                templateUrl: 'templates/vehicle-mileage.html',
                controller: 'VehicleMileageCtrl'
            }
        }
    })

    .state('app.workshop_timeslot', {
        url: '/workshop_timeslot',
        views: {
            'menuContent': {
                templateUrl: 'templates/workshop-timeslot.html',
                controller: 'WorkshopTimeslotCtrl'
            }
        }
    })

    .state('app.service_package', {
        url: '/service_package',
        views: {
            'menuContent': {
                templateUrl: 'templates/service-package.html',
                controller: 'ServicePackageCtrl'
            }
        }
    })

    .state('app.confirmation', {
        url: '/confirmation',
        views: {
            'menuContent': {
                templateUrl: 'templates/confirmation.html',
                controller: 'ConfirmationCtrl'
            }
        }
    })
   
  $urlRouterProvider.otherwise('/login');
});

var app = {
    initialize: function () {
        this.version = "1.0.0";
        this.db = null;
        this.username = localStorage.username;
        this.bindEvents();
        this.profile = this.getProfile();
        this.stateList = ["Kuala Lumpur", "Labuan", "Putrajaya", "Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Perak", "Perak", "Penang", "Sabah", "Sarawak", "Selangor", "Terengganu"];
        this.timeslot = [
            "07:00am", "07:15am", "07:30am", "07:45am", "08:00am", "08:15am", "08:30am", "08:45am",
            "09:00am", "09:15am", "09:30am", "09:45am", "10:00am", "10:15am", "10:30am", "10:45am",
            "11:00am", "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm",
            "01:00pm", "01:15pm", "01:30pm", "01:45pm", "02:00pm", "02:15pm", "02:30pm", "02:45pm",
            "03:00pm", "03:15pm", "03:30pm", "03:45pm", "04:00pm", "04:15pm", "04:30pm", "04:45pm",
            "05:00pm", "05:15pm", "05:30pm", "05:45pm", "06:00pm", "06:15pm", "06:30pm", "06:45pm",
        ];
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['starter']);
        });
    },

    isLogin: function () {
        return localStorage.isLogin === 'true';
    },

    setLogon: function (username, password) {
        if (username === "kk" && password === "abc123") {
            localStorage.isLogin = true;
            localStorage.username = username;

            this.username = localStorage.username;

            this.profile = this.getProfile();

            return true;
        }
        else {
            return false;
        }
    },

    logout: function () {
        localStorage.isLogin = false;
        localStorage.username = '';
    },

    setStorageObj: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getStorageObj: function (key) {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    },

    getProfile: function () {
        var profile = this.getStorageObj("profile");
        if (profile === undefined || profile === null) {
            profile = {
                name: "Stephen Chow",
                email: "stephenchow@hotmail.com",
                address: "",
                phone: ""
            };

            this.setProfile(profile);
        }

        return profile;
    },

    setProfile: function (profile) {
        this.setStorageObj("profile", profile);
    },

    getVehicleInfos: function () {
        var vehicleInfos = this.getStorageObj("vehicleInfos");
        if (vehicleInfos === undefined || vehicleInfos === null) {
            var defaultInfos =
                [{
                    id: 1,
                    vehicleNo: "W1111A",
                    model: "ALMERA 1.5V AT",
                    lastServiceKM: 1030
                },
                {
                    id: 2,
                    vehicleNo: "WAA1001",
                    model: "HONDA CITY 1.5V",
                    lastServiceKM: 1500
                }];

            this.setVehicleInfos(defaultInfos);
            vehicleInfos = defaultInfos;
        }

        return vehicleInfos;
    },

    setVehicleInfos: function (vehicleInfos) {
        this.setStorageObj("vehicleInfos", vehicleInfos);
    },

    getWorkshops: function () {
        var workshops = this.getStorageObj("workshops");
        if (workshops === undefined || workshops === null) {
            workshops =
                [{
                    id: 1,
                    state: "Kuala Lumpur",
                    name: "Citicars PLT",
                    telephone: "+603-7971 5610",
                    address: "C-13A-22, Block C, Level 13A, Unit 22 Scott Garden Soho Old Klang Road, 58200",
                    booking: [
                        { date: "20170430", timeslot: ["09:00am", "02:00pm"] },
                        { date: "20170502", timeslot: ["10:00am", "03:00pm"] },
                    ]
                },
                {
                    id: 2,
                    state: "Selangor",
                    name: "Sum Motor Sdn Bhd",
                    telephone: "+603-7782 2619",
                    address: "Petaling Utama PJS 1,	13a, Jalan PJS 1/21a, Petaling Utama, 46150 Off Old Klang Road",
                    booking: [
                        { date: "20170429", timeslot: ["09:00am", "01:00pm"] },
                        { date: "20170503", timeslot: ["11:00am", "11:30am"] },
                    ]
                },
                {
                    id: 3,
                    state: "Kuala Lumpur",
                    name: "KUM ONN WORKSHOP SDN BHD",
                    telephone: "+603-9173 8888",
                    address: "No. 43, Jalan 6/118C, Desa Tun Razak, Cheras, 56000",
                    booking: [
                        { date: "20170427", timeslot: ["12:00pm", "04:00pm"] },
                        { date: "20170510", timeslot: ["11:15am", "03:15pm"] },
                    ]
                }];

            this.setWorkshops(workshops);
        }

        return workshops;
    },

    setWorkshops: function (workshops) {
        this.setStorageObj("workshops", workshops);
    },
};

app.initialize();
