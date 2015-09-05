closeModal = function(){
	// Toggle do form de Edit
	$('.absEdit').find(".info").toggle('slow');
	$('.absEdit').find(".info-edit").toggle('slow');
	$('.absEdit').removeClass('absEdit');

	// Toggle form de Candidato
	$('.abs').find(".info").toggle('slow');
	$('.abs').find('.edit').toggle('fast');
	$('.abs').removeClass('abs');
	$('.candidato').fadeOut();
	$('.modal').fadeOut();
}