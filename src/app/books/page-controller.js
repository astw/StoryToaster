/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('PageController', PageController);

  PageController.$inject = [];

  /* @ngInject */
  function PageController() {
    var vm = this;
    activate();

    vm.addImage = addImage;
    ////////////////

    function activate() {
    }

    function addImage(){

    }
  }

})();


