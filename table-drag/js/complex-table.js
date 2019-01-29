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
			table_body.appendChild(tr)
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
