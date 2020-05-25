'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    snippetSearchPaths: ['app', 'tests'],
    outputPaths: {
      app: {
        css: {
          'app': '/assets/dummy.css'
        }
      }
    },
    postcssOptions: {
      compile: {
        extension: 'scss',
        enabled: true,
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
            options: {
              includePaths: [
                'node_modules'
              ]
            }
          },
          require('tailwindcss')('tests/dummy/app/styles/tailwind.config.js')
        ]
      },
      filter: {
        enabled: false
      }
    }
  });

  return app.toTree();
};
