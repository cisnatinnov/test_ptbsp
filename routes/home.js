const express = require('express')
const app = express();
// display home page
app.get('/', (req, res) => {
	res.render('index', {title: 'Monitoring COVID 19', page: 'home'});
})

app.get('/keterangan', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT COUNT(id) as sembuh FROM pasien WHERE status = 'Sembuh'", (errSembuh, sembuhs) => {
				if(errSembuh) throw errSembuh
				else {
					conn.query("SELECT COUNT(id) as dirawat FROM pasien WHERE status = 'Dirawat'", (errDirawat, dirawats) => {
						if(errDirawat) throw errDirawat
						else {
							conn.query("SELECT COUNT(id) as meninggal FROM pasien WHERE status = 'Meninggal'", (errMeninggal, meninggals) => {
								if(errMeninggal) throw errMeninggal
								else {
									res.json(
										{
											data: [
												{
													name: 'Sembuh',
													y: sembuhs[0].sembuh,
													color: 'blue'	
												},
												{
													name: 'Dirawat',
													y: dirawats[0].dirawat,
													color: 'red'
												},
												{
													name: 'Meninggal',
													y: meninggals[0].meninggal,
													color: 'yellow'
												}
											]
										}
									)
								}
							})
						}
					})
				}
			})
		}
	})
})

app.get('/usia', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT COUNT(id) as pasien FROM pasien WHERE usia < 17", (errPasien, pasiens) => {
				if(errPasien) throw errPasien
				else {
					conn.query("SELECT COUNT(id) as pasien FROM pasien WHERE usia >= 17 && usia <= 40", (errTujuhBelas, tujuhBelas) => {
						if(errTujuhBelas) throw errTujuhBelas
						else {
							conn.query("SELECT COUNT(id) as pasien FROM pasien WHERE usia > 40", (errFourty, rows) => {
								if(errFourty) throw errFourty
								else {
									res.json(
										{
											data: [
												{
													name: '< 17',
													y: pasiens[0].pasien,
													color: 'blue'	
												},
												{
													name: '17 - 40',
													y: tujuhBelas[0].pasien,
													color: 'red'
												},
												{
													name: '> 40',
													y: rows[0].pasien,
													color: 'yellow'
												}
											]
										}
									)
								}
							})
						}
					})
				}
			})
		}
	})
})

app.get('/jumlah', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT tanggal FROM pasien GROUP BY tanggal", (err, rows) => {
				if(err) throw err
				else {
					conn.query("SELECT COUNT(id) as pasien FROM pasien GROUP BY tanggal", (errPasien, pasiens) => {
						if(errPasien) throw errPasien
						else {
							res.json(
								{
									perHari: rows,
									jumlah: pasiens
								}
							)
						}
					})
				}
			})
		}
	})
})

module.exports = app;