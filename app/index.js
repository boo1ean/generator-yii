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

YiiGenerator.prototype.app = function app() {
  this.mkdir('runtime');

  // Public
  this.mkdir('public');
  this.mkdir('public/assets');
  this.mkdir('public/css');

  // Application
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/migrations');
  this.mkdir('app/config');
  this.mkdir('app/models');
  this.mkdir('app/views');
  this.mkdir('app/behaviors');

  // Tests
  this.mkdir('tests');

  this.copy('_package.json',  'package.json');
  this.copy('_composer.json', 'composer.json');
  this.copy('_bower.json',    'bower.json');
};

var message = function(msg) {
    return function() {
        console.log(msg);
    }
}

YiiGenerator.prototype.setWritable = function setWritable() {
    fs.chmod('runtime', '777', message('Successfully changed permissions for runtime.'));
    fs.chmod('public/assets', '777', message('Successfully changed permissions for public/assets.'));
}
