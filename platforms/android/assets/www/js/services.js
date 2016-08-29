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
			user = {"username": "mariorossi", "fullname": "Mario Rossi"};
			return user;
		},
		
		logout: function(){
			user = null;
		},
		
		getUserLogged: function(){
			return user;
		}
		
	};
});
