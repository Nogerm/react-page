import { Component } from 'react';
import axios from 'axios';

//Mongo DB
const BASE_URL = 'https://api.mlab.com/api/1/';
const API_KEY = '6ibiq_TR4zPfOIaRWNvlknaHWYDpyGLQ';
const dbName = 'heroku_0tvjhrct';

//Collections
const BIRTHDAY_PERSON = 'birthday_person';
const BIRTHDAY_PRAYER = 'birthday_prayer';

//Query URLs
const BIRTHDAY_PERSON_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PERSON;
const BIRTHDAY_PRAYER_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PRAYER;

export const getBirthdayPerson = function() {
	return new Promise((resolve, reject) => {
		axios.get(BIRTHDAY_PERSON_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getBirthdayPerson]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getBirthdayPerson]" + error);
				reject(error);
			});
	})
}

export const getBirthdayPrayer = function() {
	return new Promise((resolve, reject) => {
		axios.get(BIRTHDAY_PRAYER_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getBirthdayPerson]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getBirthdayPerson]" + error);
				reject(error);
			});
	})
}
