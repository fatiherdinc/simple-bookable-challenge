const bookableDays = require("./app");

test('year can be number', () => {
    expect(bookableDays.getBookableDays('2022')).toEqual(expect.arrayContaining([
        expect.objectContaining({
            "bookable":true
        })
    ]))
});