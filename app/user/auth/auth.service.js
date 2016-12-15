(function(window, angular, undefined) {

  angular.module('user.auth')

//======= ================== Handle login ===========================
    .factory('authService', ['$http', '$q', 'authToken',
      function($http, $q, authToken) { // authInterceptor

      var authService = {};

      authService.getUser = getUser;
      authService.login = login;
      authService.logout = logout;
      authService.isLoggedIn = isLoggedIn;

      return authService;

      // Get token, etc.
      function getUser() {
        if(authToken.getToken()) {
          return res.data;
        } else {
          return $q.reject({message: "User has no token"});
        }
      }

      // Log user in
      function login(username, password) {
        return $http.post('/users/login', {
          username: username,
          password: password
        })
        .then(function(res) {
          authToken.setToken(res.data.token);
          authToken.setUser(username);
          return res.data;
        })
        .catch(function(err) {
          return err;
        })
      }

      // Log user out
      function logout() {
        authToken.setToken();
        authToken.setUser();
      }

      // Check if user is logged in and has token
      function isLoggedIn() {
        if (authToken.getToken()) {
          return true;
        } else {
          return false;
        }
      }

    }])

// =================== Handle authentication ===========================

    // Get token from browser
    .factory('authToken', ['$window', function($window) {

      var authToken = {}

      authToken.getToken = getToken;
      authToken.setToken = setToken;
      authToken.setUser = setUser;

      return authToken;

      // Get token from local storage
      function getToken() {
        return $window.localStorage.getItem('token');
      }

      // Save token to local storage
      function setToken(token) {
        if(token) {
          $window.localStorage.setItem('token', token);
        } else {
          $window.localStorage.removeItem('token');
        }
      }

      // Set username to local storage
      function setUser(username) {
        if(username) {
          $window.localStorage.setItem('username', username);
        } else {
          $window.localStorage.removeItem('username');
        }
      }

    }])


    // ================== Put token in header ==========================
    // .factory('authInterceptor', ['$q', '$location', 'authToken',
    //   function($q, $location, authToken) {
    //
    //     var authInterceptor = {};
    //
    //     authInterceptor.request;
    //     authInterceptor.responseError;
    //
    //     return authInterceptor;
    //
    //     // Put token in header
    //     function request(config) {
    //       var token = AuthToken.getToken();
    //       if(token) {
    //         config.headers['x-access-token'] = token;
    //       }
    //       return config;
    //     }
    //
    //     // Redirect to login
    //     function responseError(response) {
    //       if(response.status == 403) {
    //         $location.path('/login');
    //       }
    //       return $q.reject(response);
    //     }
    // }])

    // ============== Private inner functions ==========================
    var handleSuccess = function(res) {
      authToken.setToken(res.data.token);
      authToken.setUser(username);
      return res.data;
    }

    var handleError = function(res) {
      return $q.reject(res.data);
    }

})(window, window.angular)
