<?php
return CMap::mergeArray(require(dirname(__FILE__) . '/main.php'), array(
  'name'   => 'Application console',
  'import' => array(
    'application.components.console.*'
  ),
));
