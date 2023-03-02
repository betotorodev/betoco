import { intro, outro, text, select } from '@clack/prompts'
import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles } from './git.js'
import { trytm } from '@bdsqqq/try'
import colors from 'picocolors'

const [changedFiles, errorChangedFiled] = await trytm(getChangedFiles())

intro(
  colors.inverse(`Asistente para la creación de commits por ${colors.yellow('@betotorodev')}`)
)

if (errorChangedFiled) {
  outro(colors.red('Error: comprueba que tienes un repositorio de git'))
  process.exit(1)
}

// const consoleMessage = await text({
//   message: colors.cyan('Introduce el mensaje del commit'),
//   placeholder: 'Add new feature, etc'
// })

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key} - ${value.description}`
  }))
})

outro('Gracias por usar el asistente')
