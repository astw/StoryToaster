(function () {
  'use strict';
  angular
    .module('storyToaster')
    .directive('frontCoverDesignBak', frontCoverDesignBak);

  /* ngInject */
  function frontCoverDesignBak($window) {

    var t = ($('#bigPagePanel')).width();
    var w = (t - 20) / 2;

    var h = w / 1.375;
    console.log('front cover design', w);

    var canW = w * 0.65;
    var canH = h * 0.65;

    return {
      templateUrl: 'app/main/template/front-cover-design.html',
      link: function (scope, elem, attrs) {
        console.log(scope.PhotoBook);
        $(".front-cover-left").css('height', h + "px");
        $(".front-cover-left").css('width', w + "px");

        $(".front-cover-left>img").css('width', canW + "px");
        $(".front-cover-left>img").css('height', canH + "px");
      }
    }
  }
})();

