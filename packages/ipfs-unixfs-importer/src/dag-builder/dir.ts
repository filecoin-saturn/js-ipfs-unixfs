import { UnixFS } from 'ipfs-unixfs'
import { persist } from '../utils/persist.js'
import { encode, prepare } from '@ipld/dag-pb'
import type { Directory, InProgressImportResult } from '../index.js'
import type { Blockstore } from 'interface-blockstore'
import type { Version } from 'multiformats/cid'

export interface DirBuilderOptions {
  cidVersion: Version
  signal?: AbortSignal
}

export const dirBuilder = async (dir: Directory, blockstore: Blockstore, options: DirBuilderOptions): Promise<InProgressImportResult> => {
  const unixfs = new UnixFS({
    type: 'directory',
    mtime: dir.mtime,
    mode: dir.mode
  })

  const buffer = encode(prepare({ Data: unixfs.marshal() }))
  const cid = await persist(buffer, blockstore, options)
  const path = dir.path

  return {
    cid,
    path,
    unixfs,
    size: BigInt(buffer.length),
    originalPath: dir.originalPath
  }
}