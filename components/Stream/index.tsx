'use client'
import { Player, useCreateStream } from '@livepeer/react'
import { useMemo, useState } from 'react'
import Copy from '../Copy'
import NftConnection from './NftConnection'

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null)

  const isLoading = useMemo(() => status === 'loading', [status])
  console.log(stream)

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {!stream ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-lg font-medium">Stream Name</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Valorant Stream"
              onChange={(e) => setStreamName(e.target.value)}
              className="input w-[30rem]"
            />
            {!stream && (
              <button
                onClick={() => {
                  createStream?.()
                }}
                disabled={isLoading || !createStream}
                className={`px-8 py-2 rounded-md ${!createStream || isLoading
                  ? 'cursor-not-allowed bg-secondary text-primary'
                  : 'cursor-pointer bg-teal text-white'
                  }`}
              >
                Generate Stream Key
              </button>
            )}
          </div>
        </div>
      ) : (
        stream.rtmpIngestUrl && (
          <div className="flex flex-col items-center gap-10 w-full">
            <h1 className='text-lg text-primary font-medium'>Use the Stream Key or Ingest URL to setup stream in OBS studio or any similar app</h1>
            <div className="flex items-center w-full justify-between px-28 gap-20">
              <div className="flex items-center gap-2">
                <h1 className="highlight-pill">Ingest URL</h1>
                <h1 className="text-lg text-secondary font-normal flex items-center gap-2">
                  {stream.rtmpIngestUrl} <Copy text={stream.rtmpIngestUrl} />
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="highlight-pill">Stream Key</h1>
                <h1 className="text-lg text-secondary font-normal flex items-center gap-2">
                  {stream.streamKey} <Copy text={stream.streamKey} />
                </h1>
              </div>
            </div>
            <div className="border border-teal w-3/4">
              {stream.playbackId && <Player title={stream.name} playbackId={stream.playbackId} autoPlay muted />}
            </div>
            <NftConnection streamKey={stream.streamKey} streamName={streamName} playbackId={stream.playbackId} />
          </div>
        )
      )}
    </div>
  )
}
