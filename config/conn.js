var conn = {
	database: {
		host:  'localhost',     // database host
		user:  'root',         // your database username
		password: '',         // your database password
		port: 3306,         // default MySQL port
		db: 'covid'         // your database name
	},
	server: {
		host: '127.0.0.1',
		port: '3011'
	}
}

module.exports = conn;