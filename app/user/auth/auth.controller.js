(function(window, angular, undefined) {

  angular.module('user.auth')
    .controller('authCtrl', ['$rootScope', '$location', '$window', 'authService',
     function($rootScope, $location, $window, authService) {

      var vm = this;
      vm.loggedIn = authService.isLoggedIn();
      vm.error = "";

      // Make sure user is logged in
      // $rootScope.$on('$routeChangeStart', function() {
      //   vm.loggedIn = authService.isLoggedIn();
      //   authService.getUser()
      //     .then(function(data) {
      //       vm.user = data.data;
      //     });
      // });

      // Log user in
      vm.doLogin = function() {
        authService.login(vm.loginData.username, vm.loginData.password)
          .then(function(response) {
            if(response.success) {
              $location.path('/');
              $window.location.reload()
            } else {
              vm.error = response.message;
              $location.path('/login');
            }
          })
      }

      // Log user out
      vm.doLogout = function() {
        authService.logout();
        $window.location.reload();
      };

    }])

})(window, window.angular)
