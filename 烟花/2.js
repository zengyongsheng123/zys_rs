<?php
// 初始化计数器
$counterFile = 'counter.txt';
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, 0); // 如果文件不存在，则创建一个并设置计数为0
}

// 读取并增加计数器
$counter = (int)file_get_contents($counterFile);
$counter++;
file_put_contents($counterFile, $counter);

// 显示计数器
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>新年快乐</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">
    <link rel="shortcut icon" type="image/png"
          href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/firework-burst-icon-v2.png">
    <link rel="icon" type="image/png"
          href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/firework-burst-icon-v2.png">
    <link rel="apple-touch-icon-precomposed"
          href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/firework-burst-icon-v2.png">
    <meta name="msapplication-TileColor" content="#000000">
    <meta name="msapplication-TileImage"
          content="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/firework-burst-icon-v2.png">
    <link href="https://9.waaf.top/2/css/css.css" rel="stylesheet">
    <link rel="stylesheet" href="https://9.waaf.top/2/css/reset.min.css">
    <link rel="stylesheet" href="https://9.waaf.top/2/css/style.css">
    <!--<script src="https://9.waaf.top/2/js/jquery.min.js" type="text/javascript"></script>-->

    <style type="text/css" media="all">
        .text-cursor {
            display: inline-block;
            width: 10px;
            height: 20px;

            animation: cursor-blink 1s steps(2, start) infinite;
        }

        @keyframes cursor-blink {
            to {
                visibility: hidden;
            }
        }
    </style>

    <script>

        var shouci = true;
        console.log(shouci);

        function bodyPlayMusic() {
            if (shouci) {
                shouci = false;
                audio.play();
                console.log(shouci);
            }
        };

    </script>

</head>
<!-- onclick="bodyPlayMusic()" -->
<body>
<!-- 倒计时显示 -->
<div id="countdown" style="font-size: 24px; color: #fff; text-align: center; margin-top: 20px;">
    <!-- 实时倒计时会显示在这里 -->
</div>
<!-- clickMusic() -->
<div id="gg" style="display: none; ">
</div>

<script src="https://9.waaf.top/2/js/game2.js"></script>


<div class="type_words"><p id="contents1" style="display: none;"><span class="text-cursor cur-end">❤️</span></p></div>