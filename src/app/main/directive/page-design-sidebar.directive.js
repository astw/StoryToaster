(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('pageDesignSidebar', pageDesignSidebar);


  /* @ngInject */
  function pageDesignSidebar() {
    var directive = {
      templateUrl: 'app/main/template/page-design-sidebar.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


