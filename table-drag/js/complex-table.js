var add_rows = (function () {
	var table 		= null,
		table_head 	= null,
		table_body 	= null;
	var AddRows = function (id, arr) {
		if (typeof id === "string") {
			table 		= document.getElementById(id);
			table_head 	= table.getElementsByTagName('thead')[0];
			table_body 	= table.getElementsByTagName('tbody')[0];
			setNewRows(arr);
		} else {
			console.error('id is not string');
		}
		
	}
	var setNewRows = function (arr) {
		if (Object.prototype.toString.call(arr) === "[object Array]") {
			var row = table_body.rows[0].cells,
				tr 	= document.createElement('tr'),
				td 	= '';
			for (let i = 0, len = row.length; i < len; i++) {
				td 	= td + '<td>' + arr[i] + '</td>';
			}
			td += '</td>';
			tr.innerHTML = td;
			table_body.appendChild(tr);
		} else {
			console.error('rows is not array');
		}
	}
	return AddRows;
})();
var delete_rows = (function () {
	var table 		= null,
		table_head 	= null,
		table_tbody = null;
	var DeleteRows 	= function (id,index) {
		if (typeof id === "string") {
			table 		= document.getElementById(id);
			table_head 	= table.getElementsByTagName('thead')[0];
			table_body 	= table.getElementsByTagName('tbody')[0];
			setDeleteRow(index);
		} else {
			console.error('id is not string');
		}
	}
	var setDeleteRow = function (index) {
		if (typeof index === "number" && /^[0-9]+$/.test(index)) {
			var row = table_body.rows[index];
			if (!row) return;
			table_body.removeChild(row);
		} else {
			console.error('index is not number');
		}
	}
	return DeleteRows;
})();
var add_cols = (function () {
	var table 		= null,
		table_head 	= null,
		table_tbody = null;
	var addCols = function (id, index, title, arr) {
		if (typeof id === "string"){
			table 		= document.getElementById(id);
			table_head 	= table.getElementsByTagName('thead')[0];
			table_body 	= table.getElementsByTagName('tbody')[0];
			setAddCols(index, title, arr);

		} else {
			console.error('id is not string');
		};
	}
	var setAddCols = function (index, title, arr) {
		if (typeof index !== "number" || !/^[0-9]+$/.test(index)) {
			console.error('index is not number');
			return;
		}
		if (typeof title !== "string") {
			console.error('title is not string');
			return;
		}
		if (Object.prototype.toString.call(arr) === "[object Array]") {
			var rows 	= table_body.rows,
				thead	= table_head.rows[0],
				cells 	= thead.cells[index],
				th 		= document.createElement('th');
				th.innerText = title;
			if (!cells) return;
			thead.insertBefore(th, cells);
			for (let i = 0, len = rows.length; i < len; i++) {
				let cols 	= rows[i],
					td 		= cols.children[index];
				if (!td) return;
				let new_node = document.createElement('td');
					new_node.innerText = arr[i];
				cols.insertBefore(new_node, td);
			}
		} else {
			console.error('cols is not array');
		}
	}
	return addCols;
})();
var delete_cols = (function () {
	var table 		= null,
		table_head 	= null,
		table_tbody = null;
	var deleteCols = function (id, index) {
		if (typeof id === "string"){
			table 		= document.getElementById(id);
			table_head 	= table.getElementsByTagName('thead')[0];
			table_body 	= table.getElementsByTagName('tbody')[0];
			setDeleteCols(index);
		} else {
			console.error('id is not string');
		};
	}
	var setDeleteCols = function (index) {
		if (typeof index !== "number" || !/^[0-9]+$/.test(index)) {
			console.error('index is not number');
			return;
		}
		var head_row = table_head.rows[0],
			body_rows = table_body.rows,
			head_th = head_row.cells[index];
		if (!head_th) return;
		head_row.removeChild(head_th);
		for (let i = 0, len = body_rows.length; i < len; i++) {
			let row = body_rows[i],
				body_td = row.cells[index];
			row.removeChild(body_td);
		}
	}
	return deleteCols;
})();
/**
 * 下载表格
 */

var tableToExcel = (function () {
	var _this = this;
	this.url = 'data:application/vnd.ms-excel;base64,';
	this.template = '<html><head><meta charset="UTF-8"></head><body><table  border="1">{table}</table></body></html>';
	this.base64 = function(s) {
    	return window.btoa(unescape(encodeURIComponent(s))) 
	}
	this.format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        })
    }
	var getBrowserType = function () {
		var browsertype = '',
			userAgent = window.navigator.userAgent;
		if (userAgent.indexOf('MSIE') !== -1) {
			return 'IE';
		} else if (userAgent.indexOf('Firefox') !== -1) {
			return 'Firefox';
		} else if (userAgent.indexOf('Chrome') !== -1) {
			return 'Chrome';
		} else if (userAgent.indexOf('Opera') !== -1) {
			return 'Opera';
		} else if (userAgent.indexOf('Safari')) {
			return 'Safari';
		}
	}
	var setExcelContent = function(table, name) {
        if (!table.nodeType)
            table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }
        window.location.href = _this.url + _this.base64(_this.format(_this.template, ctx))
   }
	return function (tableid, name) {
		if (getBrowserType() == 'IE') {
			var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");
            var oWB = oXL.Workbooks.Add();
            var xlsheet = oWB.Worksheets(1);
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            xlsheet.Paste();
            oXL.Visible = true;
 
            try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch(e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                oXL.Quit();
                oXL = null;
                idTmr = window.setInterval("Cleanup();", 1);
            }
		} else {
			setExcelContent(tableid, name);
		}
	}
})();
/**
 * 打印表格
 */
var tableToPrint = (function () {
	var _this = this;
	var isArray = function (data) {
		return Object.prototype.toString.call(data) === "[object Array]";
	}
	var setTableThead = function (thead) {
		var thead_str = '<thead><tr>';
		for (let i = 0, len = thead.length; i < len; i++) {
			thead_str = thead_str + '<th>' + thead[i]['title'] + '</th>';
		}
		thead_str = thead_str + '</tr></thead>'
		return thead_str;
	}
	var setTbaleTbody = function (thead, tbody) {
		var tbody_str = '<tbody>';
		for (let i = 0, len = tbody.length; i < len; i++) {
			tbody_str = tbody_str + '<tr>';
			for (let j = 0, j_len = thead.length; j < j_len; j++) {
				tbody_str = tbody_str + '<td>' + tbody[i][thead[j]['key']] + '</td>';
			}
			tbody_str = tbody_str + '</tr>';
		}
		tbody_str = tbody_str + '</thead>';
		return tbody_str;
	}
	var htmlPage = function (thead, tbody, title, style) {
		var style_css = (
			'table thead tr th { height: 60px; background-color: #f8f8f9; border-width: 0;}'
		+ 	'table tbody tr td { text-align: center; padding: 0 10px; height: 60px; min-height: 60px; border: 1px solid #eaeaea;}');
		return (
			'<!DOCTYPE html>'
		+	'<html>'
		+ 		'<head>'
		+ 			'<meta charset="UTF-8">'
		+ 			'<title>'+ (title || 'table-print') +'</title>'
		+ 			'<style type="text/css">' + style_css + '</style>'
		+ 			'<style type="text/css">' + (style || '') + '</style>'
		+ 		'</head>'
		+ 		'<body>'
		+		'<table width="100%" border="0" cellpadding="0" cellspacing="0" style="page-break-after:always">'
		+			setTableThead(thead)
		+			setTbaleTbody(thead, tbody)
		+ 		'</table>'
		+		'<script type="text/javascript" charset="utf-8">window.print();</script>'
		+ 		'</body>'
		+ 	'</html>');
	}
	return function (thead, tbody, title, style) {
		if (isArray(thead) && isArray(tbody)) {
			var new_window = window.open();
			new_window.document.write(htmlPage(thead, tbody, title, style))
			new_window.document.close();
			new_window.focus();
			new_window.close();
		} else {
			console.error('thead or tbody is not array!');
		}
	}
})();
// 获取表格筛选项列表
var tableFilterOptions = (function () {
	var options = {};
	// 配置筛选项
	var setOptionsKeys = function (cols) {
		if (Object.prototype.toString.call(cols) === "[object Array]" && cols.length > 0) {
			cols.map(item => options[item] = []);
		} else {
			console.error('cols is not Array !');
		}
	}
	// 填充筛选项列表数据
	var setOptionsValue = function (cols, data) {
		setOptionsKeys(cols);
		if (Object.prototype.toString.call(data) === "[object Array]" && data.length > 0) {
			for (let i = 0, len = data.length; i < len; i++) {
				for (let j = 0, c_len = cols.length; j < c_len; j++) {
					let options_value = data[i][cols[j]];
					if (options[cols[j]].indexOf(options_value) < 0) {
						options[cols[j]].push(options_value);
					}
				}
			}
		} else {
			console.error('table is not Array !');
		}
	}
	return function (cols, data) {
		setOptionsValue(cols, data);
		return options;
	};
})();