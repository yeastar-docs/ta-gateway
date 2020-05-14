$(document).ready(function() {
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	    window.location.href = "https://help.yeastar.com/en/linkus_client_mobile";
	} else{
		window.location.href = "https://help.yeastar.com/en/linkus_client/topic/faq.html";
	}

})