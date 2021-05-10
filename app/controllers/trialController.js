/************************************ NO TOCAR *****************************************/
const models = require('../model/index').models;

exports.show = async (req, res, next) => {
  const trial = await models.Trial.findByPk(req.params.trialId, {include: {model: models.Virus}});
  try {
    if (trial) {
      res.render("trials/show", {
        trial,
        msg: "//TODO Por algún motivo el servidor no me está leyendo bien los campos del formulario. Algo se me debe de estar olvidando."
      });
    } else {
      res.render("404");
    }
  } catch (e) {
    next(e);
  }
}


exports.download = async (req, res, next) => {
  try {
    if (req.body.geneticCodeRadioInputForm === "geneticCode") { // Check form option selected
        const trial = await models.Trial.findByPk(req.params.trialId, {include: {model: models.Virus}});
        if (trial.status === "SUCCESS") {
          res.setHeader('Content-type', "application/octet-stream; charset=utf-8");
          res.setHeader('Content-disposition', 'attachment; filename=geneticCode.txt');
          res.send(req.download);
        } else {
          next();
        }
    } else {
      res.setHeader('Content-type', "application/octet-stream; charset=utf-8");
      res.setHeader('Content-disposition', 'attachment; filename=noResults.txt');
      res.send("Nada que descargar");
    }
  } catch (e) {
    next(e);
  }
}

exports.index = async (req,res,next) => {
  try {
    const trials = await models.Trial.findAll({where: {
      virusId: req.params.virusId
    }, include: { model: models.Virus }});
    
    res.render("trials/index", {
      trials, 
      msg: "",
      title: "Ensayos",
      code: req.query.code
    });
  } catch (e) {
    next(e);
  }
}
/***************************************************************************************/

exports.indexSuccess = async (req, res, next) => {
  try {
    const trials = await models.Trial.findAll({
      where: {
        virusId: req.params.virusId
      },
      include: {
        model: models.Virus
      }
    });

    res.render("trials/index", {
      trials, 
      msg: "// TODO Modificar la query para que sólo busque los ensayos que han tenido éxito",
      title: "Ensayos",
      code: req.query.code
    });
  } catch (e) {
    next(e);
  }
}

