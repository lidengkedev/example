var add_rows = (function () {
	var table = null,
		table_head = null,
		table_body = null;
	var AddRows = function (id,obj) {
		table = document.getElementById(id);
		table_head = table.getElementsByTagName('thead');
		table_body = table.getElementsByTagName('tbody');
		setNewRows(obj);
	}
	var setNewRows = function (obj) {
		var row = table_body[0].rows[0].cells,
			tr = document.createElement('tr'),
			td = '';
		for (let i = 0, len = row.length; i < len; i++) {
			td = td + '<td>' + obj[i] + '</td>';
		}
		td += '</td>';
		tr.innerHTML = td;
		table_body[0].appendChild(tr)
	}
	return AddRows;
})();
