var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')
var shell = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // 得到当前node版本号
    versionRequirement: packageConfig.engines.node // 得到配置的node版本号
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 得到当前npm的版本号
    versionRequirement: packageConfig.engines.npm // 得到配置的npm版本号
  })
}

module.exports = function () {
  var warnings = []
  // 查检node/npm的当前版本号是否小于配置的版本号, 如果是添加犯错误信息对象到warngins中
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 如果包含了错误信息, 说明node/npm版本号偏低, 输出提示信息并结束进程
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
