clearCandForm = function($el){
	var form = $el.parents("li").find(".candidato").find("form");
	var name = form.find("input[name='cName']");
	var social = form.find("input[name='cSocial']");
	var cv = form.find("input[name='cCurriculo']");
	var submit = form.find("input[name='submit']");

	$(form).removeClass('edit-candidate');
	$(name).val("");
	$(social).val("");
	$(cv).val("");
	$(submit).val("Adicionar Candidato");
}

Template.candForm.events({
	// Submit de add de candidato para a vaga
	"submit .new-candidate": function (event) {
		// Prevent default browser form submit
		var self = this;
		event.preventDefault();
		
		// Get value from form element
		var name = event.target.cName.value;
		var social = event.target.cSocial.value;
		var cv = event.target.cCurriculo.value;
		var interview = new Date();
		var result = "";

		// Insert a task into the collection
		var objCand = {
			name: name,
			social: social,
			cv: cv,
			interview: interview,
			result: result,
			vaga: self._id
		};

		if (Session.get('form') == 'add') {
			Candidatos.insert(objCand);
		} else {
			var id = Session.get('candId');
			Candidatos.update(id, {$set:objCand});
		}

		// Clear form
		event.target.cName.value = "";
		event.target.cSocial.value = "";
		event.target.cCurriculo.value = "";

		clearCandForm($(event.target));
		closeModal();
	},
	'change .date': function(e) {
		if (e.target.value != '') {
			Session.set('entrevista', true);
		} else {
			Session.set('entrevista', false);			
		}
	}
});

Template.candForm.helpers({
	entrevista: function() {
		return Session.get('entrevista');
	}
})