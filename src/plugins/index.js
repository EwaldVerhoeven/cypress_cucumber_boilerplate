// eslint-disable-next-line no-undef
const cucumber = require('cypress-cucumber-preprocessor').default;

// const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');


// eslint-disable-next-line no-undef, no-unused-vars
module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on('task', {
		log (message) {
			console.log(message);

			return null;
		}
	});

	// Preprocess Cucumber
	on('file:preprocessor', cucumber());

	// Preprocess Typescript
	// on('file:preprocessor', preprocessTypescript(config));
};

