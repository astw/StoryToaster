(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('openBook2', openBook2);

  /* @ngInject */
  function openBook2($window) {
    var directive = {
      bindToController: true,
      controller: 'BookController',
      controllerAs: 'bookvm',
      link: link,
      restrict: 'AE',
      scope: {
        'book': '='
      },
      templateUrl: 'app/books/templates/open-one-book2.html'
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
})()
