var App = window.App || {}

App.carousel = {
	images : [],
	controls : {},
	container : {},
	ul : {},
	dispW : 0,
	dispH : 0,
	slides :[],
	actSlide : 0,
	isAnimating : false,
	init : function(options){
		this.dispW = parseInt(options.w);
		this.dispH = parseInt(options.h);
		this.container = $("#carousel");
		this.loadImages(options.json);
		this.ul = $("<ul>");
	},
	loadImages : function(json){
		var that = this;
		$.getJSON( json)
		.done(function(data) {
			that.images = data;
			that.render();
		})
		.fail(function() {
			console.log( "error" );
		});

	},
	render : function(){
		var that = this;
			disp = $("<div class='frame'>"),
			prev = $("<div id='prev'>"),
			next = $("<div id='next'>");
		
		disp.css({
			width : that.dispW,
			height : that.dispH
		});

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

		//trasition listeners
		this.flowControl();

		disp.append(this.ul);
		this.container.append(prev).append(disp).append(next);
		this.ul.css("left", (parseInt(this.dispW) * -1));
		this.container.find('ul li:first').before(this.container.find('ul li:last'));
		var e;
		// $('#slides li:first').before($('#slides li:last'));


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
	flowControl : function(){
		var that = this;
		this.ul.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			that.isAnimating = false;
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