# cypress_boiler_plate
The purpose of this project is to save some time for setting up a 'ready-to-go' cypress project including CucumberJS, Reporting and linting (eslint). 

After downloading/cloning this repo run `npm install` and you are ready to use the project.

## Cypress basics
Inside the 'src' folder, you'll find the 4 typical cypress folders.

* Fixtures: For external and static files
* Integration: This folder contains 3 subfolders
 1) features: Cucumber (.feature) files
 2) pages: Page objects / POM
 3) step_definitions: Steps
* Plugins: This folder contains 1 index.js file in wich the plugins are called
* Support: This folder contains an index.js file for all your 'hooks' (befor/after) and it has the command.js file in wich you can store custom commands for you project.

## Cucumber(JS) with Cypress


## POM/design pattern