
(function() {
  'use strict';

  angular.module('storyToaster').run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $http, $location, config, authService, relayService) {

    $http.defaults.headers.common[config.apiKeyName] = config.apiKeyValue;
    $http.defaults.headers.common[config.authTokenName] = "Bear " +  authService.getAuthToken();


    //incase refresh, make sure we are auth'd
    //$rootScope.app.isAuthenticated = authService.isAuthenticated();
    //$rootScope.app.userName = authService.getUserName();

     $rootScope.$on('$routeChangeStart', function(event,next,current){

    //     $location.$$url = $location.$$url.replace('%2F','/');

         //if($location.$$absUrl.indexOf('#features%2F') > -1) {
         //  //event.preventDefault();
         //  $location.$$absUrl =$location.$$absUrl.replace('%2F','/');
         //};

        //check the auth cookie
        var logged = authService.isAuthenticated();
        if( ! logged &&  next && next.secure) {
          event.preventDefault();

          if($location.search())
            relayService.putKeyValue('searchCondition', $location.search());

          $rootScope.currentPath = $location.path();

          $log.debug('get auth token from cookie');
          $log.debug(current);
          $log.debug(next);

          $rootScope.$evalAsync(function(){
            $location.path("/account/login");
          })
        }
      }
    );

    $rootScope.$on("$routeChangeSuccess", function(event, current, previous){

      //if($location.$$absUrl.indexOf('#features%2F') > -1) {
      //  event.preventDefault();
      //  $location.$$absUrl =$location.$$absUrl.replace('%2F','/');
      //};

      // $location.search(relayService.getKeyValue('searchCondition'))
    });

    //// Asynchronously fetch the locales at the startup.
    //localeService.getLocales();
    //
    //// Asynchronously fetch the users at the startup.
    //userService.getUsers();

    $log.debug('runBlock end');
  }


})();
