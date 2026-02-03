$(document).ready(function() {

	$("#portfolio_grid").mixItUp();

	$(".s_portfolio li").click(function() {
		$(".s_portfolio li").removeClass("active");
		$(this).addClass("active");
	});

	$(".popup").magnificPopup({
	    type: "image",
	    fixedContentPos: false,    // keep content position fixed for smooth animation
	    closeOnContentClick: true, // close when clicking on the image
	    preloader: false,          // disable default preloader for better fade effect
	    removalDelay: 800,         // delay before popup is removed
	    mainClass: "mfp-fade",     // CSS class to trigger fade animation
	    image: {
	        verticalFit: false
	    },
	    gallery: {
	        enabled: true,
	        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>'
	    }
	});
	// Video popup with .video-popup class toggle
	$(".popup_video").magnificPopup({
		type: "iframe",
		mainClass: "mfp-fade",
		removalDelay: 300,
		preloader: false,
		fixedContentPos: false,
		callbacks: {
			open: function() {
				$(".mfp-content").addClass("video-popup");
			},
			close: function() {
				$(".mfp-content").removeClass("video-popup");
			}
		}
	});
	$(".popup_content").magnificPopup({
		type: "inline",
		fixedContentPos: false,
		removalDelay: 300,
		mainClass: "mfp-fade",
		midClick: true,
		closeOnContentClick: true
	});

	$(".section_header").animated("fadeInUp", "fadeOutDown");

	$(".animation_1").animated("flipInY", "fadeOutDown");
	$(".animation_2").animated("fadeInLeft", "fadeOutDown");
	$(".animation_3").animated("fadeInRight", "fadeOutDown");
	
	

	$(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
	$(".right .resume_item").animated("fadeInRight", "fadeOutDown");

	function heightDetect() {
		$(".main_head").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
	});

	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".sandwich").toggleClass("active");
		$(".top_text").css("opacity", "1");
	}).append("<span>");

	$(".toggle_mnu").click(function() {
		if ($(".top_mnu").is(":visible")) {
			$(".top_text").css("opacity", "1");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").css("opacity", ".1");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});

	$(".portfolio_item").each(function(i) {
		$(this).find("a").attr("href", "#work_" + i);
		$(this).find(".podrt_descr").attr("id", "work_" + i);
	});

	$(".portfolio_item img").on("click", function() {
		$(this).closest(".portfolio_item").find(".popup_content").trigger("click");
	});

	$("input, select, textarea").jqBootstrapValidation();

	$(".top_mnu ul a, .cta_btn").mPageScroll2id();

	const $testimonialStack = $(".testimonial_stack");
	const $testimonials = $testimonialStack.find(".testimonial");
	if ($testimonialStack.length && $testimonials.length > 1) {
		let index = 0;
		let locked = false;

		$testimonials.removeClass("is-active is-exit-up is-exit-down");
		$testimonials.eq(index).addClass("is-active");

		function showTestimonial(nextIndex, direction) {
			if (locked || nextIndex === index) return;
			locked = true;

			const $current = $testimonials.eq(index);
			const $next = $testimonials.eq(nextIndex);

			$current.removeClass("is-active").addClass(direction === "down" ? "is-exit-down" : "is-exit-up");
			$next.removeClass("is-exit-up is-exit-down").addClass("is-active");

			setTimeout(function() {
				$current.removeClass("is-exit-up is-exit-down");
				index = nextIndex;
				locked = false;
			}, 600);
		}

		function inView() {
			const rect = $testimonialStack[0].getBoundingClientRect();
			return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
		}

		$testimonialStack.on("wheel", function(e) {
			if (!inView() || locked) return;
			e.preventDefault();
			const delta = e.originalEvent.deltaY;
			const direction = delta > 0 ? "down" : "up";
			const nextIndex = direction === "down"
				? (index + 1) % $testimonials.length
				: (index - 1 + $testimonials.length) % $testimonials.length;
			showTestimonial(nextIndex, direction);
		});
	}

});
$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	$(".top_text h1").animated("fadeInDown", "fadeOutUp");
	$(".top_text p").animated("fadeInUp", "fadeOutDown");
	$(".cta_btn").animated("fadeInUp", "fadeOutDown");
	$(".logo").animated("flipInX", "flipOutX");

}); 
