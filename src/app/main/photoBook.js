angular.module('storyToaster')
.factory('PhotoBook',function() {

    var TOTAL_PAGE = 16;

    var Page = function () {
      this.imageData = null;
      this.previewImage = null;
    };

    var PhotoBook = function () {

      this.title = "this is created on frontend";
      this.desc = "this is my designed book";
      this.author = 3;

      this.totalPage = TOTAL_PAGE;
      this.pages = [];
      this.frontCover = new Page();
      this.dedicatedPage = new Page();
      this.backCover = new Page();

      for (var i = 0; i < this.totalPage; i++) {
        this.pages.push(new Page());
      }
      ;

      this.data= {};

      this.setPageActive = function(page) {
         for(var i=0;i < this.pages.length; i++){
           var p = this.pages[i];
           if(p == page)
             p.active = true;
           else
             p.active = false
         }
      }
    };

    return PhotoBook;
  });
