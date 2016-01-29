/**
 * Created by Brett Wang on 10/08/2015.
 */
'use strict';

angular.module('storyToaster')
  .service('bookRepository', function ($http, $q, $cookieStore, config, authService,LZString) {

    var self = this;
    var API_URL = config.apiRootPath;
    var currentUser = authService.currentUser();

    this.getBooks = function () {

      var dfd = $q.defer();
      self.promise = dfd.promise;
      self.promise.status = 'pending';
      $http.get(API_URL + '/books')
        .success(function (data, status) {
          console.log(data);
          dfd.resolve(data);
        }).error(function (data, status) {
          dfd.reject(status);
        });
      return self.promise;
    };

    this.getUserBooks = function() {
      var dfd = $q.defer();
      self.promise = dfd.promise;
      var userId = currentUser ? currentUser.id : -1;

      $http.get(API_URL + 'users/' + userId + '/books').then(function (res) {
          var books = [];
          if (res.data) {
            var books = books.concat(res.data);
            books.forEach(function(book) {
              var data = angular.fromJson(book.data);

              //var unzippedData = LZString.decompress(res.data);
              //res.data = unzippedData;
              //var fontCoverImageData = LZString.decompressFromBase64(data.frontCover.imageData);
              book.frontCover = data.frontCover;
              //book.frontCover.imageData = fontCoverImageData;
              book.dedicatedPage = data.dedicatedPage;
              book.backCover = data.backCover;
            });

            return dfd.resolve(books);
          }
          return dfd.resolve(books);
        },
        function (err) {
          return dfd.resolve([]);
        }).catch(function (err) {
          return dfd.resolve([]);
        });

      return self.promise;
    };

    this.saveToServer = function(book){
      //var deferred = $q.defer();
      var dataString = JSON.stringify(book);
      this.author = currentUser ? currentUser.id : -1;

      var obj = angular.fromJson(dataString);
      obj.pages.forEach(function(page){
        delete page.previewImage;
      });

      delete obj.frontCover.previewImage;
      delete obj.dedicatedPage.previewImage;
      delete obj.backCover.previewImage;
      delete obj.leftDesignPage;
      delete obj.rightDesignPage;

      //obj.frontCover.imageData = LZString.compressToBase64(obj.frontCover.imageData);

      obj.data = JSON.stringify(obj);


      var promise;

      if (!book.id || book.id < 0) {
        // this is a new book
        promise = createOneBook(obj);
      }
      else {
        // this is an existing book,
        // upload to update
        promise = updateBook(obj);
      }

      promise
      .then(function (res) {
          book.id  = res.data.id;
          return res.data;
          //return deferred.resolve(res.data);
        },
        function (err) {
          console.log(err);
          return null
          //return deferred.reject(err);
        })

      //return deferred.promise;
    };

    this.deleteBook = function(book){
      var url = API_URL + "books/" + book.id;

      var dfd = $q.defer();
      $http.delete(url)
        .then(function(res){
          console.log(res);
          dfd.resolve(res);
        });

      return dfd.promise;
    };

    function updateBook(book) {
      var url = API_URL + "books/" + book.id;
      return $http.put(url,book)
    }

    function createOneBook (book){
      var url = API_URL + "books";
      return $http.post(url,book);
    }
  });

