//This is a controller for search module which passes request to the api
search.controller('searchCtrl', function($scope,$http) {
	
	$scope.cities = ["Agra","Ahmedabad","Allahabad","Amritsar","Aurangabad","Bangalore","Bhopal","Chandigarh","Chennai","Coimbatore","Delhi","Ernakulam","Faridabad","Ghaziabad","Gurgaon","Hyderabad","Indore","Jaipur","Jodhpur","Kanpur","Kolkata","Lucknow","Ludhiana","Meerut","Mohali","Mumbai","Nagpur","Nashik","Navi Mumbai","Noida","Panchkula","Patna","Puducherry","Pune","Raipur","Rajkot","Ranchi","Surat","Thane","Thiruvananthapuram","Vadodara","Varanasi","Vijayawada",
					"Visakhapatnam"];
	
	$scope.func = function(para){
		
        $scope.mark = 0;
        
        link = 'http://127.0.0.1:8085/doctors/meta/cities/';       
        var id;
        $http({
            method : 'get',
            url : link
            }).then(function(response) {
                var citiesResponse = (JSON.parse(response.data));

                for(var i=0;i<citiesResponse.cities.length;i++){
                	if(citiesResponse.cities[i].name == para){
                		id = citiesResponse.cities[i].id;     
                	 }
               	}
               	link = 'http://127.0.0.1:8085/doctors/meta/cities/'+id;
               	$http({
	            method : 'get',
	            url : link
	            }).then(function(response) {
	                var specialityResponse = (JSON.parse(response.data));
					$scope.specialities = specialityResponse.specialties;
        	});    
        });              
	}

	$scope.search = function() {
		var page = 0;
		var speciality = $scope.speciality;
		var locality = $scope.locality;
		var sortMethod = $scope.sort;

		if(sortMethod == undefined)
			sortMethod = 'practo_ranking';

		speciality = String(speciality).toLowerCase();
		locality = String(locality).toLowerCase();

		 if (locality == 'undefined' || locality == 'null'){
			$scope.flag=1;
		 }
		 else if (speciality != 'undefined' && speciality!= 'null'){
		 	window.open('list.html?speciality='+speciality+'&locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
		 }
		 else if(speciality == 'undefined' || speciality == 'null'){
		 	window.open('list.html?locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
		 }
	}
});
