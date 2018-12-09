//inputs value
let maleYear,
  maleMonth,
  maleDay,
  femaleYear,
  femaleMonth,
  femaleDay,
  conceptionYear,
  conceptionMonth;
//data
let femaleYearData,
  femaleMonthData,
  femaleDayData,
  femaleConceptionMonthData,
  femaleConceptionDayData,
  femaleFinalSumData,
  maleYearData,
  maleMonthData,
  maleDayData,
  maleConceptionMonthData,
  maleConceptionDayData,
  maleFinalSumData;
//get days in the month according month and year
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
//check if year is leap or not
const isLeap = year => new Date(year, 1, 29).getDate() === 29;

document
  .querySelector('input[name="maleYear"]')
  .addEventListener('change', e => {
    maleYear = e.target.value;
    // getting male data of months indexes according the year is leap or not
    let reqData = isLeap(maleYear)
      ? 'maleMonthLeapYear'
      : 'maleMonthNonLeapYear';
    var request = new XMLHttpRequest();
    request.open('GET', `db/${reqData}.json`, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        maleMonthData = JSON.parse(request.responseText);
      }
    };
  });

document
  .querySelector('input[name="maleMonth"]')
  .addEventListener('change', e => (maleMonth = e.target.value));
document
  .querySelector('input[name="maleDay"]')
  .addEventListener('change', e => {
    maleDay = e.target.value;
    //getting male days data according to total days counth
    const totalDays = daysInMonth(maleMonth, maleYear);
    let monthdays;
    if (totalDays === 30) {
      monthdays = 30;
    } else if (totalDays === 29) {
      monthdays = 29;
    } else if (totalDays === 28) {
      monthdays = 28;
    } else {
      monthdays = 31;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `db/maleDay${monthdays}.json`, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        maleDayData = JSON.parse(request.responseText);
      }
    };
  });

document
  .querySelector('input[name="femaleYear"]')
  .addEventListener('change', e => {
    // getting female data of months indexes according the year is leap or not
    femaleYear = e.target.value;
    let reqData = isLeap(maleYear)
      ? 'femaleMonthLeapYear'
      : 'femaleMonthNonLeapYear';
    var request = new XMLHttpRequest();
    request.open('GET', `db/${reqData}.json`, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        femaleMonthData = JSON.parse(request.responseText);
      }
    };
  });
document
  .querySelector('input[name="femaleMonth"]')
  .addEventListener('change', e => (femaleMonth = e.target.value));
document
  .querySelector('input[name="femaleDay"]')
  .addEventListener('change', e => {
    femaleDay = e.target.value;
    //getting male days data according to total days counth
    const totalDays = daysInMonth(femaleMonth, femaleYear);
    let monthdays;
    if (totalDays === 30) {
      monthdays = 30;
    } else if (totalDays === 29) {
      monthdays = 29;
    } else if (totalDays === 28) {
      monthdays = 28;
    } else {
      monthdays = 31;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `db/femaleDay${monthdays}.json`, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        femaleDayData = JSON.parse(request.responseText);
      }
    };
  });

document
  .querySelector('input[name="conceptionYear"]')
  .addEventListener('change', e => {
    conceptionYear = e.target.value;
    // getting datas for male/female-conception month data according year is leap or not
    let reqData = isLeap(conceptionYear)
      ? 'maleConceptionMonthLeap'
      : 'maleConceptionMonthNonLeap';
    var request = new XMLHttpRequest();
    request.open('GET', `db/${reqData}.json`, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        maleConceptionMonthData = JSON.parse(request.responseText);
      }
    };
    let reqDatafemale = isLeap(conceptionYear)
      ? 'femaleConceptionMonthLeap'
      : 'femaleConceptionMonthNonLeap';
    var requestFemale = new XMLHttpRequest();
    requestFemale.open('GET', `db/${reqDatafemale}.json`, true);
    requestFemale.send();
    requestFemale.onreadystatechange = function() {
      if (requestFemale.readyState === 4 && requestFemale.status === 200) {
        femaleConceptionMonthData = JSON.parse(requestFemale.responseText);
      }
    };
  });
document
  .querySelector('input[name="conceptionMonth"]')
  .addEventListener('change', e => {
    conceptionMonth = e.target.value;
  });

const sumbit = document.querySelector('button[type="submit"]');

var requestFemaleYear = new XMLHttpRequest();
requestFemaleYear.open('GET', 'db/female1.json', true);
requestFemaleYear.send();
requestFemaleYear.onreadystatechange = function() {
  if (requestFemaleYear.readyState === 4 && requestFemaleYear.status === 200) {
    femaleYearData = JSON.parse(requestFemaleYear.responseText);
  }
};
var requestmaleYear = new XMLHttpRequest();
requestmaleYear.open('GET', 'db/male1.json', true);
requestmaleYear.send();
requestmaleYear.onreadystatechange = function() {
  if (requestmaleYear.readyState === 4 && requestmaleYear.status === 200) {
    maleYearData = JSON.parse(requestmaleYear.responseText);
  }
};
function getYearIndex(data, conception_year, male_year) {
  for (let i = 0; i < data[conception_year].length; i++) {
    if (data[conception_year][i][i].includes(+male_year)) {
      return i;
    }
  }
}
function getDayIndex(data, number) {
  let index;
  Object.values(data).map((arr, key) => {
    if (arr.includes(+number)) {
      index = key;
    }
  });
  return index;
}

sumbit.addEventListener('click', e => {
  e.preventDefault();
  //male table indexes
  let maleIndexYear = getYearIndex(maleYearData, conceptionYear, maleYear);
  let maleIndexMonth = maleConceptionMonthData[`${maleMonth}`];
  let maleIndexDay = getDayIndex(maleDayData, maleDay);
  let maleindexYearMonthconception =
    maleConceptionMonthData[`${conceptionMonth}`];

  //female table indexes
  let femaleIndexYear = getYearIndex(
    femaleYearData,
    conceptionYear,
    femaleYear
  );
  let femaleIndexMonth = femaleConceptionMonthData[`${femaleMonth}`];
  let femaleIndexDay = getDayIndex(femaleDayData, femaleDay);
  let femaleindexYearMonthconception =
    femaleConceptionMonthData[`${conceptionMonth}`];

  let maleIndexSum =
    +maleIndexYear +
    +maleIndexMonth +
    +maleIndexDay +
    +maleindexYearMonthconception;
  let femaleIndexSum =
    +femaleIndexYear +
    +femaleIndexMonth +
    +femaleIndexDay +
    +femaleindexYearMonthconception;
  console.log(maleIndexSum);
  console.log(femaleIndexSum);
});
