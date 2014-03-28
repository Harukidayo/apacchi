
/*
 * GET home page.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://haruki:sushi123@troup.mongohq.com:10004/rent');


var AptSchema = mongoose.Schema({
    name: String,
    rent: String,
    street: String
});
var Apt = mongoose.model('apartment', AptSchema);


//var apartmentsMG = mongoose.get('rent');
//var db = mongoose.connection;

var titleText = "Variable dayoon"

exports.index = function(req, res){
  res.render('index', { 
  	title: titleText,
  	nasubi: 'Nasu desu'
  	});
  console.log(titleText + " nanodesu");
};

exports.create = function(req,res){
	new Apt({
		name: req.body.apt_name,
		rent: req.body.apt_rent,
		street: req.body.apt_street
	}).save(function(err,todo,count){
		res.redirect('/list');
	});

	/*
	res.render('create', {
		title: 'Create Page Title',
		name: 'Apartment name',
		rent: 'rent',
		street: 'address'
	});
*/

	
};

exports.list = function(req, res){
	
	//search apartments using HTML form

	//takes name of apartment as input and calls callback
	//how does apts333 get passed to the callback function???
	//apts333 is an Apts object
	var show_apt_list = function(apt_name, callback){	

		//the list page initially loads showing result of empty ('') query... why?
		if(apt_name != ''){
			var apt_name_regexp = new RegExp(apt_name, 'i');
			Apt.find({name: apt_name_regexp}).exec(function(err, apts333){
			callback(err, apts333);
			});
		}
		else {
			Apt.find().exec(function(err, apts333){
			callback(err, apts333);
			});
		}			
	};

		
	show_apt_list(req.param('apt_search_name'), function(err, apts333){
		if(err){
			console.log("Error!");
			return;
		}
		
		res.render('list', {
		title: "Apartment Test",
		apts_it: apts333,
		search_term: req.param('apt_search_name')
		});
			
		//console.log("2. req.apt_search_name: " + req.param('apt_search_name'));
		//console.log("apts333: " + apts333);
		//console.log("req.ip: " + req.ip);
		//console.log("req.host: " + req.host);
	});
	
	
};


