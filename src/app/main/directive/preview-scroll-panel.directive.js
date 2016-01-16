(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('previewScrollPanel', previewScrollPanel);

  /* @ngInject */
  function previewScrollPanel() {
    var directive = {
      templateUrl: 'app/main/template/page-design-preview-scroll-panel.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }　

})();


