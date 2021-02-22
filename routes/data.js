const express = require('express')
const app = express();
const fs = require("fs");
var _ = require('lodash');
var moment = require('moment');

// display data
app.get('/', (req, res) => {
	res.render('index', {title: 'Data', page: 'data'});
})

app.post('/list', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		let cari = req.body,
			query = "SELECT * FROM pasien WHERE 1=1";
		if (!_.isEmpty(cari.tgl_awal) && _.isEmpty(cari.tgl_akhir)) query += " AND tanggal >= '"+cari.tgl_awal+"'";
		else if (_.isEmpty(cari.tgl_awal) && !_.isEmpty(cari.tgl_akhir)) query += " AND tanggal <= '"+cari.tgl_akhir+"'";
		else if (!_.isEmpty(cari.tgl_awal) && !_.isEmpty(cari.tgl_akhir)) {
			if (cari.tgl_awal === cari.tgl_akhir) query += " AND tanggal = '"+cari.tgl_awal+"'";
			else query += " AND tanggal >= "+cari.tgl_awal+" AND tanggal <= '"+cari.tgl_akhir+"'";
		}
		query += " LIMIT 10";

		conn.query(query, (err, rows) => {
			if (err) throw err;
			let data = [];
			_.forEach(rows, (o,i) => {
				data.push(
					{
						no: i+1,
						id: o.id,
						tanggal: o.tanggal,
						no_pasien: o.no_pasien,
						usia: o.usia,
						status: o.status,
						created_at: o.created_at
					}
				)
			})
			res.json({
				data: data
			})
		})
	})
})

app.post('/simpan', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		else {
			let pasien = req.body.pasien, label = req.body.label;
			if (label==='Tambah') {
				let data = Object.assign(pasien, { created_at: moment().format('YYYY-MM-DD') });
				conn.query('INSERT INTO pasien SET ?', data, (err) => {
					if (err) throw err;
					res.json({
						results: 'success'
					})
				})
			}
			else {
				let data = Object.assign(pasien, { updated_at: moment().format('YYYY-MM-DD') });
				conn.query('UPDATE pasien SET ? WHERE id = '+pasien.id, data, (err) => {
					if (err) throw err;
					res.json({
						results: 'success'
					})
				})
			}
		}
	})
})

app.get('/hapus/:id', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query('DELETE FROM pasien WHERE id = '+req.params.id, (err) => {
			if (err) throw err;
			res.json({
				results: 'success'
			})
		})
	})
})

app.get('/download', (req, res) => {

})
module.exports = app;