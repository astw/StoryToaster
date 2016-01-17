//var app = angular.module('storyToaster');
//
//app.directive('backCoverDesignRight', function () {
//  return {
//    templateUrl: 'app/main/template/back-cover-design-right-bak.html'
//  };
//});

//
//(function () {
//  'use strict';
//
//  angular
//    .module('storyToaster')
//    .directive('backCoverDesignRight', backCoverDesignRight);
//
//  backCoverDesignRight.$inject = [];
//
//  /* @ngInject */
//  function backCoverDesignRight() {
//    var directive = {
//      bindToController: true,
//      controller: ControllerName,
//      controllerAs: 'vm',
//      templateUrl:'app/main/template/back-cover-design-right-bak.html',
//      link: link,
//      restrict: 'A',
//      scope: {}
//    };
//    return directive;
//
//    function link(scope, element, attrs) {
//
//    }
//  }
//})();


(function(){
  'use strict';
  angular
    .module('storyToaster')
    .directive('backCoverDesignRight', backCoverDesignRight);

  /* @ngInject */
  function backCoverDesignRight() {
    return {
      templateUrl: 'app/main/template/back-cover-design-right.html'
    }
  }
})();