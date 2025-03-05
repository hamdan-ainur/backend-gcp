const pool = require('../database/connection')


exports.formatDate= (dateString)=>{
	try {
		// Buat objek Date dari string tanggal dan waktu
		const dateObj = new Date(dateString);

		// Dapatkan nilai tanggal, bulan, dan tahun
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0 (Januari) hingga 11 (Desember)
		const year = dateObj.getFullYear();
	  
		// Dapatkan nilai jam, menit, dan detik
		const hours = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const seconds = dateObj.getSeconds();
	  
		// Format tanggal
		const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
	  
		// Format waktu
		const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	  
		// Gabungkan tanggal dan waktu
		const formattedDateTime = `${formattedDate}`;
	  
		return formattedDateTime;
	} catch (error) {
		console.log('Format data', error.message)
	}
}


// exports.getDataAll = async(id_pengajuan)=>{
// 	const {id_pengajuan} = req.params
// 	let connection
// 	try {
// 		connection = await pool.getConnection()
// 		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
// 		FROM pengajuan_ktp JOIN jenis_pengajuan 
// 		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
// 		WHERE status = ?`
// 		const [resultKtp] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray : false})
// 		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
// 		FROM pengajuan_kk 
// 		JOIN jenis_pengajuan 
// 		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
// 		WHERE status = ?`
// 		const [resultKk] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray : false})
// 		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
// 		FROM pengajuan_akta_kelahiran 
// 		JOIN jenis_pengajuan 
// 		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
// 		WHERE status = ?`
// 		const [resultAktaKelahiran] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray :false})
// 		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE status = ?`
// 		const [resultKia] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false,rowsAsArray : false})
// 		// Gabungkan hasil KTP dan KK ke dalam satu array
// 		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]
// 		console.log(combinedResult)
// 		if(combinedResult[0].id_pengajuan == id_pengajuan){
// 			combinedResult.forEach(item=>{
// 				item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
// 			})
// 			res.json({
// 				success : true,
// 				message : 'Berhasil mengambil data scan',
// 				result : combinedResult
// 			})
// 		} 
// 	} catch (error) {
// 		res.json({
// 			success : false,
// 			message : error.message
// 		})
// 	}finally{
// 		if(connection){
// 			connection.release()
// 		}
// 	}
// }