const validation = require('../../registry/validation');
const logger = require('../config/logger');

module.exports = {
  registerPID(req, res) {

    var aktdid = req.params.aktdid
    var pid = req.body.pid

    validation.setPID(aktdid, pid)
      .then(x => {
        return res.send('sucessfully set PID: ' + pid + ' for the AktDID: ' + aktdid);

      })
      .catch(error => {
        logger.error(error);
        res.status(400).send(Object.entries(error.data)[0][1].reason);
      });
  },
  createAktDID(req, res) {

    const aktDID = validation.createAktDID()

    return res.send(aktDID.did)

  },
  registerMultiple(req, res) {

    var aktdid = req.params.aktdid
    var pids = req.body

    pids.forEach(pid => {
      validation.setPID(aktdid, pid)
      .then(x => {

        return res.send('sucessfully set PIDs: ' + pids + ' for the AktDID: ' + aktdid)

      }).catch(error => {
          logger.error(error);
          res.status(400).send(Object.entries(error.data)[0][1].reason);
        });




      })








  }

}
