'use strict';

var app = angular.module('storyToaster');

app.directive('pageDesignSidebar', function () {
  return {
    templateUrl: 'app/main/template/page-design-sidebar.html'
  };
});

app.directive('pageSheet', function () {
  return {
    templateUrl: 'app/main/template/page-sheet.html'
  };
});

app.directive('previewScrollPanel', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel.html'
  }
});
app.directive('previewScrollPanel2', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel2.html'
  }
});
app.directive('previewFrontCover', function () {
  return {
    templateUrl: 'app/main/template/preview-front-cover.html'
  };
});

app.directive('previewDedicatedPage', function () {
  return {
    templateUrl: 'app/main/template/preview-dedicated-page.html'
  };
});

app.directive('previewBackCover', function () {
  return {
    templateUrl: 'app/main/template/preview-back-cover.html'
  }
});

app.directive('previewSinglePage',function(){
  return {
   restirct:'E',
    scope:{
      pageInfo:'=page'
    }
  }
});


app.directive('leftSidebarImage',function(){
  return {
    restirct:'E',

    scope:{
      group: '='
    },
    templateUrl:'app/components/sidebar/imageSections.html'
  }
});

app.directive('navBar', function () {
  return {
    templateUrl: 'app/components/navbar/navbar.html'

  }
});

app.directive('navBar2', function ($timeout) {

  $timeout(function(){

  });

    return {
    templateUrl: 'app/components/navbar/navbar-2.html'
  }
});


app.directive('loggedUserPanel', function ($timeout) {

  return {
    templateUrl: 'app/components/navbar/loggedUserPanel.html',
    link : function(scope, element, attrs) {
      if (attrs) { scope.$eval(attrs.afterRender) }
       scope.$emit('onAfterRender');

      var menu = $('#topbar-dropmenu');
      var items = menu.find('.metro-tile');
      var metroBG = $('.metro-modal');

      // Toggle menu and active class on icon click
      $('.topbar-menu-toggle').on('click', function () {
        // If dropmenu is using alternate style we don't show modal
        if (menu.hasClass('alt')) {
          // Toggle menu and active class on icon click
          menu.slideToggle(230).toggleClass('topbar-menu-open');
          metroBG.fadeIn();
        }
        else
        {
          menu.slideToggle(230).toggleClass('topbar-menu-open');
         $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

          // Create Modal for hover effect
          if (!metroBG.length) {
            metroBG = $('<div class="metro-modal"></div>').appendTo('body');
          }
          setTimeout(function () {
            metroBG.fadeIn();
          }, 380);
        }
      })
    }
  }
});

app.directive('navBar3', function () {
  return {
    templateUrl: 'app/components/navbar/navbar-3.html'
  }
});

app.directive('sideBarLeft', function () {
  return {
    templateUrl: 'app/components/sidebar/leftSidebar.html'
  }
});

app.directive('pageDesign',function($window){
  var w = ($(window).width() - 250 - 30) / 2 - 20;
  var h = w / 1.375;

  var leftCanvas = '<div class="page-design-panel" resize> ' +
    ' <div class="page-big" ng-class="{active:main.PhotoBook.leftDesignPage.active}"> ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous" ng-click="main.selectLeft()" id="left_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas> ';

  var canvasTemplate = leftCanvas;

  var rightCanvs = ' </div> ' +
    ' <div class="page-big" ng-class="{active:main.PhotoBook.rightDesignPage.active}"> ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous"  ng-click="main.selectRight()" id="right_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas> ' +
    '</div>  </div>';

  canvasTemplate += rightCanvs;

  return {
    template: canvasTemplate,
    link : function(scope, elem, attrs) {
      scope.onResize = function() {
        var w = ($(window).width() - 250 - 30) / 2 - 20;
        h = w / 1.375;
        //$(elem).width(w);
        $('.page-big').width(w);
        $('.page-big').height(h);
      };
      scope.onResize();

      angular.element($window).bind('resize', function() {
        scope.onResize();
      })
    }
  }
})

app.directive('doubleDesignPage',function($window){
  var w = ($(window).width() - 250 - 30) / 2 - 20;
  var h = w / 1.375;

  var leftCanvas = '<div class="page-design-panel" resize> ' +
    ' <div class="page-big" ng-click="main.selectLeft()" ng-class="{active:main.PhotoBook.leftDesignPage.active}"> ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous" id="left_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas> ';

  var canvasTemplate = leftCanvas;

  var rightCanvs = ' </div> ' +
      ' <div class="page-big" ng-click="main.selectRight()" ng-class="{active:main.PhotoBook.rightDesignPage.active}"> ' +
      ' <canvas class="page-canvas" crossOrigin="Anonymous"   id="right_canvas" width="'+ w  + 'px" ' +
      ' height="'+ h +'px"></canvas> ' +
      '</div>  </div>';

    canvasTemplate += rightCanvs;

    return {
    template: canvasTemplate,
     link : function(scope, elem, attrs) {
      scope.onResize = function() {
        var w = ($(window).width() - 250 - 30) / 2 - 20;
        h = w / 1.375;
        //$(elem).width(w);
        $('.page-big').width(w);
        $('.page-big').height(h);    

        scope.main.left_canvas = new fabric.Canvas('left_canvas');
        scope.main.right_canvas = new fabric.Canvas('right_canvas');
        scope.main.currentCanvas = scope.main.left_canvas;

      };
      scope.onResize();

      angular.element($window).bind('resize', function() {
        scope.onResize();
      })
    }
  }
});

app.directive('leftDesignPage',function($window){
  var w = ($(window).width() - 250 - 30) / 2 - 20;
  var h = w / 1.375;

  var leftCanvas = '<div class="page-design-panel" resize> ' +
    ' <div class="page-big" ng-class="{active:main.PhotoBook.leftDesignPage.active}"> ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous" ng-click="main.selectLeft()" id="left_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas> ';

  var canvasTemplate = leftCanvas;

  return {
    template: canvasTemplate,
    link : function(scope, elem, attrs) {
      scope.onResize = function() {
        var w = ($(window).width() - 250 - 30) / 2 - 20;
        h = w / 1.375;
        //$(elem).width(w);
        $('.page-big').width(w);
        $('.page-big').height(h);
      };
      scope.onResize();

      angular.element($window).bind('resize', function() {
        scope.onResize();
      })
    }
  }
});

//app.directive('resize',function($window) {
//  return function (scope, element) {
//    var w = angular.element($window);
//    scope.getWindowDimensions = function () {
//      return {
//        'h': w.height(),
//        'w': w.width()
//      };
//    };
//
//    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
//      scope.windowHeight = newValue.h;
//      scope.windowWidth = newValue.w;
//
//      var w = ($(window).width() - 250 - 30) / 2 - 510;
//      var h = w /1.375  ;
//      $('.page-big').width(w);
//      $('.page-big').height(h);
//      //$('.page-canvas').width(w - 100);
//      //$('.page-canvas').height(h);
//
//      $('element').width(w);
//    }, true);
//
//    w.bind('resize', function () {
//      console.log('resize ');
//      scope.$apply();
//    });
//  }
//})
//
//
//app.directive('resizeCanvas',function($window) {
//  return function (scope, element) {
//    var w = angular.element($window);
//    scope.getWindowDimensions = function () {
//      return {
//        'h': w.height(),
//        'w': w.width()
//      };
//    };
//
//    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
//      scope.windowHeight = newValue.h;
//      scope.windowWidth = newValue.w;
//
//      var w = ($(window).width() - 250 - 30) / 2 - 10;
//      var h = w /1.375  ;
//      //$('.page-canvas').width(w - 100);
//      //$('.page-canvas').height(h);
//      //
//      //$('.page-canvas').attr('width',w);
//      //$('.page-canvas').attr('height',h);
//
//
//    }, true);
//
//    w.bind('resize', function () {
//      console.log('resize ');
//      scope.$apply();
//    });
//  }
//})




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
