const express = require('express')
const router = express.Router()
const pool = require('../database/connection')
const otherFunction = require('../function/other')
module.exports = router



router.get('/data-pengajuan-ktp', async(req, res)=>{
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan`
		const [result] = await connection.query(sql, [], {nestTables : false, rowsAsArray : false})
		if(result==0){
			throw new Error('Belum ada pengajuan KTP')
		}
		result.forEach(item=>{
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
			if(item.tanggal_pengambilan != null){
				item.tanggal_pengambilan = otherFunction.formatDate(item.tanggal_pengambilan)
			}
		})
		res.json({
			success : true,
			message : 'Berhasil mendapatkan data pengajuan KTP',
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

router.get('/data-pengajuan-kk', async(req, res)=>{
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan `
		const [result] = await connection.query(sql, [], {nestTables : false, rowsAsArray : false})
		if(result==0){
			throw new Error('Belum ada pengajuan KK')
		}
		result.forEach(item=>{
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
			if(item.tanggal_pengambilan != null){
				item.tanggal_pengambilan = otherFunction.formatDate(item.tanggal_pengambilan)
			}
		})
		res.json({
			success : true,
			message : 'Berhasil mendapatkan data pengajuan KTP',
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

router.get('/data-pengajuan-kia', async(req, res)=>{
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan `
		const [result] = await connection.query(sql, [], {nestTables : false, rowsAsArray : false})
		if(result==0){
			throw new Error('Belum ada pengajuan KIA')
		}
		result.forEach(item=>{
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
			if(item.tanggal_pengambilan != null){
				item.tanggal_pengambilan = otherFunction.formatDate(item.tanggal_pengambilan)
			}
		})
		res.json({
			success : true,
			message : 'Berhasil mendapatkan data pengajuan KIA',
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

router.get('/data-pengajuan-akta-kelahiran', async(req, res)=>{
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan`
		const [result] = await connection.query(sql, [], {nestTables : false, rowsAsArray : false})
		if(result==0){
			throw new Error('Belum ada pengajuan Akta Kelahiran')
		}
		result.forEach(item=>{
			if(item.tanggal_pengambilan != null){
				item.tanggal_pengambilan = otherFunction.formatDate(item.tanggal_pengambilan)
			}
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		res.json({
			success : true,
			message : 'Berhasil mendapatkan data pengajuan akta kelahiran',
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

router.get('/data-scan/:id_pengajuan', async(req,res)=>{
	const {id_pengajuan} = req.params
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT pengajuan_ktp.id_pengajuan_ktp as id_pengajuan, pengajuan_ktp.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_ktp.status 
		FROM pengajuan_ktp JOIN jenis_pengajuan 
		ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE status = ?`
		const [resultKtp] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_kk.id_pengajuan_kk as id_pengajuan, pengajuan_kk.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kk.status 
		FROM pengajuan_kk 
		JOIN jenis_pengajuan 
		ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE status = ?`
		const [resultKk] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray : false})
		sql = `SELECT pengajuan_akta_kelahiran.id_pengajuan_akta_kelahiran as id_pengajuan, pengajuan_akta_kelahiran.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_akta_kelahiran.status 
		FROM pengajuan_akta_kelahiran 
		JOIN jenis_pengajuan 
		ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan 
		WHERE status = ?`
		const [resultAktaKelahiran] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false, rowsAsArray :false})
		sql = `SELECT pengajuan_kia.id_pengajuan_kia as id_pengajuan, pengajuan_kia.tanggal_pengajuan, jenis_pengajuan.nama_pengajuan, pengajuan_kia.status FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE status = ?`
		const [resultKia] = await connection.query(sql, ['terkonfirmasi'], {nestTables : false,rowsAsArray : false})
		// Gabungkan hasil KTP dan KK ke dalam satu array
		const combinedResult = [...resultKtp, ...resultKk, ...resultAktaKelahiran, ...resultKia]
		combinedResult.forEach(item=>{
			item.tanggal_pengajuan = otherFunction.formatDate(item.tanggal_pengajuan)
		})
		const resultByIdPengajuan = combinedResult.find(element=>element.id_pengajuan == id_pengajuan)
		if(resultByIdPengajuan){
			res.json({
				success : true,
				message : 'Berhasil mengambil data scan',
				result : resultByIdPengajuan
			})
		}else{
			throw new Error('Id pengajuan tidak diketahui')
		}
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


router.post('/change-status', async(req, res)=>{
	const {id_pengajuan, kondisi, tanggal_pengambilan} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		if(kondisi == 'terkonfirmasi'){
			sql = `UPDATE pengajuan_akta_kelahiran SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_akta_kelahiran = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_kia SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_kia = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_kk SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_kk = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_ktp SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_ktp = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `SELECT * FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_akta_kelahiran = ?`
			const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_kia = ?`
			const [resultKia] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_ktp = ?`
			const [resultKtp] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_kk = ?`
			const [resultKk] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			const joinResult = [...resultAktaKelahiran, ...resultKia, ...resultKtp, ...resultKk]
			sql = `INSERT INTO notifikasi (id_pengajuan, id_jenis_pengajuan, id_user, tanggal_pengajuan, status) VALUES (?,?,?,?,?)`
			await connection.query(sql, [id_pengajuan, joinResult[0].id_jenis_pengajuan, joinResult[0].id_user, joinResult[0].tanggal_pengajuan, 'terkonfirmasi'])
			const io = req.app.get('io')
			io.emit('notification', {
				id_user : joinResult[0].id_user,
				id_pengajuan:id_pengajuan,
				status : 'terkonfirmasi',
				jenis_pengajuan : joinResult[0].nama_pengajuan
			
			})
		}else{
			sql = `UPDATE pengajuan_akta_kelahiran SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_akta_kelahiran = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_kia SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_kia = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_kk SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_kk = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `UPDATE pengajuan_ktp SET tanggal_pengambilan = ?, status = ? WHERE id_pengajuan_ktp = ?`
			await connection.query(sql, [tanggal_pengambilan, kondisi, id_pengajuan])
			sql = `SELECT * FROM pengajuan_akta_kelahiran JOIN jenis_pengajuan ON pengajuan_akta_kelahiran.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_akta_kelahiran = ?`
			const [resultAktaKelahiran] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_kia JOIN jenis_pengajuan ON pengajuan_kia.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_kia = ?`
			const [resultKia] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_ktp JOIN jenis_pengajuan ON pengajuan_ktp.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_ktp = ?`
			const [resultKtp] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			sql = `SELECT * FROM pengajuan_kk JOIN jenis_pengajuan ON pengajuan_kk.id_jenis_pengajuan = jenis_pengajuan.id_jenis_pengajuan WHERE id_pengajuan_kk = ?`
			const [resultKk] = await connection.query(sql, [id_pengajuan], {nestTables : false, rowsAsArray : false})
			const joinResult = [...resultAktaKelahiran, ...resultKia, ...resultKtp, ...resultKk]
			sql = `INSERT INTO notifikasi (id_pengajuan, id_jenis_pengajuan, id_user, tanggal_pengajuan, status) VALUES (?,?,?,?,?)`
			await connection.query(sql, [id_pengajuan, joinResult[0].id_jenis_pengajuan, joinResult[0].id_user, joinResult[0].tanggal_pengajuan, 'ditolak'])
			const io = req.app.get('io')
			io.emit('notification', {
				id_user : joinResult[0].id_user,
				id_pengajuan:id_pengajuan,
				status : 'ditolak',
				jenis_pengajuan : joinResult[0].nama_pengajuan
			
			})
		}
		res.json({
			success : true,
			message : 'Berhasil mengubah status'
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