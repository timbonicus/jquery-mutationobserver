jquery-mutationobserver
=======================

A jQuery plugin to add notification of DOM mutation events issued through jQuery's own mutation functions.

With DOMNodeInserted deprecated and MutationObserver not yet gaining full browser support, this plugin provides a simple way to receive notification when a descendant DOM node is mutated.

Usage:
```javascript
var listenerFn = function() {
  alert('mutation!')
};
$(selector).mutationObserver(listenerFn);
$(selector).append($('<div/>'))
```
