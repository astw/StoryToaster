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

app.directive( 'loggedUserPanel', function ($timeout) {

  return {
    templateUrl: 'app/components/navbar/loggedUserPanel.html',
    controller:'AccountController',
    controllerAs:'account',
    link : function(scope, element, attrs) {
      if (attrs) { scope.$eval(attrs.afterRender) }
       scope.$emit('onAfterRender');

      var menu = $('#topbar-dropmenu');
      var items = menu.find('.metro-tile');
      var metroBG = $('.metro-modal');

      // Toggle menu and active class on icon click
      $('.topbar-menu-toggle').on('click', function () {
        if(!menu || menu.length < 1) return;
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

app.directive('doubleDesignPage',function($window){
  var t = ($('#bigPagePanel')).width();

  var w =  (t - 20) /2      ;//($(window).width() - 250 - 30) / 2 - 20;
  //var w = ($(window).width() - 250 - 30) / 2 - 20;
  var h = w / 1.375;

  var leftCanvas =
    ' <div class="page-design-panel" id="pageDesignPanel" resize> ' +
    ' <div class="page-big" ng-click="main.selectLeft()" ng-class="{active:main.PhotoBook.leftDesignPage.active}"> ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous" id="left_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas>' +
    ' </div> ';

  var canvasTemplate = leftCanvas;

  var rightCanvs =
    ' <div class="page-big" ng-click="main.selectRight()" ng-class="{active:main.PhotoBook.rightDesignPage.active}"> ' +
      ' <canvas class="page-canvas" crossOrigin="Anonymous"   id="right_canvas" width="'+ w  + 'px" ' +
      ' height="'+ h +'px"></canvas> ' +
      '</div>  </div>';

    canvasTemplate += rightCanvs;

    return {
      template: canvasTemplate
      ,
      link: function (scope, elem, attrs) {

        console.log('doubleDesignPage created');

        scope.onResize = function () {

          var t = ($('#bigPagePanel')).width();

          var w =  (t - 40) /2      ;//($(window).width() - 250 - 30) / 2 - 20;
          h = w / 1.375;
          //$(elem).width(w);
          $('.page-big').width(w);
          $('.page-big').height(h);

          scope.main.left_canvas = new fabric.Canvas('left_canvas');
          scope.main.right_canvas = new fabric.Canvas('right_canvas');
          scope.main.currentCanvas = scope.main.left_canvas;
          scope.main.restoreToCurrentDesignData();

        };
        scope.onResize();

        angular.element($window).bind('resize', function () {
          scope.onResize();
        })
      }
    }
});

app.directive('leftDesignPage',function($window){
  var w = ($(window).width() - 250 - 30) / 2 - 20;
  var h = w / 1.375;

  var leftCanvas =
    ' <div class="page-design-panel" id="pageDesignPanel" resize> ' +
    ' <div class="page-big" ng-click="main.selectLeft()" ng-class="{active:main.PhotoBook.leftDesignPage.active}" '
    + ' > ' +
    ' <canvas class="page-canvas" crossOrigin="Anonymous" id="left_canvas" width="'+ w  + 'px" ' +
    ' height="'+ h +'px"></canvas>' +
    ' </div> </div>';

  var canvasTemplate = leftCanvas;

  return {
    template: canvasTemplate,
    link : function(scope, elem, attrs) {

      scope.onResize = function() {
        var w = ($(window).width() - 250 - 30) / 2 - 20;
        var h = w / 1.375;

        scope.main.left_canvas = new fabric.Canvas('left_canvas');
        scope.main.currentCanvas = scope.main.left_canvas;
        scope.main.restoreToCurrentDesignData();
      };
      scope.onResize();

      angular.element($window).bind('resize', function() {
        scope.onResize();
        scope.$apply();
      })
    }
  }
});

app.directive('topBarCommand',function($window){
  return {
    templateUrl: 'app/main/template/topCommandBar.html'
  }
});

app.directive('coverDesignRight',function(){
  return {
    templateUrl:'app/main/template/cover-design-right.html'
  }
});

app.directive('frontCoverDesign',function($window){

  var w = ($(window).width() - 250 - 30) / 2 - 20
  var h = w / 1.375;
  console.log('front cover design');
  console.log(w);

  var canW = w *0.65 ;
  var canH = h *0.65 ;

  return {
    templateUrl: 'app/main/template/front-cover-design.html',
     link : function(scope, elem, attrs) {
       console.log(scope.PhotoBook);
       $(".front-cover-left").css('height',h +"px");
       $(".front-cover-left").css('width',w +"px");
       $(".front-cover-left>img").css('width',canW +"px");
       $(".front-cover-left>img").css('height',canH +"px");
     }
}
});

app.directive('backCoverDesign',function($window){

  var w = ($(window).width() - 250 - 30) / 2 - 20
  var h = w / 1.375;
  console.log('front cover design');
  console.log(w);

  var canW = w *0.6 ;
  var canH = h *0.6 ;

  return {
    templateUrl: 'app/main/template/back-cover-design.html',
    link : function(scope, elem, attrs) {
      $(".front-cover-left").css('height',h +"px");
      $(".front-cover-left").css('width',w +"px");
      $(".front-cover-left>img").css('width',canW +"px");
      $(".front-cover-left>img").css('height',canH +"px");
    }
  }
});

app.directive('backCoverDesignRight', function () {
  return {
    templateUrl: 'app/main/template/back-cover-design-right.html'
  };
});

