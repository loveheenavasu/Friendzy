import CountryList from "./StaticData/CountryList"

export const getFlagImage = (countryName) => {
    const foundCountry = CountryList.find(countryItem => countryItem.name === countryName);
    if (foundCountry) {
      console.log('Found Country:', foundCountry);
      return foundCountry.flag;
    } else {
      console.log('Country not found:', countryName);
      return ''; // or whatever default flag URL you want to return
    }
  };