/**
 * start/stop/restart a specific machine or all machines
 */
const APP_NAME = 'my-app'

const [,, ACTION, FLY_PROCESS_GROUP] = process.argv

const fly = require('flyctl')(APP_NAME)

const machineList = await fly.json('machine list')
const machines = machineList.map(({ id, config }) => ({ id, name: config.env.FLY_PROCESS_GROUP }))

let cmd = `machine ${ACTION}`

if (FLY_PROCESS_GROUP !== undefined) {
  const [{ id }] = machines.filter(machine => machine.name === FLY_PROCESS_GROUP)
  cmd += ` ${id}`
} else {
  const machinesIds = machines.map(({ id }) => id)
  cmd += ` ${machinesIds.join(' ')}`
}

fly(cmd)
