var limit     = $(window).height()/3,
    $backToTop = $('#back-to-top');

$(window).scroll(function () {
    if ( $(this).scrollTop() > limit ) {
        $backToTop.fadeIn();
    } else {
        $backToTop.fadeOut();
    }
});

// scroll body to 0px on click
$backToTop.click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1500);
    return false;
});
