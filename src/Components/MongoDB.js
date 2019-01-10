import axios from 'axios';

//Mongo DB
const BASE_URL = 'https://api.mlab.com/api/1/';
const API_KEY = 'MfIcJH19fIUm4phoxgzDLfAPsP0q8TSd';
const dbName = 'heroku_hq9fqmdz';

//Collections
const BIRTHDAY_PERSON = 'birthday_person';
const BIRTHDAY_PRAYER = 'birthday_prayer';
const ROUTINE_PERSON = 'routine_person';
const ROUTINE_REMIND = 'routine_remind';
const MONDAY_BLESS = 'monday_bless';
const AUTO_RESPONSE = 'auto_response';
const SETTING = 'setting';

//Query URLs
const BIRTHDAY_PERSON_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PERSON;
const BIRTHDAY_PRAYER_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PRAYER;
const ROUTINE_PERSON_URL = BASE_URL + 'databases/' + dbName + '/collections/' + ROUTINE_PERSON;
const ROUTINE_REMIND_URL = BASE_URL + 'databases/' + dbName + '/collections/' + ROUTINE_REMIND;
const MONDAY_BLESS_URL = BASE_URL + 'databases/' + dbName + '/collections/' + MONDAY_BLESS;
const AUTO_RESPONSE_URL = BASE_URL + 'databases/' + dbName + '/collections/' + AUTO_RESPONSE;
const SETTING_URL = BASE_URL + 'databases/' + dbName + '/collections/' + SETTING;


//------------------
//Birthday person
//------------------
export const getBirthdayPerson = function() {
	return new Promise((resolve, reject) => {
		axios.get(BIRTHDAY_PERSON_URL, {
				params: {
					s: JSON.stringify({"birth_month": 1, "birth_day": 1}),
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
		  name: newData.name,
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
        name: newData.name,
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

//------------------
//Birthday prayer
//------------------
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

//------------------
//Routine rule
//------------------
export const getRoutineRule = function() {
	return new Promise((resolve, reject) => {
		axios.get(ROUTINE_PERSON_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getRoutineRule]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getRoutineRule]" + error);
				reject(error);
			});
	})
}

export const addRoutineRule = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(ROUTINE_PERSON_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
			month: newData.month,
			routines: newData.routines
    })
    .then(function (response) {
      console.log("[addRoutineRule]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addRoutineRule]" + error);
      reject(error);
    });
  })
}

export const updateRoutineRule = function(newData) {
	return new Promise((resolve, reject) => {
  	axios.put(ROUTINE_PERSON_URL + '/' + newData.id + '?apiKey=' + API_KEY, {
      _id: newData.id,
			month: newData.month,
			routines: newData.routines
    })
    .then(function (response) {
      console.log("[updateRoutineRule]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateRoutineRule]" + error);
      reject(error);
    });
  })
}

export const removeRoutineRule = function(reminderId) {
	return new Promise((resolve, reject) => {
		axios.delete(ROUTINE_PERSON_URL + '/' + reminderId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeRoutineRule]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeRoutineRule]" + error);
				reject(error);
			});
	})
}

//------------------
//Routine reminder
//------------------
export const getRoutineReminder = function() {
	return new Promise((resolve, reject) => {
		axios.get(ROUTINE_REMIND_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getRoutineReminder]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getRoutineReminder]" + error);
				reject(error);
			});
	})
}

export const addRoutineReminder = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(ROUTINE_REMIND_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
      msgs: [...newData.msgs]
    })
    .then(function (response) {
      console.log("[addRoutineReminder]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addRoutineReminder]" + error);
      reject(error);
    });
  })
}

export const updateRoutineReminder = function(id, msgs) {
	return new Promise((resolve, reject) => {
  	axios.put(ROUTINE_REMIND_URL + '/' + id + '?apiKey=' + API_KEY, {
      _id: id,
      msgs: [...msgs]
    })
    .then(function (response) {
      console.log("[updateRoutineReminder]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateRoutineReminder]" + error);
      reject(error);
    });
  })
}

export const removeRoutineReminder = function(reminderId) {
	return new Promise((resolve, reject) => {
		axios.delete(ROUTINE_REMIND_URL + '/' + reminderId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeRoutineReminder]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeRoutineReminder]" + error);
				reject(error);
			});
	})
}

//------------------
//Monday Bless
//------------------
export const getMondayBless = function() {
	return new Promise((resolve, reject) => {
		axios.get(MONDAY_BLESS_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getMondayBless]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getMondayBless]" + error);
				reject(error);
			});
	})
}

export const addMondayBless = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(MONDAY_BLESS_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
      msgs: [...newData.msgs]
    })
    .then(function (response) {
      console.log("[addMondayBless]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addMondayBless]" + error);
      reject(error);
    });
  })
}

export const updateMondayBless = function(id, msgs) {
	return new Promise((resolve, reject) => {
  	axios.put(MONDAY_BLESS_URL + '/' + id + '?apiKey=' + API_KEY, {
      _id: id,
      msgs: [...msgs]
    })
    .then(function (response) {
      console.log("[updateMondayBless]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateMondayBless]" + error);
      reject(error);
    });
  })
}

export const removeMondayBless = function(mondayBlessId) {
	return new Promise((resolve, reject) => {
		axios.delete(MONDAY_BLESS_URL + '/' + mondayBlessId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeMondayBless]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeMondayBless]" + error);
				reject(error);
			});
	})
}

//------------------
//Auto Reply
//------------------
export const getAutoReply = function() {
	return new Promise((resolve, reject) => {
		axios.get(AUTO_RESPONSE_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getAutoReply]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getAutoReply]" + error);
				reject(error);
			});
	})
}

export const addAutoReply = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(AUTO_RESPONSE_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
			key_words: [...newData.key_words],
			response_msgs: [...newData.response_msgs]
    })
    .then(function (response) {
      console.log("[addAutoReply]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addAutoReply]" + error);
      reject(error);
    });
  })
}

export const updateAutoReply = function(newData) {
	return new Promise((resolve, reject) => {
  	axios.put(AUTO_RESPONSE_URL + '/' + newData.id + '?apiKey=' + API_KEY, {
      _id: newData.id,
      key_words: [...newData.key_words],
			response_msgs: [...newData.response_msgs]
    })
    .then(function (response) {
      console.log("[updateAutoReply]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateAutoReply]" + error);
      reject(error);
    });
  })
}

export const removeAutoReply = function(autoReplyId) {
	return new Promise((resolve, reject) => {
		axios.delete(AUTO_RESPONSE_URL + '/' + autoReplyId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeAutoReply]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeAutoReply]" + error);
				reject(error);
			});
	})
}

//------------------
//Setting
//------------------
export const getSetting = function() {
	return new Promise((resolve, reject) => {
		axios.get(SETTING_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getSetting]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getSetting]" + error);
				reject(error);
			});
	})
}

export const updateSetting = function(newData) {
	return new Promise((resolve, reject) => {
  	axios.put(SETTING_URL + '/' + newData.id + '?apiKey=' + API_KEY, {
      _id: newData.id,
      remind_birthday: newData.remind_birthday,
			remind_routine: newData.remind_routine,
			auto_reply: newData.auto_reply,
			monday_bless: newData.monday_bless
    })
    .then(function (response) {
      console.log("[updateSetting]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateSetting]" + error);
      reject(error);
    });
  })
}
