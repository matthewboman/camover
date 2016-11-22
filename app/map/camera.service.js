(function(window, angular, undefined) {
    angular.module('map')
    .factory('cameraService', ['$http', function($http) {

      cameraService = {};

      cameraService.getCameras = getCameras;
      cameraService.postCamera = postCamera;
      cameraService.vote = vote;

      return cameraService;

      // GET cameras from database
      function getCameras() {
        return $http.get('/cameras')
          .then(handleSuccess, handleError('Could not find cameras'));
      };

      // POST new camera to database
      function postCamera(cameraData) {
        return $http.post('/cameras', cameraData)
          .then(handleSuccess, handleError('Could not post camera'));
      }

      // Rank camera
      function vote(camera) {
        return $http.put('/cameras/' + camera._id, camera)
          .then(handleSuccess, handleError('Your vote was not counted'));
      }


      // ==================== private functions ==============================

      function handleSuccess(res) {
        return res.data;
      }

      function handleError(error) {
        return function () {
          return { success: false, message: error };
        };
      }

    }]);
})(window, window.angular);
