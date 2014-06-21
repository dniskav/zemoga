var App = window.App || {}

App.carousel = {
	images : [],
	container : {},
	ul : {},
	dispW : 0,
	dispH : 0,
	slides :[],
	isAnimating : false,
	init : function(options){
		this.container = $("#carousel");
		this.loadImages(options.json);
		//setup the dimensions
		this.ul = $("<ul>");
	},
	loadImages : function(json){
		var that = this;
		$.getJSON( json)
		.done(function(data) {
			that.images = data;
			$('<img/>').attr('src',data[0]).load(function(){ 
				that.dispW = this.width;
				that.dispH = this.height;
				that.render();
			});
		})
		.fail(function() {
			console.log( "error" );
		});

	},
	render : function(){
		var that = this,
			wrapper = $("<div class='carousel-wrapper'>"),
			disp = $("<div class='frame'>"),
			prev = $("<div id='prev'>"),
			next = $("<div id='next'>");
		

		for(var ndx in this.images){
			var listItem = $("<li>"),
				image = $("<img>");

			listItem.attr("data-slide", ndx);
			image.attr("src", this.images[ndx]);
			listItem.append(image)
			this.slides.push(listItem);
			this.ul.append(listItem);
		};
		//listerners to controls
		prev.on('click', function(){
			that.moveLeft();
		});
		next.on('click', function(){
			that.moveRight();
		});

		//listeners to keyboard
		this.keyListerner();

		disp.append(this.ul);
		wrapper.append(prev).append(disp).append(next);
		this.container.append(wrapper);
		this.ul.css("left", (parseInt(this.dispW) * -1));

		disp.css({
			width : that.dispW,
			height : that.dispH
		});

		wrapper.css('width', prev.width() + next.width() + disp.width());
		this.container.find('ul li:first').before(this.container.find('ul li:last'));
	},
	controls : function(){},
	keyListerner : function(){
		var that = this;
		$("body").keydown(function(e) {
			if(e.keyCode == 37) { // left
				that.moveLeft();
			}
			else if(e.keyCode == 39) { // right
				that.moveRight();
			}
		});
	},
	moveRight : function(){
		var that = this,
			pos = (parseInt(this.ul.css("left")) - this.dispW);
		
		if(this.isAnimating){
			return;	
		} 
		this.isAnimating = true;
		this.ul.animate({left : pos}, 200,function(){
			that.ul.css('left', that.dispW * -1);
			that.container.find('ul li:last').before(that.container.find('ul li:first'));
			that.isAnimating = false;
		});
	},
	moveLeft : function(){
		var that = this,
			pos = (parseInt(this.ul.css("left")) + this.dispW);
		
		if(this.isAnimating){
			return;	
		} 
		this.isAnimating = true;
		this.ul.animate({left : pos}, 200,function(){
			that.ul.css('left', that.dispW * -1);
			that.container.find('ul li:first').before(that.container.find('ul li:last'));
			that.isAnimating = false;
		});
	}
}

App.carousel.init({json : "js/img.json", w : "1080px", h: "470px"});