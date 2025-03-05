const express = require('express')
const router = express.Router()
const pool = require('../database/connection')
const fs = require('fs')
const path = require('path')
const generateId = require('../function/generate_number')
const otherFunction = require('../function/other')
module.exports = router


router.post('/submission-ktp', async(req, res)=>{
	const {id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, kartu_keluarga, surat_pengantar, formulir_f102} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		
		sql = `INSERT INTO pengajuan_ktp (id_pengajuan_ktp, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, kartu_keluarga, surat_pengantar, formulir_f102, status, id_jenis_pengajuan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
		const resultGenerateId = await generateId.generateId()
		const date = Date.now() +`.pdf`
		const pathAktaKelahiran = `/../files/ktp/akta_kelahiran/${date}`
		const pathKartuKeluarga = `/../files/ktp/kartu_keluarga/${date}`
		const pathSuratPengantar = `/../files/ktp/surat_pengantar/${date}`
		const pathFormulir = `/../files/ktp/formulir/${date}`
		fs.writeFileSync(path.join(__dirname + pathAktaKelahiran),akta_kelahiran, 'base64')
		fs.writeFileSync(path.join(__dirname + pathKartuKeluarga),kartu_keluarga, 'base64')
		fs.writeFileSync(path.join(__dirname + pathSuratPengantar),surat_pengantar, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulir),formulir_f102, 'base64')
		const urlAKtaKelahiran = `/../public/ktp/akta_kelahiran/${date}`
		const urlKartuKeluarga = `/../public/ktp/kartu_keluarga/${date}`
		const urlSuratPengantar = `/../public/ktp/surat_pengantar/${date}`
		const urlFormulir = `/../public/ktp/formulir/${date}`
		await connection.query(sql, [resultGenerateId, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, urlAKtaKelahiran, urlKartuKeluarga, urlSuratPengantar, urlFormulir, 'menunggu', 1])
		res.json({
			success : true,
			message : 'Permohonan berhasil diajukan'
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.post('/submission-kk', async(req, res)=>{
	const {id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, akta_cerai, akta_kematian, akta_nikah, formulir_f102, formulir_f106} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		
		sql = `INSERT INTO pengajuan_kk (id_pengajuan_kk, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, akta_cerai, akta_kematian,akta_nikah, formulir_f102,formulir_f106, status, id_jenis_pengajuan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
		const resultGenerateId = await generateId.generateId()
		const date = Date.now() +`.pdf`
		
		const pathAktaNikah = `/../files/kk/akta_nikah/${date}`
		const pathFormulirF102 = `/../files/kk/formulir_f102/${date}`
		const pathFormulirF106 =  `/../files/kk/formulir_f106/${date}`
		let urlAktaCerai
		let urlAktaKematian
		let urlAKtaKelahiran
		if(akta_cerai != ""){
			const pathAktaCerai = `/../files/kk/akta_cerai/${date}`
			fs.writeFileSync(path.join(__dirname + pathAktaCerai),akta_cerai, 'base64')
			urlAktaCerai = `/../public/kk/akta_cerai/${date}`
		}
		if(akta_kematian != ""){
			const pathAktaKematian = `/../files/kk/akta_kematian/${date}`
			fs.writeFileSync(path.join(__dirname + pathAktaKematian),akta_kematian, 'base64')
			urlAktaKematian = `/../public/kk/akta_kematian/${date}`
		}
		if(akta_kelahiran != ""){
			const pathAktaKelahiran = `/../files/kk/akta_kelahiran/${date}`
			fs.writeFileSync(path.join(__dirname + pathAktaKelahiran),akta_kelahiran, 'base64')
			urlAKtaKelahiran = `/../public/kk/akta_kelahiran/${date}`
		}

		fs.writeFileSync(path.join(__dirname + pathAktaNikah),akta_nikah, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulirF102),formulir_f102, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulirF106),formulir_f106, 'base64')

		const urlAktaNikah = `/../public/kk/akta_nikah/${date}`
		const urlFormulir102 = `/../public/kk/formulir_f102/${date}`
		const urlFormulir106 = `/../public/kk/formulir_f106/${date}`
		await connection.query(sql, [resultGenerateId, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, urlAKtaKelahiran, urlAktaCerai, urlAktaKematian, urlAktaNikah,urlFormulir102, urlFormulir106, 'menunggu', 2])
		
		res.json({
			success : true,
			message : 'Permohonan berhasil diajukan'
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.post('/submission-kia', async(req, res)=>{
	const {id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, kartu_keluarga, formulir_f102} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		const resultGenerateId = await generateId.generateId()
		sql = `INSERT INTO pengajuan_kia (id_pengajuan_kia, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_kelahiran, kartu_keluarga,formulir_f102, status, id_jenis_pengajuan) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
	
		const date = Date.now() +`.pdf`
		const pathAktaKelahiran = `/../files/kia/akta_kelahiran/${date}`
		const pathAktaKeluarga = `/../files/kia/kartu_keluarga/${date}`
		const pathFormulirF102 = `/../files/kia/formulir_f102/${date}`
		fs.writeFileSync(path.join(__dirname + pathAktaKelahiran),akta_kelahiran, 'base64')
		fs.writeFileSync(path.join(__dirname + pathAktaKeluarga),kartu_keluarga, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulirF102),formulir_f102, 'base64')
		const urlAKtaKelahiran = `/../public/kia/akta_kelahiran/${date}`
		const urlAktaKeluarga = `/../public/kia/kartu_keluarga/${date}`
		const urlFormulir102 = `/../public/kia/formulir_f102/${date}`
		await connection.query(sql, [resultGenerateId, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, urlAKtaKelahiran, urlAktaKeluarga,urlFormulir102, 'menunggu', 4])
		res.json({
			success : true,
			message : 'Permohonan berhasil diajukan'
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.post('/submission-akta-kelahiran', async(req, res)=>{
	const {id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_nikah, surat_keterangan_lahir, ktp_ayah, ktp_ibu,ktp_saksi_pertama,ktp_saksi_kedua, formulir_f101, formulir_f102} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		
		sql = `INSERT INTO pengajuan_akta_kelahiran (id_pengajuan_akta_kelahiran, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, akta_nikah, surat_keterangan_lahir, ktp_ayah,ktp_ibu,ktp_saksi_pertama,ktp_saksi_kedua, formulir_f101,formulir_f102, status, id_jenis_pengajuan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
		const resultGenerateId = await generateId.generateId()
		const date = Date.now() +`.pdf`
		const pathAktaNikah = `/../files/akta_kelahiran/akta_nikah/${date}`
		const pathSuratKeteranganLahir = `/../files/akta_kelahiran/surat_keterangan_lahir/${date}`
		const pathKtpAyah = `/../files/akta_kelahiran/ktp_ayah/${date}`
		const pathKtpIbu = `/../files/akta_kelahiran/ktp_ibu/${date}`
		const pathKtpSaksiPertama = `/../files/akta_kelahiran/ktp_saksi_pertama/${date}`
		const pathKtpSaksiKedua =  `/../files/akta_kelahiran/ktp_saksi_kedua/${date}`
		const pathFormulirF101 = `/../files/akta_kelahiran/formulir_f101/${date}`
		const pathFormulirF102 = `/../files/akta_kelahiran/formulir_f102/${date}`
		fs.writeFileSync(path.join(__dirname + pathAktaNikah),akta_nikah, 'base64')
		fs.writeFileSync(path.join(__dirname + pathSuratKeteranganLahir),surat_keterangan_lahir, 'base64')
		fs.writeFileSync(path.join(__dirname + pathKtpAyah),ktp_ayah, 'base64')
		fs.writeFileSync(path.join(__dirname + pathKtpIbu),ktp_ibu, 'base64')
		fs.writeFileSync(path.join(__dirname + pathKtpSaksiPertama),ktp_saksi_pertama, 'base64')
		fs.writeFileSync(path.join(__dirname + pathKtpSaksiKedua),ktp_saksi_kedua, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulirF101),formulir_f101, 'base64')
		fs.writeFileSync(path.join(__dirname + pathFormulirF102),formulir_f102, 'base64')
		const urlAktaNikah = `/../public/akta_kelahiran/akta_nikah/${date}`
		const urlSuratKeteranganLahir = `/../public/akta_kelahiran/surat_keterangan_lahir/${date}`
		const urlKtpAyah = `/../public/akta_kelahiran/ktp_ayah/${date}`
		const urlKtpIbu = `/../public/akta_kelahiran/ktp_ibu/${date}`
		const urlKtpSaksiPertama = `/../public/akta_kelahiran/ktp_saksi_pertama/${date}`
		const urlKtpSaksiKedua = `/../public/akta_kelahiran/ktp_saksi_kedua/${date}`
		const urlFormulir101 = `/../public/akta_kelahiran/formulir_f101/${date}`
		const urlFormulir102 = `/../public/akta_kelahiran/formulir_f102/${date}`
		await connection.query(sql, [resultGenerateId, id_user, nama_lengkap, nik, nomor_kk, tanggal_pengajuan, urlAktaNikah, urlSuratKeteranganLahir, urlKtpAyah,urlKtpIbu, urlKtpSaksiPertama,urlKtpSaksiKedua,urlFormulir101,urlFormulir102, 'menunggu', 3])
	
		res.json({
			success : true,
			message : 'Permohonan berhasil diajukan'
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.get('/waiting-submission/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
		FROM pengajuan_ktp JOIN jenis_pengajuan 
		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_ktp.id_user = ? AND status = ?`
		const [resultKtp] = await connection.query(sql, [id_user, 'menunggu'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
		FROM pengajuan_kk 
		JOIN jenis_pengajuan 
		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_kk.id_user = ? AND status = ?`
		const [resultKk] = await connection.query(sql, [id_user, 'menunggu'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
		FROM pengajuan_akta_kelahiran 
		JOIN jenis_pengajuan 
		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_akta_kelahiran.id_user = ? AND status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_user, 'menunggu'], {nestTables : false, rowsAsArray :false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_user = ? AND status = ?`
		const [resultKia] = await connection.query(sql, [id_user, 'menunggu'], {nestTables : false,rowsAsArray : false})
		 // Gabungkan hasil KTP dan KK ke dalam satu array
		 const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]

		 // Urutkan array berdasarkan tanggal terdahulu
		 combinedResult.sort((a, b) => {
		   const dateA = otherFunction.formatDate(a.tanggal_pengajuan)
		   const dateB = otherFunction.formatDate(b.tanggal_pengajuan)
		   return dateB - dateA;
		 })
		 combinedResult.forEach(item=>{
			item.tanggal = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		res.json({
			success : true,
			message : 'Berhasil mengambil data menunggu pengajuan',
			result : combinedResult
		})

	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.get('/confirm-submission/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
		FROM pengajuan_ktp JOIN jenis_pengajuan 
		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_ktp.id_user = ? AND status = ?`
		const [resultKtp] = await connection.query(sql, [id_user, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
		FROM pengajuan_kk 
		JOIN jenis_pengajuan 
		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_kk.id_user = ? AND status = ?`
		const [resultKk] = await connection.query(sql, [id_user, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
		FROM pengajuan_akta_kelahiran 
		JOIN jenis_pengajuan 
		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_akta_kelahiran.id_user = ? AND status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_user, 'terkonfirmasi'], {nestTables : false, rowsAsArray :false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_user = ? AND status = ?`
		const [resultKia] = await connection.query(sql, [id_user, 'terkonfirmasi'], {nestTables : false,rowsAsArray : false})
		 // Gabungkan hasil KTP dan KK ke dalam satu array
		 const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]

		 // Urutkan array berdasarkan tanggal terdahulu
		 combinedResult.sort((a, b) => {
		   const dateA = otherFunction.formatDate(a.tanggal_pengajuan)
		   const dateB = otherFunction.formatDate(b.tanggal_pengajuan)
		   return dateB - dateA;
		 })
		 combinedResult.forEach(item=>{
			item.tanggal = otherFunction.formatDate(item.tanggal_pengajuan)
	
		})
		res.json({
			success : true,
			message : 'Berhasil mengambil data terkonfirmasi pengajuan',
			result : combinedResult
		})

	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.get('/completed-submission/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
		FROM pengajuan_ktp JOIN jenis_pengajuan 
		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_ktp.id_user = ? AND status = ?`
		const [resultKtp] = await connection.query(sql, [id_user, 'selesai'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
		FROM pengajuan_kk 
		JOIN jenis_pengajuan 
		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_kk.id_user = ? AND status = ?`
		const [resultKk] = await connection.query(sql, [id_user, 'selesai'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
		FROM pengajuan_akta_kelahiran 
		JOIN jenis_pengajuan 
		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_akta_kelahiran.id_user = ? AND status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_user, 'selesai'], {nestTables : false, rowsAsArray :false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_user = ? AND status = ?`
		const [resultKia] = await connection.query(sql, [id_user, 'selesai'], {nestTables : false,rowsAsArray : false})
		 // Gabungkan hasil KTP dan KK ke dalam satu array
		 const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]

		 // Urutkan array berdasarkan tanggal terdahulu
		 combinedResult.sort((a, b) => {
		   const dateA = otherFunction.formatDate(a.tanggal_pengajuan)
		   const dateB = otherFunction.formatDate(b.tanggal_pengajuan)
		   return dateB - dateA;
		 })
		 combinedResult.forEach(item=>{
			item.tanggal = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		res.json({
			success : true,
			message : 'Berhasil mengambil data selesai pengajuan',
			result : combinedResult
		})

	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})


router.get('/reject-submission/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
		FROM pengajuan_ktp JOIN jenis_pengajuan 
		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_ktp.id_user = ? AND status = ?`
		const [resultKtp] = await connection.query(sql, [id_user, 'ditolak'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
		FROM pengajuan_kk 
		JOIN jenis_pengajuan 
		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_kk.id_user = ? AND status = ?`
		const [resultKk] = await connection.query(sql, [id_user, 'ditolak'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
		FROM pengajuan_akta_kelahiran 
		JOIN jenis_pengajuan 
		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE pengajuan_akta_kelahiran.id_user = ? AND status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_user, 'ditolak'], {nestTables : false, rowsAsArray :false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_user = ? AND status = ?`
		const [resultKia] = await connection.query(sql, [id_user, 'ditolak'], {nestTables : false,rowsAsArray : false})
		 // Gabungkan hasil KTP dan KK ke dalam satu array
		 const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]

		 // Urutkan array berdasarkan tanggal terdahulu
		 combinedResult.sort((a, b) => {
		   const dateA = otherFunction.formatDate(a.tanggal_pengajuan)
		   const dateB = otherFunction.formatDate(b.tanggal_pengajuan)
		   return dateB - dateA;
		 })
		 combinedResult.forEach(item=>{
			item.tanggal = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		res.json({
			success : true,
			message : 'Berhasil mengambil data ditolak pengajuan',
			result : combinedResult
		})

	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})



router.get('/detail-waiting/:id_pengajuan', async(req, res)=>{
	const {id_pengajuan} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.nama_lengkap, pengajuan_akta_kelahiran.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran = ? AND pengajuan_akta_kelahiran.status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan, 'menunggu'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.nama_lengkap, pengajuan_kk.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kk.id_pengajuan_kk = ? AND pengajuan_kk.status = ?`
		const [resultKk] = await connection.query(sql, [id_pengajuan, 'menunggu'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.nama_lengkap, pengajuan_ktp.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_ktp.id_pengajuan_ktp = ? AND pengajuan_ktp.status = ?`
		const [resultKtp] = await connection.query(sql, [id_pengajuan, 'menunggu'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.nama_lengkap, pengajuan_kia.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_pengajuan_kia = ? AND pengajuan_kia.status = ?`
		const [resultKia] = await connection.query(sql, [id_pengajuan, 'menunggu'], {nestTables : false, rowsAsArray : false})
		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]
		res.json({
			success : true,
			message : 'Berhasil mengambil data detail menunggu',
			result : combinedResult
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})


router.get('/detail-confirm/:id_pengajuan', async(req, res)=>{
	const {id_pengajuan} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengambilan, jenis_pengajuan.nama_pengajuan FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran = ? AND pengajuan_akta_kelahiran.status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengambilan, jenis_pengajuan.nama_pengajuan FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kk.id_pengajuan_kk = ? AND pengajuan_kk.status = ?`
		const [resultKk] = await connection.query(sql, [id_pengajuan, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengambilan, jenis_pengajuan.nama_pengajuan FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_ktp.id_pengajuan_ktp = ? AND pengajuan_ktp.status = ?`
		const [resultKtp] = await connection.query(sql, [id_pengajuan, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengambilan, jenis_pengajuan.nama_pengajuan FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_pengajuan_kia = ? AND pengajuan_kia.status = ?`
		const [resultKia] = await connection.query(sql, [id_pengajuan, 'terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]

		combinedResult.forEach(item=>{
			item.tanggal_pengambilan = otherFunction.formatDate(item.tanggal_pengambilan)
		})
		res.json({
			success : true,
			message : 'Berhasil mengambil data detail terkonfirmasi',
			result : combinedResult
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})


router.get('/detail-completed/:id_pengajuan', async(req, res)=>{
	const {id_pengajuan} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.nama_lengkap, pengajuan_akta_kelahiran.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran = ? AND pengajuan_akta_kelahiran.status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan, 'selesai'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.nama_lengkap, pengajuan_kk.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kk.id_pengajuan_kk = ? AND pengajuan_kk.status = ?`
		const [resultKk] = await connection.query(sql, [id_pengajuan, 'selesai'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.nama_lengkap, pengajuan_ktp.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_ktp.id_pengajuan_ktp = ? AND pengajuan_ktp.status = ?`
		const [resultKtp] = await connection.query(sql, [id_pengajuan, 'selesai'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.nama_lengkap, pengajuan_kia.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_pengajuan_kia = ? AND pengajuan_kia.status = ?`
		const [resultKia] = await connection.query(sql, [id_pengajuan, 'selesai'], {nestTables : false, rowsAsArray : false})
		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]
		res.json({
			success : true,
			message : 'Berhasil mengambil data detail selesai',
			result : combinedResult
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.get('/detail-reject/:id_pengajuan', async(req, res)=>{
	const {id_pengajuan} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.nama_lengkap, pengajuan_akta_kelahiran.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran = ? AND pengajuan_akta_kelahiran.status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan, 'ditolak'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.nama_lengkap, pengajuan_kk.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kk.id_pengajuan_kk = ? AND pengajuan_kk.status = ?`
		const [resultKk] = await connection.query(sql, [id_pengajuan, 'ditolak'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.nama_lengkap, pengajuan_ktp.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_ktp.id_pengajuan_ktp = ? AND pengajuan_ktp.status = ?`
		const [resultKtp] = await connection.query(sql, [id_pengajuan, 'ditolak'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.nama_lengkap, pengajuan_kia.nik, jenis_pengajuan.nama_pengajuan FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE pengajuan_kia.id_pengajuan_kia = ? AND pengajuan_kia.status = ?`
		const [resultKia] = await connection.query(sql, [id_pengajuan, 'ditolak'], {nestTables : false, rowsAsArray : false})
		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]
		res.json({
			success : true,
			message : 'Berhasil mengambil data detail ditolak',
			result : combinedResult
		})
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})

router.get('/notification/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM notifikasi JOIN jenis_pengajuan ON notifikasi.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_user = ?`
		const [resultNotication] = await connection.query(sql, [id_user], {nestTables : false, rowsAsArray : false})
		if(resultNotication==0){
			throw new Error('Belum ada notifikasi')
		}
		resultNotication.forEach(item=>{
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		resultNotication.sort((a, b) => {
			const dateA = otherFunction.formatDate(a.tanggal_pengajuan)
			const dateB = otherFunction.formatDate(b.tanggal_pengajuan)
			return dateB - dateA;
		  })
		res.json({
			success : true,
			message : 'Berhasil mendapatkan notifikasi',
			result : resultNotication
		})
		
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})


router.get('/profile/:id_user', async(req, res)=>{
	const {id_user} = req.params
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM users WHERE id_user = ?`
		const [result] = await connection.query(sql, [id_user], {nestTables : false, rowsAsArray : false})
		res.json({
			success : true,
			message : 'Berhasil mendapatkan data profil',
			result
		})

	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})


router.put('/edit-profile', async(req, res)=>{
	const {id_user, foto, nama_lengkap, email, nomor_telepon} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM users WHERE id_user = ?`
		const [result] = await connection.query(sql, [id_user], {nestTables : false, rowsAsArray : false})
		console.log(result[0].foto)
		console.log(foto)
		if(result[0].foto == foto){
			sql = `UPDATE users SET nama_lengkap = ?, email = ?, nomor_telepon = ?, foto = ? WHERE id_user = ?`
			await connection.query(sql, [nama_lengkap, email, nomor_telepon, foto, id_user])
			console.log('1')
		}else{
			const randomNumber = await generateId.generateId()
			fs.writeFileSync(path.join(__dirname + `/../files/profile/${randomNumber+'.png'}`),foto, 'base64')
			const url = `/public/profile/${randomNumber+'.png'}`
			sql = `UPDATE users SET nama_lengkap = ?, email = ?, nomor_telepon = ?, foto = ? WHERE id_user = ?`
			await connection.query(sql, [nama_lengkap, email, nomor_telepon, url, id_user])
			console.log('2')
		}
		res.json({
			success : true,
			message : 'Berhasil memperbarui profil'
		})
		
	} catch (error) {
		res.json({
			success : false,
			message : error.message
		})
	}finally{
		if(connection){
			connection.release()
		}
	}
})
