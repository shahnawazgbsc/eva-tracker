// Ignite CLI plugin for Redux
// ----------------------------------------------------------------------------

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // install an NPM module and link it

  // Example of copying templates/Redux to App/Redux
  // if (!filesystem.exists(`${APP_PATH}/App/Redux`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/Redux`, `${APP_PATH}/App/Redux`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../Redux/Redux'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // remove the npm module and unlink it

  // Example of removing App/Redux folder
  // const removeRedux = await context.prompt.confirm(
  //   'Do you want to remove App/Redux?'
  // )
  // if (removeRedux) { filesystem.remove(`${APP_PATH}/App/Redux`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../Redux/Redux'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }
