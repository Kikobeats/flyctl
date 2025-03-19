# flyctl

![Last version](https://img.shields.io/github/tag/kikobeats/flyctl.svg?style=flat-square)
[![NPM Status](https://img.shields.io/npm/dm/flyctl.svg?style=flat-square)](https://www.npmjs.org/package/fly)

> A convenient Node.js wrapper to interact with [fly.io](https://fly.io/) CLI.

## Install

```bash
$ npm install flyctl --save
```

## Usage

First, call the library passig the app name of your project:

```js
const fly = require('flyctl')('teslahunt-api')
```

Once initialized, you can interact with any [fly CLI](https://github.com/superfly/flyctl) command via Node.js.

You can run a one-off command:

```js
const { stdout } = await fly('scale show')
console.log(stdout)
```

or pipe directly into your Node.js process using [`fly.stream()`](https://github.com/Kikobeats/flyctl#flystreamcmd):

```js
fly.stream('logs')
```

Additionally, you can use [`fly.json()`](https://github.com/Kikobeats/flyctl#flyjsoncmd) to return a JSON payload of the command.

This is convenient for combining multiple command and create your own commands:

```js
const CPU_CORES = 1
const CPU_KIND = 'shared'
const MEMORY_IN_BYTES = 768
const RESTART_POLICY = 'always'

const machineList = await fly.json('machine list')
const machines = machineList.map(({ id, config }) => ({ id, zone: config.env.FLY_PROCESS_GROUP }))

for (const { id } of machines) {
  await fly(`machine update ${id} --vm-cpus ${CPU_CORES} --vm-cpu-kind ${CPU_KIND} --vm-memory=${MEMORY_IN_BYTES} --restart ${RESTART_POLICY} --yes`)
}
```

See [examples](https://github.com/Kikobeats/flyctl/tree/master/examples).

## API

### constructor(appName, [options])

#### appName

*Required*<br>
Type: `string`

The name of your [fly.io](https://fly.io/) application.

#### options

##### verbose

Type: `boolean`<br>
Default: `true`

Print the raw fly command every time it's executed.

### fly(cmd, spawnOpts)

It runs the command provided and buffer the output.

It accepts a second argument to be passed to [child_process.spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options).

### fly.stream(cmd)

It runs the command provided, streaming the output to the parent process.

### fly.json(cmd)

It runs the command provided, parsing the stdout into a JSON.

## License

**flyctl** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/kikobeats/fly/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/kikobeats/fly/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/kikobeats) · Twitter [@kikobeats](https://twitter.com/kikobeats)
