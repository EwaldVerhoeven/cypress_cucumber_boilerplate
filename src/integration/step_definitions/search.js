/* global When*/
import { SearchObject } from '../pages/SearchObject';

When('I perform a google search with the value {string}', value => {
	SearchObject.searchBar()
		.type(value)
		.type('{enter}');
});