import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const exectAsync = promisify(exec)

function cleanStdout (stdout) {
  return stdout.trim().split('\n').filter(Boolean)
}

export async function getChangedFiles () {
  const { stdout } = await exectAsync('git status --porcelain')
  return cleanStdout(stdout)
    .map(line => line.split(' ').at(-1))
}

export async function getStagedFiles () {
  const { stdout } = await exectAsync('git diff --cached --name-only')
  return cleanStdout(stdout)
}

export async function getCommit ({ commit } = {}) {
  const { stdout } = await exectAsync(`git commit -m ${commit}`)
  return cleanStdout(stdout)
}
