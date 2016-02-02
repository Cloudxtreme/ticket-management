App.directive('whenScrolled', function() {
    return function(scope, element, attr) {
        var raw = element[0];
        
        element.bind('scroll', function() {
			console.log("scroll down");
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});