(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('BookController', BookController);

  /** @ngInject */
  function BookController($timeout, webDevTec, toastr, $scope, $document, config, imageService, PhotoBook) {
    var vm = this;


    $timeout(function(){

    });
    $scope.$on('$viewContentLoaded', function(document){

    });

    angular.element(document).ready(function(){


    });

  }
})();
