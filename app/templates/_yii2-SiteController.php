<?php namespace app\controllers;

use Yii;
use yii\web\Controller;

class SiteController extends Controller
{
    public function actionIndex() {
        $this->render('index');
    }
}
