'use strict';

var classificationHierarchy = {
  'Multiple software installation' : {'software and applications' : {'Project Activity' : 'IT'}},
  'site to site VPN' : {'network' : {'Project Activity' : 'IT'}},
  'Project specific internet setup' : {'network' : {'Project Activity' : 'IT'}},
  'Email Services' : {'Project Activity' : 'IT' },
  'Laptop hardware' : {'Hardware and accessories' : {'Failure / Issue' : 'IT'}},
  'Desktop hardware' : {'Hardware and accessories' : {'Failure / Issue' : 'IT'}},
  'Accessories' : {'Hardware and accessories' : {'Failure / Issue' : 'IT'}},
  'Disk resizing/ partitioning' : {'Hardware and accessories' :  {'Install / Configure' : 'IT'}},
  'Drivers' : {'Hardware and accessories' : {'Install / Configure' : 'IT'}},
  'Other Rational Product' : {'SCM (CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)' : {'Install / Configure' : 'IT'}},
  'Project specific access' : {'Network' :  {'Install / Configure' : 'IT'}},
  'Client Operating system - Microsoft based' : {'software and applications' : {'Install / Configure' : 'IT'}},
  'Outlook client': {'Email Services' : {'Install / Configure' : 'IT'}},
  'Software download': {'software and applications' : {'Install / Configure' : 'IT'}},
  'New WebEx account': {'Other IT Services': {'New/additional requirement/Provisioning' : 'IT'}}
};

module.exports.getCategories = function(key) {
  var categories = [];
  populateCategories(classificationHierarchy, key, categories);
  console.log(categories);
  if(categories.length > 1 && categories.length< 4) {
    while(categories.length != 4) {
      console.log('pusing last category again');
    categories.unshift(categories[0]);
    }
  }
    console.log(categories);
  return categories;
};

function populateCategories(inputObj, key, categories) {
  console.log(inputObj);
  console.log('traversing with key : ' + key);
  var tempObj = inputObj[key];
  console.log('object mapped : ' + tempObj);
  if(tempObj !== null && typeof tempObj === 'object') {
    console.log('found object');
    categories.push(key);

    populateCategories(tempObj, Object.keys(tempObj)[0], categories);
  } else {
    console.log('object not found. pushing key : ' + key);
    categories.push(key);
    categories.push(tempObj);
  }
}
