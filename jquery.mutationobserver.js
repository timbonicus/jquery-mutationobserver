/**
 * Adds a jQuery.mutationObserver(listenerFn) to be notified of DOM manipulation performed through jQuery's DOM
 * mutation functions.
 */
(function($) {
    var jQueryMutationFns = ['after', 'append', 'before', 'empty', 'html', 'prepend', 'remove']
    var mutationObservers = []

    $.each(jQueryMutationFns, function(i, fn) {
        var originalFn = $.fn[fn]
        $.fn[fn] = function() {
            originalFn.apply(this, arguments)
            fire(this)
            return this
        }
    })

    function fire($element) {
        $.each(mutationObservers, function(i, observer) {
            if ($element.closest(observer.el).length)
                observer.listener()
        })
    }

    $.fn.mutationObserver = function(listenerFn) {
        if (this.length == 0)
            return this
        if (this.length > 1)
            return $.each(this, function(i, obj) { $(obj).mutationObserver(listenerFn) })

        mutationObservers.push({el: this, listener: $.proxy(listenerFn, this)})
    }
}(jQuery));