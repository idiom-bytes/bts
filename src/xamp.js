const {BTSCoin, PRICE_DECIMALS} = require('./btsCoin.js');
const moment = require('moment');

class Xamp extends BTSCoin {
    async updateSupply() {
        await super.updateSupply();

        // SUPPLY CURRENT
        // Calculate Totals
        this.supplyCurrent["circulating"] = this.supplyCurrent["total"] - this.supplyCurrent["burn"];

        // Calculate Percentages
        this.supplyCurrent['burnPercent'] = ((this.supplyCurrent["burn"]/this.supplyCurrent["total"])*100.0).toFixed(2);
        this.supplyCurrent["vestedPercent"] = ((this.supplyCurrent["vested"]/this.supplyCurrent["total"])*100).toFixed(2);
        this.supplyCurrent["circulatingPercent"] = ((this.supplyCurrent["circulating"]/this.supplyCurrent["total"])*100).toFixed(2);
    }

    async updateRebase() {
        // XAMP REBASE LOGIC
        // Is contract.currentExchangeRate() < contract.lastExchangeRate() Then contract.canBurn()
        // Is Time.Now() > contract.lastRebaseDate() + contract.hoursBetweenRebases() Then contract.canRebase()

        await this.rebaseWeb3.methods.currentExchangeRate().call()
            .then(res => {
                this.contractData["currentExchangeRate"] = res / Math.pow(10, PRICE_DECIMALS);
            })
            .catch(error => {
                console.error(`xamp.currentExchangeRate:`, error);
            });

        await this.rebaseWeb3.methods.lastExchangeRate().call()
            .then(res => {
                this.contractData["lastExchangeRate"] = res / Math.pow(10, PRICE_DECIMALS);
            })
            .catch(error => {
                console.error(`xamp.lastExchangeRate:`, error);
            });

       // XAMP DATE LOGIC
        await this.rebaseWeb3.methods.lastRebase().call()
            .then(async (res) => {
                this.contractData["lastRebaseDate"]= moment(new Date(res * 1000));
            })
            .catch(error => {
                console.error(`xamp.lastRebaseDate:`, error);
            });

        // Time Between Rebases - In Seconds
        await this.rebaseWeb3.methods.timeBetweenRebases().call()
            .then(async (res) => {
                this.contractData["timeBetweenRebases"] = res;
            })
            .catch(error => {
                console.erro('xamp.timeBetweenRebases: ', error);
            });

        // Calculate nextRebaseDate
        this.contractData["nextRebaseDate"] = this.contractData["lastRebaseDate"].clone();
        this.contractData["nextRebaseDate"].add(this.contractData["timeBetweenRebases"], 'seconds')

        // Calculate rebase conditions
        this.contractData["canBurn"] = this.contractData['currentExchangeRate'] < this.contractData['lastExchangeRate'];
        this.contractData["canRebase"] = new Date().getTime() > this.contractData["nextRebaseDate"];
    }
}

module.exports = Xamp;