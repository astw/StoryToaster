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
        'data': '=data'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      var data = scope.vm.data;

      var canvasEle = element.find('canvas')[0];
      var id = "canvas_" + scope.vm.data.index;
      canvasEle.id = id;

      var image = element.find('img')[0];

      //set canvasEle size
      canvasEle.height = 500;
      canvasEle.width = 500;

      var canvas = new fabric.Canvas(id);
      scope.vm.canvas = canvas;
      canvas.loadFromJSON(data.imageData, canvas.renderAll.bind(canvas), function () {

        image.src = canvas.toDataURL();

      });
    }
  }

})();

