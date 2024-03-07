const DummyData = [
  {id: 1, name: 'Gaming'},
  {id: 2, name: 'Dancing'},
  {id: 3, name: 'Animals'},
  {id: 4, name: 'Language'},
  {id: 5, name: 'Movies'},
  {id: 6, name: 'Gym'},
  {id: 7, name: 'Music'},
  {id: 8, name: 'Fashion'},
  {id: 9, name: 'Writting'},
  {id: 10, name: 'People'},
  {id: 11, name: 'Food&Drink'},
  {id: 12, name: 'Travel'},
  {id: 13, name: 'Hockey'},
  {id: 14, name: 'BasketBall'},
  {id: 15, name: 'Slam Poetry'},
  {id: 16, name: 'Home Workout'},
  {id: 17, name: 'Events'},
  {id: 18, name: 'DJ Nights'},
  {id: 19, name: 'Long Drives'},
  {id: 20, name: 'Food'},
  {id: 21, name: 'Beaches'},
  {id: 22, name: 'Music Concerts'},
  {id: 23, name: 'Late Nights'},
  // {id: 24, name: 'Dancing'},
  // {id: 25, name: 'Animals'},
  // {id: 26, name: 'Language'},
  // {id: 27, name: 'Movies'},
  // {id: 28, name: 'Gym'},
  // {id: 29, name: 'Music'},
  // {id: 30, name: 'Fashion'},
  // {id: 31, name: 'Writting'},
  // {id: 32, name: 'People'},
  // {id: 33, name: 'Food&Drink'},
  // {id: 34, name: 'Travel'},
  // {id: 35, name: 'Hockey'},
  // {id: 36, name: 'BasketBall'},
  // {id: 37, name: 'Slam Poetry'},
  // {id: 38, name: 'Home Workout'},
  // {id: 39, name: 'Events'},
  // {id: 40, name: 'DJ Nights'},
  // {id: 41, name: 'Long Drives'},
  // {id: 42, name: 'Food'},
  // {id: 43, name: 'Beaches'},
  // {id: 44, name: 'Music Concerts'},
];

export const getInterestName = (id: number): string => {
  switch (id) {
    case 1:
      return DummyData[0].name;
    case 2:
      return DummyData[1].name;
    case 3:
      return DummyData[2].name;
    case 4:
      return DummyData[3].name;
    case 5:
      return DummyData[4].name;
    case 6:
      return DummyData[5].name;
    case 7:
      return DummyData[6].name;
    case 8:
      return DummyData[7].name;
    case 9:
      return DummyData[8].name;
    case 10:
      return DummyData[9].name;
    case 11:
      return DummyData[10].name;
    case 12:
      return DummyData[11].name;
    case 13:
      return DummyData[12].name;
    case 14:
      return DummyData[13].name;
    case 15:
      return DummyData[14].name;
    case 16:
      return DummyData[15].name;
    case 17:
      return DummyData[16].name;
    case 18:
      return DummyData[17].name;
    case 19:
      return DummyData[18].name;
    case 20:
      return DummyData[19].name;
    case 21:
      return DummyData[20].name;
    case 22:
      return DummyData[21].name;
    case 23:
      return DummyData[22].name;
    default:
      return 'No Interest';
  }
};


export default DummyData;
