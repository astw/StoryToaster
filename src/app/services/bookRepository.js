/**
 * Created by Brett Wang on 10/08/2015.
 */
'use strict';

angular.module('storyToaster')
  .service('bookRepository', function ($http, $q, $cookieStore, config, authService) {

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
          var books = []
          if (res.data)
            return dfd.resolve(books.concat(res.data));
          return dfd.resolve(books);
        },
        function (err) {
          return dfd.resolve([]);
        }).catch(function (err) {
          return dfd.resolve([]);
        });

      return self.promise;
    };

    this.createOneBook = function(book){
      var url = API_URL + "books";

      var dfd = $q.defer();
      $http.post(url,book)
        .then(function(res){
          console.log(res);
          dfd.resolve(res);
        });

      return dfd.promise;
    };

    this.updateBook = function (book) {
      var url = API_URL + "books/" + book.id;

      var dfd = $q.defer();
      $http.put(url,book)
        .then(function(res){
          console.log(res);
          dfd.resolve(res);
        });

      return dfd.promise;
    };

    this.saveToServer = function(book){
      var deferred = $q.defer();
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

      obj.data = JSON.stringify(obj);
      if (!book.id || book.id < 0) {
        // this is a new book
        // upload to create a new
        this.createOneBook(obj).then(function (res) {
            book.id  = res.data.id;
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
        this.updateBook(obj).then(
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
    };

  });

