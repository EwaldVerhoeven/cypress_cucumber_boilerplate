/* global When*/

When('I perform a GET request and save a value inside the localstorage', () => {
	const options = {
		url: `${Cypress.env('PlaceHolderAPI')}/users`,
		method: 'GET'
	};
	cy
		.request(options)
		.then((resp) => {

			expect(resp.status).to.eq(200);
			
			window.localStorage.setItem('fullname', resp.body[0].name);
            
			cy.log(`fullname: ${localStorage.getItem('fullname')}`);
		}); 
});

When('I use my saved value to perform a POST request', () => {
	cy.fixture('postbody').then( () => {
		const options = {
			url: `${Cypress.env('PlaceHolderAPI')}/posts`,
			method: 'POST'
		};
		cy
			.request(options) // This endpoint is more often than not offline. Therefor this request might fail and reach a timeout limit. 
			.then((resp) => {
				expect(resp.status).to.eq(201);
			}); 
	});
});