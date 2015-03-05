

<?php 

$fp = fopen("cookie.txt", "w");
fclose($fp);

exit(0);


$cookiepath = __DIR__.DIRECTORY_SEPARATOR.'cookieJar.txt';
echo "Saving cookies to: $cookiepath\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://www.google.com");
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; rv:11.0) Gecko/20100101 Firefox/11.0');
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiepath);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiepath);
curl_setopt($ch, CURLOPT_HEADER  ,1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER  ,1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION  ,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$data = curl_exec($ch);

exit(0);

//the basics
$ch = curl_init();
$url = "http://www.fantagazzetta.com/voti-fantagazzetta-serie-A";
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/My Test Browser");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

//enable the POST method
curl_setopt($ch, CURLOPT_POST, 1);

//identify the form values for credentials
// curl_setopt($ch, CURLOPT_POSTFIELDS,'username=admin&password=Admin00x');
//curl_setopt($ch, CURLOPT_POSTFIELDS,'ctl00$HeaderMasterPageElle$LoginMasterKnob$TextBoxUserName=pbranigade&ctl00$HeaderMasterPageElle$LoginMasterKnob$TextBoxPassword=1234abcd');

curl_setopt($ch, CURLOPT_POSTFIELDS,"ctl00%24HeaderMasterPageElle%24LoginMasterKnob%24TextBoxUserName=pbranigade&ctl00%24HeaderMasterPageElle%24LoginMasterKnob%24TextBoxPassword=1234abcd&ctl00%24HeaderMasterPageElle%24LoginMasterKnob%24ButtonSubmit=Login&ctl00%24ContentPlaceHolderSotto%24PulsantiVotiSerieAascx1%24HiddenFieldStagione=");
//set location of cookie jar, the file that will hold
// the cookies for the duration of the process
curl_setopt ($ch, CURLOPT_COOKIEJAR, "cookie.txt");

//run the process to login
$auth = curl_exec($ch);

echo $auth;

# Create a DOM parser object
$dom = new DOMDocument();

# Parse the HTML.
# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
$dom->loadHTML($html);

// //run the process to fetch file #1
// $url = "http://www.example.com/privatefiles/file1.txt";
// curl_setopt($ch, CURLOPT_URL, $url);
// $file1 = curl_exec($ch);

// //run the process to fetch file #2
// $url = "http://www.example.com/privatefiles/file2.txt";
// curl_setopt($ch, CURLOPT_URL, $url);
// $file2 = curl_exec($ch);

// //run the process to fetch file #3
// $url = "http://www.example.com/privatefiles/file3.txt";
// curl_setopt($ch, CURLOPT_URL, $url);
// $file3 = curl_exec($ch);
// terminate curl process

// //free up the system
curl_close($ch);

?>


