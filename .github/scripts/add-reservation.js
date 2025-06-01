const fs = require('fs');

const seatsStr = process.argv[2];
const code = process.argv[3];
const newSeats = seatsStr.split(',').map(s => s.trim());

const filePath = 'reserved-seats.json';

let reserved = [];
if (fs.existsSync(filePath)) {
  reserved = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

newSeats.forEach(seat => {
  if (!reserved.some(r => r.seat === seat)) {
    reserved.push({ seat, code });
  }
});

fs.writeFileSync(filePath, JSON.stringify(reserved, null, 2));
console.log('Updated reserved-seats.json');
