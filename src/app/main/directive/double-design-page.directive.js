(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('doubleDesignPage', doubleDesignPage);

  /* @ngInject */
  function doubleDesignPage($window) {

    var t = ($('#bigPagePanel')).width();

    var w =  (t - 20) /2      ;
    w = ($(window).width() - 280 - 30) / 2 - 20;

    //var w = ($(window).width() - 250 - 30) / 2 - 20;
    var h = w / 1.375;

    var leftCanvas =
      ' <div class="page-design-panel" id="pageDesignPanel" resize> ' +
      ' <div class="page-big" ng-click="main.selectLeft()" ng-class="{active:main.PhotoBook.leftDesignPage.active}"> ' +
      ' <canvas class="page-canvas" crossOrigin="Anonymous" id="left_canvas" width="'+ (w -9)  + 'px" ' +
      ' height="'+ (h-9) +'px"></canvas>' +
      ' </div> ';

    var canvasTemplate = leftCanvas;

    var rightCanvs =
      ' <div class="page-big" ng-click="main.selectRight()" ng-class="{active:main.PhotoBook.rightDesignPage.active}"> ' +
      ' <canvas class="page-canvas" crossOrigin="Anonymous"   id="right_canvas" width="'+ (w -9)  + 'px" ' +
      ' height="'+ (h -9) +'px"></canvas> ' +
      '</div>  </div>';

    canvasTemplate += rightCanvs;


    var directive = {
      template: canvasTemplate,
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('doubleDesignPage created');

      scope.onResize = function () {

        var t = ($('#bigPagePanel')).width();

        var w = (t - 40) / 2;
        w = ($(window).width() - 280 - 30) / 2 - 20;
        h = w / 1.375;
        //$(elem).width(w);
        $('.page-big').width(w);
        $('.page-big').height(h);

        scope.main.left_canvas = new fabric.Canvas('left_canvas', {select: false, backgroundColor: '#ffffff'});
        scope.main.right_canvas = new fabric.Canvas('right_canvas', {select: false, backgroundColor: '#ffffff'});
        scope.main.currentCanvas = scope.main.left_canvas;
        scope.main.restoreToCurrentDesignData();

      };
      scope.onResize();

      angular.element($window).bind('resize', function () {
        scope.onResize();
      })
    }
  }

})();

