<?php






    $dbHost = 'localhost';
  	$dbUser = 'root';
  	$dbPass = '';
  	$dbName = 'project';

  	$link = mysqli_connect($dbHost,$dbUser,$dbPass,$dbName) or die ("ошибка".mysqli_connect_error($link));

    if ($_POST["who"] != "all"){

        $sql = "SELECT * FROM ".$_POST["who"]."_name";

      	$timetable = mysqli_query($link, $sql) or die ("ошибка в запросе".mysqli_connect_error($link));
      	$rows = mysqli_num_rows($timetable);
        $answer = array();
        $answer[0] = $_POST["who"];
        for ($i=1; $i <= $rows; $i++){
            $row = mysqli_fetch_row($timetable);
            $answer[$i] = $row;
        }
    }else if ($_POST["who"] == "all"){
        $sql = "SELECT name FROM group_name";
        $timetable = mysqli_query($link, $sql) or die ("ошибка в запросе".mysqli_connect_error($link));
        $rows = mysqli_num_rows($timetable);
        $answer = array(
            "group" => "ССА 18-11-1",

            "listGroup" => array()
        );
        for ($i=0; $i <= $rows; $i++){
            $row = mysqli_fetch_row($timetable);
            $answer["listGroup"][$i] = $row[0];
        }
    }
    // print_r($answer);
    echo json_encode($answer);
?>
