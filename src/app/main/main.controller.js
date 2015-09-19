(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $document, bookRepository, config, imageService, PhotoBook) {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1442106873263;
    vm.pages = [];
    vm.book = {};

    vm.PhotoBook = new PhotoBook();
    var totalPages = vm.PhotoBook.totalPage;
    var pagesInDesignView = 2;   // how many pages in the design

    vm.currentPage = vm.PhotoBook.pages[0];
    vm.currentPage.active = true;

    vm.left_canvas = new fabric.Canvas('left_canvas');
    vm.right_canvas = new fabric.Canvas('right_canvas');
    vm.left_canvas.active = true;

    vm.left_canvas.page = vm.PhotoBook.pages[0];

    if (pagesInDesignView == 2) {
      vm.right_canvas.page = vm.PhotoBook.pages[1];
    };

    var currentCanvas = vm.left_canvas;

    var hookEvents = function () {
      vm.left_canvas.on('mouse:down', function (options) {
        vm.left_canvas.active = true;
        vm.right_canvas.active = false;
        currentCanvas = vm.left_canvas;
      });

      vm.right_canvas.on('mouse:down', function (options) {
        vm.right_canvas.active = true;
        vm.left_canvas.active = false;
        currentCanvas = vm.right_canvas;
      });

      vm.left_canvas.on('selection:cleared', function (options) {
        console.log('de-selected');
      });
    };

    hookEvents();

    $scope.groups = imageService.getImages();

    vm.selectLeft = function () {
      currentCanvas = vm.left_canvas;
      vm.PhotoBook.setPageActive(vm.left_canvas.page);
    };

    vm.selectRight = function () {
      currentCanvas = vm.right_canvas;
      vm.PhotoBook.setPageActive(vm.right_canvas.page);
    };

    vm.addImage = function (imageUrl) {
      imageUrl = "http://localhost:3000" + imageUrl;
      fabric.Image.fromURL(imageUrl, function (img) {
        currentCanvas.add(img);
        currentCanvas.page.previewImage = currentCanvas.toDataURL();
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
    vm.previewClick = function (page,which) {
      vm.PhotoBook.setPageActive(page);

      if (vm.currentPage != page) {
        backCurrentDesignData();
        vm.currentPage = page;
        vm.left_canvas.clear();
        vm.right_canvas.clear();
        restoreToCurrentDesignData()
      }

      page.active = true;
      if (which === 'left') {
        currentCanvas = vm.left_canvas;
      }
      else {
        currentCanvas = vm.right_canvas;
      }
      currentCanvas.page = page;
    };

    vm.nextPage = function () {

      var leftPageNumber =  vm.PhotoBook.pages.indexOf(vm.left_canvas.page);
      if ((pagesInDesignView == 1 && leftPageNumber == (totalPages - 1)) == true)
      // last one
        return;

      if ((pagesInDesignView == 2) && (leftPageNumber == (totalPages - 2)))
        return;

      var fromIndex = 0;
      var toIndex = 0;
      if (pagesInDesignView == 2) {
        fromIndex = leftPageNumber + 2;
        toIndex = leftPageNumber + 3;
      }
      else {
        fromIndex = toIndex = leftPageNumber + 1;
      }

      if (fromIndex >= totalPages - 1)
        fromIndex = totalPages - 1;

      if (toIndex >= totalPages - 1)
        toIndex = totalPages - 1;
      currentCanvas.page.active = false;
      var toPages = vm.PhotoBook.pages.slice(fromIndex, toIndex + 1);
      ;
      changePageTo(toPages)
    };

    vm.previousPage = function (currentIndex) {

      var leftPageNumber = vm.PhotoBook.pages.indexOf(vm.left_canvas.page);
      if (leftPageNumber == 0) return;

      var fromIndex = 0;
      var toIndex = 0;
      if (pagesInDesignView == 2) {
        fromIndex = leftPageNumber - 2;
        toIndex = leftPageNumber - 1;
      }
      else {
        fromIndex = toIndex = leftPageNumber - 1
      }

      if (toIndex < 0)
        toIndex = 0;

      if (fromIndex < 0)
        fromIndex = 0;

      currentCanvas.page.active = false;

      var toPages = vm.PhotoBook.pages.slice(fromIndex, toIndex + 1);
      changePageTo(toPages)
    };

    var changePageTo = function (toPages) {
      backCurrentDesignData();

      vm.left_canvas.clear();
      vm.right_canvas.clear();
      vm.right_canvas.page = null;
      vm.left_canvas.page = toPages[0];
      vm.left_canvas.page.active = true;
      if (pagesInDesignView == 2) {
        vm.right_canvas.page = toPages[1];
      }
      ;
      currentCanvas = vm.left_canvas;
      restoreToCurrentDesignData();
    };

    var backCurrentDesignData = function () {

      vm.left_canvas.page.imageData = JSON.stringify(vm.left_canvas);
      if (pagesInDesignView == 2) {
        vm.right_canvas.page.imageData = JSON.stringify(vm.right_canvas);
      }

      generatePreviewImage();
    };

    var restoreToCurrentDesignData = function () {
      var leftData = vm.left_canvas.page.imageData;
      if (leftData)
        vm.left_canvas.loadFromJSON(leftData, vm.left_canvas.renderAll.bind(vm.left_canvas), function () {
        });

      if (pagesInDesignView == 2 && vm.right_canvas.page) {
        var rightData = vm.right_canvas.page.imageData;
        if (rightData)
          vm.right_canvas.loadFromJSON(rightData, vm.right_canvas.renderAll.bind(vm.right_canvas), function () {
          })
      }
    };

    var generatePreviewImage = function () {
      vm.left_canvas.page.previewImage = vm.left_canvas.toDataURL();
      if (pagesInDesignView == 2) {
        vm.right_canvas.page.previewImage = vm.right_canvas.toDataURL();
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
      vm.currentPage.active = false;
      var newPage = vm.PhotoBook.copyPage(vm.currentPage);
      newPage.active = true;
      vm.currentPage = newPage;

      if(currentCanvas == vm.left_canvas){
        vm.right_canvas.page = newPage;
        if(pagesInDesignView == 2){
          currentCanvas = vm.right_canvas;
        }
      }
      else{
        vm.left_canvas.page = newPage;
        vm.right_canvas.page = null;
        vm.right_canvas.clear();
        var nextPage = vm.PhotoBook.getNextPage(newPage);
        vm.right_canvas.page = nextPage;
        currentCanvas = vm.left_canvas;
      }

      restoreToCurrentDesignData();
    };

    vm.deletePage = function () {
      backCurrentDesignData();
      var next = vm.PhotoBook.getNextPage(vm.currentPage);
      vm.left_canvas.clear();
      vm.right_canvas.clear();
      vm.left_canvas.page = next;
      vm.right_canvas.page = vm.PhotoBook.getNextPage(next);
      vm.PhotoBook.deletePage(vm.currentPage);
      restoreToCurrentDesignData();
    };

    vm.saveToServe = function () {

      //remove the preview image to reduce size;
      for (var i = 0; i < vm.pages.length; i++) {
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
    vm.nextSaveToImage = function () {
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
