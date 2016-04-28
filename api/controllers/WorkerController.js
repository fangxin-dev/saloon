/**
 * WorkerController
 *
 * @description :: Server-side logic for managing workers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');
module.exports = {
	create: function(req, res){
		var name = req.param('name');
		var number = req.param('number');
		var shownName = req.param("shownName");
		var description = req.param('description');
		var remarks = req.param('remarks');

		if(!name){
			res.end();
			return;
		}
		worker.create({name: name, number: number, shownName: shownName, description: description, remarks: remarks }).exec(function(err, worker){
			if(err){
				res.end();
				return;
			}
			res.status(200);
			res.json(worker);
			return;
		});
	}
  ,
	update: function(req, res){
		var id = req.param('id');
		var updateOptions = {};
		var name = req.param('name');
		var number = req.param('number');
		var shownName = req.param("shownName");
		var description = req.param('description');
		var remarks = req.param('remarks');
		if(name){
			updateOptions.name = name;
		}
		if(number){
			updateOptions.number = number;
		}
		if(shownName){
			updateOptions.shownName = shownName;
		}
		if(description){
			updateOptions.description = description;
		}
		if(remarks){
			updateOptions.remarks = remarks;
		}
		worker.update({id: id}, updateOptions).exec(function(err){
			res.status(200);
			res.end();
			return;
		});
	},
	image: function(req, res){
		var id = req.param("id");
		if(!id){
			res.end();
			return;
		}
		worker.findOne({id: id}).exec(function(err, workerOne){
			if(err||!workerOne){
				res.end();
				return;
			}
			req.file('files[]').upload(function (err, files) {
				if(err||!files||files.length!=1){
					res.end();
					return;
				}
				var imagePath;
				imagePath = files[0].fd;
				var cloudinary = sails.config.cloudinary.get();
				console.log("84");
				cloudinary.uploader.upload(imagePath, function(cloudinaryRes) {
					console.log(cloudinaryRes);
					image.create({publicId: cloudinaryRes.public_id, version: cloudinaryRes.version, format: cloudinaryRes.format}).exec(function(err, imageCreated){
						workerOne.image = imageCreated.id;
						workerOne.save(function(err){
							res.status(200);
							res.redirect('/worker.html');
							return;
						});
					})
				});
			});
		});
	},
	find: function(req, res){
		worker.find().exec(function(err, workers){
			res.json(workers);
			return;
		});
	},
	findOne: function(req, res){
		var id = req.param("id");
		worker.findOne({id: id}).exec(function(err, workerOne){
			res.json(workerOne);
		});
	},
	deleteImage: function(req, res){
		var workerId = req.param("workerId");
		var imageId = req.param("imageId");
		worker.findOne({id: workerId}).exec(function(err, workerOne){
			workerOne.image = null;
			workerOne.save(function(){
				res.end();
				return;
			});
		});
	}
};
