(function($){
		
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
		navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){ 
		var kode_touch_device = true; 
	}else{ 
		var kode_touch_device = false; 
	}
	
	// retrieve GET variable from url
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});	
	
	// blog - port nav
	function kode_set_item_outer_nav(){
		$('.blog-item-wrapper > .kode-nav-container').each(function(){
			var container = $(this).siblings('.blog-item-holder');
			var child = $(this).children();
			child.css({ 'top':container.position().top, 'bottom':'auto', height: container.height() - 50 });
		});
		$('.portfolio-item-wrapper > .kode-nav-container').each(function(){
			var container = $(this).siblings('.portfolio-item-holder');
			var child = $(this).children();
			child.css({ 'top':container.position().top, 'bottom':'auto', height: container.height() - 40 });
		});		
	}
	
	

	if($('.header-sticky').length){
		// grab the initial top offset of the navigation 
		var stickyNavTop = $('.header-sticky').offset().top;
		// our function that decides weather the navigation bar should have "fixed" css position or not.
		var stickyNav = function(){
			var scrollTop = $(window).scrollTop(); // our current vertical position from the top
			// if we've scrolled more than the navigation, change its position to fixed to stick to top,
			// otherwise change it back to relative
			if (scrollTop > stickyNavTop) { 
				$('.header-sticky').addClass('kf_sticky');
			} else {
				$('.header-sticky').removeClass('kf_sticky'); 
			}
		};
		stickyNav();
		// and run it again every time you scroll
		$(window).scroll(function() {
			stickyNav();
		});
	}	
	
	if($('.header-2').length){
		$('.navigation .menu').singlePageNav({
			offset: $('.header-2').outerHeight()-30,
			filter: ':not(.external)',
			updateHash: true,
			beforeStart: function() {
				console.log('begin scrolling');
			},
			onComplete: function() {
				console.log('done scrolling');
			}
		});
	}
	
	// runs bx slider function
	$.fn.kode_bxslider = function(){
		if(typeof($.fn.bxSlider) == 'function'){
			$(this).each(function(){
				var bx_attr = {
					mode: 'fade',
					auto: true,
					controls:true
					// prevText: '<i class="icon-angle-left" ></i>', 
					// nextText: '<i class="icon-angle-right" ></i>',
					// useCSS: false
				};
				
				// slide duration
				if( $(this).attr('data-pausetime') ){
					bx_attr.pause = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					bx_attr.speed = parseInt($(this).attr('data-slidespeed'));
				}

				// set the attribute for carousel type
				// if( $(this).attr('data-type') == 'carousel' ){
					// bx_attr.move = 1;
					// bx_attr.animation = 'slide';
					
					// if( $(this).closest('.kode-item-no-space').length > 0 ){
						// bx_attr.itemWidth = $(this).width() / parseInt($(this).attr('data-columns'));
						// bx_attr.itemMargin = 0;							
					// }else{
						// bx_attr.itemWidth = (($(this).width() + 30) / parseInt($(this).attr('data-columns'))) - 30;
						// bx_attr.itemMargin = 30;	
					// }		
					
					// if( $(this).attr('data-columns') == "1" ){ bx_attr.smoothHeight = true; }
				// }else{
					// if( $(this).attr('data-effect') ){
						// bx_attr.animation = $(this).attr('data-effect');
					// }
				// }
				// if( $(this).attr('data-columns') ){
					// bx_attr.minItems = parseInt($(this).attr('data-columns'));
					// bx_attr.maxItems = parseInt($(this).attr('data-columns'));	
				// }				
				

				$(this).bxSlider(bx_attr);	
			});	
			$(".kode-full-size-wrapper  .kode-bxslider .bx-controls-direction .bx-prev").empty();
			$(".kode-full-size-wrapper  .kode-bxslider .bx-controls-direction .bx-next").empty();
			$(".kode-full-size-wrapper  .kode-bxslider .bx-controls-direction .bx-next").append('<i class="fa fa-angle-right"></i>');
			$(".kode-full-size-wrapper  .kode-bxslider .bx-controls-direction .bx-prev").append('<i class="fa fa-angle-left"></i>');
		}
	}
	
	// runs bx slider function
	$.fn.kode_nicescroll = function(){
		if(typeof($.fn.niceScroll) == 'function'){
			$(this).each(function(){
				// if( $(this).attr('data-year') ){
					// data_year = parseInt($(this).attr('data-year'));
				// }
				$(this).niceScroll({cursorwidth:'12px',cursorcolor:"#0F7DC1",cursoropacitymax:0.7,boxzoom:true,touchbehavior:false,cursorborder :'1px solid #0F7DC1',zindex :999999});	
			});	
		}
	}
	
	// runs countdown function
	$.fn.kode_countdown = function(){
		if(typeof($.fn.countdown) == 'function'){
			$(this).each(function(){
				var austDay = new Date();
				// data-year duration
				if( $(this).attr('data-year') ){
					data_year = parseInt($(this).attr('data-year'));
				}
				//Month
				if( $(this).attr('data-month') ){
					data_month = parseInt($(this).attr('data-month'));
				}
				//day
				if( $(this).attr('data-day') ){
					data_day = parseInt($(this).attr('data-day'));
				}
				//time
				if( $(this).attr('data-time') ){
					data_time = parseInt($(this).attr('data-time'));
				}
						
				current_day = new Date(data_year, data_month-1, data_day,data_time);
				$(this).countdown({until: current_day});	
				jQuery('#year').text(current_day.getFullYear());
			});	
		}
	}
	
	
	// runs flex slider function
	$.fn.kode_flexslider = function(){
		if(typeof($.fn.flexslider) == 'function'){
			$(this).each(function(){
				var flex_attr = {
					animation: 'fade',
					animationLoop: true,
					prevText: '<i class="icon-angle-left" ></i>', 
					nextText: '<i class="icon-angle-right" ></i>',
					useCSS: false
				};
				
				// slide duration
				if( $(this).attr('data-pausetime') ){
					flex_attr.slideshowSpeed = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					flex_attr.animationSpeed = parseInt($(this).attr('data-slidespeed'));
				}

				// set the attribute for carousel type
				if( $(this).attr('data-type') == 'carousel' ){
					flex_attr.move = 1;
					flex_attr.animation = 'slide';
					
					if( $(this).closest('.kode-item-no-space').length > 0 ){
						flex_attr.itemWidth = $(this).width() / parseInt($(this).attr('data-columns'));
						flex_attr.itemMargin = 0;							
					}else{
						flex_attr.itemWidth = (($(this).width() + 30) / parseInt($(this).attr('data-columns'))) - 30;
						flex_attr.itemMargin = 30;	
					}		
					
					// if( $(this).attr('data-columns') == "1" ){ flex_attr.smoothHeight = true; }
				}else{
					if( $(this).attr('data-effect') ){
						flex_attr.animation = $(this).attr('data-effect');
					}
				}
				if( $(this).attr('data-columns') ){
					flex_attr.minItems = parseInt($(this).attr('data-columns'));
					flex_attr.maxItems = parseInt($(this).attr('data-columns'));	
				}				
				
				// set the navigation to different area
				if( $(this).attr('data-nav-container') ){
					var flex_parent = $(this).parents('.' + $(this).attr('data-nav-container')).prev('.kode-nav-container');
					
					if( flex_parent.find('.kode-flex-prev').length > 0 || flex_parent.find('.kode-flex-next').length > 0 ){
						flex_attr.controlNav = false;
						flex_attr.directionNav = false;
						flex_attr.start = function(slider){
							flex_parent.find('.kode-flex-next').click(function(){
								slider.flexAnimate(slider.getTarget("next"), true);
							});
							flex_parent.find('.kode-flex-prev').click(function(){
								slider.flexAnimate(slider.getTarget("prev"), true);
							});
							
							kode_set_item_outer_nav();
							$(window).resize(function(){ kode_set_item_outer_nav(); });
						}
					}else{
						flex_attr.controlNav = false;
						flex_attr.controlsContainer = flex_parent.find('.nav-container');	
					}
					
				}

				$(this).flexslider(flex_attr);	
			});	
		}
	}
	
	// runs nivo slider function
	$.fn.kode_nivoslider = function(){
		if(typeof($.fn.nivoSlider) == 'function'){
			$(this).each(function(){
				var nivo_attr = {};
				
				if( $(this).attr('data-pausetime') ){
					nivo_attr.pauseTime = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					nivo_attr.animSpeed = parseInt($(this).attr('data-slidespeed'));
				}
				if( $(this).attr('data-effect') ){
					nivo_attr.effect = $(this).attr('data-effect');
				}

				$(this).nivoSlider(nivo_attr);	
			});	
		}
	}	
	
	// runs isotope function
	$.fn.kode_isotope = function(){
		if(typeof($.fn.isotope) == 'function'){
			$(this).each(function(){
				var layout = ($(this).attr('data-layout'))? $(this).attr('data-layout'): 'fitRows';
				if( layout == 'fitRows' ) return;
				
				// execute isotope
				var isotope_element = $(this);
				isotope_element.children('.clear').remove();
				isotope_element.isotope({
					layoutMode: layout
				});
				
				// resize event
				$(window).resize(function(){
					isotope_element.isotope();
				});				
			});	
		}
	}
	
	// runs fancybox function
	$.fn.kode_fancybox = function(){
		if(typeof($.fn.fancybox) == 'function'){
			var fancybox_attr = {
				nextMethod : 'resizeIn',
				nextSpeed : 250,
				prevMethod : false,
				prevSpeed : 250,	
				helpers : { media : {} }
			};
			
			if( typeof($.fancybox.helpers.thumbs) == 'object' ){
				fancybox_attr.helpers.thumbs = { width: 50, height: 50 };
			}

			$(this).fancybox(fancybox_attr);
		}	
	}
	
	// responsive video
	$.fn.kode_fluid_video = function(){
		$(this).find('iframe[src^="http://www.youtube.com"], iframe[src^="//www.youtube.com"],'  +
					 'iframe[src^="http://player.vimeo.com"], iframe[src^="//player.vimeo.com"]').each(function(){

			if( ($(this).is('embed') && $(this).parent('object').length) || $(this).parent('.fluid-width-video-wrapper').length ){ return; } 
			if( !$(this).attr('id') ){ $(this).attr('id', 'kode-video-' + Math.floor(Math.random()*999999)); }
					 
			// ignore if inside layerslider
			if( $(this).closest('.ls-container').length <= 0 ){ 
				var ratio = $(this).height() / $(this).width();
				$(this).removeAttr('height').removeAttr('width');
				//$(this).wrap('<div class="kode-fluid-video-wrapper"></div>').parent().css('padding-top', (ratio * 100)+"%");
			}
		
		});	
	}
	
	// pie chart
	$.fn.kode_pie_chart = function(){
		if(typeof($.fn.easyPieChart) == 'function'){
			$(this).each(function(){
				var kode_chart = $(this);
				
				$(this).easyPieChart({
					animate: 1200,
					lineWidth: kode_chart.attr('data-linewidth')? parseInt(kode_chart.attr('data-linewidth')): 8,
					size: kode_chart.attr('data-size')? parseInt(kode_chart.attr('data-size')): 155,
					barColor: kode_chart.attr('data-color')? kode_chart.attr('data-color'): '#a9e16e',
					trackColor: kode_chart.attr('data-bg-color')? kode_chart.attr('data-bg-color'): '#f2f2f2',
					backgroundColor: kode_chart.attr('data-background'),
					scaleColor: false,
					lineCap: 'square'
				});

				// for responsive purpose
				if($.browser.msie && (parseInt($.browser.version) <= 8)) return;
				function limit_kode_chart_size(){
					if( kode_chart.parent().width() < parseInt(kode_chart.attr('data-size')) ){
						var max_width = kode_chart.parent().width() + 'px';
						kode_chart.css({'max-width': max_width, 'max-height': max_width});
					}				
				}
				limit_kode_chart_size();
				$(window).resize(function(){ limit_kode_chart_size(); });
			});
		}
	}
		
	$(document).ready(function(){
	
		// top woocommerce button
		$('.kode-top-woocommerce-wrapper').hover(function(){
			$(this).children('.kode-top-woocommerce').fadeIn(200);
		}, function(){
			$(this).children('.kode-top-woocommerce').fadeOut(200);
		});
		
		// script for tab item
		$('.tab-title-wrapper').children().click(function(){
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			
			var selected_index = $(this).index() + 1;
			$(this).parent().siblings('.tab-content-wrapper').children(':nth-child(' + selected_index + ')').each(function(){
				$(this).siblings().removeClass('active').hide();
				$(this).fadeIn(function(){ $(this).addClass('active'); });
			})
		});		
	
		// initiate the tab when the get tab variable is sent
		var inital_tab = $.getUrlVar('tab');
		if( inital_tab ){ $('#' + inital_tab.replace(',', ', #')).each(function(){ $(this).trigger('click'); }); }
		
		// script for code item
		$('.kode-code-item .kode-code-title').click(function(){
			var parent = $(this).parent();
			if( parent.hasClass('active') ){
				$(this).children('i').removeClass('icon-minus').addClass('icon-plus');
				$(this).siblings('.kode-code-content').slideUp(function(){
					parent.removeClass('active');
				});	
			}else{
				$(this).children('i').removeClass('icon-plus').addClass('icon-minus');
				$(this).siblings('.kode-code-content').slideDown(function(){
					parent.addClass('active');	
				});				
			}
		});		
		
		// script for parallax background
		$('.kode-parallax-wrapper').each(function(){
			if( $(this).hasClass('kode-background-image') ){
				var parallax_section = $(this);
				var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
				if( parallax_speed == 0 || kode_touch_device ) return;
				if( parallax_speed == -1 ){
					parallax_section.css('background-attachment', 'fixed');
					parallax_section.css('background-position', 'center center');
					return;
				}
					
				$(window).scroll(function(){
					// if in area of interest
					if( ( $(window).scrollTop() + $(window).height() > parallax_section.offset().top ) &&
						( $(window).scrollTop() < parallax_section.offset().top + parallax_section.outerHeight() ) ){
						
						var scroll_pos = 0;
						if( $(window).height() > parallax_section.offset().top ){
							scroll_pos = $(window).scrollTop();
						}else{
							scroll_pos = $(window).scrollTop() + $(window).height() - parallax_section.offset().top;
						}
						parallax_section.css('background-position', 'center ' + (-scroll_pos * parallax_speed) + 'px');
					}
				});			
			}else if( $(this).hasClass('kode-background-video') ){
				if(typeof($.fn.mb_YTPlayer) == 'function'){
					$(this).children('.kode-bg-player').mb_YTPlayer();
				}
			}else{
				return;
			}
		});
		
		// video responsive
		$('body').kode_fluid_video();		
		
		// runs superfish menu
		if(typeof($.fn.superfish) == 'function'){
			
			// create the mega menu script
			$('#kode-main-navigation .sf-mega > ul').each(function(){	
				$(this).children('li').each(function(){
					var current_item = $(this);
					current_item.replaceWith(
						$('<div />').addClass('sf-mega-section')
									.addClass(current_item.attr('data-column'))
									.attr('data-size', current_item.attr('data-size'))
									.html(  $('<div />').addClass('sf-mega-section-inner')
														.addClass(current_item.attr('class'))
														.attr('id', current_item.attr('id'))
														.html(current_item.html())
									)		
					);
				});
				$(this).replaceWith(this.innerHTML);
			});
			
			// make every menu same height
			$('#kode-main-navigation .sf-mega').each(function(){
				var sf_mega = $(this); $(this).show();
				
				var row = 0; var column = 0; var max_height = 0;
				sf_mega.children('.sf-mega-section').each(function(){
					if( column % 60 == 0 ){ 
						if( row != 0 ){
							sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );
							max_height = 0;
						}
						row++; $(this).addClass('first-column'); 
					}		
					
					$(this).attr('data-row', row);	
					column += eval('60*' + $(this).attr('data-size'));
				
					if( $(this).height() > max_height ){
						max_height = $(this).height();
					}
				});
				
				sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );		
			});
			
			$('#kode-main-navigation').superfish({
				delay: 100, 
				speed: 'fast', 
				animation: {opacity:'show', height:'show'}
			});		
		}
		
		// responsive menu
		if(typeof($.fn.dlmenu) == 'function'){
			$('#kode-responsive-navigation').each(function(){
				$(this).find('.dl-submenu').each(function(){
					if( $(this).siblings('a').attr('href') && $(this).siblings('a').attr('href') != '#' ){
						var parent_nav = $('<li class="menu-item kode-parent-menu"></li>');
						parent_nav.append($(this).siblings('a').clone());
						
						$(this).prepend(parent_nav);
					}
				});
				$(this).dlmenu();
			});
		}	
		
		// gallery thumbnail type
		$('.kode-gallery-thumbnail').each(function(){
			var thumbnail_container = $(this).children('.kode-gallery-thumbnail-container');
		
			$(this).find('.gallery-item').click(function(){
				var selected_slide = thumbnail_container.children('[data-id="' + $(this).attr('data-id') + '"]');
				if(selected_slide.css('display') == 'block') return false;
			
				// check the gallery height
				var image_width = selected_slide.children('img').attr('width');
				var image_ratio = selected_slide.children('img').attr('height') / image_width;
				var temp_height = image_ratio * Math.min(thumbnail_container.width(), image_width);
				
				thumbnail_container.animate({'height': temp_height});
				selected_slide.fadeIn().siblings().hide();
				return false;
			});		

			$(window).resize(function(){ thumbnail_container.css('height', 'auto') });
		});

		// fancybox
		// $('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]').not('[data-rel="fancybox"]').attr('data-rel', 'fancybox');
		// $('[data-rel="fancybox"]').kode_fancybox();
		
		// image shortcode 
		$('.kode-image-link-shortcode').hover(function(){
			$(this).find('.kode-image-link-overlay').animate({opacity: 0.8}, 150);
			$(this).find('.kode-image-link-icon').animate({opacity: 1}, 150);
		}, function(){
			$(this).find('.kode-image-link-overlay').animate({opacity: 0}, 150);
			$(this).find('.kode-image-link-icon').animate({opacity: 0}, 150);
		});	
		
		// Personnel
		$('.kode-personnel-item.round-style .personnel-item').each(function(){
			var current_item = $(this);
			function kode_set_round_personnel_height(){
				current_item.find('.personnel-item-inner').each(function(){
					$(this).css('margin-top', -($(this).height()/2));
				});
			}
			
			kode_set_round_personnel_height();
			$(window).resize(function(){
				kode_set_round_personnel_height();
			});
		});
		$('.kode-personnel-item.round-style .personnel-item').hover(function(){
			$(this).find('.personnel-author-image').animate({'opacity':0.05}, 200);
			$(this).find('.personnel-item-inner').animate({'opacity':1}, 200);
		}, function(){
			$(this).find('.personnel-author-image').animate({'opacity':1}, 200);
			$(this).find('.personnel-item-inner').animate({'opacity':0}, 200);
		});
		
		// Price Table
		$('.kode-price-table-item').each(function(){
			var price_table = $(this);
			
			function set_price_table_height(){
				var max_height = 0;
				var price_content = price_table.find('.price-content');
				
				price_content.css('height', 'auto');
				price_content.each(function(){
					if( max_height < $(this).height() ){ max_height = $(this).height(); }
				});
				price_content.css('height', max_height);
			}
			
			set_price_table_height()
			$(window).resize(function(){ set_price_table_height(); });
		});

		// Default text
		$('form').submit(function(){
			var has_default = false;
			$(this).find('input[data-default]').each(function(){
				if( $(this).is('#url') ){
					if( $(this).val() == $(this).attr('data-default') ) $(this).val('');
				}else{
					if( $(this).val() == $(this).attr('data-default') ) has_default = true;
				}
			});
			
			if(has_default) return false;
		});	
		
		// Search option
		$('.search-text input[data-default], .kode-comments-area input[data-default]').each(function(){
			var default_value = $(this).attr("data-default");
			$(this).val(default_value);
			$(this).live("blur", function(){
				if ($(this).val() == ""){
					$(this).val(default_value);
				}	
			}).live("focus", function(){
				if ($(this).val() == default_value){
					$(this).val("");
				}
			});		
		});		


		
		// logo responsive
		var main_logo = $('.header-style-transparent .kode-logo img');
		function kode_mobile_logo(){
			//console.log(1);
			if( main_logo && $(window).width() < 767 ){
				if( main_logo.attr('data-normal') && main_logo.attr('src') != main_logo.attr('data-normal') ){
					 main_logo.attr('data-trans', main_logo.attr('src'));
					 main_logo.attr('src', main_logo.attr('data-normal'));
				}					
			}else{
				if( main_logo.attr('data-trans') && main_logo.attr('src') != main_logo.attr('data-trans') ){
					main_logo.attr('src', main_logo.attr('data-trans'));
				}		
			}
		}
		kode_mobile_logo();
		$(window).resize(function(){ kode_mobile_logo(); });
		
		// animate ux
		if( !kode_touch_device && ( !$.browser.msie || (parseInt($.browser.version) > 8)) ){
		
			// image ux
			$('.content-wrapper img').each(function(){
				if( $(this).closest('.kode-ux, .ls-wp-container, .product, .flexslider, .nivoSlider').length ) return;
				
				var ux_item = $(this);
				if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0 });
				}else{ return; }
				
				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						ux_item.animate({ 'opacity':1 }, 1200); 
					}
				});					
			});
		
			// item ux
			$('.kode-ux').each(function(){
				var ux_item = $(this);
				if( ux_item.hasClass('kode-chart') || ux_item.hasClass('kode-skill-bar') ){
					if( ux_item.offset().top < $(window).scrollTop() + $(window).height() ){
						if( ux_item.hasClass('kode-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.kode_pie_chart();
						}else if( ux_item.hasClass('kode-skill-bar') ){
							ux_item.children('.kode-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}
						return;
					}
				}else if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0, 'padding-top':20, 'margin-bottom':-20 });
				}else{ return; }	

				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						if( ux_item.hasClass('kode-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.kode_pie_chart();
						}else if( ux_item.hasClass('kode-skill-bar') ){
							ux_item.children('.kode-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}else{
							ux_item.animate({ 'opacity':1, 'padding-top':0, 'margin-bottom':0 }, 1200);
						}
					}
				});					
			});
			
		// do not animate on scroll in mobile
		}else{
		
			// Pie chart
			if(!$.browser.msie || (parseInt($.browser.version) > 8)){
				$('.kode-chart').kode_pie_chart();
			}	

		
			// skill bar
			$('.kode-skill-bar-progress').each(function(){
				if($(this).attr('data-percent')){
					$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
				}
			});			
		}		

		// runs nivoslider when available
		$('.nivoSlider').kode_nivoslider();		
		
		// runs flexslider when available
		$('.flexslider').kode_flexslider();
		
		// runs bxslider when available
		$('.bxslider').kode_bxslider();
		
		// runs bxslider when available
		$('.countdown').kode_countdown();
		
		// runs niceScroll when available
		$('.nicescroll').kode_nicescroll();
	});
	
	$(window).load(function(){

		// run isotope when available
		$('.kode-isotope').kode_isotope();	
		
		// run pie chart for ie8 and below
		if($.browser.msie && (parseInt($.browser.version) <= 8)){
			$('.kode-chart').kode_pie_chart();
		}	

		// float menu
		// $('.body-wrapper.float-menu').each(function(){
			// var sub_area = $('#kode-header-substitute');
			// var main_area = sub_area.siblings('.kode-header-wrapper');
			
			// var logo = main_area.find('.kode-logo');
			// var logo_img = main_area.find('.kode-logo img');
			// var navigation = main_area.find('.kode-navigation-wrapper');				
			// var original = {
				// logo_top: logo.css('margin-top'), 
				// logo_bottom: logo.css('margin-bottom'), 
				// nav_top: navigation.css('margin-top')
			// };
				
			// $(window).scroll(function(){
				// if( main_area.hasClass('kode-fixed-header') && ($(this).scrollTop() == 0 || $(this).width() < 959)){
					// main_area.removeClass('kode-fixed-header');
					// main_area.children('.top-navigation-wrapper').slideDown(100);
					
					// if( logo_img.attr('data-trans') ){
						// logo_img.attr('src', logo_img.attr('data-trans'));
					// }
					// logo.animate({'margin-top': original.logo_top, 'margin-bottom': original.logo_bottom}, {duration: 100, queue: false});
					// logo_img.animate({'width': '100%'}, {duration: 100, queue: false});
					// navigation.animate({'margin-top': original.nav_top}, {duration: 100, queue: false});								
				// }else if( !main_area.hasClass('kode-fixed-header') && $(this).width() > 959 &&
					// $(this).scrollTop() > main_area.children('.kode-header-inner').offset().top - parseInt($('html').css('margin-top')) ){
						
						// main_area.addClass('kode-fixed-header');
						// main_area.children('.top-navigation-wrapper').hide();

						// if( logo_img.attr('data-normal') ){
							// logo_img.attr('data-trans', logo_img.attr('src'));
							// logo_img.attr('src', logo_img.attr('data-normal'));
						// }
						// logo.animate({'margin-top': '20', 'margin-bottom': '23'}, {duration: 100, queue: false});
						// logo_img.animate({'width': '80%'}, {duration: 0, queue: false});
						// navigation.animate({'margin-top': '21'}, {duration: 100, queue: false});
				// }				
			// });
		// });			
		
		// $(window).trigger('resize');
		// $(window).trigger('scroll');
	});
	
	/* ---------------------------------------------------------------------- */
	/*	Search Function
	/* ---------------------------------------------------------------------- */
	// jQuery('.searchform').hide();
	// jQuery("a.search-btn").click(function(){
		// jQuery('.searchform').hide();
		// jQuery(".searchform").fadeToggle();
	// });
	// jQuery('html').click(function() {
		// jQuery(".searchform").fadeOut();
	// });
	// jQuery('.kd-search').click(function(event){
		// event.stopPropagation();
	// });
	
	/* ---------------------------------------------------------------------- */
	/*	Scroll to Top
	/* ---------------------------------------------------------------------- */
	jQuery(window).scroll(function(){
		if (jQuery(this).scrollTop() > 100) {
			jQuery('.backtop').fadeIn();
		} else {
			jQuery('.backtop').fadeOut();
		}
	});
	
	/* ---------------------------------------------------------------------- */
	/*	Click to Trigger an Event
	/* ---------------------------------------------------------------------- */
	jQuery('.backtop').click(function(){
		jQuery('html, body').animate({scrollTop : 0},800);
		return false;
	});

})(jQuery);