import * as dagPb from '@ipld/dag-pb';
import type { Blockstore } from 'interface-blockstore';
import type { CID } from 'multiformats/cid';
export default function (cid: CID, blockstore: Blockstore): AsyncGenerator<{
    node: Uint8Array | dagPb.PBNode;
    cid: CID;
}, void, undefined>;
//# sourceMappingURL=collect-leaf-cids.d.ts.map