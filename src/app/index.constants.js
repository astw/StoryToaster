/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('storyToaster')
    .constant('config', {
      authTokenName:'Authorization',
      apiKeyName: 'clientkey',
      apiKeyValue:'test key for local',
      apiRootPath: 'http://localhost:1337/'
    });
})();
