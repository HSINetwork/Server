const npmlog = require("npmlog")
const process = require("process")
const child_process = require("child_process")
npmlog.heading = "HSI Build Tool"
npmlog.info("Main", "################")
npmlog.info("Main", "# HSI Build Tool")
npmlog.info("Main", "################")
npmlog.info("Main", "")
npmlog.info("Please wait...")
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
					let cp = child_process.execSync(object.command[i], {cwd: process.cwd, windowsHide: true})
					cp.on("message", (message) => {
						console.log(message)
					})
				} catch {
					if (object.doesFail == true) {
						npmlog.error("BCErr", object.failText + "\nPlease see logs above.")
						break
					}
				}
			}
		} else if (object.sync == false) {
			for (let i = 0; i < object.commands.length, i++;) {
				try {
					let cp = child_process.exec(object.command[i], {cwd: process.cwd, windowsHide: true})
					cp.on("message", (message) => {
						console.log(message)
					})
				} catch {
					if (object.doesFail == true) {
						npmlog.error("BCErr", object.failText + "\nPlease see logs above.")
						break
					}
				}
			}
		}
	} catch {
		npmlog.error("BCErr", "The current object does not have correct commands.")
	}
}
for (let i = 0; i < buildConfig["task-order"].length, i++;) {
	EvalStatements(buildConfig.tasks[buildConfig["task-order"][i]])
}