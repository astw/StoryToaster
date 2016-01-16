
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('backCoverDesign', backCoverDesign);

  /* @ngInject */
  function backCoverDesign($window) {

    var w = ($(window).width() - 250 - 30) / 2 - 20;
    var h = w / 1.375;
    console.log('front cover design');
    console.log(w);

    var canW = w *0.6 ;
    var canH = h *0.6 ;

    var directive = {
      templateUrl: 'app/main/template/back-cover-design.bak.html',
      link: link,
      restrict: 'AE'
    };
    return directive;

    function link(scope, elem, attrs) {
      $(".front-cover-left").css('height',h +"px");
      $(".front-cover-left").css('width',w +"px");
      $(".front-cover-left>img").css('width',canW +"px");
      $(".front-cover-left>img").css('height',canH +"px");
    }
  }
})();

