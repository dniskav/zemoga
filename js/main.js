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
	init : function(options){
		this.dispW = options.w;
		this.dispH = options.h;
		this.container = $("#carousel");
		this.loadImages(options.json);
		this.ul = $("<ul>");
	},
	loadImages : function(json){
		var that = this;
		$.getJSON( json)
		.done(function(data) {
			console.log( "data -> ", data );
			that.images = data;
			that.render();
		})
		.fail(function() {
			console.log( "error" );
		});

	},
	render : function(){
		var that = this;
			disp = $("<div class='frame'>");
		

		disp.css({
			width : that.dispW,
			height : that.dispH
		});

		for(var ndx in this.images){
			var listItem = $("<li>"),
				image = $("<img>");

			listItem.attr("data-slide", ndx);
			if(ndx >= this.images.length - 1){
				listItem.css("left", parseInt(this.dispW) * -1);
			}else{
				listItem.css("left", parseInt(this.dispW) * ndx);
			}
			image.attr("src", this.images[ndx]);
			listItem.append(image)
			this.slides.push(listItem);
			this.ul.append(listItem);
		}

		disp.append(this.ul);
		this.container.append(disp);

	},
	controls : function(){},
	keyListerner : function(){},
	flowControls : function(){},
	moveRight : function(){
		for(var ndx in this.slides){
			var pos = parseInt(this.slides[ndx].css("left"));

			this.slides[ndx].css("left", pos + parseInt(this.dispW));
		}
	},
	moveLeft : function(){
		var maxLeft = (this.slides - 2) * parseInt(this.dispW),
			fixer = pos - parseInt(this.dispW);
		for(var ndx in this.slides){
			var pos = parseInt(this.slides[ndx].css("left"));
			if(pos - fixer < maxLeft){
				this.slides[ndx].css("left", pos - parseInt(this.dispW));
			}else{
				this.slides[ndx].css("left", pos - parseInt(this.dispW));
			}
		}
	}
}

App.carousel.init({json : "js/img.json", w : "1080px", h: "470px"});