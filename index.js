import BTS from './src/bts.js';

const bts = new BTS();

const printBTS = async () => {
    await bts.update();

    // XAMP
    console.log(`\nXAMP SUPPLY
    ----------------
    Supply Total: ${bts.xamp.supplyCurrent["total"].toFixed(2)}
    Supply Burned: ${bts.xamp.supplyCurrent["burn"].toFixed(2)} (${((bts.xamp.supplyCurrent["burn"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Vested: ${bts.xamp.supplyCurrent["vested"].toFixed(2)} (${((bts.xamp.supplyCurrent["vested"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Circulating: ${bts.xamp.supplyCurrent["circulating"].toFixed(2)} (${((bts.xamp.supplyCurrent["circulating"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)`);

    console.log(`\nXAMP REBASE
    ----------------
    To Burn: Current Price < Last Price
    Current Price: ${bts.xamp.contractData["currentExchangeRate"].toFixed(6)}
    Last Price: ${bts.xamp.contractData["lastExchangeRate"].toFixed(6)}
    _contract.CanBurn(): ${bts.xamp.contractData["canBurn"]}
    Last Rebase: ${bts.xamp.contractData["lastRebaseDate"].fromNow()}
    Rebase will be enabled: ${bts.xamp.contractData["nextRebaseDate"].fromNow()}
    _contract.CanRebase(): ${bts.xamp.contractData["canRebase"]}`);

    //// TOB
    console.log(`\nTOB SUPPLY
    ----------------
    Supply Total: ${bts.tob.supplyCurrent["total"].toFixed(2)}
    Supply Burned: ${bts.tob.supplyCurrent["burn"].toFixed(2)} (${((bts.tob.supplyCurrent["burn"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Vested: ${bts.tob.supplyCurrent["vested"].toFixed(2)} (${((bts.tob.supplyCurrent["vested"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Circulating: ${bts.tob.supplyCurrent["circulating"].toFixed(2)} (${((bts.tob.supplyCurrent["circulating"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)`);

    console.log(`\nTOB REBASE
    ----------------
    To Burn: Current Price > Target Price
    Current Price: ${bts.tob.contractData["currentExchangeRate"].toFixed(6)}
    Target Price: ${bts.tob.contractData["lastExchangeRate"].toFixed(6)}
    _contract.CanBurn(): ${bts.tob.contractData["canBurn"]}
    Last Rebase: ${bts.tob.contractData["lastRebaseDate"].fromNow()}
    Rebase will be enabled: ${bts.tob.contractData["nextRebaseDate"].fromNow()}
    _contract.CanRebase(): ${bts.tob.contractData["canRebase"]}`);

    /// BOA
    console.log(`\nBOA SUPPLY
    ----------------
    Total Supply: ${bts.boa.supplyCurrent["total"].toFixed(2)}
    Tax Pool Supply: ${bts.boa.supplyCurrent["taxPool"].toFixed(2)} (${((bts.boa.supplyCurrent["taxPool"] / bts.boa.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Circulating Supply: ${bts.boa.supplyCurrent["circulating"].toFixed(2)} (${((bts.boa.supplyCurrent["circulating"] / bts.boa.supplyCurrent["total"]) * 100).toFixed(2)}%)`);

    console.log(`\nBOA REBASE
    ----------------
    To Burn: Tax Pool > (Circulating - Tax Pool)
    Tax Pool Supply: ${bts.boa.supplyCurrent["taxPool"].toFixed(6)}
    Circulating Supply: ${bts.boa.supplyCurrent["circulating"].toFixed(6)}
    Remaining Supply: ${bts.boa.supplyCurrent["remainder"].toFixed(6)}
    _contract.IsProfitable(): ${bts.boa.contractData["isProfitable"]}
    _contract.CanRebase(): ${bts.boa.contractData["canRebase"]}`);
}
printBTS();