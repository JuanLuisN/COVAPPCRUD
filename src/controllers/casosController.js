const controller = {};

controller.listc = (req, res) => 
{
    req.getConnection((err, conn) => 
    {
      conn.query('SELECT * FROM Casos', (err, casos) => 
      {
        if (err) 
        {
            res.json(err);
        }
        res.render('casos', 
        {
            data: casos
        });
      });
    });
  };
  
  controller.savec = (req, res) =>
  {
    const data = req.body;
    req.getConnection((err,conn) =>
    {
      conn.query('insert into casos set ?', [data], (err, casos) =>
      {
        
        console.log(casos);
        req.flash('success_msg','Nuevo registro agregado');
        res.redirect('/casos');
      });
    })
  };

  controller.editc = (req, res) =>
  {
    const id = req.params.IdCasos;
    req.getConnection((err, conn) =>
    {
      conn.query('select * from casos where IdCasos = ?', [id], (err, casos) =>
      {    
        res.render('casos_edit',
        {
          data: casos[0],
        });
      });
    });
  };

  controller.updatec = (req, res) =>
  {
    const id = req.params.IdCasos;
    const newCasos = req.body;
    req.getConnection((err, conn) =>
    {
      conn.query('UPDATE casos SET ? WHERE IdCasos = ?', [newCasos, id], (err, rows) =>
      {
        req.flash('success_msg','Registro '+id+' editado correctamente');
        res.redirect('/casos');
      });
    });
  }

  controller.deletec = (req, res) =>
  {
    const id = req.params.IdCasos;
    req.getConnection((err, conn) => 
    {
      conn.query('DELETE FROM casos WHERE IdCasos = ?', [id],(err, rows) =>
      {
        req.flash('success_msg','Registro '+id+' eliminado satisfactoriamente');
        res.redirect('/casos');
      })
    })
  };

module.exports = controller;