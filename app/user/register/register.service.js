(function(window, angular, undefined) {

  angular.module('user.register')
    .factory('userService', ['$http', '$q', function($http, $q) {

      var userService = {};

      userService.create = create;
      userService.verify = verify;

      return userService;

      // Create new user
      function create(userData) {
        return $http.post('/users/register', userData)
          .then(handleSuccess, handleError);
      }

      // Verify user
      function verify(username) {
        return $http.put('/users/' + username, {username: username})
          .then(handleSuccess, handleError);
      }


      // ============== Private inner functions ==========================
      var handleSuccess = function(res) {
        return res.data;
      }

      var handleError = function(res) {
        return $q.reject(res.data);
      }

    }])

})(window, window.angular)
