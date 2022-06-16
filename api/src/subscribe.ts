import { GearApi, CreateType, getWasmMetadata} from '@gear-js/api';
import { readFileSync } from 'fs';
require('dotenv').config();
export const events = async (pathToMeta?: string) => {
    const gearApi = await GearApi.create();

    const metaFile = pathToMeta ? readFileSync(pathToMeta) : undefined;
    const meta = metaFile ? await getWasmMetadata(metaFile) : undefined;
   console.log(meta);

    gearApi.gearEvents.subscribeToLogEvents(({ data: { id, source, payload, reply } }) => {
        console.log(`
          Log:
          messageId: ${id.toHex()}
          from program: ${source.toHex()}
        payload: ${
           payload.toHuman()
            }
        ${
          reply.isSome
            ? `reply to: ${reply.unwrap()[0].toHex()}
          with error: ${reply.unwrap()[1].toNumber() === 0 ? false : true}
          `
            : ''
        }
        `);

        try {
          console.log(CreateType.create(meta.handle_output, payload, meta).toHuman())
        } catch (error) {
          console.log(error);

        }
      });

  gearApi.gearEvents.subscribeToProgramEvents(({ method, data: { info, reason } }) => {
    console.log(`
      ${method}:
      programId: ${info.programId.toHex()}
      initMessageId: ${info.messageId.toHex()}
      origin: ${info.origin.toHex()}
      ${reason ? `reason: ${reason.toHuman()}` : ''}
      `);
  });



};

async function main() {

    await events(process.env.META_WASM);
}

main()