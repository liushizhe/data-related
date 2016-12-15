function load () {
	var finput = document.getElementById("data");
	var editor = document.getElementById("editor");

	var f = finput.files[0];
	if(f){
		var r = new FileReader();
		r.onload = function(e){
			editor.innerHTML = e.target.result;
			var dat = txtToBin(e.target.result);
			doSave(dat, "text/latex", "hello.txt");
		}
		r.readAsText(f);
	} else {
		editor.innerHTML = "Failed to load file";
	}
}

function txtToBin (str) {
	var i = 0;
	var v = 0;
	var times = 0;
	var arrValue = new Array();
	
	while(i < str.len()){
		if(str[i] == ' '){
			if(times){
				arrValue.push(v);
				times = 0;
				v = 0;
			}
			i++	;
			continue;
		}
		else if(str[i] <= '9' && str[i] >= '0'){
			v = (v << 4) | (str[i] - '0');
			times++;
			if(times == 2){
				arrValue.push(v);
				times = 0;
				v = 0;
			}
		}
		else{
			return 0;	
		}
		i++;
	}
	
	return arrValue;
}

function doSave(value, type, name) {  
    var blob;  
    if (typeof window.Blob == "function") {  
        blob = new Blob([value], {type: type});  
    } else {  
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;  
        var bb = new BlobBuilder();  
        bb.append(value);  
        blob = bb.getBlob(type);  
    }  
    var URL = window.URL || window.webkitURL;  
    var bloburl = URL.createObjectURL(blob);  
    var anchor = document.createElement("a");  
    if ('download' in anchor) {  
        anchor.style.visibility = "hidden";  
        anchor.href = bloburl;  
        anchor.download = name;  
        document.body.appendChild(anchor);  
        var evt = document.createEvent("MouseEvents");  
        evt.initEvent("click", true, true);  
        anchor.dispatchEvent(evt);  
        document.body.removeChild(anchor);  
    } else if (navigator.msSaveBlob) {  
        navigator.msSaveBlob(blob, name);  
    } else {  
        location.href = bloburl;  
    }  
}  
