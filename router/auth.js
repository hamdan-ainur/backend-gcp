const express = require('express')
const router = express.Router()
const pool = require('../database/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10
module.exports = router


router.post('/register', async(req, res)=>{
	const {email, password, nama_lengkap, nik, tanggal_lahir, jenis_kelamin, nomor_telepon} = req.body
	let connection
	let sql
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM users WHERE email = ?`
		const [resultCheckEmail] = await connection.query(sql, [email], {nestTables : false, rowsAsArray : false})
		if(resultCheckEmail !=0){
			throw new Error('Email sudah pernah digunakan')
		}
		sql = `SELECT * FROM users WHERE nik = ?`
		const [resultCheckNik] = await connection.query(sql, [nik], {nestTables : false, rowsAsArray : false})
		if(resultCheckNik !=0){
			throw new Error('NIK sudah pernah digunakan')
		}
		const hashPassword = await bcrypt.hash(password, saltRounds);
		sql = `INSERT INTO users (email, password, nama_lengkap, nik, tanggal_lahir, jenis_kelamin, nomor_telepon, role) VALUES (?,?,?,?,?,?,?,?)`
		await connection.query(sql, [email, hashPassword, nama_lengkap, nik, tanggal_lahir, jenis_kelamin, nomor_telepon, 'pengguna'])
		res.json({
			success : true,
			message : 'Registrasi berhasil'
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


router.post('/login', async(req, res)=>{
	const {email, password} = req.body
	let connection
	try {
		connection = await pool.getConnection()
		sql = `SELECT * FROM users WHERE email = ?`
		const [result] = await connection.query(sql, [email], {nestTables : false, rowsAsArray : false})
		if(result==0){
			throw new Error('Akun tidak valid')
		}
		if(result[0].role == 'pengguna'){
			let isPasswordTrue = await bcrypt.compare(password,result[0].password)
			if(!isPasswordTrue){
				throw new Error('Password salah')
			}
			res.json({
				success : true,
				message : 'Login berhasil',
				role : result[0].role,
				id_user : result[0].id_user
				})
		}else{
			let isPasswordTrue = await bcrypt.compare(password,result[0].password)
			if(!isPasswordTrue){
				throw new Error('Password salah')
			}
			res.json({
				success : true,
				message : 'Login berhasil',
				role : result[0].role,
				id_user : result[0].id_user
				})
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