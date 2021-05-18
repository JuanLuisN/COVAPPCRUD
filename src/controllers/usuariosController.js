const controller = {};
controller.list= (req, res) => 
{
    req.getConnection((err, conn) => 
    {   
      conn.query('SELECT * FROM usuarios', (err, registros) => 
      {
        if (err) 
        {
            res.json(err);
        }
        res.render('usuarios', 
        {
            datos: registros
        });
      });
    });
  };

  controller.save = (req, res) =>
  {
    const data = req.body;
    const usuario = req.body.nombre;
    req.getConnection((err,conn) =>
    {
      conn.query('insert into usuarios set ?', [data], (err, usuarios) =>
      {
        console.log(usuarios);
        req.flash('success_msg','Usuario '+usuario+' registrado exitosamente');
        res.redirect('/usuarioslist');
      });
    })
  };

  controller.edit = (req, res) =>
  {
    const Userid = req.params.idusuario;
    req.getConnection((err, conn) =>
    {
      conn.query('select * from usuarios where idusuario = ?', [Userid], (err, usuarios) =>
      {
        res.render('usuarios_edit',
        {
          datos: usuarios[0]
        });
      });
    });
  };

  controller.update = (req, res) =>
  {
    const Userid = req.params.idusuario;
    const usuario = req.body.nombre;
    const newUsuario = req.body;
    req.getConnection((err, conn) =>
    {
      conn.query('UPDATE usuarios SET ? WHERE idusuario = ?', [newUsuario, Userid], (err, rows) =>
      {
        req.flash('success_msg','Datos del '+usuario+' editados exitosamente');
        res.redirect('/usuarioslist');
      });
    });
  }

  controller.delete = (req, res) =>
  {
    const Userid = req.params.idusuario;
    req.getConnection((err, conn) => 
    {
      conn.query('DELETE FROM usuarios WHERE idusuario = ?', [Userid],(err, rows) =>
      {
        console.log(username);
        req.flash('success_msg','Usuario '+Userid+' eliminado exitosamente');
        res.redirect('/usuarioslist');
      })
    })
  };
module.exports = controller;