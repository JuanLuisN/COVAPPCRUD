const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'b5pofpw3ei4wd0sy1eea-mysql.services.clever-cloud.com',
    user: 'u5hoog4tmttkkj9h',
    password: '9bOEXNcsoAueiw8JA0xL',
    database: 'b5pofpw3ei4wd0sy1eea'

});
connection.connect((error)=>{
    if(error){
        console.log('Error en la conexion'+error)
        return;
    }
    console.log('Conexion correcta');

})

module.exports = connection;
