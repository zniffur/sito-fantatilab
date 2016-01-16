<?php

$item1 = array(1, "P","-","-","-","-","-","-","-","-","-","-","-");
$item2 = array(2, "P","-","-","-","-","-","-","-","-","-","-","-");
$item3 = array(3, "P","-","-","-","-","-","-","-","-","-","-","-");

$nome1 = "foo";
$nome2 = "bar";
$nome3 = "joe";


$ins1 = array($nome1 => $item1);
//echo json_encode($ins1);
echo "<br/>";
$ins2 = array($nome2 => $item2);
$ins3 = array($nome3 => $item3);

$result = array();

$result[1] = $ins1;
$result[2] = $ins2;
$result[14] = $ins3;

for ($i=1; $i <= 14; $i++) {
    echo json_encode($result[$i]);
    echo "<br/>";    
}

echo json_encode($result["foo"]);


//$result = array_slice($result, 0, 3, true) +
//    $ins3 +
//    array_slice($result, 3, count($result)-3, true);
//
//$result = array_slice($result, 0, 2, true) +
//    $ins2 +
//    array_slice($result, 2, count($result)-2, true);

//array_splice($result, 3, 0, $ins3);
//array_splice($result, 1, 0, $ins1);
//array_splice($result, 2, 0, $ins2);

echo json_encode($result);
echo "<br/>";
//var_dump($result);

//echo $result;

?>