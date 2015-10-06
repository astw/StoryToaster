(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $document, config, imageService, PhotoBook) {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1442106873263;

    vm.PhotoBook = new PhotoBook();
    var totalPages = vm.PhotoBook.totalPage;
    var pagesInDesignView = 2;   // how many pages in the design
    vm.doublePagesInDesign = true;
    $scope.doublePagesInDesign = true;

    vm.contentPageMode = true;

    vm.currentPage = vm.PhotoBook.pages[0];
    vm.currentPage.active = true;

    // vm.left_canvas = new fabric.Canvas('left_canvas');
    // vm.right_canvas = new fabric.Canvas('right_canvas');
    // vm.left_canvas.active = true;

    var currentCanvas = vm.left_canvas;

    $timeout(function(){

    });
    $scope.$on('$viewContentLoaded', function(document){

    });

    angular.element(document).ready(function(){
      //  Core.init();

      // vm.left_canvas = new fabric.Canvas('left_canvas');
      // vm.right_canvas = new fabric.Canvas('right_canvas');

    });
    var hookEvents = function () {
      //vm.left_canvas.on('mouse:down', function (options) {
      //  vm.left_canvas.active = true;
      //  vm.right_canvas.active = false;
      //  currentCanvas = vm.left_canvas;
      //});
      //
      //vm.right_canvas.on('mouse:down', function (options) {
      //  vm.right_canvas.active = true;
      //  vm.left_canvas.active = false;
      //  currentCanvas = vm.right_canvas;
      //});
      //
      //vm.left_canvas.on('selection:cleared', function (options) {
      //  console.log('de-selected');
      //});
    };

    hookEvents();

    $scope.groups = imageService.getImages();

    vm.selectLeft = function () {
      currentCanvas = vm.left_canvas;
      vm.PhotoBook.setPageActive(vm.PhotoBook.leftDesignPage);
    };

    vm.selectRight = function () {
      currentCanvas = vm.right_canvas;
      vm.PhotoBook.setPageActive(vm.PhotoBook.rightDesignPage);
    };

    vm.addImage = function (imageUrl) {
      if(vm.PhotoBook.pages.length < 1) return ;
      if(vm.PhotoBook.leftDesignPage && vm.PhotoBook.leftDesignPage.active)
         currentCanvas = vm.left_canvas;
      else if(vm.PhotoBook.rightDesignPage){
        currentCanvas = vm.right_canvas;
      }

      imageUrl = "http://localhost:3000" + imageUrl;
      fabric.Image.fromURL(imageUrl, function (img) {
        currentCanvas.add(img);
        //currentCanvas.page.previewImage = currentCanvas.toDataURL();
        backCurrentDesignData();
      }, {crossOrigin: 'Anonymous'});
    };

    vm.addText = function () {
      var txtBox = new fabric.IText("IText", {
        fontSize: 18,
        //fontFamily: 'Arial',
        textAlign: 'center',
        width: 120,
        height: 60
      });
      currentCanvas.add(txtBox);
    };

    vm.frontCoverClick = function(){
      vm.contentPageMode = false;
      vm.dedicatePageMode = false;
      vm.frontCoverMode = true;
      vm.backCoverMode = false;

      backCurrentDesignData();
      vm.PhotoBook.setFrontCoverActive();
    };

    vm.dedicatedPageClick = function(){
      vm.contentPageMode = false;
      vm.dedicatePageMode = true;
      vm.frontCoverMode = false;
      vm.backCoverMode = false;

      backCurrentDesignData();
      vm.PhotoBook.setDedicatedPageActive();
    };

    vm.backCoverClick = function(){
      vm.contentPageMode = false;
      vm.dedicatePageMode = false;
      vm.frontCoverMode = false;
      vm.backCoverMode = true;

      backCurrentDesignData();
      vm.PhotoBook.setBackCoverActive();
    };

    vm.previewClick = function (page,which) {
      vm.contentPageMode = true;
      vm.dedicatePageMode = false;
      vm.frontCoverMode = false;
      vm.backCoverMode = false;

      backCurrentDesignData();
      vm.PhotoBook.setPageActive(page);
      if (which === 'left') {
        currentCanvas = vm.left_canvas;
        vm.PhotoBook.leftDesignPage = page;
        vm.PhotoBook.rightDesignPage = vm.PhotoBook.getNextPage(page);
      }
      else if(which == 'right') {
        currentCanvas = vm.right_canvas;
        vm.PhotoBook.rightDesignPage = page;
      }
      vm.left_canvas.clear();
      vm.right_canvas.clear();

      vm.restoreToCurrentDesignData();
    };

    vm.nextPage = function () {
      vm.left_canvas.clear();
      vm.right_canvas.clear();

      vm.PhotoBook.MoveToNextPage();

      vm.restoreToCurrentDesignData();
    };

    vm.previousPage = function (currentIndex) {
      vm.PhotoBook.MoveToPreviousPage();
      vm.restoreToCurrentDesignData();
    };

    vm.singlePage = function(){
      if(vm.doublePagesInDesign == true)
      {
        vm.doublePagesInDesign = false;
        $scope.doublePagesInDesign = false;
      }
      else
        return;

      $('#pageDesignPanel')[0].innerHTML ="";
      vm.PhotoBook.pagesInDesign = 1;
    };

    vm.doublePage = function() {
      if(vm.doublePagesInDesign == false){
        vm.doublePagesInDesign = true;
        $scope.doublePagesInDesign = true;
      }
      else
       return;

      $('#pageDesignPanel')[0].innerHTML = "";
      vm.PhotoBook.pagesInDesign = 2
    };

    var backCurrentDesignData = function () {
      if(!vm.PhotoBook || !vm.PhotoBook || !vm.PhotoBook.leftDesignPage) return ;
      vm.PhotoBook.leftDesignPage.imageData = JSON.stringify(vm.left_canvas);
      if (vm.doublePagesInDesign && vm.PhotoBook.rightDesignPage) {
        vm.PhotoBook.rightDesignPage.imageData = JSON.stringify(vm.right_canvas);
      }
      generatePreviewImage();
    };

    vm.restoreToCurrentDesignData = function () {

      if(vm.PhotoBook.leftDesignPage) {
        var leftData = vm.PhotoBook.leftDesignPage.imageData;
        if (leftData)
          vm.left_canvas.loadFromJSON(leftData, vm.left_canvas.renderAll.bind(vm.left_canvas), function () {
          });
      }

      if (vm.doublePagesInDesign && vm.PhotoBook.rightDesignPage) {
        var rightData = vm.PhotoBook.rightDesignPage.imageData;
        if (rightData)
          vm.right_canvas.loadFromJSON(rightData, vm.right_canvas.renderAll.bind(vm.right_canvas), function () {
          })
      }
    };

    var generatePreviewImage = function () {
      vm.PhotoBook.leftDesignPage.previewImage = vm.left_canvas.toDataURL();
      if (vm.doublePagesInDesign && vm.PhotoBook.rightDesignPage) {
        vm.PhotoBook.rightDesignPage.previewImage = vm.right_canvas.toDataURL();
      }
    };

    vm.deleteObject = function () {
      if (vm.currentPage.left.active) {
        var obj = vm.left_canvas.getActiveObject();
        vm.left_canvas.remove(obj);
        vm.currentPage.left.previewImage = vm.left_canvas.toDataURL();
      }
      else {
        var obj = vm.right_canvas.getActiveObject();
        vm.right_canvas.remove(obj);
        vm.currentPage.right.previewImage = vm.right_canvas.toDataURL();
      }
    };

    vm.newPage = function () {
      vm.PhotoBook.createPage();
    };

    vm.copyPage = function () {
      backCurrentDesignData();

      vm.PhotoBook.copyPage(vm.currentPage);
      vm.restoreToCurrentDesignData();
    };

    vm.deletePage = function () {
       vm.left_canvas.clear();
      vm.right_canvas.clear()
      vm.PhotoBook.deletePage(vm.currentPage);
      vm.restoreToCurrentDesignData();
    };

    vm.saveToServe = function () {
      vm.PhotoBook.saveToServer();
    };

    vm.nextSaveToImage = function () {
      $scope.preview_image = vm.left_canvas.toDataURL();
      //var preview_image = $document.find('#preview_image');
      //var preview_image =  $document.find('preview_image');  /// $('#preview_image');
      var preview_image = $(event.target).find('#preview_image');
      preview_image = $("#preview_image");
      preview_image.src = image;
      preview_image.attr('src', image);
    };

    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }
})();
