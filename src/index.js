import { intro, outro, text, select, confirm, multiselect } from '@clack/prompts'
import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles, getStagedFiles, gitCommit, gitAdd } from './git.js'
import { trytm } from '@bdsqqq/try'
import colors from 'picocolors'

const [changedFiles, errorChangedFiled] = await trytm(getChangedFiles())
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

intro(
  colors.inverse(`Asistente para la creación de commits por ${colors.yellow('@betotorodev')}`)
)

if (errorChangedFiled ?? errorStagedFiles) {
  outro(colors.red('Error: comprueba que tienes un repositorio de git'))
  process.exit(1)
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan('Selecciona los archivos que quieres agregar al commit:'),
    options: changedFiles.map(file => ({
      value: file,
      label: file
    }))
  })

  await gitAdd({ files })
}

const commitMessage = await text({
  message: colors.cyan('Introduce el mensaje del commit'),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El mensaje no puede estar vacío')
    }

    if (value.length > 50) {
      return colors.red('El mensaje no puede tener más de 50 caracteres')
    }
  }
})

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, ' ')} - ${value.description}`
  }))
})

const { emoji, realese } = COMMIT_TYPES[commitType]

let breakingChange = false
if (realese) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan('¿Tiene este commit cambios que rompen la compatibilidad anterior?')}
      ${colors.yellow('Si la respuesta es sí, debeerías crear un commit con el tipo "BREAKING CHANGE" y al hacer release se publicará una versión mejor')}
    `
  })
}

let commit = `${emoji} ${commitType}: ${commitMessage}`
commit = breakingChange ? `${commit} [BREAKING CHANGE]` : commit

const shouldConfirm = await confirm({
  initialValue: true,
  message: `${colors.cyan('¿Quieres crear el commit con el siguiente mensaje?')} 
  ${colors.green(colors.bold(commit))}
  
  ${colors.yellow('¿Confirmas?')}
  `
})

if (!shouldConfirm) {
  outro(colors.yellow('No se creo el commit'))
  process.exit(0)
}

await gitCommit({ commit })

outro(colors.green('Gracias por usar el asistente'))
