/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');
module.exports = {
	create: function(req, res){
		var name = req.param('name');
		var phone = req.param('phone');
		var remarks = req.param('remarks');

		if(!name){
			res.end();
			return;
		}
		member.create({name: name, phone: phone, remarks: remarks }).exec(function(err, member){
			if(err){
				res.end();
				return;
			}
			res.status(200);
			res.json(member);
			return;
		});
	}
  ,
	update: function(req, res){
		console.log("31");
		var id = req.param('id');
		var updateOptions = {};
		var name = req.param('name');
		var phone = req.param('phone');
		var remarks = req.param('remarks');
		if(name){
			updateOptions.name = name;
		}
		if(phone){
			updateOptions.phone = phone;
		}
		if(remarks){
			updateOptions.remarks = remarks;
		}

		member.update({id: id}, updateOptions).exec(function(err){
			res.status(200);
			res.end();
			return;
		});
	},
	find: function(req, res){
		member.find().exec(function(err, members){
			res.json(members);
			return;
		});
	},
	findOne: function(req, res){
		console.log("108");
		var id = req.param("id");
		member.findOne({id: id}).exec(function(err, memberOne){
			res.json(memberOne);
		});
	}
};
