//inputs value
let maleYear,
  maleMonth,
  maleDay,
  femaleYear,
  femaleMonth,
  femaleDay,
  conceptionYear,
  conceptionMonth,
  menstrualCicleStart,
  menstrualCycleLength,
  ovulationPeriod = {};
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

  let maleInexConceptionDays = [];
  let femaleInexConceptionDays = [];

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
  .addEventListener('change', e => {
    femaleMonth = e.target.value;

    var request = new XMLHttpRequest();
    request.open('GET', 'db/maleFinalSum.json', true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        maleFinalSumData = JSON.parse(request.responseText);
      }
    };

    var requestMaleFinal = new XMLHttpRequest();
    requestMaleFinal.open('GET', 'db/femaleFinalSum.json', true);
    requestMaleFinal.send();
    requestMaleFinal.onreadystatechange = function() {
      if (requestMaleFinal.readyState === 4 && requestMaleFinal.status === 200) {
        femaleFinalSumData = JSON.parse(requestMaleFinal.responseText);
      }
    };

  });
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
var requestFemaleConceptionDay = new XMLHttpRequest();
requestFemaleConceptionDay.open('GET', 'db/femaleConceptionDay.json', true);
requestFemaleConceptionDay.send();
requestFemaleConceptionDay.onreadystatechange = function() {
  if (requestFemaleConceptionDay.readyState === 4 && requestFemaleConceptionDay.status === 200) {
    femaleConceptionDayData = JSON.parse(requestFemaleConceptionDay.responseText);
  }
};

var requestMaleConceptionDay = new XMLHttpRequest();
requestMaleConceptionDay.open('GET', 'db/maleConceptionDay.json', true);
requestMaleConceptionDay.send();
requestMaleConceptionDay.onreadystatechange = function() {
  if (requestMaleConceptionDay.readyState === 4 && requestMaleConceptionDay.status === 200) {
    maleConceptionDayData = JSON.parse(requestMaleConceptionDay.responseText);
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
function calcFinal(data, num) {
  let keyIndex;
  Object.keys(data).forEach(key => {
    if(data[key].includes(+num)){
      keyIndex = key;
    }
  });
  return keyIndex;
}
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

document.querySelector('#menstrualCicleStart').addEventListener('change', (e) => {
  menstrualCicleStart = new Date(e.target.value) ;
});

document.querySelector('#cycleLength').addEventListener('change', (e) => {
  menstrualCycleLength = e.target.value;
  menstruationDays = +menstrualCicleStart.getDate() + +menstrualCycleLength - 15;
  let ovluationPeriodStart = menstrualCicleStart.addDays(menstruationDays);
  let ovaluationPeriodEnd = ovluationPeriodStart.addDays(7);

  ovulationPeriod.start = ovluationPeriodStart;
  ovulationPeriod.end = ovaluationPeriodEnd;
  ovulationPeriod.daysArr = [];
  for(let i= ovulationPeriod.start.getDate(); i <= ovulationPeriod.end.getDate(); i++) {
    ovulationPeriod.daysArr.push(i);
  }

  maleInexConceptionDays= [];
  femaleInexConceptionDays=[];  

  for(let i = 0; i < ovulationPeriod.daysArr.length; i++ ) {

    maleInexConceptionDays.push(getDayIndex(maleConceptionDayData, ovulationPeriod.daysArr[i] ) +1);
    femaleInexConceptionDays.push(getDayIndex(femaleConceptionDayData, ovulationPeriod.daysArr[i] ));
  }


});

sumbit.addEventListener('click', e => {
  document.querySelector('.color-description').style.display = "block";
  e.preventDefault();
  //male table indexes
  let maleIndexYear = getYearIndex(maleYearData, conceptionYear, maleYear);
  let maleIndexMonth = maleMonthData[`${maleMonth}`];
  let maleIndexDay = getDayIndex(maleDayData, maleDay);
  let maleindexYearMonthconception =
    maleConceptionMonthData[`${conceptionMonth}`];

  //female table indexes
  let femaleIndexYear = getYearIndex(
    femaleYearData,
    conceptionYear,
    femaleYear
  );
  let femaleIndexMonth = femaleMonthData[`${femaleMonth}`];
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

    let newArrboy = [];
    let newArrgirl = [];
    let finalMaleResult = [];
    let finalFemaleResult = [];
    let calendarMale = [];
    let calendarFemale = [];

    for(let i = 0; i < ovulationPeriod.daysArr.length; i++ ) {
      newArrboy.push( maleIndexSum + maleInexConceptionDays[i]);
      newArrgirl.push( femaleIndexSum + femaleInexConceptionDays[i]);
      finalMaleResult.push(calcFinal(maleFinalSumData, newArrboy[i]));
      finalFemaleResult.push(calcFinal(femaleFinalSumData, newArrgirl[i]));
      if(finalMaleResult[i] > finalFemaleResult[i]) {
        calendarMale.push(`${ovulationPeriod.start.getMonth() + 1}/${ovulationPeriod.daysArr[i]}/${ovulationPeriod.start.getFullYear()}`);
      }else if(finalMaleResult[i] < finalFemaleResult[i]){
        

        calendarFemale.push(`${ovulationPeriod.start.getMonth() + 1}/${ovulationPeriod.daysArr[i]}/${ovulationPeriod.start.getFullYear()}`);
      }
    }
    console.log(ovulationPeriod.start);
    console.log(ovulationPeriod.start.getMonth() + 1);
    console.log(ovulationPeriod.start.getFullYear());

    let dates1 = [...calendarMale];
    let dates2 = [...calendarFemale];
    
    $('#calendar').datepicker({
        dateFormat: 'dd/mm/yy',
        defaultDate: ovulationPeriod.start, // this line is for testing
        beforeShowDay: highlightDays
    });  

    function highlightDays(date) {
      for (var i = 0; i < dates1.length; i++) {
          if (new Date(dates1[i]).toString() == date.toString()) {
              return [true, 'highlightMale'];
          }
      }
      for (var i = 0; i < dates2.length; i++) {
        if (new Date(dates2[i]).toString() == date.toString()) {
            return [true, 'highlightFeMale'];
        }
    }
      return [true, ''];
  }
  
});



