Vagas = new Meteor.Collection("Vacancy");
Candidatos = new Meteor.Collection("Candidate");
// Libera as operações para a collection Vacancy
Vagas.allow({
 insert: function () {
 	return true;
 },
 update: function () {
 	return true;
 },
 remove: function () {
 	return true;
 }
});

// Libera as operações para a collection Candidate
Candidatos.allow({
 insert: function () {
 	return true;
 },
 update: function () {
 	return true;
 },
 remove: function () {
 	return true;
 }
});