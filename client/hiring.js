Candidates = new Mongo.Collection("Candidate");
Roles = new Mongo.Collection("Roles");

if (Meteor.isClient) {
	// 	 code only runs on the client
	Template.body.helpers({
		// Niveis da vaga
		niveis: [
			{nivel:"Junior"},
			{nivel:"Pleno"},
			{nivel:"Senior"},
		],

		
		candidates: function () {
			return Candidates.find({}, {sort: {createdAt: -1}});
		},
		userRoles: function() {
			return Roles.find({});
		}
	});

	Template.candidate.helpers({
		userRoles: function(){
			return Roles.find({});
		},
		selected: function() {
			console.log(this);
			console.log(role);
			return (this.role == role) ? true : false;
		}
	})

	Template.body.events({
		"submit .new-candidate": function (event) {
			// Prevent default browser form submit
			event.preventDefault();

			// Get value from form element
			var name = event.target.name.value;
			var role = event.target.role.selectedOptions[0].value;
 
			// Insert a task into the collection
			Candidates.insert({
				name: name,
				userRole: role,
				createdAt: new Date() // current time
			});
 
			// Clear form
			event.target.name.value = "";
		},

		"submit .update-candidate": function (event) {
			// Prevent default browser form submit
			event.preventDefault();

			// Get value from form element
			var name = event.target.uName.value;
			var role = event.target.uRole.selectedOptions[0].value;
 
			// Insert a task into the collection
			Candidates.update(this._id, {
				name: name,
				userRole: role,
				updatedAt: new Date() // current time
			});
 
			// Clear form
			event.target.name.value = "";
			$(event.target).toggle('fast');
		},

		"click .edit": function (e) {
			var form = $(e.target).parents("li").find("form");
			form.toggle('fast');
		},

		"click .delete": function () {
			Candidates.remove(this._id);
		}
	});
}