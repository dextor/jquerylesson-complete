/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function($, window, document, undefined) {

	// undefined is used here as the undefined global 
	// variable in ECMAScript 3 and is mutable (i.e. it can 
	// be changed by someone else). undefined isn't really 
	// being passed in so we can ensure that its value is 
	// truly undefined. In ES5, undefined can no longer be 
	// modified.
	// window and document are passed through as local 
	// variables rather than as globals, because this (slightly) 
	// quickens the resolution process and can be more 
	// efficiently minified (especially when both are 
	// regularly referenced in your plugin).
	// Create the defaults once
	var pluginName = 'ajaxLoadIt';
	var defaults = {
		template: "<li>${Name}</li>"
	};

	// The actual plugin constructor


	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);

		// jQuery has an extend method that merges the 
		// contents of two or more objects, storing the 
		// result in the first object. The first object 
		// is generally empty because we don't want to alter 
		// the default options for future instances of the plugin
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	Plugin.prototype.init = function() {
		// Place initialization logic here
		// You already have access to the DOM element and
		// the options via the instance, e.g. this.element 
		// and this.options
		
		// console.log('ajaxLoadIt ::::: ', this.element, this);
		
		var self = this;
		
		
		self.$element.bind('click', function(e) {
			// console.log('get data from: ', self.options.url);
			
			// remove old content, show the loader
			var loader = '<li class="loading"></li>';
			self.options.targetEl
				.empty()
				.html(loader);
				
			// make the request
			$.ajax({
				url: self.options.url,
				dataType: "json",
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('error: ', jqXHR, textStatus, errorThrown);
				},
				success: function(data, textStatus, jqXHR) {
					// console.log(textStatus, data, jqXHR);
					
					// create the template for the data to render in
					$.template( "dataTemplate", self.options.template);
					// remove the loader
					self.options.targetEl.empty();
					// add new content using the template
					$.tmpl( "dataTemplate", data.food ).appendTo( self.options.targetEl );
				}
			}); //end ajax call
		}); //end click binding
	};
	

	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
