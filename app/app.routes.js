(function(window, angular, undefined) {

  angular.module('camoverRoutes', ['ui.router'])

    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      // ================ Interactive states =========================
      // For map
        .state('map', {
          url: '/',
          templateUrl: 'app/map/map.html',
          controller: 'mapCtrl as vm'
        })
        .state('camera', {
          url: '/camera',
          templateUrl: 'app/camera/camera.html',
          controller: 'cameraCtrl'
        })
      // For users
        .state('register', {
          url: '/register',
          templateUrl: 'app/user/register/register.html',
          controller: 'registerCtrl'
        })
        .state('checkEmail', {
          url: '/check-email',
          templateUrl: 'app/user/register/check-email.html',
          controller: 'registerCtrl'
        })
        .state('verify', {
          url: '/verify/:username',
          templateUrl: 'app/user/register/verify.html',
          controller: 'registerCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/user/auth/login.html',
          controller: 'authCtrl'
        })
        // ====================== Non-interactive states =======================
        .state('about', {
          url: '/about',
          templateUrl: 'app/views/about.html',
          controller: ''
        })
        .state('contribute', {
          url: '/contribute',
          templateUrl: 'app/views/contribute.html',
          controller: ''
        })
        .state('references', {
          url: '/references',
          templateUrl: 'app/views/references.html',
          controller: ''
        })
    }])

})(window, window.angular);
