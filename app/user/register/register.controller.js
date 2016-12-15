(function(window, angular, undefined) {

  angular.module('user.register')
    .controller('registerCtrl', ['$location', '$stateParams','$window', 'userService',
      function($location, $stateParams, $window, userService) {

        var vm = this;
        var username = $stateParams.username;

        // Register user
        vm.registerUser = function() {
          userService.create(vm.userData).then(function(response) {
            vm.userData = {};
            $location.path('/check-email');
          })
          .catch(function(error) {
            vm.error = error.data;
          })
        }

        // Verify uses's email address
        vm.verifyUser = function() {
          userService.verify(username).then(function(response) {
            $location.path('/login');
          })
          .catch(function(error) {
            vm.error = error;
          })
        }

    }])

})(window, window.angular)
