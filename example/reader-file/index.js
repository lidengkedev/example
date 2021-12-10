window.onload = function() {
	var InputElem = document.getElementById('FileReader1')
	InputElem.onchange = function(event) {
		var info = '',
			output = document.getElementById('output'),
			progress = document.getElementById('progress'),
			files = event.target.files,
			reader = new FileReader(),
			blob = blobSlice(files[0], 0, files[0].size);
		if (blob) {
			reader.readAsText(blob)
			reader.onerror = function() {
				output.innerText = 'Chould not read file, error code is ' + reader.error.code;
			}
			reader.onload = function() {
				output.innerText = reader.result
			}
		} else {
			alert('Your browser does not support slice().')
		}
	}
}

function blobSlice(blob, startBtye, length) {
	if (blob.slice) {
		return blob.slice(startBtye, length)
	} else if (blob.webkitSlice) {
		return blob.webkitSlice(startBtye, length)
	} else if (blob.mozSlice) {
		return blob.mozSlice(startBtye, length)
	} else {
		return null
	}
}
