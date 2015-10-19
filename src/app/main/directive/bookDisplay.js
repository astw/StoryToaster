(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookDisplay', bookDisplay);

  bookDisplay.$inject = [];

  /* @ngInject */
  function bookDisplay() {
    var directive = {
      //bindToController: true,
      link: link,
      restrict: 'AE',
      scope: {
        'book': '='
      },
      templateUrl: 'app/books/mybooks.html'
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('in book display')
      if (attrs) {
        scope.$eval(attrs.afterRender)
      }

      scope.$emit('onAfterRender');
    }
  }
})();




