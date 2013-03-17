// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other osxsliders which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your osxslider).

    // Create the defaults once
    var osxslider = "defaultosxslider",
        defaults = {
            propertyName: "value"
        };

    // The actual osxslider constructor
    function osxslider( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the osxslider
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = osxslider;

        this.init();
    }

    osxslider.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
        },

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight osxslider wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[osxslider] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "osxslider_" + osxslider)) {
                $.data(this, "osxslider_" + osxslider, new osxslider( this, options ));
            }
        });
    };

})( jQuery, window, document );
