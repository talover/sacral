$(document).ready(function(){
	$('input, select').styler();

	//Tabs
	changeTab('.tab-navs', 'a', '.tabs-content');

	//Masonry
	setTimeout(function(){
		massonryInit('#container-massonry', '.item');
	}, 100);

	//

	setTimeout(function(){height_cont()},200);

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

	// slider in product

	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
 
	sync1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		navigation: false,
		pagination:false,
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
	});
 
	sync2.owlCarousel({
		items : 6,
		pagination:false,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});
 
	function syncPosition(el){
		var current = this.currentItem;
		$("#sync2")
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced")
		if($("#sync2").data("owlCarousel") !== undefined){
			center(current)
		}
	}
 
	$("#sync2").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	});
 
	function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
			if(num === sync2visible[i]){
				var found = true;
			}
		}
 
		if(found===false){
			if(num>sync2visible[sync2visible.length-1]){
				sync2.trigger("owl.goTo", num - sync2visible.length+2)
			}else{
				if(num - 1 === -1){
					num = 0;
				}
				sync2.trigger("owl.goTo", num);
			}
		} else if(num === sync2visible[sync2visible.length-1]){
			sync2.trigger("owl.goTo", sync2visible[1])
		} else if(num === sync2visible[0]){
			sync2.trigger("owl.goTo", num-1)
		}
	}

	// page-slider

	$(".page-slider").owlCarousel({
		slideSpeed: 800,
		paginationSpeed: 800,
		rewindSpeed: 800,
		singleItem: true,
		autoPlay: 10000,
		addClassActive: true,
		navigation : true,
		afterAction : item_number,
	});

	function item_number(el) {
		var current = this.owl.currentItem + 1,
			owlItems = this.owl.owlItems.length;

		$(this.owl.baseElement).parents('.carosel-block').find('.number').text(parseInt(current) + "/" + parseInt(owlItems));
	}

	// event-toggle

	$('.arrow-event-toggle').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$(this).siblings('.dropdown').slideToggle();
	});
});

$(window).resize(function(){
	setTimeout(function(){height_cont()},200);
});


var changeTab = function(linkContainer, linkTab, tabContainer) {
	$(linkContainer).on('click', linkTab, function(event) {
		var $this = $(this),
			href = $this.attr('href'),
			container = $(tabContainer),
			dataSlide = $this.data('slide')

		$this.parent().addClass('active').siblings().removeClass('active');

		$(href).parent(container).find('.tab').stop().fadeOut('fast');
		$(href).stop().fadeIn('fast');
		$(href).addClass('active').siblings().removeClass('active');
		// $(href).removeClass('inactive').siblings().addClass('inactive');
		//Recall massonry
		massonryInit('#new-massonry', '.item');
		massonryInit('#container-massonry', '.item');

		event.preventDefault();

		setTimeout(function(){height_cont()},200);

		initialize();
	});
}

var massonryInit = function(container, items){
	var $container = $(container);

	$container.masonry({
		itemSelector: items
	});
}

function height_cont() {
	var section_cont = $('.section-cont').height(),
		category_list = $('.category-list').height();

		$('.section-cont').css('min-height', parseInt(category_list) + "px");
		$('.category-list').css('min-height', parseInt(section_cont) + "px");
}