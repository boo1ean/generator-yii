<?php
$yiit   = dirname(__FILE__) . '/../vendor/yiisoft/yii/framework/yiit.php';
$config = dirname(__FILE__) . '/../app/config/test.php';

require_once($yiit);

Yii::createWebApplication($config);
