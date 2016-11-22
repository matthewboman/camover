(function(window, angular, undefined) {

  angular.module('camover', [
    // My modules
    'camoverRoutes',
    'map',
    'user'
    ])

    // Do I neet this?
    // .config(function($httpProvider) {
    //   // pushing token to HTTP request
    //   $httpProvider.interceptors.push('AuthInterceptor');
    // });

})(window, window.angular);
