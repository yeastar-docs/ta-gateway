jQuery(document).ready( function() {
 	hideAppCenter();
 	setPdfName();
 	// download pdf
	jQuery(".pdf-down").click( function() {
		jQuery(".mask-pdf").slideToggle("fast");
	})
 	// switch language
	jQuery(".language").click(function(){
		jQuery(".mask-content").slideToggle("fast");
	})
	jQuery(".lan-select li").each(function() {
		jQuery(this).click( function() {
			liText = jQuery(this).text();
			jQuery(".language span").text(liText);
			searchVal = window.location.href.search("/en/");
			href = window.location.href;
			if(searchVal >= 0) {
				var urlVal = href.replace('/en/','/zh-cn/');
				window.location.href = urlVal;
			} else {
				var urlVal = href.replace('/zh-cn/','/en/');
				window.location.href = urlVal;
			}
		})
	})
	
	jQuery(".lang-click").click(function() {
		jQuery(".show-footer-lan").fadeToggle();
	})

	jQuery("#switch-menu span").click(function() {
		jQuery("#switch-menu span").removeClass("click-active");
		jQuery(this).addClass("click-active");
		jQuery(this).siblings().removeClass("click-active");
		// thisText = jQuery(this).text().toLowerCase().search("app");
		thisText = jQuery(this).attr("content").toLowerCase().search("app");
		var whTitle = jQuery(".wh_content_flex_container .wh_tiles .wh_tile");
		var titleLen = whTitle.length;
		var appActive = jQuery(this).hasClass("click-active");
		for (var i = 0; i < titleLen; i++) {
			var idHas = whTitle.eq(i).attr("data-id");
			var dataId = "";
			if(idHas) {
				dataId = whTitle.eq(i).attr("data-id").search("app");
			} else {
				dataId = -1;
			}
			if(appActive && (thisText >= 0) ) {
				if((dataId >= 0) && (thisText >= 0)) {
					whTitle.eq(i).show();
				} else {
					whTitle.eq(i).hide();
				}
			}
			else {
				if((dataId >= 0) && (thisText < 0)) {
					whTitle.eq(i).hide();
				} else {
					whTitle.eq(i).show();
				}
			}
		}
	})

	function hideAppCenter() {
		var whTitle = jQuery(".wh_content_flex_container .wh_tiles .wh_tile");
		var titleLen = whTitle.length;
		for (var i = 0; i < titleLen; i++) {
			var idHas = whTitle.eq(i).attr("data-id");
			var dataId = "";
			if(idHas) {
				dataId = whTitle.eq(i).attr("data-id").search("app");
			} else {
				dataId = -1;
			}
			if(dataId >= 0) {
				whTitle.eq(i).hide();
			}
		}
	}

	//自动获取 PDF 文件
	function setPdfName() {
        var hrefArr = new Array();
        var pdfArr = new Array();
        var aEle = "";
        var pdfName = "";
		// 获取浏览器语言
	    var lan = window.location.href.indexOf("zh-cn");
	    if (lan != -1) {
	        lan = "-zh-CN";
	    } else {
	        lan = "-en";
	    }
	    // 获取二级菜单名称
	    var pageDocTitle = jQuery(".hidden-print li:nth-child(2) a").length;
	    if(pageDocTitle > 0) {
	    	var releaseNotes = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("releasenotes");
	    	var references = jQuery(".hidden-print li:nth-child(2) a").attr("href").replace(/[-]/g,"").indexOf("references");
	    	if(releaseNotes != -1 || references != -1) {
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
		    		var releaseNotes = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("releasenotes");
		    		var references = e.find(".wh_tile_title .topicref a").attr("href").replace(/[-]/g,"").indexOf("references");
		    		if(releaseNotes != -1 || references != -1) {
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

	// api版本号选择
	jQuery("#product-switcher__button").click( function() {
		jQuery("#desktop-nav-product-switcher__menu").slideToggle();
		jQuery("#product-switcher-button__caret").toggleClass("active");
	})
})