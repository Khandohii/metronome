$(function(){
	// Range
    $rangeSlider = $('[data-range="range-slider"]').ionRangeSlider({
        postfix	 :'',
        skin: "round",
        onStart: function(data) {
            $(data.input).closest('.box').find('.bpm .val').text($(data.input).val())
        },
        onChange: function(data) {
            $(data.input).closest('.box').find('.bpm .val').text($(data.input).val())
        }
    }).data("ionRangeSlider");

	$('body').on('click', '.metronome .settings .box_input input', function(e) {
	    e.preventDefault()

	    $(this).select()
	})


	// Check text
	$('.metronome .settings .box_input input').keydown(function(e) {
		if (!isNumberKey(e)) {
			e.preventDefault()
		}
	});

	// Buttons +/- on the progressbar
	$('body').on('click', '.metronome .bar button.plus', function(e) {
	    e.preventDefault()

	    let valOld = $rangeSlider.old_from;

	    if (valOld < $rangeSlider.options.max) {
	    	valOld += 1
	    }

	    $rangeSlider.update({
	        from: valOld,
	    });

	    $(this).closest('.box').find('.bpm .val').text(valOld)
	})

	$('body').on('click', '.metronome .bar button.minus', function(e) {
	    e.preventDefault()

	    let valOld = $rangeSlider.old_from;

	    if (valOld > $rangeSlider.options.min) {
	    	valOld -= 1
	    }

	    $rangeSlider.update({
	        from: valOld,
	    });

	    $(this).closest('.box').find('.bpm .val').text(valOld)
	})


	// Start/stop
	$('body').on('click', '.metronome .buttons .start', function(e) {
	    e.preventDefault()

	    let thisEl = $(this)

	    if ($(this).hasClass('active')) {
	    	$(this).removeClass('active')
	    	animationBeats(thisEl)
	    } else{
	    	$(this).addClass('active')
	    	animationBeats(thisEl)
	    }
	})


	// Open/close fullscreen
	$('body').on('click', '.metronome .fullscreen button', function(e) {
	    e.preventDefault()

	    if ($(this).hasClass('active')) {
	    	$(this).removeClass('active')
	    	$('.metronome .block').removeClass('fixed')
	    	$('body').removeClass('lock')
	    } else{
	    	$(this).addClass('active')
	    	$('.metronome .block').addClass('fixed')
	    	$('body').addClass('lock')
	    }
	})

	// Stars Select
	$('.stars .star').hover(function(e) {
	    e.preventDefault()

    	$(this).addClass('active').prevAll('.star').addClass('active')
    	$(this).nextAll('.star').removeClass('active')
	}, function() {
		$(this).removeClass('active')
		$(this).nextAll('.star').removeClass('active')
		$(this).prevAll('.star').removeClass('active')
	})
})