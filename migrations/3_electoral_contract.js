const ElectoralContract = artifacts.require("ElectoralContract")

module.exports = function (deployer) {
    deployer.deploy(ElectoralContract)
}