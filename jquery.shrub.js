/*jshint browser:true, jquery:true, undef:true, strict:true */
(function($) {
   "use strict";
   $.fn.shrub = function(headerSelector, bodySelector, options) {
      options = $.extend({
         duration: '200',
         collapsedClass: 'shrub_collapsed',
         expandedClass: 'shrub_expanded',
         startCollapsed: 'false',
         fisrtExpanded: 'false'
      }, options);

      var toggleAndSlide = function(item, body, collapse, dur) {
            dur = dur === undefined ? options.duration : dur;
            var wasCollapsed = $(item).hasClass(options.collapsedClass);

            var slide = function(col, cb) {
                  if (col) {
                     $(body).slideUp(dur, cb);
                  } else {
                     $(body).slideDown(dur, cb);
                  }
               };

            // used to toggle and set.
            var toggle = function(col) {
                  
                  $(item).toggleClass(options.collapsedClass, col);
                  $(item).toggleClass(options.expandedClass, !$(item).hasClass(options.collapsedClass));
               };

            if (wasCollapsed === collapse) { //explicitly the same. 
               toggle(collapse); 
            } else { // expicitly different, or by default. 
               slide(!wasCollapsed, toggle); // use !wasCollapsed, collapse could be undefined 
            }
         };

      $(this).each(function(i, item) {
         var headerEl = $(item).children(headerSelector).first();
         var bodyEls = $(item).children(bodySelector);

         $(headerEl).click(function() {
            toggleAndSlide($(item), $(bodyEls));
         });

         if (options.startCollapsed) {
            toggleAndSlide($(item), $(bodyEls), true, 0);
         }

         if (!i && options.fisrtExpanded) {
            toggleAndSlide($(item), $(bodyEls), false, 0);
         }

      });
      return $(this);
   };

})(jQuery);