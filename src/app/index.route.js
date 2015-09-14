(function() {
  'use strict';

  angular
    .module('storyToaster')
    .config(routeConfig);

  function routeConfig($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }


})();
