'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var http = require('http');
var fs = require('fs');
var spawn = require('child_process').spawn;

var YiiGenerator = module.exports = function YiiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
    if (!options['skip-install']) {
      this.composerInstall();
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  // Download composer and install composer dependencies
  this.composerInstall = function() {
    var file    = fs.createWriteStream('composer-installer.php');
    var request = http.get('http://getcomposer.org/installer', function(response) {
      response.pipe(file);
      spawn('php', ['composer-installer.php']).on('exit', function() {
        fs.unlink('composer-installer.php');
        spawn('php', ['composer.phar', 'install'], { stdio: 'inherit' });
      });
    });
  }
};

util.inherits(YiiGenerator, yeoman.generators.Base);

YiiGenerator.prototype._yii = function _yii() {
  this.copy('_yii-index.php', 'public/index.php');
  this.copy('_yii-config-main.php', 'app/config/main.php');
  this.copy('_yii-config-console.php', 'app/config/console.php');
  this.copy('_yii-SiteController.php', 'app/controllers/SiteController.php');
  this.copy('_yii-layout.php', 'app/views/layouts/main.php');
  this.copy('_yii-console.php', 'yii');
  this.copy('_yii-phpunit-bootstrap.php', 'tests/bootstrap.php');
}

YiiGenerator.prototype._yii2 = function _yii2() {
  this.copy('_yii2-index.php', 'public/index.php');
  this.copy('_yii2-config-main.php', 'app/config/main.php');
  this.copy('_yii2-config-console.php', 'app/config/console.php');
  this.copy('_yii2-SiteController.php', 'app/controllers/SiteController.php');
  this.copy('_yii2-assets.php', 'app/config/assets.php');
  this.copy('_yii2-layout.php', 'app/views/layouts/main.php');
  this.copy('_yii2-console.php', 'yii');
  this.copy('_yii2-phpunit-bootstrap.php', 'tests/bootstrap.php');
}

YiiGenerator.prototype.app = function app() {
  // Public
  this.mkdir('public');
  this.mkdir('public/assets');
  this.mkdir('public/css');

  // Application
  this.mkdir('app');
  this.mkdir('app/runtime');
  this.mkdir('app/controllers');
  this.mkdir('app/components');
  this.mkdir('app/migrations');
  this.mkdir('app/config');
  this.mkdir('app/models');
  this.mkdir('app/views');
  this.mkdir('app/behaviors');

  // Tests
  this.mkdir('tests');
  this.mkdir('tests/controllers');
  this.mkdir('tests/models');
  this.mkdir('tests/behaviors');
  this.mkdir('tests/components');

  // Tests stuff
  this.copy('_phpunit.xml', 'tests/phpunit.xml');

  // app stuff
  this.copy('_config-params.php', 'app/config/params.php');

  // project stuff
  this.copy('_composer.json', 'composer.json');
  this.copy('_README.md', 'README.md');
  this.copy('_htaccess', 'public/.htaccess');
  this.copy('_views-site-index.php', 'app/views/site/index.php');
  this.copy('_css-site.css', 'public/css/site.css');

  // non-php stuff
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');

  if (this.options.yii2) {
      this._yii2();
  } else {
      this._yii();
  }
};

var message = function(msg) {
  return function() {
    console.log(msg);
  }
}

YiiGenerator.prototype.setWritable = function setWritable() {
  fs.chmod('app/runtime',   '777', message('Successfully changed permissions for app/runtime.'));
  fs.chmod('public/assets', '777', message('Successfully changed permissions for public/assets.'));
  fs.chmod('yii',           '777', message('Successfully changed permissions for yii.'));

  if (this.options.yii2) {

  } else {
      spawn('ln', ['-s', '../vendor/bin/phpunit', 'tests/phpunit'], message('Successfully created link for phpunit in tests/phpunit.'));
  }
}
