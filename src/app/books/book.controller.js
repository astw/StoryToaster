(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('BookController', BookController);

  /** @ngInject */
  function BookController($timeout, $route, webDevTec, toastr, $scope, $document, config, imageService, PhotoBook) {
    var vm = this;


    $scope.$on('$viewContentLoaded', function(document){

    });

    angular.element(document).ready(function(){


    });

  }
})();
