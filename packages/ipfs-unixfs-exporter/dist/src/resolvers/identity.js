import errCode from 'err-code';
import * as mh from 'multiformats/hashes/digest';
import { CustomProgressEvent } from 'progress-events';
import extractDataFromBlock from '../utils/extract-data-from-block.js';
import validateOffsetAndLength from '../utils/validate-offset-and-length.js';
const rawContent = (node) => {
    async function* contentGenerator(options = {}) {
        const { start, end } = validateOffsetAndLength(node.length, options.offset, options.length);
        const buf = extractDataFromBlock(node, 0n, start, end);
        options.onProgress?.(new CustomProgressEvent('unixfs:exporter:progress:identity', {
            bytesRead: BigInt(buf.byteLength),
            totalBytes: end - start,
            fileSize: BigInt(node.byteLength)
        }));
        yield buf;
    }
    return contentGenerator;
};
const resolve = async (cid, name, path, toResolve, resolve, depth, blockstore, options) => {
    if (toResolve.length > 0) {
        throw errCode(new Error(`No link named ${path} found in raw node ${cid}`), 'ERR_NOT_FOUND');
    }
    const buf = mh.decode(cid.multihash.bytes);
    return {
        entry: {
            type: 'identity',
            name,
            path,
            cid,
            content: rawContent(buf.digest),
            depth,
            size: BigInt(buf.digest.length),
            node: buf.digest
        }
    };
};
export default resolve;
//# sourceMappingURL=identity.js.map