closeModal = function(){
	$('.abs').find(".info").toggle('slow');
	$('.abs').find('.edit').toggle('fast');
	$('.abs').removeClass('abs');
	$('.candidato').fadeOut();
	$('.modal').fadeOut();
}