const crypto = require('crypto');

exports.generateId = async()=>{
	const randomBuffer = crypto.randomBytes(4); // Menghasilkan 4 byte (32 bit) acak
	const randomNumber = randomBuffer.readUInt32LE(0); // Konversi buffer menjadi angka 32-bit (little-endian)
	const sevenDigitNumber = randomNumber % 10000000; // Batasi ke 7 digit
	return String(sevenDigitNumber).padStart(7, '0'); // Format sebagai string 7 digit dengan leading zero jika perlu
}
