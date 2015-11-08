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
      templateUrl : 'app/books/page.html',
      bindToController: true,
      controller: 'PageController',
      controllerAs: 'vm',
      link: link,
      restrict: 'AE',
      scope: {
        'data':'=data'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('===== inside link');
      console.log(element)

      var data = scope.vm.data;

      var canvasEle = angular.element('canvas')[0];
      console.log(canvasEle.id);

      var id = "canvas_" + scope.vm.data.index;
      canvasEle.id = id;

      var canvas = new fabric.Canvas(id);
      scope.vm.canvas = canvas;

      //var imageUrl = "http://localhost:3000/assets/images/1.gif" ;
      //fabric.Image.fromURL(imageUrl, function (img) {
      //  canvas.add(img);
      //}, {crossOrigin: 'Anonymous'});

      canvas.loadFromJSON(data.imageData, canvas.renderAll.bind(canvas), function () {
      });

    }
  }

  ControllerName.$inject = ['dependency'];

  /* @ngInject */
  function ControllerName(dependency) {

  }

})();

