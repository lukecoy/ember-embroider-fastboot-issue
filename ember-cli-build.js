'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    splitAtRoutes: [
      'foo',
      'bar'
    ],

    packageRules: [{
      // Taken from:
      // https://github.com/embroider-build/embroider/blob/30ace3a50db92e20f17e0a6c0dcd3a1299fd940c/packages/compat/src/addon-dependency-rules/ember-power-select.ts
      package: 'ember-power-select',
      addonModules: {
          './components/power-select.js': {
              dependsOnComponents: [
                  '{{power-select/before-options}}',
                  '{{power-select/options}}',
                  '{{power-select/power-select-group}}',
                  '{{power-select/trigger}}',
                  '{{power-select/search-message}}',
                  '{{power-select/placeholder}}',
              ],
          },
          './components/power-select-multiple.js': {
              dependsOnComponents: ['{{power-select-multiple/trigger}}'],
          },
      },
      components: {
          '{{power-select}}': {
              layout: {
                  addonPath: 'templates/components/power-select.hbs',
              },
              acceptsComponentArguments: [
                  'afterOptionsComponent',
                  'beforeOptionsComponent',
                  'optionsComponent',
                  'placeholderComponent',
                  'searchMessageComponent',
                  'selectedItemComponent',
                  'triggerComponent',
              ],
          },
          '{{power-select-multiple}}': {
              layout: {
                  addonPath: 'templates/components/power-select-multiple.hbs',
              },
              acceptsComponentArguments: [
                  'afterOptionsComponent',
                  'beforeOptionsComponent',
                  'groupComponent',
                  'optionsComponent',
                  'placeholderComponent',
                  'searchMessageComponent',
                  'selectedItemComponent',
                  'triggerComponent',
              ],
          },
          '{{power-select/trigger}}': {
              layout: {
                  addonPath: 'templates/components/power-select/trigger.hbs',
              },
              acceptsComponentArguments: ['selectedItemComponent', 'placeholderComponent'],
          },
          '{{power-select/options}}': {
              layout: {
                  addonPath: 'templates/components/power-select/options.hbs',
              },
              acceptsComponentArguments: ['groupComponent', 'optionsComponent'],
          },
          '{{power-select-multiple/trigger}}': {
              layout: {
                  addonPath: 'templates/components/power-select-multiple/trigger.hbs',
              },
              acceptsComponentArguments: ['selectedItemComponent'],
          },
        },
      }]
  });
};
