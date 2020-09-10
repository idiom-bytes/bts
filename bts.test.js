const BTS = require('./src/bts.js')
const bts = new BTS();

test('XAMP supply[params]', async () => {
    await bts.xamp.update();
    expect(bts.xamp.supplyCurrent["total"]).toBeDefined();
    expect(bts.xamp.supplyCurrent["burn"]).toBeDefined();
    expect(bts.xamp.supplyCurrent["vested"]).toBeDefined();
    expect(bts.xamp.supplyCurrent["circulating"]).toBeDefined();

    console.log(`\nXAMP SUPPLY
    ----------------
    Supply Total: ${bts.xamp.supplyCurrent["total"].toFixed(2)}
    Supply Burned: ${bts.xamp.supplyCurrent["burn"].toFixed(2)} (${((bts.xamp.supplyCurrent["burn"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Vested: ${bts.xamp.supplyCurrent["vested"].toFixed(2)} (${((bts.xamp.supplyCurrent["vested"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Circulating: ${bts.xamp.supplyCurrent["circulating"].toFixed(2)} (${((bts.xamp.supplyCurrent["circulating"] / bts.xamp.supplyCurrent["total"]) * 100).toFixed(2)}%)`);
});

test('XAMP rebase[params]', async () => {
    await bts.xamp.update();
    expect(bts.xamp.contractData["currentExchangeRate"]).toBeDefined();
    expect(bts.xamp.contractData["lastExchangeRate"]).toBeDefined();
    expect(bts.xamp.contractData["canBurn"]).toBeDefined();
    expect(bts.xamp.contractData["lastRebaseDate"]).toBeDefined();
    expect(bts.xamp.contractData["nextRebaseDate"]).toBeDefined();
    expect(bts.xamp.contractData["canRebase"]).toBeDefined();

    console.log(`\nXAMP REBASE
    ----------------
    To Burn: Current Price < Last Price
    Current Price: ${bts.xamp.contractData["currentExchangeRate"].toFixed(6)}
    Last Price: ${bts.xamp.contractData["lastExchangeRate"].toFixed(6)}
    _contract.CanBurn(): ${bts.xamp.contractData["canBurn"]}
    Last Rebase: ${bts.xamp.contractData["lastRebaseDate"].fromNow()}
    Rebase will be enabled: ${bts.xamp.contractData["nextRebaseDate"].fromNow()}
    _contract.CanRebase(): ${bts.xamp.contractData["canRebase"]}`);
});

test('TOB supply[params]', async () => {
    await bts.tob.update();
    expect(bts.tob.supplyCurrent["total"]).toBeDefined();
    expect(bts.tob.supplyCurrent["burn"]).toBeDefined();
    expect(bts.tob.supplyCurrent["vested"]).toBeDefined();
    expect(bts.tob.supplyCurrent["circulating"]).toBeDefined();

    console.log(`\nTOB SUPPLY
    ----------------
    Supply Total: ${bts.tob.supplyCurrent["total"].toFixed(2)}
    Supply Burned: ${bts.tob.supplyCurrent["burn"].toFixed(2)} (${((bts.tob.supplyCurrent["burn"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Vested: ${bts.tob.supplyCurrent["vested"].toFixed(2)} (${((bts.tob.supplyCurrent["vested"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Supply Circulating: ${bts.tob.supplyCurrent["circulating"].toFixed(2)} (${((bts.tob.supplyCurrent["circulating"] / bts.tob.supplyCurrent["total"]) * 100).toFixed(2)}%)`);
});

test('TOB rebase[params]', async () => {
    await bts.tob.update();
    expect(bts.tob.contractData["currentExchangeRate"]).toBeDefined();
    expect(bts.tob.contractData["lastExchangeRate"]).toBeDefined();
    expect(bts.tob.contractData["canBurn"]).toBeDefined();
    expect(bts.tob.contractData["lastRebaseDate"]).toBeDefined();
    expect(bts.tob.contractData["nextRebaseDate"]).toBeDefined();
    expect(bts.tob.contractData["canRebase"]).toBeDefined();

    console.log(`\nTOB REBASE
    ----------------
    To Burn: Current Price > Target Price
    Current Price: ${bts.tob.contractData["currentExchangeRate"].toFixed(6)}
    Target Price: ${bts.tob.contractData["lastExchangeRate"].toFixed(6)}
    _contract.CanBurn(): ${bts.tob.contractData["canBurn"]}
    Last Rebase: ${bts.tob.contractData["lastRebaseDate"].fromNow()}
    Rebase will be enabled: ${bts.tob.contractData["nextRebaseDate"].fromNow()}
    _contract.CanRebase(): ${bts.tob.contractData["canRebase"]}`);
});

test('BOA supply[params]', async () => {
    await bts.boa.update();
    expect(bts.boa.supplyCurrent["total"]).toBeDefined();
    expect(bts.boa.supplyCurrent["taxPool"]).toBeDefined();
    expect(bts.boa.supplyCurrent["circulating"]).toBeDefined();

    console.log(`\nBOA SUPPLY
    ----------------
    Total Supply: ${bts.boa.supplyCurrent["total"].toFixed(2)}
    Tax Pool Supply: ${bts.boa.supplyCurrent["taxPool"].toFixed(2)} (${((bts.boa.supplyCurrent["taxPool"] / bts.boa.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Circulating Supply: ${bts.boa.supplyCurrent["circulating"].toFixed(2)} (${((bts.boa.supplyCurrent["circulating"] / bts.boa.supplyCurrent["total"]) * 100).toFixed(2)}%)`);
});

test('BOA rebase[params]', async () => {
    await bts.boa.update();
    expect(bts.boa.supplyCurrent["taxPool"]).toBeDefined();
    expect(bts.boa.supplyCurrent["circulating"]).toBeDefined();
    expect(bts.boa.supplyCurrent["remainder"]).toBeDefined();
    expect(bts.boa.contractData["isProfitable"]).toBeDefined();
    expect(bts.boa.contractData["canRebase"]).toBeDefined();

    console.log(`\nBOA REBASE
    ----------------
    To Burn: Tax Pool > (Circulating - Tax Pool)
    Tax Pool Supply: ${bts.boa.supplyCurrent["taxPool"].toFixed(6)}
    Circulating Supply: ${bts.boa.supplyCurrent["circulating"].toFixed(6)}
    Remaining Supply: ${bts.boa.supplyCurrent["remainder"].toFixed(6)}
    _contract.IsProfitable(): ${bts.boa.contractData["isProfitable"]}
    _contract.CanRebase(): ${bts.boa.contractData["canRebase"]}`);
});

test('YFKA supply[params]', async () => {
    await bts.yfka.update();
    expect(bts.yfka.supplyCurrent["total"]).toBeDefined();
    expect(bts.yfka.supplyCurrent["burn"]).toBeDefined();
    expect(bts.yfka.supplyCurrent["circulating"]).toBeDefined();

    console.log(`\nBOA SUPPLY
    ----------------
    Total Supply: ${bts.yfka.supplyCurrent["total"].toFixed(2)}
    Burn Supply: ${bts.yfka.supplyCurrent["burn"].toFixed(2)} (${((bts.yfka.supplyCurrent["burn"] / bts.yfka.supplyCurrent["total"]) * 100).toFixed(2)}%)
    Circulating Supply: ${bts.yfka.supplyCurrent["circulating"].toFixed(2)} (${((bts.yfka.supplyCurrent["circulating"] / bts.yfka.supplyCurrent["total"]) * 100).toFixed(2)}%)`);
});