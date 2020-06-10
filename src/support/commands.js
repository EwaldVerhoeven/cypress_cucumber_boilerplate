
Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorageCache', () => {
	Object.keys(localStorage).forEach(key => {
		LOCAL_STORAGE_MEMORY[key] = localStorage[key];
	});
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
	Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
		localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
	});
});

Cypress.Commands.add('clearLocalStorageCache', () => {
	localStorage.clear();
	LOCAL_STORAGE_MEMORY = {};
});

Cypress.Commands.add('getToken', () => {
	const authHeader = window.btoa(`${Cypress.env('username')}:${Cypress.env('pwd')}`);

	const options = {
		url: 'https://apps.geodan.nl/icms/suite/icms-webapi/api/Token',
		headers: {
			Authorization: authHeader
		},
		method: 'GET'
	};
	cy
		.request(options)
		.then((resp) => {
			window.localStorage.setItem('token', resp.body.token);
			return cy.log(`localstorage token: ${localStorage.getItem('token')}`);
		}); 
});

Cypress.Commands.add('deleteIncident', id => {
	if (localStorage.getItem('token') == undefined)  {
		cy.getToken();
	}
	var cachedToken = localStorage.getItem('token');
	const accesToken = cachedToken.substring(1, cachedToken.length-1);
	const authHeader = window.btoa(`${Cypress.env('username')}:${Cypress.env('pwd')}`);
	const options = {
		url: `https://apps.geodan.nl/icms/suite/icms_server-pnh/api/Incident/${id}`,
		headers: {
			'content-type': 'application/json',
			Authorization: authHeader,
			token: accesToken
		},
		method: 'DELETE'
	};
	cy 
		.request(options)
		.then((resp) => {
			expect(resp.status).to.eq(200);
			return cy.log(`deleted: ${id}`);
		});
}); 

Cypress.Commands.add('cleanAllTestData', () => {
	cy.log('cleaning up all the created testdata');

	const testIncident = localStorage.getItem('testIncidentId');

	if (testIncident) {
		cy.deleteIncident(testIncident);
	}
});


Cypress.Commands.add('cleanTestData', () =>{
	cy.log('cleaning up all the created testdata')
		.then(() => {
			if (localStorage.getItem('testIncidentId')) { 
				if (localStorage.getItem('token') == undefined)  {
					cy.getToken();
				}   
				const accesToken = localStorage.getItem('token');     
				const options = {
					url: `https://apps.geodan.nl/icms/suite/icms_server-pnh/api/Incident/${localStorage.getItem('testIncidentId')}`,
					headers: {
						'content-type': 'application/json',
						Authorization: 'Basic cG5oLnN3aXRjaEBnZW9kYW4ubmw6bkV2YnhjeUhiNjJJSkhRNllrZHE=',
						token: accesToken.substring(1, accesToken.length-1)
					},
					method: 'DELETE'
				};
				cy 
					.request(options)
					.then((resp) => {
						return cy.log(resp.body);
					});
			} else {
				cy.log('No testIncidentId was set during the test');
			}
		});
});

Cypress.Commands.add('headlessWait', (miliseconds) => {
	if (Cypress.browser.isHeadless) {
		cy.wait(miliseconds);
	} 
});