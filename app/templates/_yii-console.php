#!/usr/bin/env php
<?php
/**
 * Yii command line script for Unix/Linux.
 * This is the bootstrap script for running yiic on Unix/Linux.
 */

// Path to console config
$config = dirname(__FILE__) . '/app/config/console.php';

// Run console application
require_once(dirname(__FILE__) . '/vendor/yiisoft/yii/framework/yiic.php');
