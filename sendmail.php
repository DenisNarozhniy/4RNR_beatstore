<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;

  require 'PHPMailer-6.5.0/src/Exception.php';
  require 'PHPMailer-6.5.0/src/PHPMailer.php';
  require 'PHPMailer-6.5.0/src/SMTP.php';

  $mail = new PHPMailer(true);
  $mail->IsSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('PHPMailer-6.5.0/languge/');
  $mail->IsHTML(true);

  $mail->Host='smtp.gmail.com';
  $mail->SMTPAuth=true;
  // $mail->Username='contact.test.4me@gmail.com';
  // $mail->Password='huki$820_1';
  $mail->Username='contact.test.4me@gmail.com';
  $mail->Password='huki$820_1';
  $mail->SMTPSecure='ssl';
  $mail->Port=465;

  $mail->setFrom('contact.test.4me@gmail.com');
  $mail->addAddress('info@4rnrbeats.com');

  // $name -> $_POST['name'];
  // $emailadrres -> $_POST['email'];
  // $message -> $_POST['message'];


  $mail->Subject =$_POST['subject'];
  $mail->Body = 'From: '.$_POST['name'].'<br>Email: '.$_POST['email'].'<br>Message: '.$_POST['message'];


  // if(trim(!empty($_POST['name']))){
  //   $mail->Body='Name:'.$_POST['name'];
  // }
  // if(trim(!empty($_POST['email']))){
  //   $mail->Body='Email:'.$_POST['email'];
  // }
  // if(trim(!empty($_POST['message']))){
  //   $mail->Body='Message:'.$_POST['message'];
  // }

  if(!$mail->send()) {
    $message = 'Error';
  } else {
    $message = 'Message was sent!';
  }

  $responce = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($responce);
?>