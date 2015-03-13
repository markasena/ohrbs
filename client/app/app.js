'use strict';

angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'ui.utils',
  'ui.select',
  'restangular'
  ]).config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/');
    RestangularProvider.setExtraFields(['name']);
    RestangularProvider.setResponseExtractor(function(response, operation) {
      return response.data;
    });

    RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.setMethodOverriders(["put", "patch"]);

    // In this case we are mapping the id of each element to the _id field.
    // We also change the Restangular route.
    // The default value for parentResource remains the same.
    RestangularProvider.setRestangularFields({
      id: "_id"
    });

    // Use Request interceptor
    RestangularProvider.setRequestInterceptor('authInterceptor');
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
