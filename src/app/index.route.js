(function() {
  'use strict';

  angular
    .module('storyToaster')
    .config(routeConfig);

  function routeConfig($routeProvider,$locationProvider,minicolorsProvider) {
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
        templateUrl: 'app/books/my-book-list.html',
        controller: 'BookController',
        controllerAs: 'bookCtrl'
      }
      )
      .when('/account/mybooks/readbook', {
        templateUrl: 'app/books/readbook.html',
        controller: 'MainController',
        controllerAs: 'main',
          reloadOnSearch:false
      })
      //.when('/account/mybooks', {
      //  templateUrl: 'app/books/open-one-book.html',
      //  controller: 'BookController',
      //  controllerAs: 'book',
      //  reloadOnSearch:false
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
    angular.extend(minicolorsProvider.defaults, {
      control: 'hue',
      position: 'bottom left',
      theme: 'bootstrap'
    });
  }

})();
