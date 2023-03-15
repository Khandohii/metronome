$(function(){
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	$(':root').css('--scroll_width', widthScroll() +'px')


	$('body').on('click', '.accordion .item .open_btn', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	$('body').on('click', '.mob_menu_link', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('header .wrap_block').removeClass('visible')
			$('body').removeClass('lock')
		} else {
			$(this).addClass('active')

			$('header .wrap_block').addClass('visible')
			$('body').addClass('lock')

			$('html, body').stop().animate({
			   	scrollTop: 0
			}, 100)
		}
    })


	$('body').on('click', 'header .main_menu .item a.sub_link', function(e) {
		if ($(window).width() < 1025) {
			e.preventDefault()

			if( $(this).hasClass('active') ) {
				$(this).removeClass('active')
				$(this).next('.sub_menu').slideUp(300)
			} else {
				$(this).addClass('active')
				$(this).next('.sub_menu').slideDown(300)
			}
		}
	})

	$('body').on('click', 'header .lang .block', function(e) {
		if ($(window).width() < 1025) {
			e.preventDefault()

			if( $(this).hasClass('active') ) {
				$(this).removeClass('active')
				$(this).next('.dropdown').slideUp(300)
			} else {
				$(this).addClass('active')
				$(this).next('.dropdown').slideDown(300)
			}
		}
	})


	$('body').on('change', '.theme_mode input[type="checkbox"]', function(e) {
		e.preventDefault()

		if ($(this).is(':checked') ) {
			$('html').addClass('dark')
		} else{
			$('html').removeClass('dark')
		}
	})

	
    $('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )

	    if( inputVal > minimum ){
	    	input.val( inputVal-step )

		    if(input.hasClass('beatsCount')){
		    	changeBeats(inputVal-step)
		    }
	    }
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )

	    if( inputVal < maximum ){
	    	input.val( inputVal+step )

		    if(input.hasClass('beatsCount')){
		    	changeBeats(inputVal+step)
		    }
	    }
	})


	$('body').on('click', '.more_btn button', function(e) {
		e.preventDefault()

		$(this).parent().parent().find('.hide > :hidden').show();

		$(this).parent().hide();
	})
})


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    console.log(charCode)
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) return false;
   	return true;
};

function changeBeats(beats){
	if ($('.metronome .beat .beats .circle').length < beats) {
		$('.metronome .beat .beats').append('<div class="circle"></div>')
		changeBeats(beats)
	} else if($('.metronome .beat .beats .circle').length > beats){
		$('.metronome .beat .beats .circle:last').remove()
		changeBeats(beats)
	} else{
		return true;
	}
}

function animationBeats(el){
	let speed = 60 / $('.metronome .bpm .val').text() * 1000

	if (el.hasClass('active')) {
		if ($('.metronome .beat .beats .circle.active').length){
			if ($('.metronome .beat .beats .circle.active').index() == ($('.metronome .beat .beats .circle').length - 1)) {
				$('.metronome .beat .beats .circle.active').removeClass('active')
				$('.metronome .beat .beats .circle:eq(0)').addClass('active')

				setTimeout(function() {
					animationBeats(el)
				}, speed)
			} else{
				$('.metronome .beat .beats .circle.active').removeClass('active').next().addClass('active')

				setTimeout(function() {
					animationBeats(el)
				}, speed)
			}
		} else{
			$('.metronome .beat .beats .circle:eq(0)').addClass('active')

			setTimeout(function() {
				animationBeats(el)
			}, speed)
		}
	}
}