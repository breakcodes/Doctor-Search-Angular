//controller which lists all the doctors by making  call to the practo api.
practo.controller('listCtrl',function($scope,$http,$attrs,apiFactory){
            
    var query = location.search.substr(1);
    var result = {};
     //Parsing the Uri parameter       
    query.split('&').forEach(function(part) {
        var item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    
    var page = result.pagenumber;
    if(page == '' || page == undefined){
        page = 0;
    }

    var speciality = result.speciality;
    var pos = -1;
    if(speciality != undefined){
        pos = speciality.indexOf('/');   
        if(pos != -1){
            speciality = speciality.substring(0, pos);
        }
    }
    var locality = result.locality;
    var sortMethod = result.sort_by;
    listing();
    //opens detailed profile of a doctor
    $scope.profiling = function(){
        window.open('profile.html?id='+this.values.doctor_id,'_self');
    }
    //next page display
    $scope.nextPage = function(){
        page++;
        if(speciality != undefined){
            window.open('list.html?speciality='+speciality+'&locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
        }
        else if(speciality == undefined){
            window.open('list.html?locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
        }
    }
    //previous page display
    $scope.previousPage = function(){
        page--;
        if(page < 0){
            page = 0;
        }

        if (speciality != undefined){
            window.open('list.html?speciality='+speciality+'&locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
        }
        else if(speciality == undefined){
            window.open('list.html?locality='+locality+'&pagenumber='+page+'&sort_by='+sortMethod,'_self');
        }
    }

    $scope.redirect = function(){
        $scope.flag = 0;
        window.open('./index.html','_self');
    }

    function listing(){
        var offset = page * 10;
        var link;

        if(speciality != undefined){
            link = '/doctors/searchLocalitySpecility/'+locality+'/'+speciality+'/'+offset+'/'+sortMethod;
        }
        else{
            link = '/doctors/searchLocality/'+locality+'/'+offset+'/'+sortMethod;
        }
        //api factory to make call to practo Api
        apiFactory.factoryCall(link).then(function(output) {   
            $scope.obj = output;
            //if none of the response found
            if($scope.obj.doctors.length == 0){
                $scope.flag=1;
            }
        });
    }
});

