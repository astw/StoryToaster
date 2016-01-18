(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MaterialController', MaterialController);

  /* @ngInject */
  function MaterialController($scope) {
    var vm = this;
    vm.title = 'material';
    vm.addImage = addImage;

    activate();

    ////////////////

    function activate() {
    }

    function addImage(imageUrl, operation) {

      var args = {
        operation: operation,
        imageUrl: imageUrl
      };
      $scope.$emit('addImage', args);
    }
  }

})();

