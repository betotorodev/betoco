import { exec } from "node:child_process"
import { promisify } from "node:util"

const exectAsync = promisify(exec)

function cleanStdout(stdout) {
  return stdout.trim().split('\n').filter(Boolean)
}

export async function getChangedFiles() {
  const { stdout } = await exectAsync('git status --porcelain')
  return cleanStdout(stdout)
    .map(line => line.split(' ').at(-1))
}
