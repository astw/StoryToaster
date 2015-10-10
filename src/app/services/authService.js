'use strict'

angular.module('storyToaster')
.service('authService',function($http,$window,$q, $location, $cookieStore,relayService,authToken, config) {

    var cookieKey = "storyToaster";
    var API_URL = config.apiRootPath;
    var clientKey = config.apiKeyValue;

    this.getAuthToken = function () {
      return authToken.getToken();
    };

    this.getUserName = function () {
      return relayService.getKeyValue('userName');
    };

    this.logout = function () {
      authToken.removeToken();
      relayService.clearKeyValue('userName');
    };

    this.isAuthenticated = function () {
      var token = authToken.getToken();
      if (token) {
        return true;
      }
      else
        return false;
    };

    function authSuccessful(data) {
      authToken.setToken(data.token);
      $cookieStore.put(cookieKey, data.user);
    }

    var headers =
    {
      clientkey: clientKey
    };

    this.register = function (email, userName, password, password2) {
      var dfd = $q.defer();

      var url = API_URL + "auth/register";
      var message = {email: email, userName: userName, password: password, password2: password2};
      $http.post(url,
        message,
        {headers: headers}
      ).then(function (res) {
          if (res.status == 200) {
            authSuccessful(res.data);
          }

          dfd.resolve(res);
        },
        function (err) {
          dfd.reject(err);
        });

      return dfd.promise;
    };

    this.checkEmailExistance = function (email) {
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

      var url = API_URL + "auth/login";
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
    this.sessionToken = function () {
      return authToken.getToken();
    }
  });
