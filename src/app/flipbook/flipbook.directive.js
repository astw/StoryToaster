
var app = angular.module('storyToaster');

app.directive('flipbook', function(){
  return{
    restrict: 'E',
    replace: true,
    compile: function(){
      return{
        post: function(scope, iElement, iAttrs, controller) {
          iElement.turn({
            width: '400px',
            height: '300px',
            pages: 8
          })
        }
      }
    },
    templateUrl: "app/flipbook/flipbook.html"
  }
});
