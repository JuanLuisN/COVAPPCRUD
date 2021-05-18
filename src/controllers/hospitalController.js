const controller = {};

controller.listc = (req, res) => 
{
    req.getConnection((err, conn) => 
    {
      conn.query('SELECT * FROM hospitales', (err, hospitales) => 
      {
        if (err) 
        {
            res.json(err);
        }
        res.render('hospital', 
        {
            data: hospitales
        });
      });
    });
  };

  controller.savec = (req, res) =>
  {
    const data = req.body;
    const nombre = req.body.nombre;
    req.getConnection((err,conn) =>
    {
      conn.query('insert into hospitales set ?', [data], (err, hospitales) =>
      {
        console.log(hospitales);
        req.flash('success_msg','Hospital '+ nombre+' agregado con exito');
        res.redirect('/hospitallist');
      });
    })
  };

  controller.editc = (req, res) =>
  {
    const id = req.params.IdHospital;
    req.getConnection((err, conn) =>
    {
      conn.query('select * from hospitales where IdHospital = ?', [id], (err, hospitales) =>
      {
        res.render('hospital_edit',
        {
          data: hospitales[0]
        });
      });
    });
  };

  controller.updatec = (req, res) =>
  {
    const id = req.params.IdHospital;
    const hospital = req.body.nombre;
    const newHospital = req.body;
    req.getConnection((err, conn) =>
    {
      conn.query('UPDATE hospitales SET ? WHERE IdHospital = ?', [newHospital, id], (err, rows) =>
      {
        req.flash('success_msg','Datos del '+hospital+' editados satisfactoriamente');
        res.redirect('/hospitallist');
      });
    });
  }

  controller.deletec = (req, res) =>
  {
    const id = req.params.IdHospital;
    req.getConnection((err, conn) => 
    {
      conn.query('DELETE FROM hospitales WHERE IdHospital = ?', [id],(err, rows) =>
      {
        req.flash('success_msg','Hospital '+id+' eliminado con exito');
        res.redirect('/hospitallist');
      })
    })
  };

module.exports = controller;