import { GearApi, GearKeyring, getWasmMetadata} from '@gear-js/api';
import { readFileSync } from 'fs';

require('dotenv').config();

async function main() {
    const gearApi = await GearApi.create();
    const jsonKeyring = readFileSync(process.env.PATH_TO_KEYS).toString();
    const account = GearKeyring.fromJson(jsonKeyring, process.env.PASSWORD);
    const code = readFileSync(process.env.OPT_WASM);
    const metaFile = readFileSync(process.env.META_WASM);
    const meta =  await getWasmMetadata(metaFile);
    console.log(process.env.LENDER);
    console.log(process.env.BORROWER);

    let initMTK = {
        name: "Geat Multitoken",
        symbol: "GMT",
        base_uri: "gear.multitoken.ipfs/"
    }

    const gas = await gearApi.program.gasSpent.init(
        `0x${account.address}`,
        code,
        initMTK,
        0,
        meta
    );
    console.log("GAS SPENT", gas.toNumber());

    const program = gearApi.program.submit({ code, initPayload: initMTK, gasLimit: gas }, meta);
    await gearApi.program.signAndSend(account, (data) => {
        console.log(data.toHuman());
    });
    console.log("Program was initialized with id", program.programId);
}

main()
