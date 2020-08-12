const PREFIX = "Returned error: VM Exception while processing transaction: ";

async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

module.exports = {
    catchRevert            : async function(promise) {await tryCatch(promise, "revert"                              );},
    catchNoDIDRegistered   : async function(promise) {await tryCatch(promise, "revert This DID is not registered"   );}, 
    catchPIDNotEnabled     : async function(promise) {await tryCatch(promise, "revert This phyisicalId has not been entered for registering -- Reason given: This phyisicalId has not been entered for registering."   );}, 
    catchPIDexists         : async function(promise) {await tryCatch(promise, "revert This PID already exists! -- Reason given: This PID already exists!"   );}, 
    catchPIDregistered     : async function(promise) {await tryCatch(promise, "revert This phyisicalId has already been entered for registering -- Reason given: This phyisicalId has already been entered for registering"   );}, 
};
