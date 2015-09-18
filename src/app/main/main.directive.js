'use strict';

var app = angular.module('storyToaster');

app.directive('pageDesignSidebar', function(){
  return {
    templateUrl:'app/main/page-design-sidebar.html'
  };
});


app.directive('pageSheet', function(){
  return {
    templateUrl:'app/main/page-sheet.html'
  };
});

app.directive('previewScrollPanel',function(){
    return {
      templateUrl:'app/main/page-design-preview-scroll-panel.html'
    }
});
app.directive('previewScrollPanel2',function(){
  return {
    templateUrl:'app/main/page-design-preview-scroll-panel2.html'
  }
});
//
//
//(function() {
//  'use strict';
//  angular
//    .module('storyToaster')
//    .directive('pageDesignSidebar', pageDesignSidebar);
//
//  /** @ngInject */
//  function pageDesignSidebar() {
//    var directive = {
//      restrict: 'E',
//      templateUrl: 'app/main/page-design-sidebar.html',
//      scope: {
//        creationDate: '='
//      },
//      controller: function($scope) {
//
//
//      },
//      controllerAs: 'vm',
//      bindToController: false
//    };
//
//    return directive;
//  }
//
//})();
