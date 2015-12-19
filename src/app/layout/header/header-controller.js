(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('HeaderController', HeaderController);


  /* @ngInject */
  function HeaderController(dependency) {
    var vm = this;
    vm.title = 'HeaderController';

    activate();

    ////////////////

    function activate() {
    }
  }

})();

