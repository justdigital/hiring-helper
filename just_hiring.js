Candidates = new Mongo.Collection("Candidate");

if (Meteor.isClient) {
	// 	 code only runs on the client
	Template.body.helpers({
		candidates: function () {
			return Candidates.find({}, {sort: {createdAt: -1}});
		},
		roles: [
			{ role: "Product Owner" },
			{ role: "Scrum Master" },
			{ role: "Desenvolvedor" },
		]
	});

	Template.candidate.helpers({
		roles: function(){
			Session.set('role', this.role);
			return [
				{ role: "Product Owner" },
				{ role: "Scrum Master" },
				{ role: "Desenvolvedor" },
			];
		}
	})

	Template.role.helpers({
		selected: function(role) {
			var r = Session.get('role');
			var selected = (r == role) ? 'selected' : '';
			return selected;
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
				role: role,
				createdAt: new Date() // current time
			});
 
			// Clear form
			event.target.name.value = "";
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