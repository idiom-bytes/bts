import infura from './infura.js';
import axios from 'axios';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'your_api_key';
const PRICE_DECIMALS = 10;

class BTSCoin {
    constructor(params) {
        // Please configure all required paramters
        // CONTRACT PARAMS
        this.contractDecimals = params.decimals;

        // REBASE CONTRACT
        this.rebase0x = params.rebaseAddress;
        this.rebaseAbi = params.rebaseAbi;
        this.rebaseWeb3 = new infura.eth.Contract(this.rebaseAbi, this.rebase0x);

        // TOKEN SUPPLY ADDRESSES
        // Important Keys: total, burn, vested, circulating, taxPool
        // assert type of params.addresses, dict<str,list[str]>
        this.addresses = params.addresses;

        // TOKEN STATE
        this.supplyCurrent = {};
        this.contractData = {};
    }

    filterDefaultAddresses(key) {
        return ["total","burn"].includes(key) === false;
    }

    async updateSupply() {
        // Get current supply from addresses
        const tokenSupplyRequest = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${this.addresses["contract"]}&apikey=${ETHERSCAN_API_KEY}`;
        await axios.get(tokenSupplyRequest)
            .then(res => {
                this.supplyCurrent["total"] = res.data.result / Math.pow(10,this.contractDecimals)
            })
            .catch(error => {
                console.error("total supply:", error);
            });

        if('burn' in this.addresses) {
            var burnBalanceRequest = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${this.addresses["contract"]}&address=${this.addresses["burn"]}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
            await axios.get(burnBalanceRequest)
                .then(res => {
                    this.supplyCurrent["burn"] = res.data.result / Math.pow(10,this.contractDecimals)
                })
                .catch(error => {
                    console.error("burn balance:", error);
                });
        }

        for (const [dict_key, dict_val] of Object.entries(this.addresses).filter(entry => this.filterDefaultAddresses(entry[0]))) {
            var balanceRequest = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${this.addresses["contract"]}&address=${dict_val}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
            await axios.get(balanceRequest)
                .then(res => {
                    this.supplyCurrent[dict_key] = res.data.result / Math.pow(10,this.contractDecimals);
                })
                .catch(error => {
                    console.error(`${dict_key} balance:`, error);
                });
        }
    }

    async updateRebase() {
        console.err(`{type of this} override Rebase with contract logic`)
    }

    async update() {
        await this.updateSupply();
        await this.updateRebase();
    }
}

export {BTSCoin, PRICE_DECIMALS};