<?php
// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name'     => 'Yii application',

    'preload' => array(
        'log'
    ),

    // Autoloading model and component classes
    'import' => array(
        'application.models.*'
    ),

    'modules' => array(
        'gii' => array(
            'class'          => 'system.gii.GiiModule',
            'password'       => '12345',
            'ipFilters'      => array('127.0.0.1','::1'),
            'generatorPaths' => array('bootstrap.gii')
        )
    ),

    // Application components
    'components' => array(

        'user' => array(
            'class'          => 'application.components.HWebUser',
            'allowAutoLogin' => true,
            'loginUrl'       => '/user/login'
        ),

        'urlManager' => array(
            'urlFormat'      => 'path',
            'showScriptName' => false,
            'rules'          => array(
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
            )
        ),

        'db' => array(
            'connectionString' => 'mysql:host=localhost;dbname=yii',
            'emulatePrepare'   => true,
            'username'         => 'root',
            'password'         => 'root',
            'charset'          => 'utf8',
            'enableProfiling'  => true,
        ),

        'errorHandler' => array(
            'errorAction' => 'site/error'
        ),

        'log' => array(
            'class'  => 'CLogRouter',
            'routes' => array(
                array(
                    'class'  => 'CFileLogRoute',
                    'levels' => 'error, warning'
                ),
                array(
                    'class' => 'CWebLogRoute'
                )
            )
        )
    )
);
