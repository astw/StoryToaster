(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('doubleDesignPage2', doubleDesignPage);

  /* @ngInject */
  function doubleDesignPage($window) {

    var directive = {
      templateUrl:  'app/main/template/double-design-page.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('doubleDesignPage created');

      scope.onResize = function () {

        var t = ($('#bigPagePanel')).width();
        var w = (t - 40) / 2;
        var h = w / 1.375;

        var canvasWidth = w -10;
        var canvasHeight = h -10;

        $(".page-big").css('height', h + "px");
        $(".page-big").css('width', w + "px");

        if(!scope.main.left_canvas || !scope.main.right_canvas) {
          scope.main.left_canvas = new fabric.Canvas('left_canvas', {select: false, backgroundColor: '#ffffff'});
          scope.main.right_canvas = new fabric.Canvas('right_canvas', {select: false, backgroundColor: '#ffffff'});
          scope.main.currentCanvas = scope.main.left_canvas;
        }
        scope.main.restoreToCurrentDesignData();

        scope.main.left_canvas.setWidth(canvasWidth);
        scope.main.left_canvas.setHeight(canvasHeight);

        scope.main.right_canvas.setWidth(canvasWidth);
        scope.main.right_canvas.setHeight(canvasHeight);
      };
      scope.onResize();

      angular.element($window).bind('resize', function () {
        scope.onResize();
      })
    }
  }

})();

