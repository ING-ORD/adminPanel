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
        $answer = array(
            "group" => "ССА 18-11-1",

            "list_group" => array(),
            "list_teacher" => array(),
            "list_room" => array(),
            "list_lesson" => array()
        );
        $list = array(
            "1"=>"group",
            "2"=>"teacher",
            "3"=>"room",
            "4"=>"lesson"
        );
        foreach ($list as $value){
            $sql_group = "SELECT name FROM ".$value."_name";
            $timetable_group = mysqli_query($link, $sql_group) or die ("ошибка в запросе".mysqli_connect_error($link));
            $rows = mysqli_num_rows($timetable_group);

            for ($i=0; $i < $rows; $i++){
                $row = mysqli_fetch_row($timetable_group);
                $key = "list_".$value;
                $answer[$key][$i] = $row[0];
            }
        }

    }
    // print_r($answer);
    echo json_encode($answer);
?>
