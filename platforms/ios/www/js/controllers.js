angular.module('smart21.controllers', [])


.controller('ContentsCtrl', function($scope, ContentService) {
	$scope.contents = [];
	$scope.inProgress = false;
	$scope.noMoreItemsAvailable = false;

//	console.log("PRODUCT_API", $config.productAPI);
	
//	$scope.inProgress = true;
//	ContentService.getPage(0, 10).then(function(response) {
//		$scope.contents = response;
//	});
	
	$scope.doRefresh = function() {
		console.log('Refreshing...');
		ContentService.getPage(0, $config.pageSize).then(function(response) {
			$scope.contents = response;
		});
		$scope.$broadcast('scroll.refreshComplete');
	};

	$scope.loadMore = function() {
		console.log("========= loadMore =========");
		console.log("inProgress", $scope.inProgress);
		if(!$scope.inProgress){
			$scope.inProgress = true;
			var itemsLength = $scope.contents ? $scope.contents.length : 0;
			console.log("itemsLength", itemsLength);
			var pageSize = $config.pageSize;
			var page = Math.floor(itemsLength/pageSize);
			console.log("page", page);
			console.log("pageSize", pageSize);
			ContentService.getPage(page, pageSize).then(function(response) {
				var count = response.length;
				if (count<pageSize) {
					$scope.noMoreItemsAvailable = true;
				}else{
					$scope.noMoreItemsAvailable = false;
				}
				console.log("noMoreItemsAvailable: " + $scope.noMoreItemsAvailable);
				// add these items to the end of the array.
				$scope.contents = $scope.contents.concat(response);
				$scope.inProgress = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
		
	};
	
})

.controller('ContentDetailCtrl', function($scope, $stateParams, ContentService) {
	console.log("Id", $stateParams.contentId);
//	$scope.content = ContentService.getById($stateParams.contentId);
	ContentService.getById($stateParams.contentId).then(function(response) {
		$scope.content = response;
		console.log("Content", $scope.content.description);		
	});
})







.controller('RootCategoriesCtrl', function($scope, $state, CategoryService) {
	
	var parentId = "/" + tenant;
	CategoryService.getByParentId(parentId).then(function(response) {
		$scope.categories = response;
	});
	
	$scope.getImageUrl = function(category) {
		var imageUrl = $config.categoryImageAPI + category.id + "/icon.png";
		return imageUrl;
	};
	
	$scope.selectedCategory = function(category){
		CategoryService.getByParentId(category.id).then(function(response) {
			var categories = response;
			if (categories.length==0){
				//Visualizzo tutti i contenuti della categoria.
				var params = {"categoryId": category.id};
				$state.go('tab.contents-by-category', params);
			}else{
				//Visualizzo tutte le sotto categorie.
				var params = {"parentId": category.id};
				$state.go('tab.categories', params);
			}
			
		});
	};
	
//	$scope.selectedCategory = function(category){
//		var params = {"parentId": category.id};
//		$state.go('tab.categories', params);
//	};
	
})


.controller('CategoriesCtrl', function($scope, $state, $stateParams, CategoryService) {
	var parentId = $stateParams.parentId ? $stateParams.parentId : ("/" + tenant);
//	console.log("parentId", parentId);
	
	var categories = CategoryService.getCategories();
	console.log("categories", categories);
	$scope.categories = categories;
	
//	CategoryService.getByParentId(parentId).then(function(response) {
//		var categories = response;
//		$scope.categories = categories;
//	});
	
	$scope.getImageUrl = function(category) {
		var imageUrl = $config.categoryImageAPI + category.id + "/icon.png";
		return imageUrl;
	};
	
	
	$scope.selectedCategory = function(category){
		CategoryService.getByParentId(category.id).then(function(response) {
			var categories = response;
			if (categories.length==0){
				//Visualizzo tutti i contenuti della categoria.
				var params = {"categoryId": category.id};
				$state.go('tab.contents-by-category', params);
			}else{
				//Visualizzo tutte le sotto categorie.
				var params = {"parentId": category.id};
				$state.go('tab.categories', params);
			}
			
		});
	};
	
//	$scope.selectedCategory = function(category){
//		var params = {"parentId": category.id};
//		$state.go('tab.categories', params);
//	};
	
})



//.controller('CategoriesCtrl', function($scope, $state, $stateParams, CategoryService) {
//	var parentId = $stateParams.parentId;
//	console.log("parentId", parentId);
//	
//	CategoryService.getByParentId(parentId).then(function(response) {
//		var categories = response;
//		if (categories.length==0){
//			//Visualizzo tutti i contenuti della categoria.
//			var params = {"parentId": parentId};
//			$state.go('tab.contents-by-category', params);
//		}else{
//			//Visualizzo tutte le sotto categorie.
//			$scope.categories = categories;
//		}
//		
//	});
//	
//	$scope.getImageUrl = function(category) {
//		var imageUrl = $config.categoryImageAPI + category.id + "/icon.png";
//		return imageUrl;
//	};
//	
//	$scope.selectedCategory = function(category){
//		var params = {"parentId": category.id};
//		$state.go('tab.categories', params);
//	};
//	
//})



.controller('ContentsByCategoryCtrl', function($scope, $stateParams, ContentService) {
	var categoryId = $stateParams.categoryId;
//	console.log("parentId", categoryId);
	$scope.inProgress = false;
	$scope.noMoreItemsAvailable = false;
	
	ContentService.search("*", categoryId, 0, $config.pageSize).then(function(response) {
		$scope.inProgress = true;
		$scope.contents = response;
		$scope.inProgress = false;
	});
	
	$scope.doRefresh = function() {
		console.log('Refreshing...');
		ContentService.search("*", categoryId, 0, $config.pageSize).then(function(response) {
			$scope.inProgress = true;
			$scope.contents = response;
			$scope.inProgress = false;
		});
		$scope.$broadcast('scroll.refreshComplete');
	};
	
	
	$scope.loadMore = function() {
		console.log("========= loadMore =========");
		console.log("inProgress", $scope.inProgress);
		if(!$scope.inProgress){
			$scope.inProgress = true;
			var itemsLength = $scope.contents ? $scope.contents.length : 0;
//			console.log("itemsLength", itemsLength);
			var pageSize = $config.pageSize;
			var page = Math.floor(itemsLength/pageSize);
//			console.log("page", page);
//			console.log("pageSize", pageSize);
			ContentService.search("*", categoryId, page, pageSize).then(function(response) {
//			ContentService.getPage(page, pageSize).then(function(response) {
				var count = response.length;
				if (count<pageSize) {
					$scope.noMoreItemsAvailable = true;
				}else{
					$scope.noMoreItemsAvailable = false;
				}
				console.log("noMoreItemsAvailable: " + $scope.noMoreItemsAvailable);
				// add these items to the end of the array.
				$scope.contents = $scope.contents.concat(response);
				$scope.inProgress = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
		
	};
	
	
})




.controller('ImageCtrl', function($scope, $cordovaCamera, $cordovaImagePicker, $ionicPlatform) {
	
//	$scope.takePhoto = function(){
//		console.log('takePhoto');
//	};
	
	
	$scope.takeImage = function() {
		var options = {
			quality: 80,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
//			targetWidth: 250,
//			targetHeight: 250,
			width: 800,
			height: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
        	$scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
        	// error
        });
	}
	
	
	
//	$scope.collection = {
//		selectedImage : ''
//	};
	 
	$ionicPlatform.ready(function() {

		$scope.pickImage = function() {       
			// Image picker will load images according to these settings
			var options = {
				maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
				width: 800,
				height: 800,
				quality: 80            // Higher is better
			};
		 
			$cordovaImagePicker.getPictures(options).then(function (results) {
				// Loop through acquired images
				for (var i = 0; i < results.length; i++) {
//					$scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
					$scope.srcImage = results[i];
	 
//					window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
//						$scope.collection.selectedImage = base64;
//						$scope.addContact();    // Save contact
//					});
				}
			}, function(error) {
				console.log('Error: ' + JSON.stringify(error));    // In case of error
			});
		};  
 
	});
	
})




.controller('WebCtrl', function($scope) {
	
//	var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
	
	$scope.openInExternalBrowser = function(){
		// Open in external browser
		window.open('http://google.com','_system','location=yes'); 
	};
	 
	$scope.openInAppBrowser = function(){
		// Open in app browser
		window.open('http://google.com','_blank'); 
	};
	 
	$scope.openCordovaWebView = function(){
		// Open cordova webview if the url is in the whitelist otherwise opens in app browser
		window.open('http://google.com','_self'); 
	};
	
	//Fonte: https://github.com/apache/cordova-plugin-inappbrowser#cordovainappbrowseropen
	$scope.myTestSelf = function(){
		var url = 'http://google.com';
		var ref = cordova.InAppBrowser.open(url, '_self', 'location=yes');
	};
	$scope.myTestBlank = function(){
		var url = 'http://google.com';
		var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
	};
	$scope.myTestSystem = function(){
		var url = 'http://google.com';
		var ref = cordova.InAppBrowser.open(url, '_system', 'location=yes');
	};
	
	
//	var inAppBrowserRef;
//
//	showUrl("www.repubblica.it");
//	
//	function showUrl(url) {
//		var target = "_blank";
//		var options = "location=yes,hidden=yes";
////		inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
//		inAppBrowserRef = $cordovaInAppBrowser.open(url, target, options);
////		inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
////		inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
////		inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
//	}
	
})




.controller('UserCtrl', function($scope, $state, UserService) {
	
//	UserService.getUserLogged().then(function(user) {
//		$scope.user = user;
//	});
	$scope.user = UserService.getUserLogged();
	
	$scope.logout = function() {
		console.log('logout');
//		UserService.logout().then(function() {
//			$state.go('tab.user-login');
//		});
		UserService.logout();
		$state.go('tab.user-login');
	};
})


.controller('UserLoginCtrl', function($scope, $state, UserService) {
	
	$scope.login = function() {
		console.log('login');
//		UserService.login().then(function(user) {
//			$state.go('tab.user');
//		});
		UserService.login();
		$state.go('tab.user');
	};
	
});



//.controller('DashCtrl', function($scope) {})
//
//.controller('ChatsCtrl', function($scope, Chats) {
//  // With the new view caching in Ionic, Controllers are only called
//  // when they are recreated or on app start, instead of every page change.
//  // To listen for when this page is active (for example, to refresh data),
//  // listen for the $ionicView.enter event:
//  //
//  //$scope.$on('$ionicView.enter', function(e) {
//  //});
//
//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };
//})
//
//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})
//
//.controller('AccountCtrl', function($scope) {
//  $scope.settings = {
//    enableFriends: true
//  };
//});
