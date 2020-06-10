// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// ***********************************************************

import './commands';
// import { LoginObject } from '../integration/pages/LoginObject';
import { BaseObject } from '../integration/pages/BaseObject';
import 'cypress-xpath';

Cypress.Cookies.defaults({
	whitelist: [  
	]
});

before(() => {
	cy.clearLocalStorageCache();

	BaseObject.navigateToBaseUrl();

	// const username = Cypress.env('username');
	// const pwd = Cypress.env('pwd');

	// LoginObject.login(username, pwd);
});

after(() => {
	// cy.cleanTestData();
	cy.log('this is the afterall script');
});

beforeEach(() => {
	cy.restoreLocalStorageCache();
});

afterEach(() => {
	cy.saveLocalStorageCache();
});