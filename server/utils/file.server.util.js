'use strict';

const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

exports.getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    for (let globPattern of globPatterns) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    }
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return _.compact(output);
};

exports.getFilesInDir = function (dir, suffix) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  var files = fs.readdirSync(dir);
  if (!suffix) {
    return files;
  }

  var result = [];
  for (let file of files) {
    if (file && file.endsWith(suffix)) {
      result.push(file);
    }
  }

  return result;
};