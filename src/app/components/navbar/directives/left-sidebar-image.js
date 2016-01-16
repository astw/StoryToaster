(function(){
  'use strict';
  angular
    .module('storyToaster')
    .directive('leftSidebarImage', leftSidebarImage);

  /* ngInject */
  function leftSidebarImage(){
    return {
      restrict :'E',
      scope:{
        group :'='
      },
      templateUrl :'app/components/sidebar/imageSections.html'
    }
  }

});
