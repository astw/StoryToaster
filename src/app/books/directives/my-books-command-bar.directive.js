/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('myBooksCommandBar', myBooksCommandBar);

  myBooksCommandBar.$inject = [];

  /* @ngInject */
  function myBooksCommandBar() {
    var directive = {
      templateUrl: 'app/books/templates/my-books-command-bar.html',
      restrict: 'AE'
    };
    return directive;
  }

})();

