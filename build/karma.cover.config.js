/**
 * Created by FDD on 2017/11/6.
 * @desc 代码覆盖率测试
 */

const base = require('./karma.base.config.js')
module.exports = function (config) {
  const options = Object.assign(base, {
    browsers: ['Chrome'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary', subdir: '.'},
      ]
    },
    singleRun: true
  })
  config.set(options)
}
