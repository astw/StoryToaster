angular.module('storyToaster')
.factory('PhotoBook',function(
    bookRepository,
    authService,
    $q,
    LZString,
    $rootScope
  ) {

    var TOTAL_PAGE = 25;
    var currentUser = authService.currentUser();
    var bookId = -1;

    var Page = function () {
      this.imageData = null;
      this.imageUrl = '';
      this.previewImage = "/assets/images/blank-small.gif";
      this.width = 0.0;
      this.height = 0.0;
      this.savePage =  savePage
    };

    function savePage(imageData) {
      // if the book has not been saved, save the whole book first,
      // from the return value, get the page's image generated.
      $rootScope.$broadcast('savePage',this);
    }

    var PhotoBook = function () {
      this.title = "this is created on frontend";
      this.titleColor = '#ffffff';

      this.desc = "this is my designed book";
      this.attribute = "By author";
      this.attributeColor = '#ffffff';

      this.dedication="输入题记"
      this.dedicationColor ="#F5B025";
      this.dedicationFont ='';

      this.author = 3;
      this.pagesInDesign = 2 ;   // how manage pages in design by default
      this.frontCoverImageIndex = -1;

      this.totalPage = TOTAL_PAGE;
      this.backgroundColor = '#2f64ff';

      this.pages = [];
      this.frontCover = new Page();
      this.dedicatedPage = new Page();
      this.backCover = new Page();

      for (var i = 0; i < this.totalPage; i++) {
        var p = new Page();
        p.index = i;
        this.pages.push(p);
      }

      this.leftDesignPage = this.pages[0];
      this.leftDesignPage.active = true;
      this.rightDesignPage = this.pages[1];

      this.data= {};

      this.index = function(page){
        return this.pages.indexOf(page) + 1;
      };

      this.createPage = function() {
        var page = new Page();
        this.pages.push(page);
        this.totalPage = this.pages.length;
        if(this.pages.length == 1){
          page.active = true;
          this.leftDesignPage = this.pages[0]
        }
        else{
          if(this.pagesInDesign == 2 && this.pages.length == 2 ){
            this.rightDesignPage = this.pages[1];
          }
        }
        return page;
      };

      this.copyPage = function(page){
        if(this.leftDesignPage && this.leftDesignPage.active)
        page = this.leftDesignPage;
        else if(this.rightDesignPage && this.rightDesignPage.active){
          page = this.rightDesignPage;
        }

        var p = new Page(this);
        p.active = true;
        p.imageData = page.imageData;
        p.previewImage = page.previewImage;
        var index = this.pages.indexOf(page);
        if(index == (this.pages.length -1)){
          this.pages.push(p);
        }
        else{
          this.pages.splice(index +1, 0,p);
        }

        if(this.pagesInDesign == 2){
          if(this.leftDesignPage.active == true){
            this.leftDesignPage.active = false;
            this.rightDesignPage = p;
          }
          else {
            // the current page is on the right
            this.leftDesignPage = page;
            this.rightDesignPage = p;
          }
        }
        this.setPageActive(p);

        return this.pages[index + 1];
      };

      this.getPageByIndex = function(index){
        if(index < 0) null
        if(index > (this.pages.length -1)){
           return null;
        }

        return this.pages[index];
      };

      this.getNextPage = function(page){
        if(!page) return null;
        var index = this.pages.indexOf(page);
        if(index == (this.pages.length -1)){
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

      /// delete page in design view
      this.deletePage = function(page){
        //var page = this.leftDesignPage.active ? this.leftDesignPage : this.rightDesignPage;

        if(this.leftDesignPage && this.leftDesignPage.active){
          page = this.leftDesignPage;
        }
        else if(this.rightDesignPage && this.rightDesignPage.active){
          page = this.rightDesignPage;
        }

        if(!page) return;
        var nextPage = this.getNextPage(page);
        if(!nextPage)
        // set the previous one to be active
        nextPage = this.getPreviousPage(page);

        if(this.pagesInDesign ==1){
          this.leftDesignPage = nextPage;
        }
        else if(this.pagesInDesign ==2 ) {
          if (this.leftDesignPage && this.leftDesignPage.active == true) {
            this.leftDesignPage = nextPage;
            this.rightDesignPage = this.getNextPage(nextPage);
          }
          else if(this.rightDesignPage && this.rightDesignPage.active == true){
               this.rightDesignPage = nextPage;
          }
          if(this.pages.indexOf(page) == (this.pages.length -1)){
            this.rightDesignPage = null;
          }
        }

        if(nextPage)
          nextPage.active = true;

        var index = this.pages.indexOf(page);
        this.pages.splice(index,1);

        this.totalPage = this.pages.length;

        var len = this.pages.length;
        if(len == 0) {
          this.leftDesignPage = null;
          this.rightDesignPage = null;
        };
        //this.MoveToPreviousPage();
      };

      this.MoveToPreviousPage = function(){
        var left = this.leftDesignPage && this.leftDesignPage.active;

        var index = this.pages.indexOf(this.leftDesignPage);

        // left page is the first page
        if(index == 0){
          return;
        }

        if(this.pagesInDesign == 2 && index == 1){
          return;
        }

        if(this.pagesInDesign == 2) {
          index -= 2;
        }
        else if(this.pagesInDesign ==1){
          index -= 1;
        }

        this.leftDesignPage = this.getPageByIndex(index);
        this.rightDesignPage = this.getPageByIndex(index);

        if(left == true){
          this.setPageActive(this.leftDesignPage);
        }
        else
          this.setPageActive(this.rightDesignPage);
      };

      this.MoveToNextPage = function(){
        var left = this.leftDesignPage && this.leftDesignPage.active;
        var index = this.pages.indexOf(this.leftDesignPage);

        // left page is the last page
        if(index == (this.pages.length -1)){
          return;
        }

        if(this.pagesInDesign == 2 && index == (this.pages.length -2)){
             return;
        }

        if(this.pagesInDesign == 2) {
            index += 2;
        }
        else if(this.pagesInDesign ==1){
            index += 1;
        }

        this.leftDesignPage = this.getPageByIndex(index);
        this.rightDesignPage = this.getPageByIndex(index + 1);

        if(left == true && this.leftDesignPage || !this.rightDesignPage){
          this.setPageActive(this.leftDesignPage);
        }
        else if(this.rightDesignPage)
          this.setPageActive(this.rightDesignPage);
      };


      this.setBackCoverActive = function(){
        this.dedicatedPage.active = true;
        this.frontCover.active = false;
        this.backCover.active = false;
        this.pages.forEach(function(p){
          p.active = false;
        })
      };

      this.setDedicatedPageActive = function(){
        this.dedicatedPage.active = true;
        this.frontCover.active = false;
        this.backCover.active = false;
        this.pages.forEach(function(p){
          p.active = false;
        })
      };

      this.setFrontCoverActive = function(){
        if(!this.dedicatedPage) return ;
        this.dedicatedPage.active = false;
        this.frontCover.active = true;
        this.backCover.active = false;
        this.pages.forEach(function(p){
          p.active = false;
        })
      };

      this.setPageActive = function(page) {
         for(var i=0;i < this.pages.length; i++){
           var p = this.pages[i];
           if(p == page)
             p.active = true;
           else
             p.active = false
         }
      };

      this.saveToServer = function(){
        var deferred = $q.defer();
        var dataString = JSON.stringify(this);
        this.author = currentUser ? currentUser.id : -1;

        var obj = JSON.parse(dataString);
        obj.pages.forEach(function(page){
           delete page.previewImage;
        });

        delete obj.frontCover.previewImage;
        delete obj.dedicatedPage.previewImage;
        delete obj.backCover.previewImage;
        delete obj.leftDesignPage;
        delete obj.rightDesignPage;

        obj.data = JSON.stringify(obj);
        console.log('----- origin size', obj.data.length);

        var zipped = LZString.compress(obj.data);
        console.log('----- compressed size', zipped.length);

        if (!this.id || this.id < 0) {
          // this is a new book
          // upload to create a new

          bookRepository.createOneBook(obj).then(function (res) {
              bookId  = res.data.id;
              return deferred.resolve(res.data);
            },
            function (err) {
              console.log(err);
              return deferred.reject(err);
            })
        }
        else {
          // this is an existing book,
          // upload to update
          this.title = "this is changed title" + Date.now().toString();
          bookRepository.updateBook(obj).then(
            function (res) {
              console.log(' update book good' + res.data.title);
              return deferred.resolve(res.data);
            },
            function (err) {
              console.log(err);
              return deferred.reject(err);
            })
        }

        return deferred.promise;
      }
    };

    return PhotoBook;
  });
