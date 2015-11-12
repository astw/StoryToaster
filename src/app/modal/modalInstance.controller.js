/**
 * Created by Administrator on 2015/11/11.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('ModalInstanceController', ModalInstanceController);

  ModalInstanceController.$inject = ['$scope','$modalInstance','modalMessage'];

  /* @ngInject */
  function ModalInstanceController($scope, $modalInstance, modalMessage, title ) {

    $scope.messageBody = modalMessage && modalMessage.messageBody;
    $scope.title= modalMessage && modalMessage.title;
    console.log('modal message',$scope.modalMessage);

    $scope.ok = function () {
      $modalInstance.close($scope);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

})();

