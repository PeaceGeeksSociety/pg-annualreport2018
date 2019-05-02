/* ===================================================================
 * Infinity - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
	},	

	$WIN = $(window);
	

   // Add the User Agent to the <html>
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

	      // will first fade out the loading animation 
	    	$("#loader").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	}; 


	/* FitVids
	------------------------------------------------------ */ 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 


	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function() {

		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {
			containerBricks.masonry( {	
			  	itemSelector: '.brick',
			  	resize: true
			});
		});
	};


	/*	Light Gallery
	------------------------------------------------------- */
	var ssLightGallery = function() {

		$('#folio-wrap').lightGallery({  
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"		
		});
	};


	/* Flexslider
  	* ------------------------------------------------------ */
  	var ssFlexSlider = function() {

  		$WIN.on('load', function() {

		   $('#testimonial-slider').flexslider({
		   	namespace: "flex-",
		      controlsContainer: "",
		      animation: 'slide',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: true,
		      slideshowSpeed: 12000,
		      animationSpeed: 600,
		      randomize: true,
		      touch: true,
		   });

	   });

  	};


  	/* Carousel
	* ------------------------------------------------------ */
	var ssOwlCarousel = function() {

		$(".owl-carousel").owlCarousel({		
	      nav: false,
			loop: false,
	    	margin: 50,
	    	responsiveClass:true,
	    	responsive: {
	         0:{
	            items:2,
	            margin: 20
	         },
	         400:{
	            items:3,
	            margin: 30
	         },
	         600:{
	            items:4,
	            margin: 40
	         },
	         1000:{
	            items:6            
	         }
	    	}
		});

	};
  	


  	/* Menu on Scrolldown
	 * ------------------------------------------------------ */
	var ssMenuOnScrolldown = function() {

		var menuTrigger = $('#header-menu-trigger');

		$WIN.on('scroll', function() {

			if ($WIN.scrollTop() > 150) {				
				menuTrigger.addClass('opaque');
			}
			else {				
				menuTrigger.removeClass('opaque');
			}

		}); 
	};

	
  	/* OffCanvas Menu
	 * ------------------------------------------------------ */
   var ssOffCanvas = function() {

	       var menuTrigger = $('#header-menu-trigger'),
	       nav             = $('#menu-nav-wrap'),
	       closeButton     = nav.find('.close-button'),
	       siteBody        = $('body'),
	       mainContents    = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function(e){
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function(e){
			e.preventDefault();
			menuTrigger.trigger('click');	
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function(e){		
			if( !$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span') ) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

   };


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};


  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};


  	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	

  /* Animations
	* ------------------------------------------------------- */
	var ssAnimations = function() {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function(direction) {

					var defAnimationEfx = cfg.defAnimation;

					if ( direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function() {
							$('body .animate-this.item-animate').each(function(ctr) {
								var el       = $(this),
								animationEfx = el.data('animate') || null;	

	                  	if (!animationEfx) {
			                 	animationEfx = defAnimationEfx;	                 	
			               }

			              	setTimeout( function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 30);

							});								
						}, 100);
					}

					// trigger once only
	       		this.destroy(); 
				}, 
				offset: '98%'
			}); 
		}

	};
	

  /* Intro Animation
	* ------------------------------------------------------- */
	var ssIntroAnimation = function() {

		$WIN.on('load', function() {
		
	     	if (!$("html").hasClass('no-cssanimations')) {
	     		setTimeout(function(){
	    			$('.animate-intro').each(function(ctr) {
						var el = $(this),
	                   animationEfx = el.data('animate') || null;		                                      

	               if (!animationEfx) {
	                 	animationEfx = cfg.defAnimation;	                 	
	               }

	              	setTimeout( function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});						
				}, 100);
	     	} 
		}); 

	};

 
  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


/* Charts
	 * -------------------------------------------------- */
	var ssCharts = function() {

		// Labels
		var years = [2016, 2017, 2018];
		var sourcecategory = ['Grants (89%)', 'Project Fees (7%)', 'Donations (3%)'];
		var spendcategory = ['Projects (83%)', 'Operations (12%)', 'Administration (3%)'];
		// Numbers
		var fundingbyyear = [321941, 365608, 752894];
		var fundingsource = [670598, 56437, 25859];
		var spending = [688519, 100180, 22315];
 

		function isScrolledIntoView(elem)
		{
		    var docViewTop = $(window).scrollTop();
		    var docViewBottom = docViewTop + $(window).height();

		    var elemTop = $(elem).offset().top;
		    var elemBottom = elemTop + $(elem).height();

		    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
		}

		$(window).scroll(function() {
		    if (isScrolledIntoView('#myBarChart')) {
		        if ($('#myBarChart').data("generated")) { return; }
		        $('#myBarChart').data("generated", true);
		        var ctx = document.getElementById("PieChart1").getContext("2d");
				var PieChart1 = new Chart(ctx, {
				  type: 'doughnut',
				  data: {
				    labels: sourcecategory,
				    datasets: [
				      { 
				      	label: "Sources of funding",
				      	data: fundingsource,
				      	backgroundColor: ["#f09416","#acdee2", "#278186", "#59c2ed","#cfedfa"],
				      	borderWidth: 0,
				      }
				    ]
				  },
				  options: {
				  	animation: {
				  		duration: 1500,
				  		animaterotate: true,
				  		easing: 'linear',
				  	},
				  	legend: {
				  		display: true,
				  		position: 'bottom',
				  		labels: {
				  			fontSize: 12,
		                    fontFamily: "'Open Sans', sans-serif",
		                    fontColor: '#fff',
		                    padding: 15,
		                    boxWidth: 12,
				  		}
				  	},
				  	tooltips: {
			           titleFontFamily: "'Open Sans', sans-serif",
			           yPadding: 10,
			           mode: 'label',
	          			label: 'mylabel',
			           callbacks: {
	               			label: function(tooltipItem, data) {
	                   		var indice = tooltipItem.index;
	                   		return data.labels[indice] + ': ' + '$' + data.datasets[0].data[indice].toFixed(2);
	                   		}
			        	},

				   }
				}});
				var ctx = document.getElementById("myBarChart").getContext("2d");
				var myBarChart = new Chart(ctx, {
				  type: 'bar',
				  data: {
				    labels: years,
				    datasets: [
				      { 
				      	data: fundingbyyear,
				      	backgroundColor: ["#acdee2", "#59c2ed","#f09416",],
				      }
				    ]
				  },
				  options: {
				  	animation: {
				  		duration: 1500,
				  		easing: 'easeInOutQuint'
				  	},
				  	legend: {
				  		display: false,
				  	},
				  	tooltips: {
			           mode: 'label',
			           label: 'mylabel',
			           callbacks: {
			               label: function(tooltipItem, data) {
			                   return '$' + tooltipItem.yLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
			           titleFontFamily: "'Open Sans', sans-serif",
			           bodyFontFamily: "'Open Sans', sans-serif",
			           yPadding: 10,
			        },
			        scales: {
			        	yAxes: [{
			                ticks: {
			                    fontSize: 12,
			                    fontFamily: "'Open Sans', sans-serif",
			                    fontColor: '#fff',
			                    // Include a dollar sign in the ticks
		                    	callback: function(value, index, values) {
		                        	return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		                    	}
			                },
			                gridLines: {
			                    display: false,
			                    drawBorder: false,
			                },
			                scaleLabel: { 
			                    display: false,
			                }
		            	}],
			            xAxes: [{
			                ticks: {
			                    beginAtZero: true,
			                    fontSize: 12,
			                    fontFamily: "'Open Sans', sans-serif",
			                    fontColor: '#fff'
			                },
			                gridLines: {
			                    display:false
			                },
			                scaleLabel: {
			                    display: true,
			                    fontSize: 10,
			               	}
			            }]
		        	}

				   }
				});
				var ctx = document.getElementById("PieChart2").getContext("2d");
				var PieChart2 = new Chart(ctx, {
				  type: 'doughnut',
				  data: {
				    labels: spendcategory,
				    datasets: [
				      { 
				      	data: spending,
				      	backgroundColor: ["#3ca5dd", "#83d1f2", "#cfedfa", "#278186", "#F09416"],
				      	borderWidth: 0,
				      }
				    ]
				  },
				  options: {
				  	animation: {
				  		duration: 1500,
				  		animaterotate: true,
				  		easing: 'linear',
				  	},
				  	legend: {
				  		display: true,
				  		position: 'bottom',
				  		labels: {
				  			fontSize: 12,
		                    fontFamily: "'Open Sans', sans-serif",
		                    fontColor: '#fff',
		                    padding: 15,
		                    boxWidth: 12,
				  		}
				  	},
				  	tooltips: {
			           titleFontFamily: "'Open Sans', sans-serif",
			           yPadding: 10,
			           mode: 'label',
	          			label: 'mylabel',
			           callbacks: {
	               			label: function(tooltipItem, data) {
	                   		var indice = tooltipItem.index;
	                   		return data.labels[indice] + ': ' + '$' + data.datasets[0].data[indice].toFixed(2);
	                   		}
			        	},

				   }
				}});
		    }
		});
	};


/* ------------------------------------------------------
	 * Stat Counter
	 * ------------------------------------------------------ */
	var ssStats = function() {
	   var statSection = $("#stats"),
	       stats = $(".stat-count");
	        console.log(stats)
	   statSection.waypoint({

	   	handler: function(direction) {

	      	if (direction === "down") {       		

				   stats.each(function () {
					   var $this = $(this);

					   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
					   	duration: 5700,
					   	easing: 'swing',
					   	step: function (curValue) {
					   		var num = numberWithCommas (curValue);
					      	$this.text(numberWithCommas(Math.round(this.Counter)));  
					    	}
					  	});
					});

	       	} 

	       	// trigger once only
	       	this.destroy();  

			},			
			offset: "90%"
		
		});
	}; 

	function numberWithCommas(n) {  
        var parts = n.toString().split(".");  
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");  
    } 

/* Gallery
	* ------------------------------------------------------ */

  var ssGallery = function() {
	  $('.slide:gt(0)').hide();
	  setInterval(function() {
	    $('.slide:first').fadeOut('slow').next().fadeIn('slow').end().appendTo('.slider');
	  }, 2500)
	};


  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssFitVids();
		ssMasonryFolio();
		ssLightGallery();
		ssFlexSlider();
		ssOwlCarousel();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAnimations();
		ssIntroAnimation();
		ssBackToTop();
		ssCharts();
		ssStats();
		ssGallery();

	})();
 

})(jQuery);