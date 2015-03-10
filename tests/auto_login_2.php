
<?php 

#$url = "http://www.finanzaonline.com/forum/";
#login("http://www.finanzaonline.com/forum/login.php?do=login", "vb_login_username=pbranigade&vb_login_password=&s=a900ca423cec561e4ba15502ce264454&securitytoken=guest&do=login&vb_login_md5password=3dcb0c4afb4120d9fb724b7586781917&vb_login_md5password_utf=3dcb0c4afb4120d9fb724b7586781917");

$login_url = "http://www.fantagazzetta.com/";
$url = "http://www.fantagazzetta.com/voti-fantagazzetta-serie-A";
$post_data = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUIMjgxMzU3NjdkGAEFSmN0bDAwJEhlYWRlck1hc3RlclBhZ2VLbm9iJFJlZ2lzdHJhemlvbmUxJE9wZW5BdXRoUHJvdmlkZXJzMSRwcm92aWRlcnNMaXN0DxQrAA5kZGRkZGRkFCsAAWQCAWRkZGYC%2F%2F%2F%2F%2Fw9kqs%2Bx9ktCq0IAe8gJ4IiLPJNmVEw%3D&__VIEWSTATEGENERATOR=8D0E13E6&__EVENTVALIDATION=%2FwEdAAcMm7hjVdh5a9Y%2FTwJYDocm5126SdI5cH%2FexPLifNENm2hKE0VpzwjgoRGZQ8MF%2FamKKzao9vFcme%2BNmQ0yf2tWGV58mExs2H6p%2FqKf4qu9Jrz8DPGBlZ4hfV7pAI%2F%2FL%2BL0Txe3QmN96w1lx2aicDsj6KHa9bYh6lS00UHc0aVnUFwbrBY%3D&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxUserName=pbranigade&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxPassword=1234abcd&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24ButtonSubmit=Login&ctl00%24ContentPlaceHolder1%24CercaHome1%24TextBoxSearch=";

login($login_url, $post_data);

echo grab_page($url);


//Upload a blank cookie.txt to the same directory as this file with a CHMOD/Permission to 777
function login($url,$data){
    $fp = fopen("cookie.txt", "w");
    fclose($fp);
    $login = curl_init();
    curl_setopt($login, CURLOPT_COOKIEJAR, "cookie.txt");
    curl_setopt($login, CURLOPT_COOKIEFILE, "cookie.txt");
    curl_setopt($login, CURLOPT_TIMEOUT, 40000);
    curl_setopt($login, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($login, CURLOPT_URL, $url);
    curl_setopt($login, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($login, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($login, CURLOPT_POST, TRUE);
    curl_setopt($login, CURLOPT_POSTFIELDS, $data);
    ob_start();
    return curl_exec ($login);
    ob_end_clean();
    curl_close ($login);
    unset($login);    
}                  

function grab_page($site){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 40);
    curl_setopt($ch, CURLOPT_COOKIEFILE, "cookie.txt");
    curl_setopt($ch, CURLOPT_URL, $site);
    ob_start();
    return curl_exec ($ch);
    ob_end_clean();
    curl_close ($ch);
}

function post_data($site,$data){
    $datapost = curl_init();
	$headers = array("Expect:");
    curl_setopt($datapost, CURLOPT_URL, $site);
	curl_setopt($datapost, CURLOPT_TIMEOUT, 40000);
    curl_setopt($datapost, CURLOPT_HEADER, TRUE);
	curl_setopt($datapost, CURLOPT_HTTPHEADER, $headers); 
    curl_setopt($datapost, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($datapost, CURLOPT_POST, TRUE);
    curl_setopt($datapost, CURLOPT_POSTFIELDS, $data);
	curl_setopt($datapost, CURLOPT_COOKIEFILE, "cookie.txt");
    ob_start();
    return curl_exec ($datapost);
    ob_end_clean();
    curl_close ($datapost);
    unset($datapost);    
}


echo "--ZNIFF--";

?>