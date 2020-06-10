const report = require('multiple-cucumber-html-reporter');
const os = require('os');

const env = process.env.npm_lifecycle_event;

report.generate({
	jsonDir: './reporting/cypress/e2e/cucumber-json/',
	reportPath: './reporting/cypress/e2e/report/',
	reportName: 'report',
	displayDuration: true,
	metadata:{
		browser: {
			name: 'chrome',
		},
		device: env === 'e2e:local' ? 'Local Test Machine' : 'Build Server',
		platform: {
			name: os.type().includes('Windows') ? 'Windows' : os.type(),
			version: os.release()
		}
	},
	customData: {
		title: 'Run info',
		data: [
			{ label: 'Project', value: process.env.npm_package_name },
			{ label: 'Description', value: process.env.npm_package_description },
			{ label: 'Release', value: process.env.npm_package_version },
			{ label: 'Execution Start Time', value: new Date().toString() },
		]
	}
});

