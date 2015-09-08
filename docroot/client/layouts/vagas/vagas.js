Template.infoVaga.helpers({
	candidatos: function(){
		return Candidatos.find({"vaga": this._id});
	},
	prettifyDate: function(date) {
		return moment(date).format('DD/MM/YYYY');
	}
});

//Helper para o formulario de edição da vaga
Template.editVaga.helpers({
	// Niveis da vaga
	niveis: function() {
		var self = this;
		var niveis = [
			{nivel: {name:"Junior", status: false}},
			{nivel: {name:"Pleno", status: false}},
			{nivel: {name:"Senior", status: false}},
		];

		niveis.forEach(function(item) {
			if (item.nivel.name == self.nivel.name) {
				item.nivel.status = true;
			}
		})

		return niveis;
	}
});


Template.contentVaga.events({

	// Submit de edião de uma vaga já existente
	"submit .edit-vacancy": function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		var papel = event.target.vRoleEdit.value;
		var nivel = event.target.nivelEdit.selectedOptions[0].value;
		var salario = event.target.vCostEdit.value;
		//TODO fazer as datas funcionar
		var dtIni = new Date();
		var dtEnd = new Date();
		//TODO converter para booleano
		var status = "Aberta";

		// Insert a task into the collection
		Vagas.update(this._id, {
			$set: {
				papel: papel,
				nivel: {name:nivel, status: true},
				salario: salario,
				dtIni: dtIni,
				dtEnd: dtEnd,
				status: status,
				createdAt: new Date()
			}
		});

		var self = $(event.target);
		self.parents("li").find(".info").toggle('slow');
		self.parents("li").find(".info-edit").toggle('slow');
	},

	"click .edit": function (event) {
		var self = $(event.target);
		self.parents("li").find(".info").toggle('slow');
		self.parents("li").find(".info-edit").toggle('slow');
		self.parents("li").toggleClass('absEdit');
		$(".modal").toggle('fast');
	},

	"click .addCand": function (event) {
		var self = $(event.target);
		clearCandForm(self);
		if(self.parents("li").hasClass("abs")){
			self.parents("li").removeClass("abs");
		}else{
			self.parents("li").addClass("abs");
		}
		Session.set('entrevista', false);
		self.parents("li").find('.edit').toggle('fast');
		self.parents("li").find(".info").toggle('fast');
		self.parents("li").find(".candidato").toggle('fast');
		Session.set('form', 'add');
		$(".modal").toggle('fast');
		$('.delete-candidate').addClass('sr-only');
	},

	"click .cand-btn": function (event) {
		var self = $(event.target);
		var that = this;
		var form = self.parents("li").find(".candidato").find("form");

		if(self.parents("li").hasClass("abs")){
			self.parents("li").removeClass("abs");
		}else{
			self.parents("li").addClass("abs");
		}

		if(that.interview != ""){
			Session.set('entrevista', true);
		} else {
			Session.set('entrevista', false);
		}


		self.parents("li").find('.edit').toggle('fast');
		self.parents("li").find(".info").toggle('fast');
		self.parents("li").find(".candidato").toggle('fast', function(){

			var name = form.find("input[name='cName']");
			var social = form.find("input[name='cSocial']");
			var cv = form.find("input[name='cCurriculo']");
			var init = form.find("input[name='cInit']");
			var nivel = form.find("input[name='cNivel']");
			var salario = form.find("input[name='cSalario']");
			var avaliacao = form.find("select[name='cValid']");
			var obs = form.find("textarea[name='cObs']");
			var result = form.find("select[name='cResult']");
			var submit = form.find("input[name='submit']");

			$(form).addClass('edit-candidate');
			$(name).val(that.name);
			$(social).val(that.social);
			$(cv).val(that.cv);
			$(init).val(that.interview);
			$(nivel).val(that.nivel);
			$(salario).val(that.salario);
			$(avaliacao).val(that.avaliacao);
			$(obs).val(that.obs);
			$(result).val(that.result);
			$(submit).val("Editar Candidato");
			// $('.delete-candidate').removeClass('sr-only');

		});


		Session.set('form', 'edit');
		Session.set('candId', this._id);
		$(".modal").toggle('fast');
	},

	"click .delete": function (event) {
		if($(".modal").is(":visible")){
			closeModal();
		}else{
			Vagas.remove(this._id);
		}
	},
});
