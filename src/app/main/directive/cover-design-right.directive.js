(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('coverDesignRight', coverDesignRight);

  /* @ngInject */
  function coverDesignRight() {
    var directive = {
      templateUrl:'app/main/template/cover-design-right.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


