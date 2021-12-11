<div align="center"><font size=72>HSINetwork Server</font></div>

Welcome to the HSINetwork Server Repo!

This README will cover the basics of how to get the server running.

To pervent congestion of this README, most of the configuration you can do with this server has been moved over into the Github Pages Wiki.

## Installation
To install the HSINetwork Server, you can either use DockerHub [Not yet supported as of 11/12/2021] or download directly from this repo.

### Install from source
To install from source. Simply clone this repo into your computer. and run
``` npm install ```

Once this command has completed, run
``` docker-compose up ```
This will start the Redis server, hosted on port 6379 and the web server, hosted on port 80.

```
It is recommended to download from the Releases page if you want stable builds. By default the HSI Build Tool will run Jest to vaildate the source code.

However this behaviour can be disabled by removing the 'test' task in the task-order object in the hsibuildsettings.json file, this is not recommended as otherwise some parts of the application may not function as intended.
```