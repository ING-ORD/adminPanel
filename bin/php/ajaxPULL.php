<?php
    // echo json_encode(array(
    //     "group" => "ССА 18-11-0"
    // ));
    $dbHost = 'localhost';
  	$dbUser = 'root';
  	$dbPass = '';
  	$dbName = 'project';

  	$link = mysqli_connect($dbHost,$dbUser,$dbPass,$dbName) or die ("ошибка".mysqli_connect_error($link));

    if ($_POST["who"] != "all")
    {
            $sql = "SELECT ".$_POST["who"]."_name.name FROM ".$_POST["who"]."_name";
    }

  	$timetable = mysqli_query($link, $sql) or die ("ошибка в запросе".mysqli_connect_error($link));
  	$rows = mysqli_num_rows($timetable);
    $answer = array();
    // echo $rows;
    for ($i=0; $i < $rows; $i++){
        $row = mysqli_fetch_row($timetable);
        $answer[strval($i)] = $row[0];
    }
    echo json_encode($answer);
?>
