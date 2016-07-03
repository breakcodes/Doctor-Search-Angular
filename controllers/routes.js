//This file is for handling the routing of urls
var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var path = require('path');

var appDir = path.dirname(require.main.filename);

router.get('/', function(req, res) {
    //console.log('hey');
    res.sendFile(appDir+'/public/index.html');
});

var apiUrl;
//Api to fetch profile of a particular file
router.get('/profile/:id',function(req,res) {
    apiUrl = 'https://api.practo.com/doctors/'+req.params.id+'?with_relations=true';

    request.get({
        url : apiUrl,
        headers : {
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if(!error && response.statusCode == 200) {
            res.json(body);
        }
        else{
            res.json("{}");
            console.log('error While fetching');
        }
    });
});

router.get('/meta/cities/',function(req,res) {
    apiUrl = 'https://api.practo.com/meta/search/cities';
    console.log("gourav here");
    request.get({
        url : apiUrl,
        headers : {
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if(!error && response.statusCode == 200) {
            console.log(body);
            res.json(body);
        }
        else{
            res.json("{}");
            console.log('error While fetching');
        }
    });
});

router.get('/meta/cities/:city',function(req,res) {
    apiUrl = 'https://api.practo.com/meta/search/cities/'+req.params.city;

    request.get({
        url : apiUrl,
        headers : {
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if(!error && response.statusCode == 200) {
            res.json(body);
        }
        else{
            res.json("{}");
            console.log('error While fetching');
        }
    });
});



//Api to fetch doctors based on specialization and locality
router.get('/searchLocalitySpecility/:locality/:specialization/:offset/:sortMethod',function(req,res){

    apiUrl = 'https://api.practo.com/search/?city='+req.params.locality+'&speciality='+req.params.specialization+'&offset='+req.params.offset+'&sort_by='+req.params.sortMethod;

    request.get({
        url : apiUrl,
        headers :{
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
  		if (!error && response.statusCode == 200) {
    		res.json(body);
  		}
  		else{
  			console.log('error While fetching');
  		}
    });
});

//Api to fetch doctors based only on locality
router.get('/searchLocality/:locality/:offset/:sortMethod',function(req,res){

    apiUrl = 'https://api.practo.com/search/?city='+req.params.locality+'&offset='+req.params.offset+'&sort_by='+req.params.sortMethod;
    request.get({
        url : apiUrl,
        headers :{
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if (!error && response.statusCode == 200){
            res.json(body);
        }
        else{
            console.log('error While fetching');
        }
    });
});

module.exports = router;
