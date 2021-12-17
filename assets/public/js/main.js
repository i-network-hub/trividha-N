
$(document).ready(function() {
  var windowWidth = $( window ).width();
  console.log('Window Width::'+windowWidth);
  $(document).on('mouseenter', '.prdct-box', function () {
      $(this).find(":button").show(200);
  }).on('mouseleave', '.prdct-box', function () {
      $(this).find(":button").hide();
  });
  // var pageable = new Pageable("#main");
  // $(window).scroll(function (event) {
  //     var scroll = $(window).scrollTop();
  //     // Do something
  //     console.log(scroll);
  // });
  if($('#main').length > 0){
    if (windowWidth >= 1200) {
      $('#main').fullpage({
        sectionSelector: '.vertical-scrolling',
        // slideSelector: '.horizontal-scrolling',
        navigation: true,
        slidesNavigation: true,
        controlArrows: false,
        verticalCentered:false,
        fixedElements: '',
        afterLoad: function(origin, destination, direction){
            // $('.vertical-scrolling').css("height", "auto");
            // $('.about-us').css("height", "550px");
          },
          afterRender: function(){
            // $( '.footer' ).css( { 'max-height' : '600px' } );
          }
      }); 
    }
  }
  
    $(".owl-article, .owl-blog").each(function() {
            $(this).owlCarousel({
                loop: true,
                    margin: 10,
                    responsiveClass: true,
                    autoplay:true,
                    responsive: {
                      0: {
                        items: 1,
                        nav: true
                      },
                      600: {
                        items: 1,
                        nav: false
                      },
                      1000: {
                        items: 1,
                        nav: true,
                        loop: true,
                        margin: 20
                      }
                    }
        });
        // $(".next").click(function(){$(this).closest('.blog-box').find('.owl-carousel').trigger('owl.next');})
        // $(".prev").click(function(){$(this).closest('.blog-box').find('.owl-carousel').trigger('owl.prev');})
    });
  $('.owl-product').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 5,
        nav: true,
        loop: true,
        margin: 20
      }
    }
  })
  $('.owl-raw').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 3,
        nav: true,
        loop: true,
        margin: 20
      }
    }
  })
  
  $('.owl-trividha-times').owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    responsiveClass: true,
    autoplay:true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true,
        loop: true,
        margin: 20
      }
    }
  })
  
  
  
  
  
})




	$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 50) {
        $('.top-fix').addClass('fixed');
    } else {
        $('.top-fix').removeClass('fixed');
    }
});

