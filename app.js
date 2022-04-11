const ical = require("node-ical");

const events = ical.sync.parseFile("./events/ical.ics");

console.log(getBookableDays(2022));

function getAllDaysOfYear(year) {
    let dt = new Date(Date.UTC(year, 0, 1));
    let days = [];

    while (dt.getUTCFullYear() === year) {
        days.push(new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),24,0,0,0));

        dt.setUTCDate(dt.getUTCDate() + 1);
    }

    return days;
}

function getBookableDays(year) {
    let bookableDays = [];

    let parseYear = parseInt(year);

    let days = getAllDaysOfYear(parseYear);

    for (const event of Object.values(events)) {
        let startDt = new Date(event.start);
        let endDt = new Date(event.end);

        let bookedDays = days.filter(f => f >= startDt && f <=  endDt);

        days = days.filter(x => !bookedDays.includes(x));
    }

    for(let i = 0; i< days.length; i++) {
        bookableDays.push({
            "date": days[i],
            "bookable":true
        });
    }

    return bookableDays;
}

exports.getBookableDays = getBookableDays;