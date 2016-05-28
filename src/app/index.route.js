(function() {
  'use strict';

  angular
    .module('storyToaster')
    .config(routeConfig);

  function routeConfig(
    $routeProvider,
    $locationProvider,
    minicolorsProvider

  ) {
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
      })

      .when('/account/mybooks/:bookId/readbook', {
        //templateUrl: 'app/books/readbook.html',
        //templateUrl:'app/books/templates/steve-jobs.html',
        templateUrl:'app/books/templates/steve-jobs3.html',
        controller: 'ReadbookController',
        controllerAs: 'readbookCtrl',
        reloadOnSearch:false,
        resolve:{
          bookSelected :function($route,bookRepository){
            var bookId = $route.current.params.bookId;
            return bookRepository.getBookById(bookId);
          }
        }
      })

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
      .when('/test',{
        templateUrl:'app/test/test.html',
        controller:'TestController',
        controllerAs:'test'
      })
      .when('/test/fabric',{
        templateUrl :'app/fabric/test.html',
        controller:'fabricTestController'
        //controllerAs:'fabric'
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
