//controller to display detail profile of a doctor
profile.controller('profileCtrl',function($scope,$http){

    var query = window.location.search.substring(1);
    //Parsing Uri parameter to find the doctor's id
    var pos = query.indexOf('=');   
    var key = query.substring(0, pos);
    var val = query.substring(pos + 1);
    var link = 'http://127.0.0.1:8085/doctors/profile/'+val;

    $scope.redirect = function(){
        $scope.flag = 0;
        window.open('./index.html','_self');
    }

    $http({
            method : 'get',
            url : link
        }).then(function(response) {
                $scope.obj=(JSON.parse(response.data));

                //console.log($scope.obj.id)
                if($scope.obj.id == undefined){
                    $scope.flag=1;
                }
                else{
                    //name
                    $scope.name = $scope.obj.name;
                    //photo
                    if($scope.obj.photos.length >0){
                        $scope.photo = $scope.obj.photos[0].photo_url;
                    }
                    else{//by default image
                        $scope.photo = 'https://lh3.googleusercontent.com/P0NGOaUkQNiO-PhqBhh2ywcXPAlBzP2FKrProoZ5qffK-plUBa_4NXtITCodWSI-Igw=w300';
                    }
                    //practices
                    if($scope.obj.relations.length>0){
                        $scope.practices = $scope.obj.relations[0].practice.name;
                    }
                    else{
                        $scope.practices = 'No practices found';
                    }
                    //adress
                    if($scope.obj.relations.length >0){
                        if(typeof($scope.obj.relations[0].practice) != 'undefined'){
                            $scope.address = $scope.obj.relations[0].practice.street_address;
                        }
                    if(typeof ($scope.obj.relations[0].practice.locality) != 'undefined'){
                        $scope.address = $scope.address + $scope.obj.relations[0].practice.locality.city.name;
                    }
                    //consultation fee
                    if($scope.obj.relations.length >0){
                        $scope.consultationFees = $scope.obj.relations[0].consultation_fee;
                    }
                    else{
                        $scope.consultationFees = 'Not Provided';
                    }
                    //recommendation
                    if(typeof ($scope.obj.recommendation) != 'undefined' ){
                        $scope.recommendation = $scope.obj.recommendation.recommendation;
                    }
                    else{
                        $scope.recommendation = 'No recommendations';
                    }
                    //services
                    if($scope.obj.services.length == 0){
                        $scope.services = 'No services Provided';
                    }
                    else{
                        $scope.services = $scope.obj.services[0].service.name;
                        for(var i = 1;i<$scope.obj.services.length;i++){
                            $scope.services = $scope.services+ ',' +$scope.obj.services[i].service.name;
                        }
                    }
                    //qualifications
                    if($scope.obj.qualifications.length == 0){
                        $scope.qualifications = 'No qualifications proviced';
                    }
                    else{
                        $scope.qualifications = $scope.obj.qualifications[0].qualification.name;
                        for(var i = 1;i<$scope.obj.qualifications.length;i++){
                            $scope.qualifications = $scope.qualifications +','+$scope.obj.qualifications[i].qualification.name;
                        }
                    }
                    //awards
                    if($scope.obj.awards.length >0){
                    $scope.awards = $scope.obj.awards[0].title;
                    }
                    else{
                        $scope.awards = 'No awards';
                    }
                }
            }
    });    
});
