export const isEmailValid = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};
export const Ago = (likeTime: string) => {
  const likedTime = new Date(likeTime);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - likedTime.getTime();
  // console.log('Time Difference is --->>',timeDifference);
  const secondDiff = (timeDifference / 1000).toFixed(2);
  // console.log('time in seconds-->>',secondDiff)
  const minuteDiff = (parseInt(secondDiff) / 60).toFixed(0);
  // console.log('Minute Difference-->>',minuteDiff)
  const hoursDiff = (parseInt(minuteDiff) / 60).toFixed(0);
  // console.log('Hours Difference--->',hoursDiff);
  const daysDiff = (parseInt(hoursDiff) / 24).toFixed(0);
  // console.log('Days Difference-->>',daysDiff)

  if (timeDifference === 0) {
    return `Just now`;
  }

  if (parseInt(daysDiff) < 1 && parseInt(hoursDiff) < 1) {
    return `${minuteDiff} min ago`;
  }

  if (parseInt(daysDiff) < 1 && parseInt(hoursDiff) >= 1) {
    return `${hoursDiff} hours ago`;
  }

  if (parseInt(daysDiff) >= 1) {
    return `${daysDiff} days ago`;
  }
};

interface objType {
  seconds: number;
  nanoseconds: number;
}

export const myAge = (dobObj: objType) => {
  let DOB = new Date(dobObj?.seconds * 1000 + dobObj?.nanoseconds / 1000000);
  let birtYear = DOB.getFullYear();
  //  console.log('user birtYear--->',birtYear)
  const currentDate = new Date();
  //   console.log('CurrentDate--->',currentDate)
  const currentYear = currentDate.getFullYear();
  //   console.log('currentYear--->',currentYear)
  const userAge = currentYear - birtYear;
  if (userAge > 0) {
    return userAge;
  } else {
    return 1;
  }
};

export const isAtLeast18YearsOld = (dob: Date): boolean => {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  console.log(dob <= eighteenYearsAgo);
  
  return dob <= eighteenYearsAgo;
};