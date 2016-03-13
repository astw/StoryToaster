(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('BookController', BookController);

  /** @ngInject */
  function BookController($scope, $window, $modal,$log,bookRepository,SweetAlert,relayService,imageService) {
    var vm = this;

    vm.mybooks = [];

    bookRepository.getUserBooks().then(function(books){
        vm.mybooks = vm.mybooks.concat(books);
    });

    $scope.groups = imageService.getImages();

    vm.hoverOnBook = function(book){
      console.log('in book controller hoverOnBook')
      return book.hover = !book.hover;
    };

    vm.clickBook = function(book){
      console.log('book controller clickbook');
       //relayService.putKeyValue('_selectedBook_',book);
       $window.location.assign('/account/mybooks/'+ book.id +'/readbook');
      console.log(book);
    };

    vm.createBook = function(){
      console.log('inside book ctrl, create book');
      //relayService.putKeyValue('_selectedBook_',book);
      $window.location.assign('/account/my');
    };

    vm.deleteBook = function(bookId,index,event) {
      event.stopPropagation();
      //popup a module dialog

      var messageBody = "确定要删除这本书吗？删除后将找不回来";
      var title ="删除书";

      SweetAlert.swal({
        title: '确定要删除这本书吗 ?',
        text: '删除后将无法恢复！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '是的,删除!',
        cancelButtonText: '不，取消',
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if (isConfirm) {
              bookRepository.deleteBook(bookId).then(
                  function(res){
                    if(res.data.status == 200){
                      //deleted
                      vm.mybooks.splice(index,1);
                      SweetAlert.swal('已删除!', '本书已经删除。', 'success');
                    }
                  },
                  function(err){
                    $log.info(err);
                    SweetAlert.swal('未删除。', err, 'error');
                  }
                ).catch(function(err){
                  SweetAlert.swal('未删除。', err, 'error');
                })

        } else {
          SweetAlert.swal('未删除。', '', 'error');
        }
      });

      //var modalInstance = $modal.open({
      //  animation: true,
      //  templateUrl: 'app/modal/modal-dialog.html',
      //  controller: 'ModalInstanceController',
      //  size: 'sm',
      //  resolve: {
      //    modalMessage: function () {
      //      return  {
      //        messageBody: messageBody,
      //        title: title
      //      };
      //    }
      //  }
      //});
      //
      //modalInstance.result.then(
      //  function (items) {
      //    $log.info(items);
      //    $log.info('ok button clicked');
      //    bookRepository.deleteBook(book).then(
      //      function(res){
      //        if(res.data.status == 200){
      //          //deleted
      //          vm.mybooks.splice(index,1);
      //        }
      //      },
      //      function(err){
      //        $log.info(err);
      //      }
      //    )
      //  },
      //  function (data) {
      //    $log.info('Modal dismissed');
      //  }
      //)
    };

    vm.editBook = function(bookId){
      $window.location.assign('/account/my?bookid=' + bookId)
    };

    $scope.$on('$viewContentLoaded', function(document){

    });

    angular.element(document).ready(function(){

    });


  }
})();
