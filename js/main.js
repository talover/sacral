$(document).ready(function(){
	$('input, select').styler();

	//Tabs
	changeTab('.pop-navs', 'a', '.pop-container');
	changeTab('.art-navs', 'a', '.art-container');

	//Masonry
	setTimeout(function(){
		massonryInit('#container-massonry', '.item');
	}, 100);

	// Plus and minus (mini-cart)
	$(".cnt-btn").on("click", function () {

	    var $button = $(this),
	        $input = $button.closest('.counter').find('.cnt'),
	    	oldValue = $input.val(),
	        newVal;

	    if ($button.hasClass('plus')) {
	        newVal = parseFloat(oldValue) + 1;
	    } else {
	        if (oldValue > 1) {
	            newVal = parseFloat(oldValue) - 1;
	        } else {
	            newVal = 1;
	        }
	    }

	    $input.val(newVal);
	});

	// Remove item (mini-cart)
	$('.remove').on('click',  function() {
		var $this = $(this)

		$(this).closest('tr').remove();
	});

	// slider

	$(".main-slider").owlCarousel({
		slideSpeed: 800,
		paginationSpeed: 800,
		rewindSpeed: 800,
		singleItem: true,
		autoPlay: 10000,
		addClassActive: true,
		navigation : true
	});
});


var changeTab = function(linkContainer, linkTab, tabContainer) {
	$(linkContainer).on('click', linkTab, function(event) {
		var $this = $(this),
			href = $this.attr('href'),
			container = $(tabContainer),
			dataSlide = $this.data('slide')

		$this.parent().addClass('active').siblings().removeClass('active');

		container.find('.tab').stop().fadeOut('fast');
		$(href).stop().fadeIn('fast');
		$(href).removeClass('inactive').siblings().addClass('inactive');
		//Recall massonry
		massonryInit('#new-massonry', '.item');
		massonryInit('#container-massonry', '.item');

		event.preventDefault();
	});
}

var massonryInit = function(container, items){
	var $container = $(container);

	$container.masonry({
		itemSelector: items
	});
}