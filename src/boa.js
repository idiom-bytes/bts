import {BTSCoin} from './btsCoin.js';

class Boa extends BTSCoin {
    async updateSupply() {
        await super.updateSupply();

        await this.rebaseWeb3.methods.totalPooled().call()
            .then(res => {
                this.supplyCurrent["taxPool"] = res / Math.pow(10,this.contractDecimals)
            })
            .catch(error => {
                console.error(`boa.taxPool:`, error);
            });

        await this.rebaseWeb3.methods.totalSupply().call()
            .then(res => {
                this.supplyCurrent["total"] = res / Math.pow(10,this.contractDecimals)
            })
            .catch(error => {
                console.error(`boa.total:`, error);
            });

        // SUPPLY CURRENT
        this.supplyCurrent["remainder"] = this.supplyCurrent["total"] - this.supplyCurrent["taxPool"];
        this.supplyCurrent["circulating"] = this.supplyCurrent["total"];
    }

    async updateRebase() {
        await this.rebaseWeb3.methods.is_profitable().call()
            .then(res => {
                this.contractData["isProfitable"] = res;
            })
            .catch(error => {
                console.error(`boa.isProfitable:`, error);
            });

        this.contractData["canRebase"] = this.contractData["isProfitable"] === true;
    }
}

export default Boa;