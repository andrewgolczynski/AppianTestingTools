var crxButton = '<ul id="opsbar-opsbar-appian" class="toolbar-group pluggable-ops"><li class="toolbar-item"><a id="open-modal" data-target=\"#myModal\" data-toggle=\"modal\" class="toolbar-trigger issueaction-workflow-transition"><span class="trigger-label">Create CI Site</span></a></li></ul>';
$(crxButton).insertBefore("#opsbar-opsbar-admin");

var selector = "#stalker > div > div > div > div > div.toolbar-split.toolbar-split-left";

$("body").append("<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">"+
	"<div class=\"modal-dialog\" role=\"document\" style='position:relative; width:100%;'>"+
	  "<div class=\"modal-content\" style=\"width:50%; height:100%; left:25%\">"+
		"<div class=\"modal-body\" style='width:100%; height:100%;'>"+
			""+ 
		"</div>"+
	  "</div>"+
	"</div>"+
"</div>");

var createFrame = function() {
	var frame = document.createElement("iframe");
	frame.id = "appian-frame";
	frame.setAttribute("class", "appian-iframe");
	frame.style = 'width:100%; height:800px; border-width:0px;';
	
	debugger;
	
	$(".modal.fade > div > div > div").append(frame);
	
	var doc = $("iframe.appian-iframe")[0].contentDocument;
	doc.open();
	
	var handleScript = "<script>var except = function() {parent.postMessage('submitOrDismiss', '*'); document.getElementById('appian-action').destroy();}; document.getElementById('appian-action').addEventListener('submit', except);document.getElementById('appian-action').addEventListener('dismiss', except);</script>"
	var doctype = '<!doctype html>';
	
	var content = "<script src='https://daily.appianci.net/suite/tempo/tempo.nocache.js' type='text/javascript'></script>"; 
	content += "<appian-action id='appian-action' processModelUuid='0002db78-87ca-8000-fe86-640000640000'></appian-action>";
	content += handleScript;
	
	var html = doctype + '<html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /></head>\n<body style="height:100%;">\n' + content + '\n</body></html>';
	
	doc.write(html);
	doc.close();
}

var eraseFrame = function() {
	$("iframe.appian-iframe").remove();
}

$(function() {
	$("#open-modal").on('click', createFrame);
	$("#myModal").on("hide.bs.modal", eraseFrame);
	
	// Listening to message 
	window.onmessage = function(event) {
		if (event.data == "submitOrDismiss") {
			$('#myModal').modal('hide');
			eraseFrame();
		}
	};
});