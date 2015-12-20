(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('HeaderController', HeaderController);

  /* @ngInject */
  function HeaderController($log,
                            authService,
                            $state,
                            $sessionStorage,
                            $modal,
                            $window) {
    var vm = this;

    vm.storage = $sessionStorage;
    vm.localeService = localeService;
    vm.isLoggedIn = authService.isAuthenticated;

    vm.openLogin = openLogin;
    vm.logOut = logOut;

    activate();

    //////////////////////////////////

    /**
     * Controller startup function
     */
    function activate() {
    }//end activate()


    /**
     * Open modal dialog
     */
    function openLogin(){

      var modalInstance = $modal.open({
        templateUrl: 'app/account/login.html',
        controller: 'AccountController',
        controllerAs: 'login'
      });

    }//end openLogin()



    /**
     * Log Out user
     */
    function logOut(){
      $log.debug('header.logOut()');
      authService.logOut();
      $state.go('app.home');
    }//end logOut()
  }

})();

