/**
 * Retrieve logs from a specific machine or all machines
 */

const APP_NAME = 'my-app'

const [,, FLY_PROCESS_GROUP] = process.argv

const fly = require('flyctl')(APP_NAME)

let cmd = 'logs'

if (FLY_PROCESS_GROUP !== undefined) {
  const machineList = await fly.json('machine list')
  const machines = machineList.map(({ id, config }) => ({ id, name: config.env.FLY_PROCESS_GROUP }))
  const [{ id }] = machines.filter(machine => machine.name === FLY_PROCESS_GROUP)
  cmd += ` -i ${id}`
}

await fly.stream(cmd)
