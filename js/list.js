$(function() {
    // First reset all pages to normal
    $('[data-role="page"]').css('min-height', '480px');
	$('[data-role="page"]').css('height', '480px');
    // $('[data-role="page"]').css('overflow', 'auto');

	var contentHeight = $('[data-role="page"]').height() - $('[data-role="header"]').height();
	// 62 + 2 + 15+15+ 386 = 480
	$('[data-role="content"]').css('height','386px');
    $('[data-role="content"]').css('overflow-y', 'auto');

   
    // Then try to unbind the window handler
    try {
        var wHandlers = $._data(window).events.throttledresize;

        for(x = 0; x < wHandlers.length; x++) {
            if(check(wHandlers[x].handler)) {
                $(window).unbind('throttledresize', wHandlers[x]);
                break;
            }
        }
    } catch(e) {}
	
	
	//Render mobile demo
	
	
	$("#preview").click(function() {
		try {
			var content = $("#json-content").text();
			var obj = JSON.parse(content);
			factory[obj.component.name](obj);
		} catch(e) {
			alert(e);
		}
	});

});