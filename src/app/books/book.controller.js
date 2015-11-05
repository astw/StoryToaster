(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('BookController', BookController);

  /** @ngInject */
  function BookController($timeout, $route, toastr, $scope,
     $document, config, imageService, PhotoBook,
     $window

     ) {
    var vm = this;

    $scope.$on('$viewContentLoaded', function(document){

    });

    angular.element(document).ready(function(){

    });


  }
})();
