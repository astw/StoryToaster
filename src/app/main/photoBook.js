angular.module('storyToaster')
.factory('PhotoBook',function() {

    var TOTAL_PAGE = 4;

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
        var p = new Page();
        p.index = i;
        this.pages.push(p);
      }
      ;

      this.data= {};

      this.createPage = function(){
         this.pages.push(new Page());
         this.pages.push(new Page());
      };

      this.copyPage = function(page){
        var p = new Page();
        p.imageData = page.imageData;
        p.previewImage = page.previewImage;
        var index = this.pages.indexOf(page);
        if(index == this.pages.length -1){
          this.pages.push(p);
        }
        else{
          this.pages.splice(index +1, 0,p);
        }
        return this.pages[index + 1];
      };

      this.getPageByIndex = function(index){
        if(index < 0) index = 0;
        if(index > this.pages.length -1){
           index = this.pages.length -1;
        }

        return this.pages[index];
      };

      this.getNextPage = function(page){
        var index = this.pages.indexOf(page);
        if(index == this.pages.length -1){
          return null;
        }
        return this.pages[index + 1];
      };

      this.getPreviousPage = function(page){
        var index = this.pages.indexOf(page);
        if(index == 0){
          return null;
        }
        return this.pages[index -1];
      };

      this.deletePage = function(page){
        var index = this.pages.indexOf(page);
        this.pages.splice(index,1);
      };

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
