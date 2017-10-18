import moment from 'moment';
import CookieManager from 'react-native-cookies';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Button,
  WebView,
  Dimensions,
  AsyncStorage,
  CameraRoll
} from 'react-native';

export const HOME_URL = "https://iras.freeboh.com";
export const SIGN_URL = `${HOME_URL}/a/api/sign.json`;

export default ApiClient = {
  getSignedUrl: function(controller, method, urlVars, urlArgs) {
    CookieManager.get(`${HOME_URL}/#`).then((res) => {
      // console.log('Api Client', cookie);
    });
    const vars = typeof urlVars === 'undefined'? {}: urlVars;
    const args = typeof urlArgs === 'undefined'? []: urlArgs;
    const params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({controller: controller, function: method, vars: JSON.stringify(vars), args: JSON.stringify(args)})
    };
    return new Promise(
      function(resolve, reject){
        fetch(SIGN_URL, params)
          .then(function(response) {
            return response.json();
        }).then(function(json){
          resolve(json['data']);
        }).catch(function(error){
          reject(error);
        });
      }
    )
  },
  fetchJson: function(url, body, method, uploadFile){
    CookieManager.get(`${HOME_URL}/#`).then((res) => {
      // console.log('Api Client', cookie);
      console.log('Cookies', res)
    });
    if(typeof uploadFile === 'undefined') {
      let uploadFile = false
    }
    const contentType = uploadFile? 'multipart/form-data;': 'application/json'
    const data = uploadFile? body: JSON.stringify(body)
    const params = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': contentType
      },
      credentials: 'include',
      body: data
    };
    return new Promise(
      function(resolve, reject){
        if(method === 'GET'){
          delete params['body']
        }

        fetch(url, params)
          .then(function(response) {
            return response.json();
        }).then(function(json){
          resolve(json);
        }).catch(function(error){
          reject(error);
        });
      }
    )
  },
  fetchText: function(url, body, method, uploadFile){
    CookieManager.get(`${HOME_URL}/#`).then((res) => {
      // console.log('Api Client', cookie);
      console.log('Cookies', res)
    });
    if(typeof uploadFile === 'undefined') {
      let uploadFile = false
    }
    const contentType = uploadFile? 'multipart/form-data;': 'application/json'
    const data = uploadFile? body: JSON.stringify(body)
    const params = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': contentType
      },
      credentials: 'include',
      body: data
    };
    return new Promise(
      function(resolve, reject){
        if(method === 'GET'){
          delete params['body']
        }

        fetch(url, params)
          .then(function(response) {
            return response.text();
        }).then(function(text){
          resolve(text);
        }).catch(function(error){
          reject(error);
        });
      }
    )
  }
}

//login user
export const loginUser = (params, callback, errorCallback) => {
  console.log('loggin the user in with the following params', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/wsg_user_login`, params, 'POST').then(function(json){
    console.log('login result', json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback) {
      errorCallback()
    }
  });
}

export const registerUser = (params, callback, errorCallback) => {
  console.log('registering user with following params', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/wsg_user_register`, params, 'POST').then(function(json){
    console.log('result', json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback) {
      errorCallback()
    }
  })
}

// save the user data from api
export const getUserData = (callback, errorCallback) => {
  ApiClient.fetchJson(`${HOME_URL}/wsg/api/user/all.json`, {}, 'GET').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback) {
      errorCallback()
    }
  });
}

// get the map data
export const getMapData = (callback, errorCallback) => {
  ApiClient.fetchJson(`${HOME_URL}/wsg/wsg_map_data`, {}, 'GET').then((json) => {
    console.log('result', json)
    callback(json)
  }, (error) => {
    console.log(error)
    if (errorCallback) {
      errorCallback()
    }
  })
}

// get the shifts data
export const getShiftsData = (start, end, callback, errorCallback) => {
  // return callback([])
  // if the api breaks it'll break the calendar as well
  ApiClient.getSignedUrl('wsg','calevents.json',{frameless: true},[]).then(function(value){
    //get the id from the AsyncStorage
    console.log('Events url', value)
    AsyncStorage.getItem('user_id', (err, result) => {
      console.log('User id', result)
      ApiClient.fetchJson(value, {m: true, u: result, start: start, end: end}, 'POST').then(function(json){
        console.log(json)
        callback(json)
      }, function(error){
        console.log(error)
        if (errorCallback) {
          errorCallback()
        }
      });
    })
  }, function(error){
    console.log(error)
    if (errorCallback) {
      errorCallback()
    }
  });
}

//will be reworked to send the data instead of the url
export const getReviewData = (callback, errorCallback) => {
  ApiClient.getSignedUrl('wsg', 'confirm', {t: moment().unix() , bare: true, frameless: true}, []).then(function(value){
    ApiClient.fetchJson(value, {}, 'POST').then(function(json){
      // json.map((value,index) => {
      //   value['key'] = index;
      // });
      console.log(json)
      callback(json)
    }, function(error){
      console.log(error)
      if (errorCallback){
        errorCallback()
      }
    });
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const deleteBid = (id, callback, errorCallback) => {
  console.log('Deleting bid')
  ApiClient.getSignedUrl('wsg', 'confirm', {}, ['delete',id]).then(function(value){
    console.log(value)
    ApiClient.fetchJson(value, {}, 'GET').then(function(json){
      console.log(json)
      callback(json)
    }, function(error){
      console.log(error)
      if (errorCallback){
        errorCallback()
      }
    });
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const cancelBids = (callback, errorCallback) => {
  console.log('Cancelling bid')
  ApiClient.getSignedUrl('wsg', 'confirm', {}, ['clear']).then(function(value){
    console.log(value)
    ApiClient.fetchJson(value, {}, 'GET').then(function(json){
      console.log(json)
      callback(json)
    }, function(error){
      console.log(error)
      if (errorCallback){
        errorCallback()
      }
    });
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const confirmBids = (callback, errorCallback) => {
  console.log('Confiming bid')
  ApiClient.getSignedUrl('wsg', 'confirm', {}, ['confirm']).then(function(value){
    console.log(value)
    ApiClient.fetchJson(value, {}, 'GET').then(function(json){
      console.log(json)
      callback(json)
    }, function(error){
      console.log(error)
      if (errorCallback){
        errorCallback()
      }
    });
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const getCats = (callback, errorCallback) => {
  console.log('Getting the categories')
  ApiClient.fetchJson(`${HOME_URL}/wsg/get_cats`, {}, 'GET').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const getCatListings = (params, callback, errorCallback) => {
  console.log('Gettting the listing from the cats id: ', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/get_cat_listings`, params, 'POST').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const getShortenedUrl = (params, callback, errorCallback) => {
  console.log('Getting the data from the key: ', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/shortener_lookup`, params, 'POST').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const zipLookup = (params, callback, errorCallback) => {
  console.log('Getting the data from the zip: ', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/postcode_lookup`, params, 'POST').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const listingLookup = (params, callback, errorCallback) => {
  console.log('Getting the data from the listing: ', params)
  ApiClient.fetchJson(`${HOME_URL}/wsg/listing_data`, params, 'POST').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

export const getAvailableShifts = (params, callback, errorCallback) => {
  console.log('Getting data for the listing from the params: ', params)
  console.log('url', `${HOME_URL}/wsg/listing_data/shifts`)
  ApiClient.fetchJson(`${HOME_URL}/wsg/listing_data/shifts`, params, 'POST').then(function(json){
    console.log(json)
    callback(json)
  }, function(error){
    console.log(error)
    if (errorCallback){
      errorCallback()
    }
  });
}

