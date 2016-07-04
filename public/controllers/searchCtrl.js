//This is a controller for search module which passes request to the api
practo.controller('searchCtrl', function($scope,$http,apiFactory) {
	$scope.cities = ['Agra','Ahmedabad','Allahabad','Amritsar','Aurangabad','Bangalore','Bhopal','Chandigarh','Chennai','Coimbatore','Delhi',
	'Ernakulam','Faridabad','Ghaziabad','Gurgaon','Hyderabad','Indore','Jaipur','Jodhpur','Kanpur','Kolkata','Lucknow','Ludhiana','Meerut',
	'Mohali','Mumbai','Nagpur','Nashik','Navi Mumbai','Noida','Panchkula','Patna','Puducherry','Pune','Raipur','Rajkot','Ranchi','Surat',
	'Thane','Thiruvananthapuram','Vadodara','Varanasi','Vijayawada','Visakhapatnam'];
	//populate list of specialities for a selected cities
	$scope.populateSpecialities = function(city) {
        var link = '/doctors/meta/cities/';       
        var id;
        apiFactory.factoryCall(link).then(function(citiesResponse) {   
                for(var i=0;i<citiesResponse.cities.length;i++) {
                	if(citiesResponse.cities[i].name == city) {
                		id = citiesResponse.cities[i].id;     
                	 }
               	}
               	link = '/doctors/meta/cities/'+id;
               	apiFactory.factoryCall(link).then(function(specialityResponse) {   
					$scope.specialities = specialityResponse.specialties;
					$scope.mark = 0;    
        	});    
        }); 
	}
	$scope.search = function() {
		var page = 0;
		var speciality = $scope.speciality;
		var locality = $scope.locality;
		var sortMethod = $scope.sort;
        //by default sorting method
		if(sortMethod == undefined) {
			sortMethod = 'practo_ranking';
        }
		speciality = String(speciality).toLowerCase();
		locality = String(locality).toLowerCase();

		if (locality == 'undefined' || locality == 'null') {
		    $scope.flag=1;
		}
		else if (speciality != 'undefined' && speciality!= 'null') {
	        window.open('list.html?speciality='+speciality+'&locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
		}
		else if(speciality == 'undefined' || speciality == 'null') {
		    window.open('list.html?locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
		}
	}
});
