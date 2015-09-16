(function() {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope,$document,bookRepository, config) {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1442106873263;
    vm.pages = [];
    vm.book ={};

    vm.book = {
      title:"this is created on frontend",
      desc:"this is my designed book",
      author:3,
      data:JSON.stringify(vm.pages)
    };

    var totalPages = 16;
    var pagesInDesignView = 2;   // how many pages in the design view
    for(var i=0; i< totalPages; i++){
      var page ={};
      page.pageNumber = i;

      page.data =i;
      page.active = false;

      vm.pages.push(page);
    };

    vm.currentPage = vm.pages[0];
    vm.currentPage.active = true;

    vm. left_canvas = new fabric.Canvas('left_canvas');
    vm. right_canvas = new fabric.Canvas('right_canvas');
    vm.left_canvas.active = true;
    vm.left_canvas.page = vm.pages[0];

    if(pagesInDesignView == 2){
      vm.right_canvas.page = vm.pages[1];
    };


    var currentCanvas = vm.left_canvas;

    var hookEvents = function(){
      vm.left_canvas.on('mouse:down',function(options){
        vm.left_canvas.active = true;
        vm.right_canvas.active = false;
        currentCanvas = vm.left_canvas;
      });

      vm.right_canvas.on('mouse:down',function(options){
        vm.right_canvas.active =true;
        vm.left_canvas.active =false;
        currentCanvas = vm.right_canvas;
      });

      vm.left_canvas.on('selection:cleared',function(options){
        console.log('de-selected');
      });
    };

    hookEvents();
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

    vm.selectLeft = function(page) {
      clearActive();
      currentCanvas = vm.left_canvas;
      vm.left_canvas.active = true;
    };

    vm.selectRight = function(page){
      clearActive();
      currentCanvas = vm.right_canvas;
      vm.right_canvas.active = true;
    };

    vm.addImage = function(imageUrl){
      imageUrl = "http://192.168.0.14:3000" + imageUrl;
      fabric.Image.fromURL(imageUrl, function(img) {
        currentCanvas.add(img);
        currentCanvas.page.previewImage = currentCanvas.toDataURL();
      },{ crossOrigin: 'Anonymous' });
    };

    vm.addText = function(){

      var txtBox = new fabric.IText ("IText", {
        fontSize: 18,
        //fontFamily: 'Arial',
        textAlign: 'center',
        width: 120,
        height: 60
      });
      currentCanvas.add(txtBox);
    };
    vm.previewClick = function(page,which) {
       if(vm.currentPage != page) {
        backCurrentDesignData();
        vm.currentPage = page;
        vm.left_canvas.clear();
        vm.right_canvas.clear();
        restoreToCurrentDesignData()
      }

      clearActive();

      if (which === 'left') {
        currentCanvas = vm.left_canvas;
      }
      else {
        currentCanvas = vm.right_canvas;
      }

      currentCanvas.active = true;
    };

    vm.nextPage = function(){
      var leftPageNumber = vm.left_canvas.page.pageNumber;
      if((pagesInDesignView == 1 && leftPageNumber == (totalPages -1))==true)
        // last one
        return ;

      if((pagesInDesignView == 2 && leftPageNumber == (totalPages -2)) == true);
        return ;

      var fromIndex = 0;
      var toIndex = 0;
      if (pagesInDesignView == 2) {
        fromIndex = leftPageNumber + 2;
         toIndex = leftPageNumber + 3;
      }
      else{
        fromIndex = toIndex =  leftPageNumber + 1;
      }

      if (fromIndex >= totalPages -1)
        fromIndex = totalPages -1;

      if (toIndex >= totalPages -1)
        toIndex = totalPages -1;

      var toPages = vm.pages.slice(fromIndex, toIndex + 1);;
        changePageTo(toPages)
    };

    vm.previousPage = function(currentIndex) {

      var leftPageNumber = vm.left_canvas.page.pageNumber;
      if(leftPageNumber == 0) return;

      var fromIndex =0;
      var toIndex =0;
      if (pagesInDesignView == 2) {
          fromIndex = leftPageNumber -2;
          toIndex = leftPageNumber -1;
      }
      else{
        fromIndex = toIndex =  leftPageNumber -1
      }

      if (toIndex < 0)
        toIndex = 0;

      if (fromIndex < 0)
        fromIndex = 0;


      var toPages =  vm.pages.slice(fromIndex, toIndex + 1);
      changePageTo(toPages)
    };

    var changePageTo = function(toPages){
      backCurrentDesignData();

      vm.left_canvas.clear();
      vm.right_canvas.clear();
      vm.right_canvas.page = null;
      vm.left_canvas.page = toPages[0];
      if(pagesInDesignView == 2){
        vm.right_canvas.page = toPages[1];
      };

      restoreToCurrentDesignData();
    };

    var clearActive = function(){
       vm.pages.forEach(function(p){
         p.active = false;
       })
    };

    var backCurrentDesignData = function(){

      vm.left_canvas.page.imageData = JSON.stringify(vm.left_canvas);//   vm.left_canvas.toDataURL();
      if(pagesInDesignView == 2){
        vm.right_canvas.page.imageData = JSON.stringify(vm.right_canvas) ;// vm.right_canvas.toDataURL();
      }

      generatePreviewImage();
    };

    var restoreToCurrentDesignData = function(){
      var leftData = vm.left_canvas.page.imageData;
      if(leftData)
        vm.left_canvas.loadFromJSON(leftData,vm.left_canvas.renderAll.bind(vm.left_canvas),function(){});

      if(pagesInDesignView == 2 ) {
        var rightData = vm.right_canvas.page.imageData;
        if(rightData)
          vm.right_canvas.loadFromJSON(rightData,vm.right_canvas.renderAll.bind(vm.right_canvas),function(){})
      }
    };

    var generatePreviewImage = function(){
      vm.left_canvas.page.previewImage = vm.left_canvas.toDataURL();
      if(pagesInDesignView == 2){
        vm.right_canvas.page.previewImage = vm.right_canvas.toDataURL();
      }
    };

    vm.deleteObject = function(){
      if(vm.currentPage.left.active){
        var obj = vm.left_canvas.getActiveObject();
        vm.left_canvas.remove(obj);
        vm.currentPage.left.previewImage = vm.left_canvas.toDataURL();
      }
      else{
        var obj = vm.right_canvas.getActiveObject();
        vm.right_canvas.remove(obj);
        vm.currentPage.right.previewImage = vm.right_canvas.toDataURL();
      }
    };

    vm.newPage = function(){

      var page ={left:{},right:{}};
      page.pageNumber = vm.currentPage.pageNumber + 1;

      page.left.sheetNumber = (page.pageNumber) * 2 + 1 ;
      page.left.data =i;
      page.left.active = false;


    };

    vm.copyPage = function(){
       var newPage = vm.currentPage.left
    };

    vm.deletePage = function(){

    }

    vm.saveToServe = function() {

      //remove the preview image to reduce size;
      for(var i=0;i < vm.pages.length; i++){
        var page = vm.pages[i];
        delete page.left.previewImage;
        delete page.right.previewImage;
      }

      vm.book.data = JSON.stringify(vm.pages)

      if (!vm.book.id) {
        // this is a new book
        // upload to create a new

        bookRepository.createOneBook(vm.book).then(function (res) {
            vm.book = res.data;
          },
          function (err) {
            console.log(err);
          })
      }
      else {
        // this is an existing book,
        // upload to update
        vm.book.title = "this is changed title" + Date.now().toString();
        bookRepository.updateBook(vm.book).then(
          function (res) {
            vm.book = res.data;
          },
          function (err) {
            console.log(err);
          })
      }
    };
    vm.nextSaveToImage = function() {
      $scope.preview_image = vm.left_canvas.toDataURL();
      //var preview_image = $document.find('#preview_image');
      //var preview_image =  $document.find('preview_image');  /// $('#preview_image');
      var preview_image = $(event.target).find('#preview_image');
      preview_image = $("#preview_image");
      preview_image.src = image;
      preview_image.attr('src', image);
    };

    var currentObj = {};
  }
})();
