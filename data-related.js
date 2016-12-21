function hex2Bin () {
	var finput = document.getElementById("data_text");
	var editor = document.getElementById("editor_bin");

	var f = finput.files[0];
	if(f){
		var r = new FileReader();
		r.onload = function(e){
			//editor.innerHTML = e.target.result;
			var dat = txtToBin(e.target.result);
			doSave(dat, "text/plain", "hello.bin");
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
	
	while(i < str.length){
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
		else if(str[i] <= 'f' && str[i] >= 'a'){
			v = (v << 4) | (str.charCodeAt(i) - 97 + 10);
			times++;
			if(times == 2){
				arrValue.push(v);
				times = 0;
				v = 0;
			}
		}
		else if(str[i] <= 'F' && str[i] >= 'A'){
			v = (v << 4) |  (str.charCodeAt(i) - 65 + 10);
			times++;
			if(times == 2){
				arrValue.push(v);
				times = 0;
				v = 0;
			}
		}
		i++;
	}
	var n = arrValue.length;
	var arrUint8 = new Uint8Array(n);
	for(i = 0; i < n; i++)
		arrUint8[i] = arrValue[i];
	
	return arrUint8;
}

function binToText (str) {
	var i = 0;
	var v = 0;
	var tmp = 0;
	var newStr = new String();
	
	while(i < str.length){
		v = str.charCodeAt(i);//fromCharCode(16);
		tmp = v >> 4;
		if(tmp >= 10 && tmp <= 15){
			tmp = tmp - 10 + 65;
			newStr += String.fromCharCode(tmp);
		}else{
			newStr += tmp.toString();
		}
		tmp = v & 0x0f;
		if(tmp >= 10 && tmp <= 15){
			tmp = tmp - 10 + 65;
			newStr += String.fromCharCode(tmp);
		}else{
			newStr += tmp.toString();
		}
		newStr += " ";
		
		i++;
	}
	
	return newStr;
}

function bin2Hex () {
	var finput = document.getElementById("data_bin");
	var editor = document.getElementById("editor_text");

	var f = finput.files[0];
	if(f){
		var r = new FileReader();
		r.onload = function(e){
			//editor.innerHTML = e.target.result;
			var dat = binToText(e.target.result);
			doSave(dat, "text/latex", "hello.txt");
		}
		//r.readAsText(f);
		r.readAsBinaryString(f);
	} else {
		editor.innerHTML = "Failed to load file";
	}
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
