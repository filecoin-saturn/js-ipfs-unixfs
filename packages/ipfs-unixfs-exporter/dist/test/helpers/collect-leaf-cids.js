import * as dagPb from '@ipld/dag-pb';
export default function (cid, blockstore) {
    async function* traverse(cid) {
        const block = await blockstore.get(cid);
        const node = dagPb.decode(block);
        if (node instanceof Uint8Array || (node.Links.length === 0)) {
            yield {
                node,
                cid
            };
            return;
        }
        node.Links.forEach(link => traverse(link.Hash));
    }
    return traverse(cid);
}
//# sourceMappingURL=collect-leaf-cids.js.map