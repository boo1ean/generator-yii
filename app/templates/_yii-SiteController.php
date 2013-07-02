<?php
class SiteController extends CController
{
    public function actionIndex() {
        return $this->render('index');
    }

    public function actionError() {
        return $this->render('error');
    }
}
