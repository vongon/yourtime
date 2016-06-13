/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
var findScrollPos = function(selectorStr){
    var selector = $(selectorStr);
    var offset = selector.offset();
    var navbarHeight = 50; //height of .navbar-shrink
    return offset.top - navbarHeight;
};

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: findScrollPos($anchor.attr('href'))
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
/*
$('body').scrollspy({
    target: '.navbar-fixed-top'
})
*/


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});