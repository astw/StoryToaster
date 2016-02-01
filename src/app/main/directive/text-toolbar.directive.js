(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('textToolbar', textToolbar);

  /* @ngInject */
  function textToolbar() {
    var directive = {
      link: link,
      restrict: 'A',
      templateUrl:'app/main/template/text-tool-bar.html'

    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


