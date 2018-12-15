// @cliDescription  Example Redux command
// Generates a "thing" (rename this to whatever -- component, model, anything).

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate redux <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  // Copies the `thing.js.ejs` in your plugin's templates folder
  // into App/Things/${name}.js.
  const jobs = [{
    template: 'redux.js.ejs',
    target: `App/Redux/${name}Reducer/index.js`
  }]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props)
}
