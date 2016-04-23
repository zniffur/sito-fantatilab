<?php 

      require_once 'url_to_absolute.php';
      require_once 'auto_login_2.php';
      require_once 'helper.php';

$url = 'http://www.fantagazzetta.com/api/login/utenti';
//Initiate cURL.
$ch = curl_init($url);
//The JSON data.
$jsonData = array(
    'username' => 'pbranigade',
    'password' => '1234abcd'
);
$fp = fopen("cookie.txt", "w");
fclose($fp);
//Encode the array into JSON.
$jsonDataEncoded = json_encode($jsonData);
 
//Tell cURL that we want to send a POST request.
curl_setopt($ch, CURLOPT_POST, 1);
 
//Attach our encoded JSON string to the POST fields.
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
 
//Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_COOKIEJAR, "cookie.txt");
//curl_setopt($ch, CURLOPT_COOKIEFILE, "cookie.txt");

// Send the request
$response = curl_exec($ch);
curl_close($ch);
//echo $response;

//// Check for errors
//if($response === FALSE){
//    die(curl_error($ch));
//}
//
//// Decode the response
//$responseData = json_decode($response, TRUE);
//
//// Print the date from the response
//echo $responseData;
//echo "--ZNIFF--";
//
//
$url = "http://www.fantagazzetta.com/";
$html = grab_page($url);
    echo $html;
    echo "-- by Zniff --";
    exit(0);


?>