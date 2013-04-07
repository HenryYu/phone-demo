$(function() {
    // WARNING: Extremely hacky code ahead. jQuery mobile automatically
    // sets the current "page" height on page resize. We need to unbind the
    // resize function ONLY and reset all pages back to auto min-height.
    // This is specific to jquery 1.8

    // First reset all pages to normal
    $('[data-role="page"]').css('min-height', '480px');
	$('[data-role="page"]').css('height', '480px');
    // $('[data-role="page"]').css('overflow', 'auto');

	var contentHeight = $('[data-role="page"]').height() - $('[data-role="header"]').height();
// 62 + 2 + 15+15+ 386 = 480
	$('[data-role="content"]').css('height','386px');
    $('[data-role="content"]').css('overflow-y', 'auto');

    // Is this the function we want to unbind?
    var check = function(func) {
        var f = func.toLocaleString ? func.toLocaleString() : func.toString();
        // func.name will catch unminified jquery mobile. otherwise see if
        // the function body contains two very suspect strings
        if(func.name === 'resetActivePageHeight' || (f.indexOf('padding-top') > -1 && f.indexOf('min-height'))) {
            return true;
        }
    };

    // First try to unbind the document pageshow event
    try {
        // This is a hack in jquery 1.8 to get events bound to a specific node
        var dHandlers = $._data(document).events.pageshow;

        for(x = 0; x < dHandlers.length; x++) {
            if(check(dHandlers[x].handler)) {
                $(document).unbind('pageshow', dHandlers[x]);
                break;
            }
        }
    } catch(e) {}

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
	var content = $("#json-content").text();
	var obj = JSON.parse(content);
	console.log(obj.data);
	
	var table = [];
	var column = ['name', 'totalHosts', 'kpi_percentage', 'peak'];
	var nameMap = {name: 'Name', totalHosts: "Hosts", kpi_percentage: "KPI", peak: "Peak"};
	// table.push('<a data-mini="true" data-rel="popup" class="ui-table-columntoggle-btn ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-mini" href="#table-column-toggle-popup" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="null" aria-haspopup="true" aria-owns="#table-column-toggle-popup"><span class="ui-btn-inner"><span class="ui-btn-text">Columns...</span></span></a>');
	table.push('<table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke ui-table ui-table-columntoggle">');
	table.push('<thead>');
	table.push('<tr>');
	for(var i = 0; i<column.length; i++) {
		var index = i + 1;
		var className = "ui-table-priority-" + index;
		// table.push('<th class="' + className + '" data-priority="' + index + '">');
		table.push('<th>');
		table.push(nameMap[column[i]]);
		table.push('</th>');
	}
	table.push('</tr>');
	table.push('</thead>');
	
	table.push('<tbody>');
	for(var i = 0; i < obj.data.list.length; i++) {
		table.push('<tr>');
		for(var j=0; j<column.length; j++) {
			var columnName = column[j];
			var columnValue = obj.data.list[i][column[j]];
			table.push('<td>');
			if(columnName == 'name') {
				table.push('<a class="ui-link">' + columnValue + '</a>');
			} else {
				table.push(columnValue);
			}
			table.push('</td>');
		}
		table.push('</tr>');
	}
	
	table.push('</tbody>');
	table.push('</table>');
	
	console.log(table.join(''));
	
	$("#preview").click(function() {
		$('#phone-preview').html(table.join(''));
	});

});