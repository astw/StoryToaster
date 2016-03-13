/**
 * Created by Brett Wang on 10/08/2015.
 */
'use strict';

angular.module('storyToaster')
  .service('bookRepository', function ($http, $q, $cookieStore, config, authService) {

    var self = this;
    var API_URL = config.apiRootPath;
    var currentUser = authService.currentUser();

    this.savePage = savePage;

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

    this.getBookById = function(bookId){
      var dfd = $q.defer();
      self.promise = dfd.promise;

      var url = API_URL + 'books/' +bookId;

      $http.get(url).then(function (res) {
          var books = [];
          if (res.data) {
            var books = books.concat(res.data);
            books.forEach(function(book) {
              var pages = angular.fromJson(book.data);
              pages.forEach(function(page,index){
                book.pages[index] = page;
              });
            });

            if(books.length > 0)
              return dfd.resolve(books[0]);
            else
              return dfd.reject(null)
          }

          return dfd.reject(null);
        },
        function (err) {
          return dfd.reject(null);
        }).catch(function (err) {
          return dfd.reject(null);
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
            books = books.concat(res.data);
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
      console.log('frontCover.width=',obj.frontCover.width);
      obj.data = JSON.stringify(obj.pages);

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
          return null;
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

    function savePage(bookId, page) {
      return;

      if (!page.id) {
        // create a new page;
        console.log('create a new page');
        createBookPage(bookId, page.imageData).
          then(
          function(res){
            console.log('page created:', res.data);
            page.id = res.data.id ;
          },

          function(err){
            console.log('create book page fails, error=', err);
          }
        )
      }
      else {
        console.log('update the existing page');
        updateBookPage(bookId, page.Id, page.imageData);
      }
    }

    function createBookPage(bookId, pageInfo){
      var url = API_URL + "books/" + bookId + "/pages";
      $http.post(pageInfo);
    }

    function updateBookPage(bookId,pageId, pageInfo){
      var url = API_URL + "books/" + bookId + "/pages/" + pageId;

      $http.put(pageInfo);
    }

    function getBookPages(bookId){
      var url = API_URL + "books/" + bookId;
      $http.get(url);
    }

  });

