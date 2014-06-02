/**
 *	jQuery mutationObserver 1.0.4
 *	https://github.com/timbonicus/jquery-mutationobserver
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function($) {
    var jQueryMutationFns = ['after', 'append', 'before', 'empty', 'html', 'prepend', 'remove']
    var mutationObservers = []
    var __mutatedElements = []
    var __mutationTimeout

    $.each(jQueryMutationFns, function(i, fn) {
        var originalFn = $.fn[fn]
        $.fn[fn] = function() {
            var me = this
            var mutatedElement = (fn == 'remove') ? me.parent() : me
            var result = originalFn.apply(this, arguments)
            if (__mutatedElements.indexOf(mutatedElement) < 0)
                __mutatedElements.push(mutatedElement)
            clearTimeout(__mutationTimeout)
            __mutationTimeout = setTimeout(function() {
                fire()
                __mutatedElements = []
            }, 50)
            return result
        }
    })

    function fire() {
        $.each(mutationObservers, function(i, observer) {
            var hasMutatedChildren = __mutatedElements.some(function(el) { return $(el).closest(observer.el).length })
            if (hasMutatedChildren)
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
