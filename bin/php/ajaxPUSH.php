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
  print_r($_POST);
  if ($_POST["who"] != "all"){
      if ($_POST["is_del"] != "false") {
          $sql = "DELETE FROM ".$_POST["who"]."_name WHERE name = '". $_POST["what"]."';";
      }else{
          $sql = "INSERT INTO ".$_POST["who"]."_name VALUES (NULL, '".$_POST["what"]."');";
      }
  }
  print_r($sql);
  $timetable = mysqli_query($link, $sql) or die ("ошибка с запросом ".mysqli_connect_error($link));
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
