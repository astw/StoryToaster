/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookPage', bookPage);

  bookPage.$inject = [];

  /* @ngInject */
  function bookPage() {
    var directive = {
      templateUrl: 'app/books/templates/page.html',
      //bindToController: true,
      //controller: 'ReadbookController',
      //controllerAs: 'vm',
      link: link,
      restrict: 'AE',
      scope: {
        'data': '=data',
        'id':'=id',
        'width':'=width',
        'height':'=height'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      //var data = scope.vm.data;

      var data = scope.data;
      var id = scope.id ;
      var width = scope.width;
      var height = scope.height;

      width=515;
      height=387;

      var canvasEle = element.find('canvas')[0];
      //var id = "canvas_" + scope.vm.data.index;
      var id = "canvas_" + id;
      canvasEle.id = id;

      //set canvasEle size
      canvasEle.width = width;
      canvasEle.height = height     ;//canvasEle.width /1.375;

      var canvas = new fabric.Canvas(
        id,
        {select:false,background:'red'}
      );
      //scope.vm.canvas = canvas;
      scope.canvas = canvas;
      if(data && data.imageData)
        canvas.loadFromJSON(data.imageData, canvas.renderAll.bind(canvas), function () {
            // make objects unmoveable
            /* lockRotation: true,
            lockMovement: true,
            selection: false,
            hasControls: false,
            hasBorders: false,
           */


            scope.$emit('onPageAfterRender');
      });
      else{
        scope.$emit('onPageAfterRender');
      }
    }
  }

})();

