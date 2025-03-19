/**
 * Scale all running machines
 */

const APP_NAME = 'my-app'
const CPU_CORES = 1
const CPU_KIND = 'shared'
const MEMORY_IN_BYTES = 768
const RESTART_POLICY = 'always'

const fly = require('flyctl')(APP_NAME)

const machineList = await fly.json('machine list')
const machines = machineList.map(({ id, config }) => ({ id, zone: config.env.FLY_PROCESS_GROUP }))

for (const { id } of machines) {
  await fly.stream(`machine update ${id} --vm-cpus ${CPU_CORES} --vm-cpu-kind ${CPU_KIND} --vm-memory=${MEMORY_IN_BYTES} --restart ${RESTART_POLICY} --yes`)
}
