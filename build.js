const npmlog = require("npmlog")
const process = require("process")
const child_process = require("child_process")

npmlog.heading = "HSI Build Tool"
npmlog.info("Main", "██████████████████")
npmlog.info("Main", "█                █░")
npmlog.info("Main", "█ HSI Build Tool █░")
npmlog.info("Main", "█                █░")
npmlog.info("Main", "██████████████████░")
npmlog.info("Main", " ░░░░░░░░░░░░░░░░░░")
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

const buildConfig = require("./hsibuildsettings.json")
npmlog.level = Infinity
npmlog.verbose("Main", "Build Config found.")
npmlog.verbose("Main", "Scanning for errors...")
if (buildConfig.tasks == undefined || buildConfig["task-order"] == undefined) {
	npmlog.error("BCErr", "The tasks object or the tasks-order object does not exist with in the hsibuildsettings.json file, are you sure you've got the right configuration file?")
	process.exit(1)
}

npmlog.info("Main", "No fatal errors found in the hsibuildsettings.json file.")
npmlog.info("Main", "Please wait...")

function EvalStatement(command) {
	return new Promise((resolve, reject) => {
		try {
			let cp = child_process.execSync(command, {windowsHide: true})
			resolve(cp)
		} catch (error) {
			reject(error)
		}
	});
}

async function EvalStatements(object, name) {
	if (object.sync != true | false || object.doesFail == undefined || object.commands == undefined || object.failText == undefined) {
		errHandle(new Error(`The current task does not have the correct structure.`))
	}
	if (object.sync == true) {
		object.commands.forEach(element => {
			trackers[name].t[element].info(name, `Executing ${[element]}`)
			EvalStatement(element)
			trackers[name].t[element].finish()
		});
	} else if (object.sync == false) {
		object.commands.forEach(element => {
			trackers[name].t[element].info(name, `Executing ${[element]}`)
			EvalStatement(element)
			trackers[name].t[element].finish()
		});
	}

}

// Load NPMLog progress bars

npmlog.enableProgress()

var trackers = {}

for (let i = 0; i < buildConfig["task-order"].length; i++) {
	let objectName = buildConfig["task-order"][i]
	let object = buildConfig.tasks[buildConfig["task-order"][i]]
	trackers[objectName] = { tg: npmlog.newGroup(objectName), t: [] }
	for (let v = 0; v < object.commands.length; v++) {
		trackers[objectName].t[object.commands[v]] = trackers[objectName].tg.newItem(object.commands[v])
	}
}

npmlog.info("Main", "Starting processes.")

for (let i = 0; i < buildConfig["task-order"].length; i++) {
	let buildConfig = require("./hsibuildsettings.json")
	let objectName = buildConfig["task-order"][i]
	let object = buildConfig.tasks[buildConfig["task-order"][i]]
	if (buildConfig["task-order"].length == 0) {
		npmlog.error("Main", "There doesn't appear to be any tasks to execute, this configuration is not supported, the application will now be terminated.")
		break
	}
	trackers[objectName].tg.info(objectName, `Running task '${objectName}'.`)
	EvalStatements(object, objectName)
	trackers[objectName].tg.info(objectName, `Task '${objectName}' completed.`)
}

npmlog.info("Main", "Build complete.")