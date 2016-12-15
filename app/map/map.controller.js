(function(window, angular, undefined) {
  angular.module('map')
  .controller('mapCtrl', ['NgMap', 'cameraService', '$window', '$uibModal',
    function(NgMap, cameraService, $window, $uibModal) {

    var vm = this;
    var username = localStorage.getItem('username');

    // ==================== Map =====================================
    // Display map
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    // Populate map with cameras
    cameraService.getCameras().then(function(data) {
      vm.cameras = data;
    });


    // ===================== User interaction ===============================
    // Display info window for camera
    vm.showDetail = function(e, camera) {
      vm.camera = camera;
      vm.map.showInfoWindow('camera', camera._id);
    };

    // Display info window for user click
    vm.placeCamera = function(e) {
      // var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
      vm.map.showInfoWindow('newCamera', e.latLng);
      vm.lat = e.latLng.lat();
      vm.lng = e.latLng.lng();
    }

    // Allow user to add camera to map
    vm.createNewCamera = function() {
      var info = "none";
      if (vm.formData.info) {
        info = vm.formData.info
      };
      var cameraData = {
        username: username,
        position: [vm.lat.toFixed(4), vm.lng.toFixed(4)],
        info: info,
        voted: [username]
      };
      if (!username) {
        $uibModal.open({
          templateUrl: './app/views/popup.html',
        });
      } else {
        cameraService.postCamera(cameraData)
          .then(function(data) {
            // repopulate map
            cameraService.getCameras().then(function(data) {
              vm.cameras = data;
            });
          })
          .catch(function(data) {
            console.error('error: ' + data);
          });
      }
      vm.lat, vm.lng = 0;
      vm.formData.info = "";
    }

    // Vote on camera
    vm.voteUp = function(e, camera) {
      if (contains(vm.camera.voted, username)) {
        // $window.alert('You\'ve already voted');
      } else if (!username){
        // $window.alert('You must be logged in to vote');
      } else {
        vm.camera.rating += 1;
        vm.camera.voted.push(username);
        cameraService.vote(vm.camera).then(function(data) {
          console.log(data);
        });
      }
    }

    vm.voteDown = function() {
      if (contains(vm.camera.voted, username)) {
        // $window.alert('You\'ve already voted');
      } else if (!username){
        // $window.alert('You must be logged in to vote');
      } else {
        vm.camera.rating -= 1;
        vm.camera.voted.push(username);
        cameraService.vote(vm.camera).then(function(data) {
          console.log(data);
        });
      }
    }


    // =============== Private functions ====================
    function contains(list, obj) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }
      return false;
    }

  }])
})(window, window.angular);
