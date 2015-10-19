(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookTile', bookTile);

  bookTile.$inject = ['$location'];

  /* @ngInject */
  function bookTile($location) {
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

        $location.path('/account/mybooks/read');
        scope.$apply();


        //var metroBG = $('.metro-modal');
        //
        //// Create Modal for hover effect
        //if (!metroBG.length) {
        //  metroBG = $('<div class="metro-modal"></div>').appendTo('body');
        //}
        // setTimeout(function () {
        //  metroBG.fadeIn();
        //}, 380);
        //
        //$('#book-preview-panel').show();
        //
        //// If modal is clicked close menu
        //$('body').on('click', '.metro-modal', function () {
        //  metroBG.fadeOut('fast');
        //  $('#book-preview-panel').hide();
        //  setTimeout(function () {
        //  }, 250);
        //});
      });
      //----
    }
  }


})();



