/**
 * Created by Brett Wang on 10/08/2015.
 */
'use strict';

angular.module('storyToaster')
  .service('bookRepository', function ($http, $q, $cookieStore, config) {

    var self = this;
    var API_URL = config.apiRootPath;

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
      var url = API_URL + "/books/" + book.id;

      var dfd = $q.defer();
      $http.put(url,book)
        .then(function(res){
          console.log(res);
          dfd.resolve(res);
        });

      return dfd.promise;
    };
  });

