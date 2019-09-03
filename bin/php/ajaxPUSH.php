<?php

  $dbHost = 'localhost';
  $dbUser = 'root';
  $dbPass = '';
  $dbName = 'project';

  $link = mysqli_connect($dbHost,$dbUser,$dbPass,$dbName) or die ("ошибка с подключением".mysqli_connect_error($link));
  ///(id,group,day,lesson_id,subgroup,lesson,teacher,room);
  // $is_who = {
  //     "teacher" => "teacher_name",
  //     "group" => "group_name",
  //     "lesson" => "lesson_name",
  //     "room" => "room_name",
  //     "all" => "timetable"
  // };
  // $who = $is_who[ $_POST["who"] ];
//   print_r($_POST);
  //Здесь будет определение общий это запрос или нет
  // А еще точнее это запрос от основной стр или нет
  // PRESS F
  if ($_POST["who"] != "all"){
        //при удалении надо добавить логику удаление из всех мест данных связанных с удаляемыми, 
        // иначе получится что элемента уже не существует а данные о нем хранятся в другом месте и тем самы вызовут ошибки.
        if ($_POST["is_del"] == "false") {
            // $first_sql = "SELECT * FROM ".$_POST["who"]."_name WHERE name = '". $_POST["what"]."';";
            // $first_timetable = mysqli_query($link, $first_sql) or die ("ошибка с запросом first_sql ".mysqli_connect_error($link));
            // $id = $_POST["id"];

            // $delete_sql = "DELETE FROM `".$_POST["who"]."` WHERE id = '".$id."' LIMIT 1;";
            // $timetable = mysqli_query($link, $delete_sql) or die ("ошибка с запросом delete_sql ".mysqli_connect_error($link));

            // $select_sql = "SELECT * FROM ".$_POST["who"].";";
            // $select_timetable = mysqli_query($link, $select_sql) or die ("ошибка с запросом select_sql ".mysqli_connect_error($link));
            // $rows = mysqli_num_rows($select_timetable);
            // for ($i = 1;$i<=$rows;$i++){
            //     $row = mysqli_fetch_row($select_timetable);

            //     $delete_sql = "DELETE FROM `".$_POST["who"]."` WHERE name = '".$row[1]."' LIMIT 1;";
            //     $timetable = mysqli_query($link, $delete_sql) or die ("ошибка с запросом delete_sql ".mysqli_connect_error($link));

            $insert_sql = "INSERT INTO `".$_POST["who"]."`(name) VALUES ('".$_POST["what"]."');";
            $insert_timetable = mysqli_query($link, $insert_sql) or die ("ошибка с запросом insert_sql ".mysqli_connect_error($link));
            // }
        }else{
            $id = $_POST["id"];
            // if ($id == ""){

            //     $defaul_sql = "SELECT * FROM `".$_POST["who"]."`;";
            //     $defaul_timetable = mysqli_query($link, $defaul_sql) or die ("ошибка с запросом defaul_sql ".mysqli_connect_error($link));
            //     $id = mysqli_num_rows($defaul_timetable)+1;
            // }

            $delete_sql = "DELETE FROM `".$_POST["who"]."` WHERE id = '". $id."' LIMIT 1;";
            $delete_timetable = mysqli_query($link, $delete_sql) or die ("ошибка с запросом delete_sql 55 ".mysqli_connect_error($link));

            // $insert_sql = "INSERT INTO `".$_POST["who"]."`(name) VALUES ('".$_POST["what"]."');";
            // $insert_timetable = mysqli_query($link, $insert_sql) or die ("ошибка с запросом insert_sql".mysqli_connect_error($link));
        }
  }else{
    $data = $_POST["data"];
    if ($_POST["is_del"] != "false"){
        $group_sql = "SELECT id FROM `group` WHERE name = '".$data['group']."'";
        $teacher_sql = "SELECT id FROM `teacher` WHERE name = '".$data['teacher']."' ";
        $week_sql = "SELECT id FROM `week` WHERE name = '".$data['week']."' ";
        $lesson_sql = "SELECT id FROM `lesson` WHERE name = '".$data['lesson']."' ";
        $room_sql = "SELECT id FROM `room` WHERE name = '".$data['room']."' ";

        $sql = "DELETE FROM timetable WHERE timetable.numlesson = '".$data['numlesson']."' AND timetable.subgroup = '".$data['subgroup']."' AND timetable.week = (".$week_sql.") AND timetable.group = (".$group_sql.") AND timetable.teacher = (".$teacher_sql.") AND timetable.room = (".$room_sql.") AND timetable.lesson = (".$lesson_sql .");";
        $request_sql = mysqli_query($link, $sql) or die ("ошибка с запросом insert_sql 64".mysqli_connect_error($link));

    } else {
        // $sqlINTO = "INSERT INTO timetable (";
        // $sqlVALUES = ") VALUES (";
        // $sqlEnd = ");";

        // $keys = "";
        // $values = "";
        // foreach ($data as $key => $value){
        //     $keys .= "'".$key."', ";
        //     $values .= "(SELECT )";
        // }
        // var_dump($data['group']);
        $group_sql = "SELECT id FROM `group` WHERE name = '".$data['group']."'";
        $teacher_sql = "SELECT id FROM `teacher` WHERE name = '".$data['teacher']."' ";
        $week_sql = "SELECT id FROM `week` WHERE name = '".$data['week']."' ";
        $lesson_sql = "SELECT id FROM `lesson` WHERE name = '".$data['lesson']."' ";
        $room_sql = "SELECT id FROM `room` WHERE name = '".$data['room']."' ";

        $sql = "INSERT INTO timetable (`group`, `week`, `numlesson`, `subgroup`, `lesson`, `teacher`, `room`) VALUES ( (".$group_sql."), (".$week_sql."), ".$data['numlesson'].", ".$data['subgroup'].", (".$lesson_sql."), (".$teacher_sql."), (".$room_sql.") ) ;";
        $insert_sql = mysqli_query($link, $sql) or die ("ошибка с запросом insert_sql ".mysqli_connect_error($link));
    }
  }
  // $timetable = mysqli_query($link, $sql) or die ("ошибка с запросом ".mysqli_connect_error($link));
  // }else {
  //     if ($_POST["is_del"] == true) {
  //         $sql = "DELETE FROM `timetable` WHERE `name` = ". $_POST["what"];
  //     }else{
  //         $sql = "INSERT INTO ".$_POST["who"]."_name VALUES (NULL, '.$_POST["what"].');";
  //     }
  // }
  // $sql__group_name = "SELECT group_name.group_name FROM group_name";
  // $timetable__group_name = mysqli_query($link, $sql__group_name) or die ("ошибка с запросом к списку группы ".mysqli_connect_error($link));
  // $rows__group_name = mysqli_num_rows($timetable__group_name);
  // for ($i=0; $i < $rows__group_name; $i++){
  //     $row__group_name = mysqli_fetch_row($timetable__group_name);
  //     // print_r($row__group_name);
  //     // echo $row__group_name[$i]."\n";
  //     $group_nameArr[] = $row__group_name[0];
  // }
  // print_r($group_nameArr);
  // print_r($row__group_name);
  // print_r($rows__group_name);

  // $bd = Array("ss","sss1");
  // if (in_array($_POST["group"], $group_nameArr)){
  //   $sql = 'INSERT INTO timetable VALUES (NULL, '. array_search($_POST["group"],$group_nameArr) .',1,1,1,1,1,1);';
  //   $timetable = mysqli_query($link, $sql) or die ("ошибка с запросом ".mysqli_connect_error($link));
  // }
  // $sql_test = "SELECT * FROM timetable";
  //
  // $timetable_test =  mysqli_query($link, $sql_test) or die ("ошибка с запросом ".mysqli_connect_error($link));
  // // echo mysqli_num_rows($timetable_test) ;
  // $row = mysqli_fetch_row($timetable_test);
  // print_r($row) ;


 ?>
