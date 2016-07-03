practo.factory('apiFactory', function($http) {
       var apiFactory = {
          factoryCall: function(link) {
           	var promise=$http({
            method : 'get',
            url : link
            }).then(function(response) {
                output=(JSON.parse(response.data));
                 return output;
        	});   
            return promise;
        }
    }
     return apiFactory;
 });


