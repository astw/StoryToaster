'use strict';

var app = angular.module('storyToaster');

app.directive('pageDesignSidebar', function () {
  return {
    templateUrl: 'app/main/template/page-design-sidebar.html'
  };
});

app.directive('pageSheet', function () {
  return {
    templateUrl: 'app/main/template/page-sheet.html'
  };
});

app.directive('previewScrollPanel', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel.html'
  }
});
app.directive('previewScrollPanel2', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel2.html'
  }
});
app.directive('previewFrontCover', function () {
  return {
    templateUrl: 'app/main/template/preview-front-cover.html'
  };
});

app.directive('previewDedicatedPage', function () {
  return {
    templateUrl: 'app/main/template/preview-dedicated-page.html'
  };
});

app.directive('previewBackCover', function () {
  return {
    templateUrl: 'app/main/template/preview-back-cover.html'
  }
});

app.directive('previewSinglePage',function(){
  return {
   restirct:'E',
    scope:{
      pageInfo:'=page'
    }
  }
});


app.directive('leftSidebarImage',function(){
  return {
    restirct:'E',

    scope:{
      group: '='
    },
    templateUrl:'app/components/sidebar/imageSections.html'
  }
});

app.directive('navBar', function () {
  return {
    templateUrl: 'app/components/navbar/navbar.html'

  }
});

app.directive('navBar2', function ($timeout) {

  $timeout(function() {
     // Init Demo JS
    Demo.init();
    // Init Theme Core
    Core.init();

    // Sliding Topbar Metro Menu
    var menu = $('#topbar-dropmenu');
    var items = menu.find('.metro-tile');
    var metroBG = $('.metro-modal');

    // Toggle menu and active class on icon click
    $('.topbar-menu-toggle').on('click', function () {
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

    });
  })

    return {
    templateUrl: 'app/components/navbar/navbar-2.html'
  }
});


app.directive('loggedUserPanel', function ($timeout) {

 $timeout(function() {
    // Sliding Topbar Metro Menu
    var menu = $('#topbar-dropmenu');
    var items = menu.find('.metro-tile');
    var metroBG = $('.metro-modal');

    // Toggle menu and active class on icon click
    $('.topbar-menu-toggle').on('click', function () {
      //alert('click');
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

    });
 });

  return {
    templateUrl: 'app/components/navbar/loggedUserPanel.html'
  }
});

app.directive('navBar3', function () {
  return {
    templateUrl: 'app/components/navbar/navbar-3.html'
  }
});

app.directive('sideBarLeft', function () {
  return {
    templateUrl: 'app/components/sidebar/leftSidebar.html'
  }
});


//
//
//(function() {
//  'use strict';
//  angular
//    .module('storyToaster')
//    .directive('pageDesignSidebar', pageDesignSidebar);
//
//  /** @ngInject */
//  function pageDesignSidebar() {
//    var directive = {
//      restrict: 'E',
//      templateUrl: 'app/main/page-design-sidebar.html',
//      scope: {
//        creationDate: '='
//      },
//      controller: function($scope) {
//
//
//      },
//      controllerAs: 'vm',
//      bindToController: false
//    };
//
//    return directive;
//  }
//
//})();
