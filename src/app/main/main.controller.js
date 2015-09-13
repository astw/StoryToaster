(function() {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope,$document) {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1442106873263;
     vm.pages = [];
    var totalPages = 16;
    for(var i=0; i< totalPages; i++){
      var page ={left:{},right:{}};
      page.pageNumber = i;

      page.left.sheetNumber = (i) * 2 + 1 ;
      page.left.data =i;
      page.left.active = false;

      page.right.sheetNumber = (i)*2 + 2;
      page.right.data = i + 1;
      page.right.active = false;

      vm.pages.push(page);
    };

    vm.currentPage = vm.pages[0];
    vm.currentPage.left.active = true;

    vm. left_canvas = new fabric.Canvas('left_canvas');
    vm. right_canvas = new fabric.Canvas('right_canvas');

    var currentPageNum = 0;

    $scope.groups = [
      {
        title: '卡通图片 ',
        content: '卡通图片',
        images:[
          "/assets/images/1.gif",
          "/assets/images/128px-Speech_balloon.svg.png",
          "/assets/images/2.gif",
          "/assets/images/256px-Speech_balloon.svg.png",
          "/assets/images/3.gif",
          "/assets/images/32px-Speech_balloon.svg.png",
          "/assets/images/4.gif",
          "/assets/images/5.gif",
          "/assets/images/512px-Speech_balloon.svg.png",
          "/assets/images/6.gif",
          "/assets/images/64px-Speech_balloon.svg.png",
          "/assets/images/Speech_balloon.svg",
          "/assets/images/speachBolloon-1.svg",
          "/assets/images/callout/callout_rectangle_right/callout_rectangle_right.svg"
        ]
      },
      {
        title: '故事场景',
        content: '故事场景',
        images:[
          "/assets/images/1.gif",
          "/assets/images/128px-Speech_balloon.svg.png",
          "/assets/images/2.gif",
          "/assets/images/256px-Speech_balloon.svg.png",
          "/assets/images/3.gif",
          "/assets/images/32px-Speech_balloon.svg.png",
          "/assets/images/4.gif",
          "/assets/images/5.gif",
          "/assets/images/512px-Speech_balloon.svg.png",
          "/assets/images/6.gif",
          "/assets/images/64px-Speech_balloon.svg.png",
          "/assets/images/Speech_balloon.svg",
          "/assets/images/speachBolloon-1.svg"
        ]
      },
      {
        title: '文字',
        content: '文字',
        images:[
          "/assets/images/1.gif",
          "/assets/images/128px-Speech_balloon.svg.png",
          "/assets/images/2.gif",
          "/assets/images/256px-Speech_balloon.svg.png",
          "/assets/images/3.gif",
          "/assets/images/32px-Speech_balloon.svg.png",
          "/assets/images/4.gif",
          "/assets/images/5.gif",
          "/assets/images/512px-Speech_balloon.svg.png",
          "/assets/images/6.gif",
          "/assets/images/64px-Speech_balloon.svg.png",
          "/assets/images/Speech_balloon.svg",
          "/assets/images/speachBolloon-1.svg"
        ]
      }

    ];

    vm.selectLeft = function(page){
      vm.pages.forEach(function(page){
        if(page === vm.currentPage){
          page.left.active = true;
          page.right.active = false;
        }
        else {
          page.left.active = page.right.active = false;
        }
      });
    };
    vm.selectRight = function(){
      vm.pages.forEach(function(page){
         if(page === vm.currentPage){
           page.left.active = false;
           page.right.active = true;
         }
        else {
           page.left.active = page.right.active = false;
         }
      });
    };

    vm.addImage = function(imageUrl){
      imageUrl = "http://localhost:3000" + imageUrl;
      fabric.Image.fromURL(imageUrl, function(img) {
        console.log(vm.left_canvas == true);
        if(vm.currentPage.left.active == true)
           vm.left_canvas.add(img);
        else
           vm.right_canvas.add(img);
      });
    };

    vm.addText = function(){

      var txtBox = new fabric.IText ("IText", {
        fontSize: 18,
        //fontFamily: 'Arial',
        textAlign: 'center',
        width: 120,
        height: 60
      });
      if(vm.leftActive == true)
        vm.left_canvas.add(txtBox);
      else
        vm.right_canvas.add(txtBox);
    };

    vm.previewClick = function(page,which) {
       if(vm.currentPage != page) {
        backCurrentDesignData();
        vm.currentPage = page;
        vm.left_canvas.clear();
        vm.right_canvas.clear();
        restoreToCurrentDesignData()
      }

      for (var i = 0; i < vm.pages.length; i++) {
        vm.pages[i].left.active = false;
        vm.pages[i].right.active = false;
      }
      if (which === 'left') {
        page.left.active = true;
      }
      else {
        page.right.active = true;
      }
    };

    vm.nextPage = function(){
      backCurrentDesignData();
      vm.left_canvas.clear();
      vm.right_canvas.clear();
    };

    vm.previousPage = function(currentIndex){
      backCurrentDesignData();
    };

    var backCurrentDesignData = function(){
      vm.currentPage.left.imageData = JSON.stringify(vm.left_canvas);//   vm.left_canvas.toDataURL();
      vm.currentPage.right.imageData =JSON.stringify(vm.right_canvas) ;// vm.right_canvas.toDataURL();
    };

    var restoreToCurrentDesignData = function(){
      var leftData = vm.currentPage.left.imageData;
      var rightData =vm.currentPage.right.imageData;

      if(leftData)
      vm.left_canvas.loadFromJSON(leftData,vm.left_canvas.renderAll.bind(vm.left_canvas),function(){});
      if(rightData)
      vm.right_canvas.loadFromJSON(rightData,vm.right_canvas.renderAll.bind(vm.right_canvas),function(){});
    };

    vm.nextSaveToImage = function() {

      //var preview_image = $document.find('#preview_image');
      //var preview_image =  $document.find('preview_image');  /// $('#preview_image');
      var preview_image = $(event.target).find('#preview_image');
      preview_image = $("#preview_image");
      preview_image.src = image;
      preview_image.attr('src', image);
    };

    vm.clickMe = function clickMe(){
      alert('click me');
    }
  }
})();
