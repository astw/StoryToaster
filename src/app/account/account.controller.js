(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController( $scope, $document, config) {
    var vm = this;


    vm.login = function(){
      alert('login method');
    };

    $scope.register = function(){
      alert('in register');
      console.log(vm.username);
      console.log(vm.email);
      console.log(vm.password);
      console.log(vm.password1);
    }

  }
})();

