/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');
module.exports = {
	create: function(req, res){
		var name = req.param('name');
		var shownName = req.param('shownName');
		var description = req.param('description');
		var price = req.param('price');
		var type = req.param('type');
		var remarks = req.param('remarks');

		if(!name){
			res.end();
			return;
		}
		product.create({name: name, shownName: shownName, description: description, price: price, type: type, remarks: remarks }).exec(function(err, product){
			if(err){
				res.end();
				return;
			}
			res.status(200);
			res.json(product);
			return;
		});
	}
  ,
	update: function(req, res){
		var id = req.param('id');
		var updateOptions = {};
		var name = req.param('name');
		var shownName = req.param('shownName');
		var description = req.param('description');
		var price = req.param('price');
		var type = req.param('type');
		var remarks = req.param('remarks');

		if(name){
			updateOptions.name = name;
		}
		if(shownName){
			updateOptions.shownName = shownName;
		}
		if(description){
			updateOptions.description = description;
		}
		if(price){
			updateOptions.price = price;
		}
		if(remarks){
			updateOptions.remarks = remarks;
		}
		if(type){
			updateOptions.type = type;
		}
		product.update({id: id}, updateOptions).exec(function(err){
			res.status(200);
			res.end();
			return;
		});
	},
	find: function(req, res){
		product.find().exec(function(err, products){
			res.json(products);
			return;
		});
	},
	findOne: function(req, res){
		var id = req.param("id");
		product.findOne({id: id}).exec(function(err, productOne){
			res.json(productOne);
		});
	}
};
