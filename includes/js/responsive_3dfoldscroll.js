(function($) {
	$.fn.responsive_3dfoldscroll = function(options) {
		options = $.extend({
			'animationLength': 1500,
			'foldHolder': 'foldWrapper'
		}, options);
		
		var foldingElements = $("."+options.foldHolder);
		var folds = [];
		init();
		function fold (element, i, hh){
			this.element = element;
			this.i = i;
			this.hh = hh;
			
								
		}
		function init(){
			var foldhtml = "";
			$.each(foldingElements, function(i, element){
				var hh = $(element).find("img").height();
			    foldhtml += "<div id=\"f-"+i+"\" class=\""+options.foldHolder+"\" style=\"height:"+hh+"px;\">";
			    if(hh%2 == 1){
			    	foldhtml += 	"<div class=\"topHalf\" style=\"height:"+(Math.floor((hh/2))+1)+"px\">"+$(element).html()+"</div>";
			    }else{
			    	foldhtml += 	"<div class=\"topHalf\" style=\"height:"+Math.floor((hh/2))+"px\">"+$(element).html()+"</div>";
			    }
			    foldhtml += 	"<div class=\"bottomHalf\" style=\"height:"+Math.floor((hh/2))+"px\">"+$(element).html()+"</div>";
			    foldhtml += "</div>";
			    folds[i] = new fold(element, i, hh);
			    
			});
			$("#container").html(foldhtml);
			$("#page").height((folds.length+0.5)*(options.animationLength));
		}
		
		var resizeId;

		//when resizing the site, we adjust the heights of the sections
		$(window).resize(function() {
			doneResizing();
		});
		function doneResizing() {
			var sTop = $(window).scrollTop();
			var numtimes = 0;
			var carpos = 0;
			for (var j=0;j<folds.length;j++){
				curpos = sTop;
				numtimes = sTop;

				folds[j].hh = $("#f-"+folds[j].i).find("img").height();
				 if(folds[j].hh%2 == 1){
			    	$("#f-"+folds[j].i+" .topHalf").css("height",(Math.floor((folds[j].hh/2))+1)+"px");
			    }else{
			    	$("#f-"+folds[j].i+" .topHalf").css("height",Math.floor((folds[j].hh/2))+"px");
			    }
			    $("#f-"+folds[j].i+" .bottomHalf").css("height",Math.floor((folds[j].hh/2))+"px");
			    $("#page").height((folds.length+0.5)*(options.animationLength));
				if(numtimes <= (options.animationLength * folds[j].i)){
					$("#f-"+folds[j].i+" .topHalf").css("-webkit-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .topHalf").css("-moz-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .topHalf").css("transform","rotateX(0deg)");
					
					
					$("#f-"+folds[j].i+" .bottomHalf").css("-webkit-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .bottomHalf").css("-moz-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .bottomHalf").css("transform","rotateX(0deg)");
					$("#f-"+folds[j].i+".foldWrapper").css("height",""+folds[j].hh+"px");
				}else{
					
					
					var percentage = (1-((numtimes-(options.animationLength*(folds[j].i)))/(options.animationLength)));
				    if(percentage < 0){
					    percentage = 0;
				    }
				    var c = folds[j].hh * percentage
				    ,   a = b = folds[j].hh/2
				    ,   part = 2*b*c
				    ,   bottomAngle = part <= 0 ? 90 : Math.acos( (b*b+c*c-a*a) / part )*180/Math.PI
				    ,   topAngle = 360-bottomAngle;
				    
				    $("#f-"+folds[j].i+" .topHalf").css("-webkit-transform", 'rotateX(' + topAngle + 'deg)');
				    $("#f-"+folds[j].i+" .bottomHalf").css("-webkit-transform", 'rotateX(' + bottomAngle + 'deg)');
				      
				    // change folds height
				    var foldHeight = folds[j].hh/1 * percentage;
				    $("#f-"+folds[j].i+".foldWrapper").height(foldHeight);
				}
			}
		
		}
		var complete = false;
		$(window).scroll(function(){
			var totalHeight, currentScroll, visibleHeight;
			
			if (document.documentElement.scrollTop)
		    	{ currentScroll = document.documentElement.scrollTop; }
		    else
		    	{ currentScroll = document.body.scrollTop; }
		  
		    totalHeight = document.body.offsetHeight;
		    visibleHeight = document.documentElement.clientHeight;
		  
		  	if (totalHeight <= currentScroll + visibleHeight ){
		  		if(!complete){
					$("#footer-top").fadeIn();
					complete = true;
				}
			}else{
				if(complete){
					$("#footer-top").fadeOut();
					complete = false;
				}
			}
			var sTop = $(window).scrollTop();
			var numtimes = 0;
			var carpos = 0;
			for (var j=0;j<folds.length;j++){
				curpos = sTop;
				numtimes = sTop;
				
				if(numtimes <= (options.animationLength * folds[j].i)){
					$("#f-"+folds[j].i+" .topHalf").css("-webkit-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .topHalf").css("-moz-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .topHalf").css("transform","rotateX(0deg)");
					
					
					$("#f-"+folds[j].i+" .bottomHalf").css("-webkit-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .bottomHalf").css("-moz-transform","rotateX(0deg)");
					$("#f-"+folds[j].i+" .bottomHalf").css("transform","rotateX(0deg)");
					$("#f-"+folds[j].i+".foldWrapper").css("height",""+folds[j].hh+"px");
				}else{
					
					
					var percentage = (1-((numtimes-(options.animationLength*(folds[j].i)))/(options.animationLength)));
				    if(percentage < 0){
					    percentage = 0;
				    }
				    var c = folds[j].hh * percentage
				    ,   a = b = folds[j].hh/2
				    ,   part = 2*b*c
				    ,   bottomAngle = part <= 0 ? 90 : Math.acos( (b*b+c*c-a*a) / part )*180/Math.PI
				    ,   topAngle = 360-bottomAngle;
				    
				    $("#f-"+folds[j].i+" .topHalf").css("-webkit-transform", 'rotateX(' + topAngle + 'deg)');
				    $("#f-"+folds[j].i+" .bottomHalf").css("-webkit-transform", 'rotateX(' + bottomAngle + 'deg)');
				      
				    // change folds height
				    var foldHeight = folds[j].hh/1 * percentage;
				    $("#f-"+folds[j].i+".foldWrapper").height(foldHeight);
				}
			}
		
		});
		
		
	};	
	
})(jQuery);