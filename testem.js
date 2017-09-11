/*jshint node:true*/
/* eslint-env node */
// launch_in_dev is set to an empty array because it prevent the command
// ember test --server from launching a bunch of google chrome windows but you
// con still visit http://localhost:7357/ to take a look at tests
// ATT. @dmuneras
module.exports = {
  framework: 'mocha',
  test_page: 'tests/index.html?hidepassed&coverage',
  disable_watching: true,
  launch_in_ci: [
    'PhantomJS'
  ],
  launch_in_dev: [],
  browser_args: {
    'Chrome': [
      '--headless',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--window-size=1440,900'
    ]
  }
};
