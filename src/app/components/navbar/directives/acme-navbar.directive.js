(function() {
  'use strict';

  angular
    .module('storyToaster')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html'
      //,
      //scope: {
      //    creationDate: '='
      //},
      //controller: NavbarController,
      //controllerAs: 'vm',
      //bindToController: false
    };

    return directive;

    ///** @ngInject */
    //function NavbarController(moment) {
    //  var vm = this;
    //
    //  // "vm.creation" is avaible by directive option "bindToController: true"
    //  vm.relativeDate = moment(vm.creationDate).fromNow();
    //
    //}


    vm.search = function(){
      alert('search ');
    }
  }

})();