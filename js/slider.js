function slider(options={'loop':false,'autoload':false }){

		var allSlider = $('#slider-list div');
		var lengthAllSlider = allSlider.length;
		var widthSlider = $('.slider').width();
		
		var borderWidth = Math.round((widthSlider+200)/3);
	
		$('.border').css('width',borderWidth);
		$('.border-img').css('width',borderWidth);
		var leftSecondSlider = widthSlider - borderWidth;
		var leftFirstSlider = leftSecondSlider/2;
		options.leftSecondSlider = 	leftSecondSlider;
		options.leftFirstSlider = leftFirstSlider;
		allSlider.eq(0).css({'left':leftFirstSlider}).addClass('first border-shadow');
		allSlider.eq(1).css({'left':leftSecondSlider}).addClass('second');
		allSlider.eq(2).css({'left':0}).addClass('last');
			
		for(var i=3; i<=lengthAllSlider-1;i++){
			allSlider.eq(i).addClass('slider-hidden');
		}

		
		if(options.loop == false){
			$('.prev').prop('disabled', true);
		}
		
		
		if (options.autoload == true){
			
			startInterval(options,allSlider);
			$('.next').on('click',function(e){
				stopInterval();
				
				nextSlider(options,allSlider);
				 setTimeout(startInterval(options,allSlider), 400);
			});
		
	$('.prev').on('click',function(e){
		stopInterval();
			prevSlider(options,allSlider);
			setTimeout(startInterval(options,allSlider), 400);
	});
			
			
		}else{
			sliderPagination(options,allSlider)
		}

};
	function stopInterval(){
        clearTimeout(sliderIndterval);
    }

    function startInterval(options,allSlider){
		
        sliderIndterval = setInterval(function(){nextSlider(options,allSlider)},4000);
    }
function sliderPagination(options,allSlider){
	
	$('.next').on('click',function(e){
		nextSlider(options,allSlider);
	});
		
	$('.prev').on('click',function(e){
			prevSlider(options,allSlider);
	});
	
}
function nextSlider(options,allSlider){
	
	 var last = $('.last');
		 var second = $('.second');
		 var first = $('.first');
		
			$('.next').prop('disabled', true);
			last.animate({
					left: options.leftSecondSlider,
				}, 400,function(){
					last.removeClass('last');
				});	
		
		
		
			first.removeClass('border-shadow').addClass('remove-border-shadow-slow ').animate({
				left: 0,
			}, 400,function(){
				first.removeClass('first remove-border-shadow-slow slider-show-animation');
				first.addClass('slider-hidden');
				
			});
  

			second.addClass('add-border-shadow-slow border-shadow').delay(140).animate({
				left: options.leftFirstSlider,
			}, 400,function(){
				
				second.addClass('first').removeClass('second add-border-shadow-slow');
				second.next().addClass('second');
				$('.prev').prop('disabled', false);
				$('.next').prop('disabled', false);
				last.next().removeClass('slider-hidden slider-hidden-animation').addClass('last slider-show-animation');
			
				if($('.last').next().length == 0 && options.loop == false ){
								$('.next').prop('disabled', true);
				}else if(last.next().length == 0  && options.loop == true){
	
					allSlider.eq(0).addClass('last slider-show-animation').removeClass('slider-hidden-animation');
				}else if(second.next().length ==0  ){
					allSlider.eq(0).addClass('second');
				}
				
				$('second').next().addClass('slider-show-animation').removeClass('');
		
				
			});	
}		
function prevSlider(options,allSlider){
	var first = $('.first');
	var first_prev = (first.prev().length != 0)? first.prev() :allSlider.last();

	first_prev.addClass('slider-show-animation').removeClass('slider-hidden slider-hidden-animation'); 
	var second = $('.second');
	var last = $('.last');
		
	$('.prev').prop('disabled', true);
		
	last.addClass('slider-hidden-animation');
	last.removeClass('last');
			
	first_prev.addClass('add-border-shadow-slow').animate({

		left: options.leftFirstSlider,
			
	}, 400,function(){
		first_prev.addClass('first border-shadow').removeClass('last add-border-shadow-slow');
		last.addClass('slider-hidden');	
				
	});	
	second.animate({
		left: 0,
	}, 400,function(){
		second.addClass('last');
		second.removeClass('second');
	});	
			
			
			
			first.removeClass('border-shadow').addClass('remove-border-shadow-slow').animate({
				left: options.leftSecondSlider,
			}, 400,function(){
				first.addClass('second').removeClass('first remove-border-shadow-slow');
				
				if($('.first').prev().length == 0 && options.loop == false){
				$('.prev').prop('disabled', true);
				$('.next').prop('disabled',false);
			}else{
				$('.next').prop('disabled',false);
				$('.prev').prop('disabled', false);
			}
			});
	
}
	