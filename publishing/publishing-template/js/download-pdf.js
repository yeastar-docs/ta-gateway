jQuery(document).ready( function() {

	
	
	// 语言判断
	var textVal;
	if(window.location.href.indexOf("/en/") != -1) { //英语
    	textVal = 'Download';
	} else { //中文
    	textVal = '下载';
	}
	//  wh_tile index 界面添加 pdf download 按钮
	var pdfDown = '<span class="download-pdf"> <i class="icon-downloadPdf"></i><a href="#" target="_blank">' + textVal + ' PDF</a></span>';
	jQuery(".wh_main_page .wh_tiles .wh_tile>div>.wh_tile_text>.wh_tile_shortdesc").after(pdfDown);
	
	// topic page 界面添加 pdf download 按钮
	var downPdf = '<div class="download-links"><a class="btn-download" href="#" target="_blank">' + textVal + ' PDF</a></span>';
	jQuery(".wh_topic_content").before(downPdf);
	
 	setPdfName();
	jQuery(".pdf-down").click( function() {
		jQuery(".mask-pdf").slideToggle("fast");
	})

	
	//自动获取 PDF 文件
	function setPdfName() {
        var hrefArr = new Array();
        var pdfArr = new Array();
        var aEle = "";
        var pdfName = "";
		// 获取浏览器语言
	    var lan = window.location.href.toLowerCase().indexOf("/zh-cn/");
	    if (lan != -1) {
	        lan = "-zh-CN";
	    } else {
	        lan = "-en";
	    }
	    // 为不需要pdf的文档，隐藏 PDF download 按钮
	    var pageDocTitle = jQuery(".hidden-print li:nth-child(2) a").length;
	    if(pageDocTitle > 0) {
	    	var releaseNotes = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("releasenotes");
	    	var references = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("references");
	    	var apiIntro = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("apiintroduction");
	    	var apiQuickStart = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("apirequirements");
	    	var apiReferences = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("apiauthentication");
	    	var apiApplications = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("apiapplicationhotel");
	  	if(releaseNotes != -1 || references != -1 || apiIntro != -1 || apiQuickStart != -1 || apiReferences != -1 || apiApplications != -1) {
	    		jQuery(".btn-download").hide();
	    	} else {
	       		hrefArr = jQuery(".hidden-print li:nth-child(2) a").attr("href").split("/");
	    		hrefName = setName(hrefArr);
		    	jQuery(".btn-download").attr("href", hrefName);
	    	}
	    } else {
		    // 首页文档标题
		    var parentEle = jQuery(".wh_tile");
		    for (var a = 0; a < parentEle.length; a++) {
		    	var e = parentEle.eq(a);
		    	if(e.length > 0) {
		    	 // 为不需要pdf的文档，隐藏 PDF download 按钮
		    		var releaseNotes = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("releasenotes");
		    		var references = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("references");
		    		var apiIntro = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("apiintroduction");
		    		var apiQuickStart = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("apirequirements");	
		    		var apiReferences = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("apiauthentication");
		    		var apiApplications = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("apiapplicationhotel");		    		
		    		if(releaseNotes != -1 || references != -1 || apiIntro != -1 || apiQuickStart != -1 || apiReferences != -1 || apiApplications != -1) {
		    			e.find(".download-pdf a").hide();
		    		} else {
			    		hrefArr = e.find(".wh_tile_title .topicref a").attr("href").split("/");
			    		hrefName = setName(hrefArr);
			    		e.find(".download-pdf a").attr("href", hrefName);
		    		}
		    	}
		    }
	    }
	    function setName(hrefArr) {
	        // 设置pdf名称
        	var pdfVal = "";
            for (var i = 0; i < hrefArr.length; i++) {
                var has = hrefArr[i].indexOf("html");
                if (has != -1) {
                    pdfArr = hrefArr[i].split(".")[0].replace(/[_-]/g,"-").split("-");
                    for (var j = 0; j < pdfArr.length; j++) {
                        if (j < pdfArr.length - 1) {
                            pdfVal = pdfVal + pdfArr[j].substring(0, 1).toUpperCase() + pdfArr[j].substring(1) + "-";
                        } else {
                            pdfVal = pdfVal + pdfArr[j].substring(0, 1).toUpperCase() + pdfArr[j].substring(1);
                        }
                    }
                }
            }
	        var pdfValToLower = pdfVal.toLowerCase();
	        var pdfSection = "";
	        var productName = "";
	        if(window.location.href.indexOf("s-series") >= 0 ) {
	        	productName = "s-series-";
	        } else if(window.location.href.indexOf("cloudpbx") >= 0 ) {
	        	productName = "cloudpbx-";
	        } else if(window.location.href.indexOf("k2") >= 0 ) {
	        	productName = "k2-";
	        } else if(window.location.href.indexOf("s1000") >= 0 ) {
	        	productName = "s1000-";
	        }
			else if(window.location.href.indexOf("call-center") >= 0 ) {
	        	productName = "call-center-";
	        }
	        pdfSection = "https://help.yeastar.com/download/docs/"+productName;
	        // 将pdf文件名赋值给a标签
	        pdfName = pdfSection + pdfValToLower + lan + ".pdf";
	        return pdfName;
	    }
	}
})