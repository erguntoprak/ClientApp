(function($){
  "use strict";
	jQuery(document).on('ready', function () {

		// Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 30){  
                $('.top-navbar').addClass("is-sticky");
            }
            else{
                $('.top-navbar').removeClass("is-sticky");
            }
    });

		// Burger Menu JS
    $('#burger-menu').on('click', function() {
			$(this).toggleClass('active');
			$('.main-content').toggleClass('hide-sidemenu-area');
			$('.sidemenu-area').toggleClass('toggle-sidemenu-area');
			$('.top-navbar').toggleClass('toggle-navbar-area');
		});
		$('.responsive-burger-menu').on('click', function() {
			$('.responsive-burger-menu').toggleClass('active');
			$('.sidemenu-area').toggleClass('active-sidemenu-area');
        });

		

	

		// Metis Menu JS
		$(function () {
			$('#sidemenu-nav').metisMenu();
		});

		// Webpage FullScreen JS
		$("#fullscreen-button").on("click", function toggleFullScreen() {
			if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
				if (document.documentElement.requestFullScreen) {
					document.documentElement.requestFullScreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullScreen) {
					document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				}
			} else {
				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		});
		$('.bx-fullscreen-btn').on('click', function() {
            $(this).toggleClass('active');
		});
		
		// Summernote JS
		$('.summernote').summernote({
			height: 230,                 // Set editor height
			minHeight: null,             // Set minimum height of editor
			maxHeight: null,             // Set maximum height of editor
			focus: false                 // Set focus to editable area after initializing summernote
		});

		// Progress Bar
		if($('.progress-line').length){
			$('.progress-line').appear(function(){
				var el = $(this);
				var percent = el.data('width');
				$(el).css('width',percent+'%');
			},{accY: 0});
		}
		if($('.count-box').length){
			$('.count-box').appear(function(){
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
				
			},{accY: 0});
		}

		// FAQ Accordion
        $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
                // Adds Active Class
                $(this).toggleClass('active');
                // Expand or Collapse This Panel
                $(this).next().slideToggle('fast');
                // Hide The Other Panels
                $('.accordion-content').not($(this).next()).slideUp('fast');
                // Removes Active Class From Other Titles
                $('.accordion-title').not($(this)).removeClass('active');		
            });
		});

		// initialize clipboard plugin
		if ($('.btn-clipboard').length) {
			var clipboard = new ClipboardJS('.btn-clipboard');

			// Enabling tooltip to all clipboard buttons
			$('.btn-clipboard').attr('data-toggle', 'tooltip').attr('title', 'Copy to clipboard');

			

			// initially hide btn-clipboard and show after copy
			clipboard.on('success', function(e) {
				e.trigger.classList.value = 'btn btn-clipboard btn-current'
				$('.btn-current').tooltip('hide');
				e.trigger.dataset.originalTitle = 'Copied';
				$('.btn-current').tooltip('show');
				setTimeout(function(){
					$('.btn-current').tooltip('hide');
					e.trigger.dataset.originalTitle = 'Copy to clipboard';
					e.trigger.classList.value = 'btn btn-clipboard'
				}, 1000);
				e.clearSelection();
			});
		}

		// Count Time 
        function makeTimer() {
            var endTime = new Date("August 19, 2020 17:00:00 PDT");			
            var endTime = (Date.parse(endTime)) / 1000;
            var now = new Date();
            var now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
        }
		setInterval(function() { makeTimer(); }, 0);

		// Gallery Viewer JS
        var console = window.console || { log: function () {} };
        var $images = $('.gallery-area');
        var $toggles = $('.gallery-toggles');
        var $buttons = $('.gallery-buttons');
        var options = {
            // inline: true,
            url: 'data-original',
            ready: function (e) {
                console.log(e.type);
            },
            show: function (e) {
                console.log(e.type);
            },
            shown: function (e) {
                console.log(e.type);
            },
            hide: function (e) {
                console.log(e.type);
            },
            hidden: function (e) {
                console.log(e.type);
            },
            view: function (e) {
                console.log(e.type);
            },
            viewed: function (e) {
                console.log(e.type);
            }
        };
        function toggleButtons(mode) {
            if (/modal|inline|none/.test(mode)) {
            $buttons
                .find('button[data-enable]')
                .prop('disabled', true)
                .filter('[data-enable*="' + mode + '"]')
                .prop('disabled', false);
            }
        }
        $images.on({
            ready:  function (e) {
                console.log(e.type);
            },
            show:  function (e) {
                console.log(e.type);
            },
            shown:  function (e) {
                console.log(e.type);
            },
            hide:  function (e) {
                console.log(e.type);
            },
            hidden: function (e) {
                console.log(e.type);
            },
            view:  function (e) {
                console.log(e.type);
            },
            viewed: function (e) {
                console.log(e.type);
            }
        }).viewer(options);
        toggleButtons(options.inline ? 'inline' : 'modal');
        $toggles.on('change', 'input', function () {
            var $input = $(this);
            var name = $input.attr('name');
            options[name] = name === 'inline' ? $input.data('value') : $input.prop('checked');
            $images.viewer('destroy').viewer(options);
            toggleButtons(options.inline ? 'inline' : 'modal');
        });
        $buttons.on('click', 'button', function () {
            var data = $(this).data();
            var args = data.arguments || [];
            if (data.method) {
                if (data.target) {
                    $images.viewer(data.method, $(data.target).val());
                } else {
                    $images.viewer(data.method, args[0], args[1]);
                }
                switch (data.method) {
                    case 'scaleX':
                    case 'scaleY':
                    args[0] = -args[0];
                    break;
                    case 'destroy':
                    toggleButtons('none');
                    break;
                }
            }
		});

		// Feather Icon Js
		feather.replace();
		
		// Tabs
        (function ($) {
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            $('.tab ul.tabs li a').on('click', function (g) {
                var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                g.preventDefault();
            });
        })(jQuery);

		// App Email All JS
		$('.email-list-actions .favorite').on('click', function() {
            $(this).toggleClass('active');
		});
		$('.email-list-header .checkbox .cbx').on('click', function() {
			$('.email-list-actions .checkbox .cbx').toggleClass('active');
		});

		// App Todo All JS
		$('.todo-list-header .checkbox .cbx').on('click', function() {
			$('.todo-list-item .checkbox .cbx').toggleClass('active');
		});

		// App Read Email All JS
		$('.email-read-list-detail .email-information .favorite').on('click', function() {
            $(this).toggleClass('active');
		});

		// App Chat All JS
		$('.chat-list-header .header-right .favorite').on('click', function() {
            $(this).toggleClass('active');
		});
		
		
    $('#panel-aside').css('display', 'block');
   
    $('#panel-main-content').css('display', 'block');

	});
}(jQuery));
