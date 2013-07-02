<?php
$config = dirname(__FILE__) . '/../app/config/main.php';
require(__DIR__ . '/../vendor/autoload.php');

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL', 10);

Yii::createWebApplication($config)->run();
