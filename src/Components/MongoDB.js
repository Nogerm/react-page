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

//Birthday person
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

export const addBirthdayPerson = function(newData) {
	  return new Promise((resolve, reject) => {
		  axios.post(BIRTHDAY_PERSON_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
		  firstname: newData.firstname,
		  lastname: newData.lastname,
		  birth_month: newData.birth_month,
		  birth_day: newData.birth_day
		})
		.then(function (response) {
			console.log("[addBirthdayPerson]" + response);
			resolve(response.data);
		})
		.catch(function (error) {
			console.log("[addBirthdayPerson]" + error);
			reject(error);
		});
	})
}

export const updateBirthdayPerson = function(newData) {
	return new Promise((resolve, reject) => {
		axios.put(BIRTHDAY_PERSON_URL + '/' + newData.id + '?apiKey=' + API_KEY, {
        firstname: newData.firstname,
        lastname: newData.lastname,
        birth_month: newData.birth_month,
        birth_day: newData.birth_day
			})
			.then(function (response) {
				console.log("[updateBirthdayPerson]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[updateBirthdayPerson]" + error);
				reject(error);
			});
	})
}

export const removeBirthdayPerson = function(personId) {
	return new Promise((resolve, reject) => {
		axios.delete(BIRTHDAY_PERSON_URL + '/' + personId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeBirthdayPerson]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeBirthdayPerson]" + error);
				reject(error);
			});
	})
}

//Birthday prayer
export const getBirthdayPrayer = function() {
	return new Promise((resolve, reject) => {
		axios.get(BIRTHDAY_PRAYER_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getBirthdayPrayer]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getBirthdayPrayer]" + error);
				reject(error);
			});
	})
}

export const addBirthdayPrayer = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(BIRTHDAY_PRAYER_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
      msgs: [...newData.msgs]
    })
    .then(function (response) {
      console.log("[addBirthdayPrayer]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addBirthdayPrayer]" + error);
      reject(error);
    });
  })
}

export const updateBirthdayPrayer = function(id, msgs) {
return new Promise((resolve, reject) => {
  axios.put(BIRTHDAY_PRAYER_URL + '/' + id + '?apiKey=' + API_KEY, {
      _id: id,
      msgs: [...msgs]
    })
    .then(function (response) {
      console.log("[updateBirthdayPrayer]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateBirthdayPrayer]" + error);
      reject(error);
    });
  })
}

export const removeBirthdayPrayer = function(prayerId) {
return new Promise((resolve, reject) => {
  axios.delete(BIRTHDAY_PRAYER_URL + '/' + prayerId + '?apiKey=' + API_KEY)
    .then(function (response) {
      console.log("[removeBirthdayPrayer]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[removeBirthdayPrayer]" + error);
      reject(error);
    });
})
}
