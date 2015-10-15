(function() {
  'use strict';

  angular
    .module('storyToaster')
    .config(routeConfig);

  function routeConfig( $routeProvider,$locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/account/my', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/account/mybooks', {
        templateUrl: 'app/books/mybooks.html',
        controller: 'BookController',
        controllerAs: 'book'
      })
      .when('/account/mybooks#features/3', {
        templateUrl: 'app/books/mybooks.html',
        controller: 'BookController',
        controllerAs: 'book'
      })
      //.when('/account/flipbook', {
      //  templateUrl: 'app/flipbook/index.html',
      //  controller: 'FlipBookController',
      //  controllerAs: 'fbook'
      //})
      .when('/account/login',{
        templateUrl:'app/account/login.html',
        controller:'AccountController',
        controllerAs:'account'
      })
      .when('/account/register',{
        templateUrl:'app/account/register.html',
        controller:'AccountController',
        controllerAs:'account'
      })
      .otherwise({
        redirectTo: '/home'
      });

    $locationProvider.html5Mode(true);
  }

})();
