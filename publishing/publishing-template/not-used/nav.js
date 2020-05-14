jQuery(document).ready( function() {
	jQuery(".nav a").eq(0).addClass("li-click");
	jQuery(".nav a").each( function() {
		jQuery(this).click( function() {
			jQuery(this).addClass("li-click").siblings(".nav a").removeClass("li-click");
		})
	})
})