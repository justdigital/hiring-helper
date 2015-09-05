Meteor.subscribe('vagas');
Meteor.subscribe('candidatos');

// 	 code only runs on the client
Template.app.helpers({
	// Niveis da vaga
	niveis:[
		{nivel:{name:"Junior", status: false}},
		{nivel:{name:"Pleno", status: false}},
		{nivel:{name:"Senior", status: false}},
	],

	//retornar as vagas salvas no banco
	oport: function() {
		return Vagas.find({}, {sort: {createdAt: -1}});
	},
	
	//retornar os candidatos
	candidates: function () {
		return Candidatos.find({}, {sort: {createdAt: -1}});
	},

	//retorna os papeis
	userRoles: function() {
		return Roles.find({});
	}
});

Template.app.events({
	// Submit de nova vaga
	"submit .new-vacancy": function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		var papel = event.target.vRole.value;
		var nivel = event.target.nivel.selectedOptions[0].value;
		var salario = event.target.vCost.value;
		//TODO fazer as datas funcionar
		var dtIni = new Date();
		var dtEnd = new Date();
		//TODO converter para booleano
		var status = "Aberta";

		// Insert a task into the collection
		Vagas.insert({
			papel: papel,
			nivel: {name:nivel, status: true},
			salario: salario,
			dtIni: dtIni,
			dtEnd: dtEnd,
			status: status,
			createdAt: new Date()
		});

		event.target.vRole.value = "";
		event.target.nivel.selectedOptions[0].value = "";
		event.target.vCost.value = "";
	},

	"click .modal": function (event) {
		closeModal();
	},
});
