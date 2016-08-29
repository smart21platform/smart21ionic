angular.module('smart21.services', [])


.factory('ContentService', function($http) {
//.service('ContentsService', function($http) {
//	var BASE_URL = "http://api.randomuser.me/";
	return {

		getById: function(id){
			var url = $config.contentsAPI + "/" + id;
//			var url = "http://salve.smart21.it/service/v1/products/" + id;
			return $http.get(url).then(function(response) {
				// In the response, resp.data contains the result. Check the console to see all of the data returned.
				console.log('Get Content', response.data.items[0]);
				return response.data.items[0];
			});
		},
		
		getAll: function() {
			// $http returns a promise, which has a then function, which also returns a promise.
			var url = $config.contentsAPI;
//			var url = "http://salve.smart21.it/service/v1/products?page=0&pageSize=10";
			return $http.get(url)
				.then(function(response) {
					// In the response, resp.data contains the result. Check the console to see all of the data returned.
					console.log('Get Contents', response);
					return response.data.items;
				});
		},
	
		getPage: function(page, pageSize) {
			// $http returns a promise, which has a then function, which also returns a promise.
			var url = $config.contentsAPI + "?page=" + page + "&pageSize=" + pageSize;
//			var url = "http://salve.smart21.it/service/v1/products?page=" + page + "&pageSize=" + pageSize;
			console.log(url);
			return $http.get(url)
				.then(function(response) {
					// In the response, resp.data contains the result. Check the console to see all of the data returned.
					console.log('Get Contents', response);
//					console.log('N° New Contents', response.data.items.length);
					return response.data.items;
				});
		},
		
		//http://salve.smart21.it/service/v1/search/products?fquery=q=* OR **&sort=_score desc, modifiedon desc&fq=categories:/salve/eventi*&fq=status:[1 TO *]&status=1&page=0&pageSize=40
		search: function(text, categoryId, page, pageSize) {
			// $http returns a promise, which has a then function, which also returns a promise.
//			var fquery = "q=* OR **&sort=_score desc, modifiedon desc&fq=categories:/salve/eventi*&fq=status:[1 TO *]";
			var _text = (text=="*") ? "q=* OR **" : "q=" + text + "* OR *" + text + "*";
			var fquery = "q=" + _text + "&sort=_score desc, modifiedon desc&fq=categories:" + categoryId + "*&fq=status:[1 TO *]";
			fquery = encodeURIComponent(fquery);
			var url = $config.contentsSearchAPI + "?fquery=" + fquery + "&status=1&page=" + page + "&pageSize=" + pageSize;
			console.log(url);
			return $http.get(url)
				.then(function(response) {
					// In the response, resp.data contains the result. Check the console to see all of the data returned.
					console.log('Search Contents', response);
					return response.data.items;
				});
		},
	
	};
})



.factory('CategoryService', function($http) {
	var categories = [];
	
	return {

		getCategories: function(){
			return categories;
		},
		
		getByParentId: function(parentId){
			var url = $config.categoriesAPI + "?parentid=" + parentId;
			console.log('Get Categories url', url);
			return $http.get(url).then(function(response) {
				// In the response, resp.data contains the result. Check the console to see all of the data returned.
//				console.log('Get Categories', response.data.items);
				categories = response.data.items;
				console.log('CategoryService.getByParentId', categories);
				return response.data.items;
			});
		},
		
	};
})



.factory('UserService', function() {
	var user = null;
	
	return {
		
		isAuthenticated: function(){
			var isAuth = (user==null) ? false : true;
			return isAuth;
		},
		
		login: function(){
			user = {"username": "luca", "fullname": "Luca Conversano"};
			return user;
		},
		
		logout: function(){
			user = null;
		},
		
		getUserLogged: function(){
			return user;
		}
		
	};
})



//.factory('CategoryService', function($http) {
//	return {
//
//		getByParentId: function(parentId){
//			var url = $config.categoriesAPI + "?parentid=" + parentId;
//			console.log('Get Categories url', url);
//			return $http.get(url).then(function(response) {
//				// In the response, resp.data contains the result. Check the console to see all of the data returned.
//				console.log('Get Categories', response.data.items);
//				
////				//Aggiungo la proprietà 'imageURL'.
////				angular.forEach(response.data.items, function(item){
////					item.imageURL = $config.categoryImageAPI + item.id + "/icon.png";
////				})
//				
//				return response.data.items;
//			});
//		},
//		
//	};
//})




.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
