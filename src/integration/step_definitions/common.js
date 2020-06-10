/* global When*/

When('I wait {int} seconds', seconds => {
	const waitTime = seconds * 1000;
	cy.wait(waitTime);
});
