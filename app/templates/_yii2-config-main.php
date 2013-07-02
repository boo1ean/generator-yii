<?php
$params = require(__DIR__ . '/params.php');
return array(
    'id'       => 'bootstrap',
    'basePath' => dirname(__DIR__),
    'preload'  => array('log'),

    'components' => array(
        'cache' => array(
            'class' => 'yii\caching\FileCache'
        ),

        'user' => array(
            'class' => 'yii\web\User',
            'identityClass' => 'app\models\User'
        ),

        'assetManager' => array(
            'bundles' => require(__DIR__ . '/assets.php')
        ),

        'log' => array(
            'class' => 'yii\logging\Router',
            'targets' => array(
                array(
                    'class' => 'yii\logging\FileTarget',
                    'levels' => array('error', 'warning')
                )
            )
        ),

        'urlManager' => array(
            'enablePrettyUrl' => true,

            'rules' => array(
                '/' => 'site/index'
            )
        ),

        'db' => array(
            'class'    => '\yii\db\Connection',
            'dsn'      => 'mysql:host=localhost;dbname=yii2',
            'username' => 'root',
            'password' => 'root',
            'charset'  => 'utf8'
        )
    ),

    'params' => $params
);
