/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('storyToaster')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('config', {
      authTokenName: 'auth-token',
      apiKeyName: 'clientkey',
      apiKeyValue: 'test key',
      apiRootPath: 'http://localhost:1337'
    });
})();
