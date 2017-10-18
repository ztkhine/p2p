export const getUniqueList = (listData) => {
  return [...new Set(listData)]
}

// assume that the data will be in the serializable json string
export const onMsg = (data, extraParams, callback) => {
  try {
    const jsonData = JSON.parse(data.nativeEvent.data),
          mapData = []
    // Object.keys(jsonData).forEach(function(key) {
    //   mapData.push([key, String(jsonData[key])])
    // });
    // AsyncStorage.multiSet(mapData)
    callback(jsonData, extraParams)
  } catch (error) {
    console.log('Unable to store or error callback', error)
  }
}

// random number
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// check if the two given value are equal
export const isEqual = (firstVal, secondVal) => {

  isEqualArray = (firstVal, secondVal) => {
    try {
      // check if both are array
      if (firstVal.length === secondVal.length) {
        // if both have the same array length check the item
        let counter = 0
        firstVal.forEach((value, index) => {
          // indexOf will fail if the value is object atm
          if (secondVal.indexOf(value) >= 0) {
            counter += 1
          }
        })
        // if counter equal to length of the array same
        if (counter === firstVal.length) {
          return true
        }
      }
      return false
    } catch(error) {
      console.log('Error checking array with error message: ', error)
      return false
    }
  }

  isEqualObject = (firstVal, secondVal) => {
    try {
      // check if both have same key
      if (isEqualArray(Object.keys(firstVal), Object.keys(secondVal))){
        // if both have same keys check if they have same value
        let flag = true
        Object.keys(firstVal).forEach((key) => {
          console.log(firstVal[key], secondVal[key])
          // if the key value not equal return false
          if (firstVal[key] !== secondVal[key]) {
            flag = false
          }
        })
        if (flag) {
          return true
        }
        return false
      }
    } catch(error) {
      console.log('Error checking object with error message: ', error)
      return false
    }
  }

  try {
    if (Array.isArray(firstVal) && Array.isArray(secondVal)) {
      return isEqualArray(firstVal, secondVal)
    } else if (typeof firstVal === 'object' && typeof secondVal === 'object') {
      return isEqualObject(firstVal, secondVal)
    } else {
      if (firstVal !== secondVal) {
        return false
      }
    }
    return true
  } catch(error) {
    console.log('Error checking two value with error message: ', error)
    return false
  }
}

export const findValue = (data, dataValue) => {

  findValueList = (data, dataValue) => {
    try {
      let result = []
      data.forEach((value, index) => {
        if (Array.isArray(value)) {
          result = result.concat(findValueList(value, dataValue))
        } else if (typeof value === 'object') {
          result = result.concat(findValueObject(value, dataValue))
        } else if (value === dataValue){
          result = result.concat(data)
        }
      })
      return result
    } catch(error) {
      console.log('Error finding the value with error: ', error)
    }
  }

  findValueObject = (data, dataValue) => {
    try {
      let result = []
      Object.keys(data).forEach((dictKey) => {
        let dictVal = data[dictKey]
        if (dictVal === dataValue) {
          result = result.concat(data)
        } else {
          if (Array.isArray(dictVal)) {
            result = result.concat(findValueList(dictVal, dataValue))
          } else if (typeof dictVal === 'object') {
            result = result.concat(findValueObject(dictVal, dataValue))
          }
        }
      })
      return result
    } catch(error) {
      console.log('Error finding the object value with error: ', error)
      return []
    }
  }

  try {
    let result = []
    if (Array.isArray(data)) {
      return findValueList(data, dataValue)
    } else if (typeof data === 'object') {
      return findValueObject(data, dataValue)
    }
    return []
  } catch(error) {
    console.log('Error finding the value with error message: ', error)
    return []
  }
}

// find the given key value inside the nested data
export const findKey = (data, key, getSiblingData) => {

  findKeyList = (data, key, getSiblingData) => {
    try {
      let result = []
      data.forEach((value, index) => {
        if (Array.isArray(value)) {
          result = result.concat(findKeyList(value, key, getSiblingData))
        } else if (typeof value === 'object') {
          result = result.concat(findKeyDict(value, key, getSiblingData))
        }
      })
      return result
    } catch(error) {
      console.log('Error getting the key from the dict list. Error message: ', error)
      return []
    }
  }

  findKeyDict = (data, key, getSiblingData) => {
    try {
      let result = []
      Object.keys(data).forEach((dictKey) => {
        let dictVal = data[dictKey]
        if (dictKey === key) {
          // if the sibling is true return the sibling data
          if (getSiblingData) {
            result.push(data)
          } else {
            result.push(dictVal)
          }
        } else {
          if (Array.isArray(dictVal)) {
            result = result.concat(findKeyList(dictVal, key, getSiblingData))
          } else if (typeof dictVal === 'object') {
            result = result.concat(findKeyDict(dictVal, key, getSiblingData))
          }
        }
      })
      return result
    } catch(error) {
      console.log('Error getting the key from the dict. Error message: ', error)
      return []
    }
  }

  try {
    getSiblingData = getSiblingData? getSiblingData: false;
    if (Array.isArray(data)) {
      return findKeyList(data, key, getSiblingData)
    } else if (typeof data === 'object') {
      return findKeyDict(data, key, getSiblingData)
    }
    return []
  } catch(error) {
    console.log('Error getting the key with error message: ', error)
    return []
  }
}

// get the unique value of the key in the dictionary
export const getUnique = (data, key) => {
  try {
    return Array.from(new Set(data.map((value, index) => {
      return value[key]
    })))
  } catch (error) {
    console.log('Error getting unique value', error)
  }
}

// find the key with the specific value in the dictionary
export const findTreeKey = (data, key, value) => {
  try {
    return data.filter((fullData) => {
      return fullData[key] === value
    })
  } catch (error) {
    console.log('Error getting the key value pair', error)
  }
}

// transform the data into tree view
export const transformTreeView = (data, rawData) => {
  try {
    let treeView = {},
        cloneData = data.slice(0) // looping the data need to clone the array
    if (cloneData.length) {
      let parentData = cloneData.shift()
      if (parentData.hasOwnProperty('field')) {
        let mainData = getUnique(rawData, parentData.field)
        mainData.forEach((value, index) => {
          let subData = findTreeKey(rawData, parentData.field, value),
            childData = transformTreeView(cloneData, subData),
            result = {}
          result['data'] = childData
          if(subData.length > 0) {
            // add the parents info if there's fields provided
            if(parentData.hasOwnProperty('parentData')) {
              let parentInfoFields = parentData.parentData
              // add the key
              result['key'] = index + 1
              parentInfoFields.forEach((infoVal, infoIndex) => {
                result[infoVal] = subData[0][infoVal]
              })
            }
          }
          treeView[value] = result
        })
        return treeView
      } else {
        // if there's fields or the last field format the data here
        let result = [],
            fields = parentData.fields
        console.log(rawData)
        rawData.forEach((value, index) => {
          let pickedField = {}
          fields.forEach((fieldVal, fieldIndex) => {
            // add the key
            pickedField['key'] = index + 1
            pickedField[fieldVal] = value[fieldVal]
          })
          result.push(pickedField)
        })
        // return rawData
        return result
      }
    }
  } catch (error) {
    console.log('Error transforming tree view', error)
  }
}

export const isNric = (NRIC) => {
  let regex = /^[STFG]\d{7}[A-Za-z]$/i,
      nric_no = NRIC.replace(/[A-Za-z]/g,""),
      weight = '2765432',
      lookup = {'S':'ABCDEFGHIZJ', 'T':'HIZJABCDEFG','F':'KLMNPQRTUWX','G':'TUWXKLMNPQR'},
      first_char = NRIC.charAt(0).toUpperCase(),
      last_char = NRIC.charAt(NRIC.length-1).toUpperCase();
  if (!regex.test(NRIC)) {
    return false
  }
  let check_sum = (function(){
    let sum = 0;
    for (let i in nric_no) {
        sum += nric_no[i] * weight[i];
    }
    return lookup[first_char][(11-1-(sum%11))];
  })(),
  validity = (check_sum == 'undefined' || check_sum != last_char)? false : true;
  return validity;
}