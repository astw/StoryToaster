(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController( $scope,$location, authService, $document, config) {
    var vm = this;

    vm.register = function(){
      alert('in register');
      console.log(vm.username);
      console.log(vm.email);
      console.log(vm.password);
      console.log(vm.password1);
    }

    vm.login = function() {

      authService.login(vm.email, vm.password).
        then(function(res){
          console.log(res);
          if(res.status == 200) {
            vm.user = res.data.user;
            vm.isAuthenticated = authService.isAuthenticated();

            var transfer = $location.search().transfer;
            if(transfer){
              $location.url(transfer);
            }
            else
             // $location.url('/');
              $location.url('/account/my');

          }
          else
            vm.loginFails = true;
        },
        function(err){
          console.log(err);
        }
      );
    };

    vm.logout = function() {
      alert('logout');
      authService.logout();
      vm.username = "";
      vm.user = "";
      vm.password = "";
      vm.isAuthenticated = authService.isAuthenticated();
      $location.path('/');
    }

    vm.password2Change = function(){
      vm.passwordNotMatch = vm.password2 != $scope.password;
    };

    vm.checkEmail = function(){
      authService.checkEmailExistance($scope.email).
        then(function(res){
          if(res.status == 200) {
            vm.emailExists = (res.data === 'true');
          }
          else
            vm.emailExists = false;
        });
    };
  }
})();

