(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('loggedUserPanel', loggedUserPanel);

  /* @ngInject */
  function loggedUserPanel($timeout) {
    var directive = {
      templateUrl: 'app/components/navbar/loggedUserPanel.html',
      bindToController: true,
      controller: 'AccountController',
      controllerAs: 'account',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      if (attrs) {
        scope.$eval(attrs.afterRender)
      }
      scope.$emit('onAfterRender');

      var menu = $('#topbar-dropmenu');
      var items = menu.find('.metro-tile');
      var metroBG = $('.metro-modal');

      // Toggle menu and active class on icon click
      $('.topbar-menu-toggle').on('click', function () {
        if (!menu || menu.length < 1) return;
        // If dropmenu is using alternate style we don't show modal
        if (menu.hasClass('alt')) {
          // Toggle menu and active class on icon click
          menu.slideToggle(230).toggleClass('topbar-menu-open');
          metroBG.fadeIn();
        }
        else {
          menu.slideToggle(230).toggleClass('topbar-menu-open');
          $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

          // Create Modal for hover effect
          if (!metroBG.length) {
            metroBG = $('<div class="metro-modal"></div>').appendTo('body');
          }
          setTimeout(function () {
            metroBG.fadeIn();
          }, 380);
        }
      })
    }
  }

})();


