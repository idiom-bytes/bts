const {BTSCoin, PRICE_DECIMALS} = require('./btsCoin');
const moment = require('moment');

class Tob extends BTSCoin {
    async updateSupply() {
        await super.updateSupply();

        // SUPPLY CURRENT
        // Calculate Totals
        this.supplyCurrent["vested"] = this.supplyCurrent["vested1"] + this.supplyCurrent["vested2"];
        this.supplyCurrent["circulating"] = this.supplyCurrent["total"] - this.supplyCurrent["burn"];

        // Calculate Percentages
        this.supplyCurrent['burnPercent'] = ((this.supplyCurrent["burn"]/this.supplyCurrent["total"])*100.0).toFixed(2);
        this.supplyCurrent["vestedPercent"] = ((this.supplyCurrent["vested"]/this.supplyCurrent["total"])*100).toFixed(2);
        this.supplyCurrent["circulatingPercent"] = ((this.supplyCurrent["circulating"]/this.supplyCurrent["total"])*100).toFixed(2);
    }

    async updateRebase() {
        // TOB REBASE LOGIC
        // Is contract.currentExchangeRate() > contract.lastExchangeRate() Then contract.canRebase() + contract.canBurn()
        // Is Time.Now() > contract.lastRebaseDate() + contract.hoursBetweenRebases() Then contract.canRebase()
        await this.rebaseWeb3.methods.currentExchangeRate().call()
            .then(res => {
                    this.contractData["currentExchangeRate"] = res / Math.pow(10, PRICE_DECIMALS);
            })
            .catch(error => {
                console.error(`tob.currentExchangeRate:`, error);
            });

        await this.rebaseWeb3.methods.lastExchangeRate().call()
            .then(res => {
                this.contractData["lastExchangeRate"] = res / Math.pow(10, PRICE_DECIMALS);
            })
            .catch(error => {
                console.erro('tob.lastExchangeRate: ', error);
            });

        await this.rebaseWeb3.methods.lastRebase().call()
            .then(async (res) => {
                this.contractData["lastRebaseDate"]= moment(new Date(res * 1000));
            })
            .catch(error => {
                console.erro('tob.lastRebaseDate: ', error);
            });

        // Time Between Rebases - In Seconds
        await this.rebaseWeb3.methods.timeBetweenRebases().call()
            .then(async (res) => {
                this.contractData["timeBetweenRebases"] = res;
            })
            .catch(error => {
                console.erro('tob.timeBetweenRebases: ', error);
            });

        // Calculate nextRebaseDate
        this.contractData["nextRebaseDate"] = this.contractData["lastRebaseDate"].clone();
        this.contractData["nextRebaseDate"].add(this.contractData["timeBetweenRebases"], 'seconds')

        // Calculate rebase conditions
        this.contractData["canBurn"] = this.contractData["currentExchangeRate"] > this.contractData["lastExchangeRate"];
        this.contractData["canRebase"] = (new Date().getTime() > this.contractData["nextRebaseDate"]) || this.contractData["canBurn"];
    }

    listenToRebaseSuccess(fromBlockNumber, rebaseSuccessListener) {
        console.log('listening for RebaseSuccess');
        this.rebaseWeb3.events.RebaseSuccess({
            fromBlock: (fromBlockNumber || 0),
        }, rebaseSuccessListener)
    };

    listenToRebaseFail(fromBlockNumber, rebaseFailListener) {
        console.log('listening for RebaseFail');
        this.rebaseWeb3.events.RebaseFail({
            fromBlock: (fromBlockNumber || 0),
        }, rebaseFailListener)
    };
}

module.exports = Tob;