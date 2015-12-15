/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('page', page);

  page.$inject = [];

  /* @ngInject */
  function page() {
    var directive = {
      templateUrl: 'app/books/templates/page.html',
      bindToController: true,
      controller: 'PageController',
      controllerAs: 'vm',
      link: link,
      restrict: 'AE',
      scope: {
        'data': '=data',
        'id':'=id'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      var data = scope.vm.data;

      var canvasEle = element.find('canvas')[0];
      //var id = "canvas_" + scope.vm.data.index;
      var id = "canvas_" + scope.vm.id ;
      canvasEle.id = id;

      //set canvasEle size
      canvasEle.width = 520;
      canvasEle.height = canvasEle.width /1.375;

      var canvas = new fabric.Canvas(
        id,
        {select:false,background:'red'}
      );
      scope.vm.canvas = canvas;
      if(data && data.imageData)
        canvas.loadFromJSON(data.imageData, canvas.renderAll.bind(canvas), function () {
      });
    }
  }

})();

