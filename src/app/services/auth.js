'use strict'

angular.module('storyToaster')
.service('auth',function($http,$window,$q, $location,authToken, $cookieStore,relayService) {

    var API_URL = 'http://localhost:1337/auth/';
    var clientkey = "this is the client key";
    var cookieKey = "storyToaster";

    function authSuccessful(data) {
      authToken.setToken(data.token);
      $cookieStore.put(cookieKey,data.user);
    }

    var headers =
    {
      clientkey: clientkey
    };

    this.register = function(email,userName,password,password2){
      var dfd = $q.defer();

      var url = API_URL + "register";
      var message = {email: email,userName:userName, password: password, password2:password2};
      $http.post(url,
        message,
        {headers: headers}
      ).then(function (res) {
          if (res.status == 200) {
            authSuccessful(res.data);
          }

          dfd.resolve(res);
        },
      function(err){
        dfd.reject(err);
      });

      return dfd.promise;
    };

    this.checkEmailExistance = function(email){
      var dfd = $q.defer();

      var url = API_URL + "checkemail/" + email;
      $http.get(url,
        {headers: headers}
      ).then(function (res) {
           dfd.resolve(res);
        });

      return dfd.promise;
    };

    this.login = function (email, password) {
      var dfd = $q.defer();

      var url = API_URL + "login";
      var message = {email: email, password: password};
      $http.post(url,
        message,
        {headers: headers}
      ).then(function (res) {
          if (res.status == 200) {
            authSuccessful(res.data);
          }

          dfd.resolve(res);
        });

      return dfd.promise;
    };

    this.logout = function () {
      authToken.removeToken();
      $cookieStore.remove(cookieKey);
      relayService.clear();
    };

    this.currentUser = function () {
      return $cookieStore.get(cookieKey);
    };

    this.isAuthenticated = function () {
      return !!authToken.getToken();
    };
    this.sessionToken = function(){
      return authToken.getToken();
    }
  });
