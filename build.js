const fs = require('fs-extra');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const FileUtil = require('./server/utils/file.server.util');

const ObfuscateOptions = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: false,
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
};

const obfuscateFile = function(originalFilePath, destinationFilePath) {
  fs.readFile(originalFilePath, 'UTF-8', function(err, data) {
    if (err) {
      throw err;
    }

    // Obfuscate content of the JS file
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data, ObfuscateOptions);

    fs.outputFile(destinationFilePath, obfuscationResult.getObfuscatedCode(), function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

const serverFiles = FileUtil.getGlobbedPaths('./server/**/*.js');
fs.emptyDirSync('./dist/');
for (let file of serverFiles) {
  console.log('Obfuscating file: ' + file);
  obfuscateFile(file, file.replace('./server/', './dist/'));
}
