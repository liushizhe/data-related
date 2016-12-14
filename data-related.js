function load () {
	var finput = document.getElementById("data");
	var editor = document.getElementById("editor");

	var f = finput.files[0];
	if(f){
		var r = new FileReader();
		r.onload = function(e){
			editor.innerHTML = e.target.result;
		}
		r.readAsText(f);
	} else {
		editor.innerHTML = "Failed to load file";
	}
}