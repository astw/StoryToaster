(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookTile', bookTile);

  bookTile.$inject = [];

  /* @ngInject */
  function bookTile() {
    var directive = {
      //bindToController: true,
      link: link,
      restrict: 'AE',
      scope: {
        'book': '='
      },
      templateUrl: 'app/main/template/book-tile.html'
    };
    return directive;

    function link(scope, element, attrs) {

      if (attrs) {
        scope.$eval(attrs.afterRender)
      }

      scope.$emit('onAfterRender');

      /////
      element.bind('click', function () {

        console.log('click in link');
        var metroBG = $('.metro-modal');

        // Create Modal for hover effect
        if (!metroBG.length) {
          metroBG = $('<div class="metro-modal"></div>').appendTo('body');
        }

        // element.addClass('animated animated-short fadeInDown').css('opacity', 1);


        setTimeout(function () {
          metroBG.fadeIn();
        }, 380);

        // If modal is clicked close menu
        $('body').on('click', '.metro-modal', function () {
          metroBG.fadeOut('fast');
          setTimeout(function () {

          }, 250);
        });

      });
      //----
    }
  }


})();



