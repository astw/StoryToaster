(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('previewFrontCover', previewFrontCover);

  /* @ngInject */
  function previewFrontCover() {
    return {
      templateUrl: 'app/main/template/preview-front-cover.html'
    }
  }

})();

