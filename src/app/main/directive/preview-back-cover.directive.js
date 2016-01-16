(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('previewBackCover', previewBackCover);

  /* @ngInject */
  function previewBackCover() {
    return {
      templateUrl: 'app/main/template/preview-back-cover.html'
    }
  }

})();


