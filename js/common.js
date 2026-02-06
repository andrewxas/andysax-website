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

	$(".top_mnu ul a, .cta_btn, .price_anchor").mPageScroll2id();

	const $testimonialStack = $(".testimonial_stack");
	const $testimonials = $testimonialStack.find(".testimonial");
	if ($testimonialStack.length && $testimonials.length > 2) {
		const stackEl = $testimonialStack[0];
		const items = Array.from($testimonials);
		const allClasses = [
			"t-pos-top",
			"t-pos-mid",
			"t-pos-bottom",
			"t-pos-above",
			"t-pos-below",
			"t-hidden",
			"no-transition"
		];
		let stackIdx = [0, 1, 2]; // [top, mid, bottom]
		let locked = false;
		let touchStartY = 0;
		let touchEndY = 0;

		function setPos(el, cls) {
			el.classList.remove.apply(el.classList, allClasses);
			el.classList.add(cls);
		}

		function hide(el) {
			setPos(el, "t-hidden");
		}

		function showInitial() {
			items.forEach(hide);
			setPos(items[stackIdx[0]], "t-pos-top");
			setPos(items[stackIdx[1]], "t-pos-mid");
			setPos(items[stackIdx[2]], "t-pos-bottom");
		}

		showInitial();

		function rotate(direction) {
			if (locked) return;
			locked = true;

			const topIdx = stackIdx[0];
			const midIdx = stackIdx[1];
			const bottomIdx = stackIdx[2];

			let incomingIdx;
			if (direction === "down") {
				incomingIdx = (topIdx - 1 + items.length) % items.length;
			} else {
				incomingIdx = (bottomIdx + 1) % items.length;
			}

			const top = items[topIdx];
			const mid = items[midIdx];
			const bottom = items[bottomIdx];
			const incoming = items[incomingIdx];

			// Hide all except current three + incoming.
			items.forEach(function(el) {
				if (el !== top && el !== mid && el !== bottom && el !== incoming) hide(el);
			});

			incoming.classList.add("no-transition");
			setPos(incoming, direction === "down" ? "t-pos-above" : "t-pos-below");
			incoming.offsetHeight;
			incoming.classList.remove("no-transition");

			requestAnimationFrame(function() {
				if (direction === "down") {
					setPos(incoming, "t-pos-top");
					setPos(top, "t-pos-mid");
					setPos(mid, "t-pos-bottom");
					setPos(bottom, "t-pos-below");
				} else {
					setPos(incoming, "t-pos-bottom");
					setPos(bottom, "t-pos-mid");
					setPos(mid, "t-pos-top");
					setPos(top, "t-pos-above");
				}
			});

			setTimeout(function() {
				if (direction === "down") {
					hide(bottom);
					stackIdx = [incomingIdx, topIdx, midIdx];
				} else {
					hide(top);
					stackIdx = [midIdx, bottomIdx, incomingIdx];
				}
				locked = false;
			}, 1100);
		}

		stackEl.addEventListener("wheel", function(e) {
			e.preventDefault();
			const delta = e.deltaY;
			rotate(delta > 0 ? "down" : "up");
		}, { passive: false });

		stackEl.addEventListener("touchstart", function(e) {
			if (!e.touches || e.touches.length === 0) return;
			touchStartY = e.touches[0].clientY;
		}, { passive: true });

		stackEl.addEventListener("touchmove", function(e) {
			if (!e.touches || e.touches.length === 0) return;
			touchEndY = e.touches[0].clientY;
		}, { passive: true });

		stackEl.addEventListener("touchend", function() {
			const delta = touchStartY - touchEndY;
			if (Math.abs(delta) < 30) return;
			rotate(delta > 0 ? "down" : "up");
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
