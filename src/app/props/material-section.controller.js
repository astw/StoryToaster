(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MaterialController', MaterialController);

  /* @ngInject */
  function MaterialController() {
    var vm = this;
    vm.title = 'material';

    activate();

    ////////////////

    function activate() {
    }
  }

})();

