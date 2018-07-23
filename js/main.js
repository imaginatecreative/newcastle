    $(function() {
    
    
        $.fn.autoTab = function() {
    
            autoTabOn = true; // yes, it's global. If you turn off auto tabbing on one input, you turn it off for all
            var autoTabbedInputs = this.find('input');
            var almostTabbedInputs = autoTabbedInputs.not(':last-child'); // note we don't attach tabbing event to the last of an input group. If you tab out of there, you have a reason to
            var justAutoTabbed = false;
            var tabKeyDetected = false;
            var revTabKeyDetected = false;
            var inputField = false;
    
            // init
            var init = function() {
                detectKeyDown();
                detectKeyUp();
            };
    
            // keydown detection, hijack it if it's in the fields we're looking for
            var detectKeyDown = function() {
                autoTabbedInputs.on('keydown',function(ev){
                    // the field that you're in when you keydown might not be the field you're in when you keyup
                    inputField = this;
                    // detect keystroke in the fields
                    ev = ev || event;
                    var charCode = null;
                    if ("which" in ev)
                        charCode = ev.which;
                    else if ("keyCode" in e)
                        charCode = ev.keyCode;
                    else if ("keyCode" in window.event)
                        charCode = window.event.keyCode;
                    else if ("which" in window.event)
                        charCode = window.event.which;
                    // if tabbing forward
                    if (charCode === 9 && !ev.shiftKey) {
    
                        tabKeyDetected = true;
                        // if tabbing backward
                    } else if (charCode === 9 && ev.shiftKey) {
                        revTabKeyDetected = true;
                        // backspace key fakes reverse tab
                    } else if (charCode === 8 && this.value.length == 0) {
                        revTabKeyDetected = true;
                        $(this).prev("input,select,textarea,a").focus();
                        // fake tab keystrokes
                    } else if (
                        charCode === 191                  // "/" - for dates
                        ||
                        charCode === 111                  // "/" - for dates (numberpad)
                        ||
                        charCode === 190                  // "." - for IP addresses
                        ||
                        charCode === 110                  // "." - for IP addresses (numberpad)
                        ||
                        charCode === 189                  // "-" - for sortcodes
                        ||
                        charCode === 109                  // "-" - for sortcodes (numberpad)
                    ) {
                        ev.preventDefault();
                        // if we've not yet hit the max chars for this field, and haven't already just auto-tabbed, fake a tab key
                        if (!hasHitMaxChars(this) && !justAutoTabbed) {
                            $(this).next("input,select,textarea,a").focus();
                        }
                    }
                });
            };
    
            // entering text into auto-tabbed fields
            var detectKeyUp = function() {
                almostTabbedInputs.on('keyup',function(ev){
                    // if auto tabbing is off, bug out now
                    if (!autoTabOn) {
                        return;
                    }
                    // if the complimentary keydown was a tab key, ignore this event (and reset it for the next keyup)
                    if (tabKeyDetected) {
                        tabKeyDetected = false;
                        return;
                    }
                    // if we were tabbing backwards, don't jump forwards again!
                    if (revTabKeyDetected) {
                        revTabKeyDetected = false;
                        return;
                    }
                    // edge case: if you've tabbed from one input group to another, the inputField that was used in keyDown hasn't yet been set
                    if (!inputField) {
                        return;
                    }
                    // removed flag to say we've just auto-tabbed
                    justAutoTabbed = false;
                    // else auto-tab if the field is full
                    if (hasHitMaxChars(inputField)) {
                        $(inputField).next().focus();
                        // we've just auto-tabbed - flag it
                        justAutoTabbed = true;
                    }
                });
            };
    
            // detect if a field has hit max chars
            var hasHitMaxChars = function(el) {
                var elObj = $(el);
                var maxFieldLength = elObj.attr('maxlength') || elObj.attr('size');
                var valueLength = el.value.length;
                if (valueLength>=maxFieldLength) {
                    return true;
                }
                return false;
            };
    
    
            // init function!
            init();
    
        };
    
    // set up example
        $('.autotabbed').autoTab();
    
    
    // enable toggle
        var toggle = $('#autotab-toggle');
        toggle.click(function(ev){
            ev.preventDefault();
            if (toggle.hasClass('on')) {
                autoTabOn = false;
                $('#autotab-toggle').removeClass('on');
            } else {
                autoTabOn = true;
                $('#autotab-toggle').addClass('on');
            }
        });
        $('.slider').slick({
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: false,
            fade: true,
        });
        $('.ticker').slick({
            slidesToShow: 5,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 1000,
            pauseOnHover:true,
            // speed: 8000,
            cssEase:'linear',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    
        //$(document).on('load', function() {
        //    $(window).on("resize", checkPosition);
        //});
        //$(document).on('load', function() {
            $(window).resize( function() {
              
                 // if (window.matchMedia('(max-width: 1000px)').matches) {
                      var stHeight = $('.slider .slick-track').height();
                      $('.slider .slick-slide').css('height',stHeight + 'px' );
                //  } else {
                      //...
               //   }
              });
        //});
    
    });

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
