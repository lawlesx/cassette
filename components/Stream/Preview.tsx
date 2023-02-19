'use client'
import { Player } from '@livepeer/react'
import { FC } from 'react'

interface Props {
  streamKey: string
  streamName: string
  playbackId: string
}

const Preview: FC<Props> = ({ playbackId, streamKey, streamName }) => {
  console.log(streamKey)
  return (
    <div className="border border-teal w-3/4">
      {playbackId && <Player title={streamName} playbackId={playbackId} autoPlay muted />}
    </div>
  )
}

export default Preview
