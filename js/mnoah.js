
	
var columnToggleTable = function(obj) {
		
		
		console.log(obj.data);


		//1.validate data
		var table = [];
		var column = ['name', 'totalHosts', 'kpi_percentage', 'peak'];
		var nameMap = {name: 'Name', totalHosts: "Hosts", kpi_percentage: "KPI", peak: "Peak"};
		// table.push('<a data-mini="true" data-rel="popup" class="ui-table-columntoggle-btn ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-mini" href="#table-column-toggle-popup" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="null" aria-haspopup="true" aria-owns="#table-column-toggle-popup"><span class="ui-btn-inner"><span class="ui-btn-text">Columns...</span></span></a>');

		//2.construct content
		table.push('<table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke ui-table ui-table-columntoggle">');
		table.push('<thead>');
		table.push('<tr>');
		for(var i = 0; i<column.length; i++) {
			var index = i + 1;
			var className = "ui-table-priority-" + index;
			table.push('<th class="' + className + '" data-priority="' + index + '">');
			//table.push('<th>');
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
		
		//3.cleanup content div
		$('#phone-preview').html(table.join(''));
		$('#table-column-toggle-popup-popup').remove();
		
		//4.render new content
		$('#table-column-toggle').table();
	    //$('#mobile-page').page("refresh");
		$(":jqmData(role='controlgroup')").controlgroup();
};
		
var factory = {"columnToggleTable": columnToggleTable};