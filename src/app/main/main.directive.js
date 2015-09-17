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

app.directive('previewFrontCover', function(){
  return {
    templateUrl:'app/main/preview-front-cover.html'
  };
});

app.directive('previewDedicatedPage', function(){
  return {
    templateUrl:'app/main/preview-dedicated-page.html'
  };
});

app.directive('previewBackCover', function(){
  return {
    templateUrl:'app/main/preview-back-cover.html'
  };
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
