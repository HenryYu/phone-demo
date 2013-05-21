$(function() {	
	var data = [{"title": "【运维实践】Spider-DNS查询优化", "author": "li.zheng", "img": "other-img/151438opco2eoaecbf404y.jpg", "type": "hot"},
	           {"title": "从组织结构图看Google、Facebook、微软等大公司的企业文化", "author": "陈媛", "img": "", type: "hot"},
			   {"title": "版本控制之旅", "author": "方晓翠", "img": "", "type": "hot"},
			   {"title": "【运维技术沙龙】-3月13日李明辉《故障定位方案》", "author": "伦秉力", "img": "", "type": "hot"},
			   {"title": "[运维实践]预案管理与执行系统", "author": "蔡长青", "img": "", "type": "hot"},
			   {"title": "[运维实践]php耗尽内存原因追查", "author": "卢锦", "img": "", "type": "hot"}];
	
	var firstImage = function(data) {
		var i = 0;
		$.each(data, function(index, element) {
			if(element.img != null) {
				i = index;
				return false;
			}
		});
		return i;
	}
	
	function DivConfig(type, indexArray) {
		this.type = type;
		this.indexArray = indexArray;
	}
	
	var sequence = function(data) {
		var indexArray = [0, 1, 2, 3, 4, 5];
		var divArray = [];
		var firstImageIndex = firstImage(data);
		var firstIndex = 0;
		if(firstImageIndex != null) {	
			firstIndex = firstImageIndex;
		} 

		var firstRowConfig = new DivConfig("img", [firstIndex]);	
		indexArray.splice(firstIndex, 1);
		
		var secondRowConfig = new DivConfig("normal-1", [indexArray[0], indexArray[1]]);
		var thirdRowConfig = new DivConfig("normal-1", [indexArray[2], indexArray[3]]);
		var forthRowConfig = new DivConfig("normal-2", [indexArray[4]]);
		
		divArray[0] = firstRowConfig;
		divArray[1] = secondRowConfig;
		divArray[2] = thirdRowConfig;
		divArray[3] = forthRowConfig;
		
		return divArray;
	}
	
	var disorderArray = function(array) {
		array.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
		return array;
	}
	
	var arrayInOrder = sequence(data);
	var arrayInDisorder = disorderArray(arrayInOrder);
	
	var str = [];
	$.each(arrayInDisorder, function(index, element){
		console.log("element: " + element.type + "  " + element.indexArray); 
		var rowIndex = "row" + index;				
		if(element.type == "img") {
			var e = data[element.indexArray[0]];
			str.push('<div class="s2-img ' + rowIndex + '">');
			str.push('	<div id="back">');
			str.push('		<img src="' + e.img + '"/>');
			str.push('	</div>');
			str.push('	<div id="front">');
			str.push(		e.title);
			str.push('	</div>');
			str.push('</div>');
		} else if (element.type == "normal-1") {
			$.each(element.indexArray, function(k, v) {
				var value = data[v];
				var position = 0 ? "left":"right";
				str.push('<div class="s1-' + position + ' ' + rowIndex + '">');
				str.push('	<div class="s-content">');
				str.push('		<div class="s-title">');
				str.push(			value.title);
				str.push('		</div>');
				str.push('		<div class="s-author">');
				str.push(			value.author);
				str.push('		</div>');
				str.push('	</div>');
				str.push('</div>');			
			});		
		} else if (element.type == "normal-2") {
			var e = data[element.indexArray[0]];
			str.push('<div class="s2 ' + rowIndex + '">');
			str.push('	<div class="s-content">');
			str.push('		<div class="s-title">');
			str.push(			e.title);
			str.push('		</div>');
			str.push('		<div class="s-author">');
			str.push(			e.author);
			str.push('		</div>');
			str.push('	</div>');
			str.push('</div>');
		}		
	});

	console.log(str.join(""));
	$('div.s-container').html(str.join(""));
});