(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('previewDedicatedPage', previewDedicatedPage);

  /* @ngInject */
  function previewDedicatedPage() {
    return {
      templateUrl: 'app/main/template/preview-dedicated-page.html'
    }
  }

})();
