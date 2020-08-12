const dids = require('../../registry/dids');
const logger = require('../config/logger');


module.exports = {
    getDIDDocument(req, res) {

        var did = req.params.did;

        const didoc = dids.getDIDDocument(did)
        .then( x => {
            return res.send(x);
        })
        .catch(error => {
            logger.error(error);
            res.status(400).send(Object.entries(error.data)[0][1].reason);
          });
      },
      setAttribute(req, res){
          var did = req.params.did;

          const att = dids.setAttribute(did)
          .then( x => {
            return res.send(x);
        })
        .catch(error => {
            logger.error(error);
            res.status(400).send(Object.entries(error.data)[0][1].reason);
          });
      }
}
