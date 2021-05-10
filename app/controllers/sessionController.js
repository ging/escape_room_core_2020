/************************************ NO TOCAR *****************************************/
const url = require("url");
const maxIdleTime = 5*60*60*1000;

exports.deleteExpiredUserSession = (req, res, next) => {
  if (req.session.user) {
    if(req.session.user.expires < Date.now()) {
      delete req.session.user;
    } else {
      req.session.user.expires = Date.now() + maxIdleTime;
    }
  }
  next();
}

exports.new = (req, res, next) => {
  let redir = req.query.redir || url.parse(req.headers.referer || "/").path;
  if (redir === "/session") {redir = "/"}
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.render('index', { redir });
  }
}

exports.destroy = (req, res) => {
  delete req.session.user;
  res.redirect("/");
}


/***************************************************************************************/

