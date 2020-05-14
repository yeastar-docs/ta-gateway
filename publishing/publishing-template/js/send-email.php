<?php
	foreach($_POST as $key => $val){
		$post[$key] = $val;
	}
	$GLOBALS['cfg_soft_lang'] ='utf8';
	$cfg_smtp_server="smtp.exmail.qq.com";
	$cfg_smtp_port="25";
	$cfg_smtp_usermail="baobei@yeastar.com";
	$cfg_smtp_password="Langshi@46#3";
	require_once('./mail.class.php');
	$smtp = new smtp($cfg_smtp_server,$cfg_smtp_port,true,$cfg_smtp_usermail,$cfg_smtp_password);
	$smtp->debug = false;
	if(!$smtp->smtp_sockopen($cfg_smtp_server)){
		exit('邮件发送失败,请联系管理员');
	}
	$headers = 'Content-type: text/html; charset=utf-8'."\r\n";
	$email = "carol@yeastar.com";
	$webtitle = "cloud文章反馈内容";
	$title = "cloud文章反馈内容";
	if($post["has_help"] == "yes") {
		$mailbody = "<p>页面链接：".$post["page_url"]."</p><p>这个页面是否有帮助：".$post["has_help"]."</p>";
	} else {
		$mailbody = "<p>页面链接：".$post["page_url"]."</p><p>这个页面是否有帮助：".$post["has_help"]."</p><p>您觉得这篇文档的主要问题是哪些:".$post["some_suggest"]."</p>"."</p><p>邮箱:".$post["user_email"]."</p><p>留言:".$post["user_message"]."</p>";
	}
	$resut = $smtp->sendmail($email,$webtitle, $cfg_smtp_usermail, $title, $mailbody,'HTML');
	exit($resut);
?>