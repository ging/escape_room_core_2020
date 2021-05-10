/************************************ NO TOCAR *****************************************/
const models = require('../model/index').models;

exports.index = async (_req, res, next) => {
	try {
		const virus = await models.Virus.findAll({limit: 600});
		res.render('virus/index', { virus });
	} catch (e) {
		next(e);
	}
}

exports.show = async (req, res, next) => {
	const virus = await models.Virus.findByPk(req.params.virusId);
	try {
		if (virus) {
			res.render("virus/show", { virus } );
		} else {
			res.render("404");
		}
	} catch (e) {
		next(e);
	}
}
/***************************************************************************************/
