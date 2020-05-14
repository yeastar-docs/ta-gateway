jQuery(document).ready( function() {

    // wh_tile index 界面添加image
	var imgHtml = '<div class="wh_tile_image"></div>';
	jQuery(".wh_main_page .wh_tiles .wh_tile>div>.wh_tile_text").before(imgHtml);
	
	// 显示暗黑模式（安卓端）
	var pageUrl = window.location.search.substring(1);
	var isDark;
	if(pageUrl) {
	    if(pageUrl.indexOf("dark") != -1 && pageUrl.indexOf("android") != -1) {
	        jQuery("body").addClass("dark-mode");
	        jQuery("a").each(function() {
	        	var aHrefVal = jQuery(this).attr("href")+"?mode=dark&system=android";;
	        	jQuery(this).attr("href",aHrefVal);
	        })
	    }
	}
 	hideAppCenter();
	
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
	
	// api版本号选择
	jQuery("#product-switcher__button").click( function() {
		jQuery("#desktop-nav-product-switcher__menu").slideToggle();
		jQuery("#product-switcher-button__caret").toggleClass("active");
	})
	// 反馈模板
	var feedback = {};
	feedback['some_suggest'] = "";
	feedback['user_email'] = "";
	var emailreg1=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
	emailreg2=reg1=/[#;,\[\]=&\"\'\\<>`$\ ]/
	jQuery(".feedback input[type='radio']").change(function() {
		feedback['has_help'] = jQuery(".feedback input[type='radio']:checked").val();
		if(feedback['has_help'] == "no") {
			jQuery(".help-checkbox,.submit-feedback").slideDown();
			jQuery(".submit-feedback").removeClass("submit-feedback-disabled");
		} else if(feedback['has_help'] == "yes") {
			jQuery(".submit-feedback").slideDown();
			jQuery(".help-checkbox").slideUp();
			jQuery(".submit-feedback").removeClass("submit-feedback-disabled");
		}
	})
	jQuery(".feedback input[type='checkbox']").change(function() {
		jQuery(jQuery(".feedback input[type='checkbox']"));
		checkVal = jQuery(".feedback input[type='checkbox']:checked").val();
		checkLen = jQuery(".feedback input[type='checkbox']:checked").length;
		if(checkLen) {
			if(feedback['some_suggest']) {
				feedback['some_suggest'] += checkVal;
			} else {
				feedback['some_suggest'] = checkVal;
			}
		} else {
			feedback['some_suggest']=" ";
		}
	})
	jQuery(".feedback input[name='email']").blur( function() {
		feedback['user_email'] = jQuery(".feedback input[name='email']").val();
		if(feedback['user_email']) {
			if(emailreg2.test(feedback['user_email'])||!emailreg1.test(feedback['user_email'])) {
				jQuery(".submit-success").text("邮箱格式错误");
				jQuery(".submit-success").slideDown();
				jQuery(".submit-success").css("color","red");
				jQuery(".submit-feedback").slideUp();
			}
		} else {
			jQuery(".submit-feedback").slideDown();
		}
	})
	jQuery(".submit-feedback").click( function() {
		feedback['user_message'] = jQuery(".feedback textarea[name='textarea']").val();
		feedback['page_url'] = window.location.href;
		if(feedback['has_help'] == "yes" || (feedback['has_help'] == "no" && (feedback['some_suggest'] || feedback['user_email'] || feedback['user_message']))) {
			jQuery.ajax({
				url: "../oxygen-webhelp/template/js/send-email.php",
                type: "post",
				data: feedback,
				success:function(msg) {
					try {
						var data = eval('('+msg+')');
						if(data) {
							jQuery(".submit-success").text("提交成功，谢谢您的反馈");
							jQuery(".submit-success").css("color","green");
							jQuery(".submit-success").slideDown();
							setTimeout( function() {
								window.location.reload();
							},2000)
						}
					} catch(e) {
						jQuery(".submit-success").text("失败");
						jQuery(".submit-success").css("color","red");
						jQuery(".submit-success").slideDown();
					}
				},
				error:function() {
					jQuery(".submit-success").text("失败");
					jQuery(".submit-success").css("color","red");
					jQuery(".submit-success").slideDown();
				}
			})
		} else {
			jQuery(".submit-success").text("请至少填写一项");
			jQuery(".submit-success").slideDown();
			jQuery(".submit-success").css("color","red");
		}
	})
})