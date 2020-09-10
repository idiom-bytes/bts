const {BTSCoin, PRICE_DECIMALS} = require('./btsCoin');
const web3 = require('./web3');

class Yfka extends BTSCoin {
    async updateSupply() {
        await super.updateSupply();

        // SUPPLY CURRENT
        this.supplyCurrent["burn"] = this.supplyCurrent["burn"];
        this.supplyCurrent["circulating"] = this.supplyCurrent["total"] - this.supplyCurrent["burn"];
    }

    async updateRebase() {
    }

    async updatePrice() {
    }
}

module.exports = Yfka;