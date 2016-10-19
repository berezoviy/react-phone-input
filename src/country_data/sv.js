// So each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Format (if available),
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]
// var _ = require('lodash');

var allCountries = [
    [
      "Danmark",
      "dk",
      "45",
      "+.. .. .. .. .."
    ],
    [
      "Finland",
      "fi",
      "358",
      "+... .. ... .. .."
    ],
    [
      "Island",
      "is",
      "354",
      "+... ... ...."
    ],
    [
      "Norge",
      "no",
      "47",
      "+.. ... .. ..."
    ],
    [
      "Sverige",
      "se",
      "46",
      "+.. .. ... .. .."
    ]
  ];

// we will build this in the loop below
var allCountryCodes = {};

var addCountryCode = function(iso2, dialCode, priority) {
  if (!(dialCode in allCountryCodes)) {
    allCountryCodes[dialCode] = [];
  }

  var index = priority || 0;
  allCountryCodes[dialCode][index] = iso2;
};

for (var i = 0; i < allCountries.length; i++) {
  // countries
  var c = allCountries[i];
  allCountries[i] = {
    name: c[0],
    iso2: c[1],
    dialCode: c[2],
    priority: c[4] || 0
  };
  // format
  if (c[3]) {
    allCountries[i].format = c[3];
  }

  // area codes
  if (c[5]) {
    allCountries[i].hasAreaCodes = true;
    for (var j = 0; j < c[5].length; j++) {
      // full dial code is country code + dial code
      var dialCode = c[2] + c[5][j];
      addCountryCode(c[1], dialCode);
    }
  }

  // dial codes
  addCountryCode(c[1], c[2], c[4]);
}

module.exports = {
  allCountries: allCountries,
  allCountryCodes: allCountryCodes
};
