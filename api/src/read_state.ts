import { GearApi } from '@gear-js/api';
import { readFileSync } from 'fs';
require('dotenv').config();

async function main() {
  const gearApi = await GearApi.create();
  const metaWasm = readFileSync(process.env.META_WASM);
  const current_state = await gearApi.programState.read(process.env.PROGRAM_ID, metaWasm, { CurrentState: null });
  console.log(current_state.toHuman());
  const details = await gearApi.programState.read(process.env.PROGRAM_ID, metaWasm, { Details: null });
  console.log(details.toHuman());
};

main()
