 (function(){

   'use strict';
   angular
     .module('storyToaster')
     .controller('TestController', testController);

   /* ngInject */
   function testController(){
     var vm = this;


     console.log('in test controller');


   }

})();
