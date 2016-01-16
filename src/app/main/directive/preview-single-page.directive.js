(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('previewSinglePage', previewSinglePage);

  /* @ngInject */
  function previewSinglePage() {
    return {
      restirct:'E',
      scope:{
        pageInfo:'=page'
      }
    }
  }　

})();


