jQuery(document).ready( function() {
	// wh_tile index 界面添加image
	var imgHtml = '<div class="wh_tile_image"></div>';
	if(imgHtml) {
		jQuery(".wh_main_page .wh_tiles .wh_tile>div>.wh_tile_text").before(imgHtml);
	}
	
	// wh_tile index 界面添加 pdf download 按钮
    var imgHtml = '<span class="download-pdf"> <i class="icon-downloadPdf"></i><a href="#" target="_blank">PDF 下载</a></span>';
	if(imgHtml) {
		jQuery(".wh_main_page .wh_tiles .wh_tile>div>.wh_tile_text>.wh_tile_shortdesc").after(imgHtml);
	}
	
	// topic page 界面添加 pdf download 按钮
	var imgHtml = '<div class="download-links"><a class="btn-download" href="#" target="_blank">Download PDF</a></div>';
	if(imgHtml) {
		jQuery(" wh_topic_content body ").before(imgHtml);
	}
	
})