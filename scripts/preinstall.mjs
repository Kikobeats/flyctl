import { execSync } from 'child_process'

const binaryPath = () => {
  try {
    return execSync('which flyctl').toString().trim()
  } catch (_) {}
}

if (process.env.FLYCTL_SKIP_CHECK === undefined && !binaryPath()) {
  throw new Error(
    'flyctl needs to be installed. Check https://fly.io/docs/flyctl/install/. You can skip this check passing `FLYCTL_SKIP_CHECK=1`'
  )
}
