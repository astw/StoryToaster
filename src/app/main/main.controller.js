(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,
                          relayService,
                          $scope,
                          $window,
                          imageService,
                          PhotoBook,
                          bookRepository,
                          config,
                          fabricJSExt) {
    console.log('----------- in main controller ---------------');

    var vm = this;

    vm.PhotoBook = new PhotoBook();
    vm.PhotoBook.pagesInDesign = 2;
    vm.contentPageMode = true;
    vm.currentPage = vm.PhotoBook.pages[0];
    vm.currentPage.active = true;

    var temp = relayService.getKeyValue('_selectedBook_') && relayService.getKeyValue('_selectedBook_').data;
    vm.selectedBook = temp ? JSON.parse(relayService.getKeyValue('_selectedBook_').data) : null;

    var currentCanvas = vm.left_canvas;

    $scope.groups = imageService.getImages();

    activate();

    angular.element(document).ready(documentReady);

    //---------------------------------------------------- methods
    vm.clickOnTool = clickOnTool;
    vm.removeBackground = removeBackground;
    vm.clickBook = clickBook;
    vm.changeTitleFont = changeTitleFont;
    vm.changeTitleColor = changeTitleColor;
    vm.changeAuthorFont = changeAuthorFont;
    vm.changeAuthorColor = changeAuthorColor;
    vm.changeBackgroundColor = changeBackgroundColor;
    vm.readBook = readBook;
    vm.coverImageSelected = coverImageSelected;
    vm.backCoverImageSelected = backCoverImageSelected;
    vm.selectLeft = selectLeft;
    vm.selectRight = selectRight;
    vm.addImage = addImage;
    vm.addText = addText;
    vm.frontCoverClick = frontCoverClick;
    vm.dedicatedPageClick = dedicatedPageClick;
    vm.backCoverClick = vm.backCoverClick;
    vm.previewClick = previewClick;
    vm.nextPage = nextPage;
    vm.previousPage = previousPage;
    vm.backCurrentDesignData = backCurrentDesignData;
    vm.restoreToCurrentDesignData = restoreToCurrentDesignData;
    vm.generatePreviewImage = generatePreviewImage;
    vm.deleteObject = deleteObject;
    vm.newPage = newPage;
    vm.copyPage = copyPage;
    vm.deletePage = deletePage;
    vm.saveToServe = saveToServe;
    vm.finishCreateBook = finishCreateBook;
    vm.nextSaveToImage = nextSaveToImage;
//---------------------------------------------------- methods end


//---------------------------------------------------- test data start
    $scope.test = 'this is a test ';

    $scope.customSettings = {
      control: 'brightness',
      theme: 'bootstrap',
      position: 'top left'
    };

    $scope.brightnesssettings = {
      control: 'brightness'
    };

// JS
    $scope.optionsColumn = {
      columns: 4,
      roundCorners: true,
      size: 40
    };

    $scope.colours = [{
      name: "Red",
      hex: "#F21B1B"
    }, {
      name: "Blue",
      hex: "#1B66F2"
    }, {
      name: "Green",
      hex: "#07BA16"
    }];

    $scope.colour = "";

    function addText() {
      var txtBox = new fabric.IText("IText", {
        fontSize: 18,
        //fontFamily: 'Arial',
        textAlign: 'center',
        width: 120,
        height: 60
      });
      v.add(txtBox);
    }


//------------------------------------------------------ test data ends


//------------------------------------------------------ listen events

    $scope.$on('$viewContentLoaded', documentReady);

    $scope.$on('pageChanged', function (event, args) {
      backCurrentDesignData();

      //if (!args || !args.canvas) return;
      //
      //args.page.imageData = JSON.stringify(args.canvas);
      //args.page.previewImage = args.canvas.toDataURL();
    });

    $scope.$on('addImage', function (event, args) {
      console.log(args);
      var imageUrl = args.imageUrl;
      var operation = args.operation;
      if (operation === 'background') {
        //add for backgroupd
        vm.addImage(imageUrl, true);
      }
      else if (operation === 'props') {
        vm.addImage(imageUrl);
      }
      else {
        // add for text
      }
    });
//------------------------------------------------------ listen events end

    function activate() {
      imageService.getBackgroundImages()
        .then(
        function (data) {
          $scope.backgroundGroup = data;
        });

      imageService.getPropsImages().then(
        function (data) {
          vm.propsGroup = data
        });

      fabricJSExt.init();
    }


//------------------------------------------------------ tool items start

    function clickOnTool(event) {
      if (!currentCanvas) return;

      var activeObj = currentCanvas.getActiveObject();
      if (!activeObj) return;
      if (event === 'delete') {
        activeObj.remove();
      } else if (event === 'copy') {
        activeObj.copy();
      } else if (event === 'bringToFront') {
        activeObj.bringForward();
      } else if (event === 'sendToBack') {
        activeObj.sendBackwards();
      } else if (event === 'flipX') {
        activeObj.flipByX();
      } else if (event === 'flipY') {
        activeObj.flipByY();
      }
    }

    //------------------------------------------------------ tool items start

    function removeBackground() {
      currentCanvas.backgroundImage = null;
      backCurrentDesignData();
    }

    function clickBook(book) {
      relayService.putKeyValue('_selectedBook_', book);
      vm.selectedBook = book;
      console.log('click on book');
    }

    function changeTitleFont() {
      console.log('in main controller  change title font ');
    }

    function changeTitleColor() {
      console.log('in main controller change title color')
    }

    function changeAuthorFont() {
      console.log('in main controller  change author font ');
    }

    function changeAuthorColor() {
      console.log('in main controller change author color')
    }

    function changeBackgroundColor() {
      console.log('in main controller change book back color');
      console.log(vm.PhotoBook.backgroundColor);
    }

    function readBook(book) {
      console.log('read book');
      console.log(book);
    }

    function coverImageSelected(item, model) {
      if (item)
        vm.PhotoBook.frontCoverImageIndex = item.index;
    }

    function backCoverImageSelected(item, model) {
      if (item)
        vm.PhotoBook.backCoverImageIndex = item.index;
    }

    function selectLeft() {
      if (currentCanvas == vm.left_canvas) return;
      if (currentCanvas) {
        currentCanvas.deactivateAllWithDispatch().renderAll();
      }
      currentCanvas = vm.left_canvas;
      vm.PhotoBook.setPageActive(vm.PhotoBook.leftDesignPage);
    }

    function selectRight() {
      if (currentCanvas == vm.right_canvas) return;
      if (currentCanvas) {
        currentCanvas.deactivateAllWithDispatch().renderAll();
      }
      currentCanvas = vm.right_canvas;
      vm.PhotoBook.setPageActive(vm.PhotoBook.rightDesignPage);
    }

    function addImage(imageUrl, isBackground) {
      if (vm.PhotoBook.pages.length < 1) return;
      if (vm.PhotoBook.leftDesignPage && vm.PhotoBook.leftDesignPage.active)
        currentCanvas = vm.left_canvas;
      else if (vm.PhotoBook.rightDesignPage) {
        currentCanvas = vm.right_canvas;
      }

      if (!isBackground) {
        imageUrl = "http://localhost:3000" + imageUrl;
        currentCanvas.addImageObject(imageUrl);
      } else {
        currentCanvas.addBackgroundImage(imageUrl);
      }
    }

    function frontCoverClick() {
      vm.contentPageMode = false;
      vm.dedicatePageMode = false;
      vm.frontCoverMode = true;
      vm.backCoverMode = false;

      backCurrentDesignData();
      vm.PhotoBook.setFrontCoverActive();
    }

    function dedicatedPageClick() {
      vm.contentPageMode = false;
      vm.dedicatePageMode = true;
      vm.frontCoverMode = false;
      vm.backCoverMode = false;

      backCurrentDesignData();
      vm.PhotoBook.setDedicatedPageActive();
    }

    function backCoverClick() {
      vm.contentPageMode = false;
      vm.dedicatePageMode = false;
      vm.frontCoverMode = false;
      vm.backCoverMode = true;

      backCurrentDesignData();
      vm.PhotoBook.setBackCoverActive();
    }

    function previewClick(page, which) {
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
      } else if (which == 'right') {
        currentCanvas = vm.right_canvas;
        vm.PhotoBook.rightDesignPage = page;
      }
      vm.left_canvas.clear();
      vm.right_canvas.clear();

      vm.restoreToCurrentDesignData();
    }

    function nextPage() {
      vm.left_canvas.clear();
      vm.right_canvas.clear();
      vm.PhotoBook.MoveToNextPage();
      vm.restoreToCurrentDesignData();
    }

    function previousPage(currentIndex) {
      vm.PhotoBook.MoveToPreviousPage();
      vm.restoreToCurrentDesignData();
    }

    function backCurrentDesignData() {
      if (!vm.PhotoBook || !vm.PhotoBook || !vm.PhotoBook.leftDesignPage) return;
      vm.PhotoBook.leftDesignPage.imageData = JSON.stringify(vm.left_canvas);
      if (vm.PhotoBook.rightDesignPage) {
        vm.PhotoBook.rightDesignPage.imageData = JSON.stringify(vm.right_canvas);
      }

      if (vm.frontCoverCanvas)
        vm.PhotoBook.frontCover.imageData = JSON.stringify(vm.frontCoverCanvas);

      generatePreviewImage();
    }

    function restoreToCurrentDesignData() {

      if (vm.PhotoBook.leftDesignPage) {
        var leftData = vm.PhotoBook.leftDesignPage.imageData;
        if (leftData)
          vm.left_canvas.loadFromJSON(leftData, vm.left_canvas.renderAll.bind(vm.left_canvas), function () {
          });
      }

      if (vm.PhotoBook.rightDesignPage) {
        var rightData = vm.PhotoBook.rightDesignPage.imageData;
        if (rightData)
          vm.right_canvas.loadFromJSON(rightData, vm.right_canvas.renderAll.bind(vm.right_canvas), function () {
          })
      }
    }

    function generatePreviewImage() {
      vm.PhotoBook.leftDesignPage.previewImage = vm.left_canvas.toDataURL();
      if (vm.PhotoBook.rightDesignPage) {
        vm.PhotoBook.rightDesignPage.previewImage = vm.right_canvas.toDataURL();
      }

      if (vm.frontCoverCanvas)
        vm.PhotoBook.frontCover.previewImage = vm.frontCoverCanvas.toDataURL();
    }

    function deleteObject() {
      //if(vm.PhotoBook.leftDesignPage.active)
      vm.PhotoBook.deletePage(vm.PhotoBook.leftDesignPage);
    }

    function newPage() {
      vm.PhotoBook.createPage();
    };

    function copyPage() {
      backCurrentDesignData();
      vm.PhotoBook.copyPage(vm.currentPage);
      vm.restoreToCurrentDesignData();
    }

    function deletePage() {
      vm.left_canvas.clear();
      vm.right_canvas.clear();
      vm.PhotoBook.deletePage(vm.currentPage);
      vm.restoreToCurrentDesignData();
    }

    function saveToServe() {
      bookRepository.saveToServer(this.PhotoBook);
    }

    function finishCreateBook() {
      $window.location.href = "/account/mybooks"
    }

    function nextSaveToImage() {
      $scope.preview_image = vm.left_canvas.toDataURL();
      //var preview_image = $document.find('#preview_image');
      var preview_image = $(event.target).find('#preview_image');
      preview_image = $("#preview_image");
      preview_image.src = image;
      preview_image.attr('src', image);
    }

    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    }

    $timeout(documentReady);

    function documentReady() {
      Core.init();
    }
  }
})();
