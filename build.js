const npmlog = require("npmlog")
const process = require("process")
const child_process = require("child_process")
npmlog.heading = "HSI Build Tool"
npmlog.info("Main", "################")
npmlog.info("Main", "# HSI Build Tool")
npmlog.info("Main", "################")
npmlog.info("Main", "")
npmlog.info("Main", "Please wait...")
function errHandle(error, origin) {
	npmlog.error("Main", "--- ERROR ---")
	npmlog.error("Main", "Unhandled Exception")
	if (error.name != undefined) { npmlog.error("Main", error.name) }
	if (error.message != undefined) { npmlog.error("Main", error.message) }
	npmlog.error("Main")
	npmlog.error("Main", `The stack can be found here:\n${error.stack}`)
	if (origin != undefined) { npmlog.error("Main", `Origin: ${origin}`) }
	process.exit(1)
}
process.on("uncaughtException", (error, origin) => errHandle)
//BuildType = process.env.BuildType ?? "prod"
const buildConfig = require("./hsibuildsettings.json")
npmlog.level = Infinity
npmlog.verbose("Main", "Build Config found.")
npmlog.verbose("Main", "Scanning for errors...")
if (buildConfig.tasks == undefined || buildConfig["task-order"] == undefined) {
	npmlog.error("BCErr", "The tasks object or the tasks-order object does not exist with in the hsibuildsettings.json file, are you sure you've got the right configuration file?")
	process.exit(1)
}
npmlog.info("Main", "No fatal errors found in the hsibuildsettings.json file.")
npmlog.info("Main", "Starting processes.")
function EvalStatements(object) {
	try {
		if (object.sync == true) {
			for (let i = 0; i < object.commands.length, i++;) {
				try {
					let cp = child_process.spawnSync(object.command[i], {cwd: process.cwd, windowsHide: true})
					cp.on("message", (message) => {
						console.log(message)
					})
				} catch {
					if (object.doesFail == true) {
						errHandle(new Error(object.failText + "\nPlease see logs above."))
					}
				}
			}
		} else if (object.sync == false) {
			for (var i = 0; i < object.commands.length; i++) {
				try {
					let cp = child_process.spawn(object.command[i], {cwd: process.cwd, windowsHide: true})
					cp.on("message", (message) => {
						console.log(message)
					})
				} catch {
					if (object.doesFail == true) {
						errHandle(new Error(object.failText + "\nPlease see logs above."))
					}
				}
			}
		}
	} catch {
		npmlog.error("BCErr", "The current object does not have correct commands.")
		errHandle(new Error(`Build Command '${object.command[i]}' is invalid.`))
	}
}
for (var i = 0; i < buildConfig["task-order"].length; i++) {
	npmlog.info("Main", `Running task '${buildConfig["task-order"][i]}'.`)
	EvalStatements(buildConfig.tasks[buildConfig["task-order"][i]])
	npmlog.info("Main", `Task '${buildConfig["task-order"][i]}' completed.`)
}
npmlog.info("Main", "Build complete.")