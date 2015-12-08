(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('openBook', openBook);

  openBook.$inject = ['$window','relayService'];

  /* @ngInject */
  function openBook($window,relayService) {
    var directive = {
      bindToController: true,
      controller: 'BookController',
      controllerAs: 'bookvm',
      link: link,
      restrict: 'AE',
      scope: {
        'book': '='
      },
      templateUrl: 'app/books/templates/open-one-book.html'
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('in book display')
      if (attrs) {
        scope.$eval(attrs.afterRender)
      }

      var backButton = angular.element('#btnGoBack');
      if (backButton) {
        backButton.bind('click', function () {
          $window.location.assign('/account/mybooks');
        })
      }

      scope.$emit('onAfterRender');
    }
  }
})();




