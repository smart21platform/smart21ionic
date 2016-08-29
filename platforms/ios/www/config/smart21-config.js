var tenant = 'salve';
var $config = {
	pageSize: 10, 	//Dimensione pagina per lista contenuti.
	
	//Contents
	contentsAPI: "http://" + tenant + ".smart21.it/service/v1/products",
	contentsSearchAPI: "http://" + tenant + ".smart21.it/service/v1/search/products",
	
	//Categories
	//1° livello: "http://salve.smart21.it/service/v1/categories?parentid=/salve"
	//n° livello: "http://salve.smart21.it/service/v1/categories?parentid=/salve/segnalazioni/affissione-abusiva"
	categoriesAPI: "http://" + tenant + ".smart21.it/service/v1/categories",
	
	//Category image
	//"http://salve.smart21.it/imagerepo/service/images/search?url=/salve/category/salve/segnalazioni/affissione-abusiva/icon.png"
	categoryImageAPI: "http://" + tenant + ".smart21.it/imagerepo/service/images/search?url=/" + tenant + "/category",
	
	
};