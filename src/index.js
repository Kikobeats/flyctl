'use strict'

const { styleText } = require('node:util')
const $ = require('tinyspawn')

module.exports = (
  appName,
  { verbose, binaryPath = process.env.FLY_PATH || 'fly' } = {}
) => {
  const print = verbose
    ? args => console.log(`${styleText('green', `$ ${binaryPath} ${args.join(' ')}`)}\n`)
    : () => {}

  const fly = (cmd, spawnOpts) => {
    const args = [...cmd.split(' '), '--app', appName]
    print(args)
    return $(binaryPath, args, spawnOpts)
  }

  fly.stream = cmd => fly(cmd, { stdio: 'inherit' })

  fly.json = cmd =>
    fly(`${cmd} --json`).then(({ stdout }) => JSON.parse(stdout))

  return fly
}
