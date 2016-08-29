// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'smart21' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'smart21.services' is found in services.js
// 'smart21.controllers' is found in controllers.js
angular.module('smart21', ['ionic', 'ngCordova', 'smart21.controllers', 'smart21.services'])

.run(function($ionicPlatform, $rootScope, $state, UserService) {
	var userLogged = true;
	
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
	
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		console.log('======== $stateChangeStart ========');
		
		var isAuthenticated = UserService.isAuthenticated();
		
		if (toState.name=='tab.user' && !isAuthenticated) {
			event.preventDefault();
			$state.go('tab.user-login');
		}	
		
//		UserService.isAuthenticated().then(function(isAuthenticated) {
//			if (toState.name=='tab.user' && !isAuthenticated) {
//				event.preventDefault();
//				$state.go('tab.user-login');
//			}	
//		})
		
		
//		if (toState.name=='tab.user' && !userLogged) {
////		if (toState.name!=='tab.user-login' && toState.name=='tab.user' && !userLogged) {
////		if (toState.name !== 'auth' && !User.authenticaded()) {
//			event.preventDefault();
//			$state.go('tab.user-login');
//		}
	});
	
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.contents', {
		url: '/contents',
		views: {
			'tab-contents': {
				templateUrl: 'templates/tab-contents.html',
				controller: 'ContentsCtrl'
			}
		}
	})
	.state('tab.content-detail', {
		url: '/contents/:contentId',
		views: {
			'tab-contents': {
				templateUrl: 'templates/content-detail.html',
				controller: 'ContentDetailCtrl'
			}
		}
	})

	
	
	
	
	//Categorie radice.
	.state('tab.root-categories', {
		url: '/root-categories',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-root-categories.html',
				controller: 'RootCategoriesCtrl'
			}
		}
	})
	//Sotto categorie.
	.state('tab.categories', {
		url: '/categories/:parentId',
		views: {
			'tab-search': {
				templateUrl: 'templates/categories.html',
				controller: 'CategoriesCtrl'
			}
		}
	})
	//Contenuti della categoria.
	.state('tab.contents-by-category', {
		url: '/contents-by-category/:categoryId',
		views: {
			'tab-search': {
				templateUrl: 'templates/contents-by-category.html',
				controller: 'ContentsByCategoryCtrl'
			}
		}
	})
	//Dettaglio contenuto.
	.state('tab.content-category-detail', {
		url: '/content-category-detail/:contentId',
		views: {
			'tab-search': {
				templateUrl: 'templates/content-detail.html',
				controller: 'ContentDetailCtrl'
			}
		}
	})
	
	
	
	
	.state('tab.image', {
		url: '/image',
		views: {
			'tab-image': {
				templateUrl: 'templates/tab-image.html',
				controller: 'ImageCtrl'
			}
		}
	})
	
  
	.state('tab.web', {
		url: '/web',
		views: {
			'tab-web': {
				templateUrl: 'templates/tab-web.html',
				controller: 'WebCtrl'
			}
		}
	})
	
	
	
	
	.state('tab.user', {
		url: '/user',
		views: {
			'tab-user': {
				templateUrl: 'templates/tab-user.html',
				controller: 'UserCtrl'
			}
		}
	})
	
	.state('tab.user-login', {
		url: '/user-login',
		views: {
			'tab-user': {
				templateUrl: 'templates/tab-user-login.html',
				controller: 'UserLoginCtrl'
			}
		}
	});
	
	

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/contents');

});
