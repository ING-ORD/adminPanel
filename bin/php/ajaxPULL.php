<?php

    $dbHost = 'localhost';
  	$dbUser = 'root';
  	$dbPass = '';
  	$dbName = 'project';

  	$link = mysqli_connect($dbHost,$dbUser,$dbPass,$dbName) or die ("ошибка ".mysqli_connect_error($link));

    if ($_POST["who"] != "all"){

        $sql = "SELECT * FROM `".$_POST["who"]."`;";

      	$timetable = mysqli_query($link, $sql) or die ("ошибка в запросе sub ".mysqli_connect_error($link));
      	$rows = mysqli_num_rows($timetable);
        $answer = array();
        $answer[0] = $_POST["who"];
        for ($i=1; $i <= $rows; $i++){
            $row = mysqli_fetch_row($timetable);
            $answer[$i] = $row;
        }
    }else if ($_POST["who"] == "all"){
        $answer = array(
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
            $sql_group = "SELECT name FROM `".$value."`;";
            $timetable_group = mysqli_query($link, $sql_group) or die ("ошибка в запросе all ".mysqli_connect_error($link));
            $rows = mysqli_num_rows($timetable_group);

            for ($i=0; $i < $rows; $i++){
                $row = mysqli_fetch_row($timetable_group);
                $key = "list_".$value;
                $answer[$key][$i] = $row[0];
            }
        }
        
        $sql = "SELECT `group`.`name` as `group`, `week`.`name` as `week`, `timetable`.`numlesson`, `timetable`.`subgroup`, `lesson`.`name` as `lesson`, `teacher`.`name` as `teacher`, `room`.`name` as `room` FROM `timetable`, `week`,`teacher`,`room`,`lesson`,`group`  WHERE `timetable`.`group` = `group`.`id` AND `timetable`.`week` = `week`.`id` AND `timetable`.`teacher` = `teacher`.`id` AND `timetable`.`lesson` = `lesson`.`id` AND `timetable`.`room` = `room`.`id` ORDER BY `week`,`numlesson`";
        $timetable = mysqli_query($link, $sql) or die ("ошибка в запросе all 50 ".mysqli_connect_error($link));
        $rows = mysqli_num_rows($timetable);
        
        $column_sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='project' AND `TABLE_NAME`='timetable';";
        $column_req = mysqli_query($link, $column_sql) or die ("Не могу инициализировать названия столбцов ".mysqli_connect_error($link));
        $column = [];
        while ($col = mysqli_fetch_row($column_req)){
            array_push($column, $col[0]) ;
        }
        // $column = mysqli_fetch_row($column_req);
        // print_r($column);

        for ($i=0; $i < $rows; $i++){
            $row = mysqli_fetch_row($timetable);
            for ($j = 0; $j < count($row); $j++){

                $answer["data"][$i][ $column[$j+1] ] = $row[$j];
            }
        } 

    }
    // print_r($answer);
    echo json_encode($answer);
?>
