'use client';
import { Player, useCreateStream } from '@livepeer/react';
import { useMemo, useState } from 'react';

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>('');
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === 'loading', [status]);

  return (
    <div className='w-full p-10 bg-red-900 border-2 border-red-400 rounded-2xl flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <input
          type="text"
          placeholder="Stream name"
          onChange={(e) => setStreamName(e.target.value)}
          className='w-1/2 h-10 border-2 border-red-400 rounded-xl bg-red-300 p-4 text-red-900 placeholder:text-red-900 focus:outline-none'
        />
        {!stream && (
          <button
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
            className='px-8 py-2 bg-green-500 border-2 border-green-300 rounded-xl'
          >
            Create Stream
          </button>
        )}
        {
          stream?.rtmpIngestUrl && (
            <h1 className='text-lg text-red-400'>Stream Key: {stream.streamKey}</h1>
          )
        }
      </div>


      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}
    </div>
  );
};