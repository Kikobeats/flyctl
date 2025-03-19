'use strict'

const $ = require('tinyspawn')
const { green } = require('util').inspect.colors

module.exports = (appName, { verbose } = {}) => {
  const print = verbose
    ? args =>
      console.log(`\x1b[${green[0]}m$ fly ${args.join(' ')}\x1b[${green[1]}m\n`)
    : () => {}

  const fly = (cmd, spawnOpts) => {
    const args = [...cmd.split(' '), '--app', appName]
    print(args)
    return $('fly', args, spawnOpts)
  }

  fly.stream = cmd => fly(cmd, { stdio: 'inherit' })

  fly.json = cmd =>
    fly(`${cmd} --json`).then(({ stdout }) => JSON.parse(stdout))

  return fly
}
