const users = [
    { id: 1, name: 'John', email: 'john@gmail.com', password: '1234' },
    { id: 2, name: 'Snow', email: 'snow@gmail.com', password: '1234' },
    { id: 3, name: 'Harry', email: 'harry@gmail.com', password: '1234' },
    { id: 4, name: 'Potter', email: 'potter@gmail.com', password: '1234' }
];

const location_notes = [
    { cordinate: [28.456970, 77.060900], text: 'Hey! This is Gurgaon', userId: 1 },
    { cordinate: [28.612911, 77.229507], text: 'Hey! This is Delhi', userId: 2 },
    { cordinate: [28.5355, 77.3910], text: 'Hey! This Noida', userId: 3 },
    { cordinate: [29.945690, 78.164246], text: 'Hey! This is Haridwar', userId: 1 }
];

module.exports.getUsers = function () {
    return users;
}

module.exports.getLocationNotes = function () {
    return location_notes;
}