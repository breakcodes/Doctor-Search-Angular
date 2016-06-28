//This is a controller for search module which passes request to the api
search.controller('searchCtrl', function($scope,$http) {
	$scope.search = function() {
		var page = 0;
		var speciality = $scope.speciality;
		var locality = $scope.locality;

		speciality = String(speciality).toLowerCase();
		locality = String(locality).toLowerCase();

		if (locality == 'undefined'){
			$scope.flag=1;
		}
		else if (speciality != 'undefined'){
			window.open('list.html?speciality='+speciality+'&locality='+locality+'&pagenumber='+page,'_self');
		}
		else if(speciality == 'undefined'){
			window.open('list.html?locality='+locality+'&pagenumber='+page,'_self');
		}
	}
});
