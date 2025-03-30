'use strict'

const { styleText } = require('node:util')
const $ = require('tinyspawn')

const FLY_PATH = process.env.FLY_PATH || 'fly'

module.exports = (appName, { verbose } = {}) => {
  const print = verbose
    ? args => console.log(`${styleText('green', `$ fly ${args.join(' ')}`)}\n`)
    : () => {}

  const fly = (cmd, spawnOpts) => {
    const args = [...cmd.split(' '), '--app', appName]
    print(args)
    return $(FLY_PATH, args, spawnOpts)
  }

  fly.stream = cmd => fly(cmd, { stdio: 'inherit' })

  fly.json = cmd =>
    fly(`${cmd} --json`).then(({ stdout }) => JSON.parse(stdout))

  return fly
}
