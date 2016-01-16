'use strict';

var app = angular.module('storyToaster');

app.directive('pageDesignSidebar', function () {
  return {
    templateUrl: 'app/main/template/page-design-sidebar.html'
  };
});

app.directive('pageSheet', function () {
  return {
    templateUrl: 'app/main/template/page-sheet.html'
  };
});

app.directive('previewScrollPanel', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel.html'
  }
});
app.directive('previewScrollPanel2', function () {
  return {
    templateUrl: 'app/main/template/page-design-preview-scroll-panel2.html'
  }
});
app.directive('previewFrontCover', function () {
  return {
    templateUrl: 'app/main/template/preview-front-cover.html'
  };
});

app.directive('previewDedicatedPage', function () {
  return {
    templateUrl: 'app/main/template/preview-dedicated-page.html'
  };
});

app.directive('previewBackCover', function () {
  return {
    templateUrl: 'app/main/template/preview-back-cover.html'
  }
});

app.directive('previewSinglePage',function(){
  return {
   restirct:'E',
    scope:{
      pageInfo:'=page'
    }
  }
});

app.directive('leftSidebarImage',function(){
  return {
    restirct:'E',

    scope:{
      group: '='
    },
    templateUrl:'app/components/sidebar/imageSections.html'
  }
});

app.directive('navBar', function () {
  return {
    templateUrl: 'app/components/navbar/navbar.html'
  }
});

app.directive('navBar2', function ($timeout) {

  $timeout(function(){

  });

    return {
    templateUrl: 'app/components/navbar/navbar-2.html'
  }
});

app.directive('navBar3', function () {
  return {
    templateUrl: 'app/components/navbar/navbar-3.html'
  }
});

app.directive('sideBarLeft', function () {
  return {
    templateUrl: 'app/components/sidebar/leftSidebar.html'
  }
});

app.directive('topBarCommand',function($window){
  return {
    templateUrl: 'app/main/template/topCommandBar.html'
  }
});

app.directive('coverDesignRight',function(){
  return {
    templateUrl:'app/main/template/cover-design-right.html'
  }
});

app.directive('frontCoverDesignBak',function($window){
  var t = ($('#bigPagePanel')).width();
  var w =  (t - 20) /2 ;

  var h = w / 1.375;
  console.log('front cover design', w);

  var canW = w *0.65 ;
  var canH = h *0.65 ;

  return {
    templateUrl: 'app/main/template/front-cover-design.html',
    link : function(scope, elem, attrs) {
      console.log(scope.PhotoBook);
      $(".front-cover-left").css('height',h +"px");
      $(".front-cover-left").css('width',w +"px");

      $(".front-cover-left>img").css('width',canW +"px");
      $(".front-cover-left>img").css('height',canH +"px");
    }
  }
});


app.directive('backCoverDesign',function($window){

  var w = ($(window).width() - 250 - 30) / 2 - 20
  var h = w / 1.375;
  console.log('front cover design');
  console.log(w);

  var canW = w *0.6 ;
  var canH = h *0.6 ;

  return {
    templateUrl: 'app/main/template/back-cover-design.bak.html',
    link : function(scope, elem, attrs) {
      $(".front-cover-left").css('height',h +"px");
      $(".front-cover-left").css('width',w +"px");
      $(".front-cover-left>img").css('width',canW +"px");
      $(".front-cover-left>img").css('height',canH +"px");
    }
  }
});

app.directive('backCoverDesignRight', function () {
  return {
    templateUrl: 'app/main/template/back-cover-design-right.html'
  };
});

