clearCandForm = function($el){
	var form = $el.parents("li").find(".candidato").find("form");
	var submit = form.find("input[name='submit']");

	$(form).removeClass('edit-candidate').find("input, textarea, select").each(function(){
		$(this).val("");
	});
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
		var interview = $(event.target).find("input[name='cInit']").val();
		var result = event.target.cResult.selectedOptions[0].value;
		
		// Campos para a Entrevista 
		if (Session.get('entrevista')) {
			var nivel = event.target.cNivel.value;
			var salario = event.target.cSalario.value;
			var avaliacao = event.target.cValid.selectedOptions[0].value;
			var obs = event.target.cObs.value;
		}

		// Insert a task into the collection
		var objCand = {
			name: name,
			social: social,
			cv: cv,
			interview: interview,
			nivel: nivel,
			salario: salario,
			avaliacao: avaliacao,
			obs: obs,
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
		clearCandForm($(event.target));
		closeModal();
	},

	// 'change .date': function(e) {
	// 	if (e.target.value != '') {
	// 		Session.set('entrevista', true);
	// 	} else {
	// 		Session.set('entrevista', false);			
	// 	}
	// }
});

Template.candForm.helpers({
	entrevista: function() {
		return Session.get('entrevista');
	}
})