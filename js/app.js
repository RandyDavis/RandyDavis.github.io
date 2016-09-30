/**
 * Created by randy on 8/26/15.
 */
$(function () {
    $('.navbar-nav li').on('click', function () {
        var $li = $('li');
        var self = $(this)
        for(var i = 0; i < 3; i++) {
            $li.removeClass('active');
            self.addClass('active');
        }
    });

    // Slider Functionality
    $('.slider').each(function () {
        var $this = $(this);
        var $group = $this.find('.slide-group');
        var $slides = $this.find('.slide');
        var buttonArray = [];
        var currentIndex = 0;
        var timeout;

        // add move function here
        function move(newIndex) {
            var animateLeft, slideLeft;

            advance();

            if ($group.is(':animated') || currentIndex === newIndex) {
                return;
            }

            buttonArray[currentIndex].removeClass('active');
            buttonArray[newIndex].addClass('active');

            if (newIndex > currentIndex) {
                slideLeft = '30%';
                animateLeft = '-30%';
            } else {
                slideLeft = '-30%';
                animateLeft = '30%';
            }

            $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

            $group.animate( {left: animateLeft}, function () {
                $slides.eq(currentIndex).css( {display: 'none'} );
                $slides.eq(newIndex).css( {left: 0} );
                $group.css( {left: 0} );
                currentIndex = newIndex;
            });
        }

        function advance () {
            clearTimeout(timeout);

            timeout = setTimeout(function () {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            }, 5000);
        }

        $.each($slides, function(index) {
            var $button = $('<button type="button" class="slide-btn">&bull;</button>');
            if (index === currentIndex) {
                $button.addClass('active');
            }
            $button.on('click', function() {
                move(index);
            }).appendTo('.slide-buttons');
            buttonArray.push($button);
        });

        advance();
    })

});