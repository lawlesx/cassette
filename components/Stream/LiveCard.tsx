const LiveCard = () => {
  return (
    <div className="w-[25rem] h-[18rem]">
      {/* Image placeholder */}
      <div className="w-full rounded-lg h-4/5 bg-green-400"></div>
      <div className="flex items-end gap-4 h-1/5">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-green-400"></div>
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-base font-medium text-white">Ghost of tsushima #1-LIVE</h1>
          {/* Username placeholder */}
          <h1 className="text-sm font-normal text-secondary">Pewdiepie</h1>
        </div>
      </div>
    </div>
  )
}

export const LiveCardSkeleton = () => {
  return (
    <div className="w-[25rem] h-[18rem]">
      {/* Image placeholder */}
      <div className="w-full rounded-lg h-4/5 bg-green-400"></div>
      <div className="flex items-end gap-4 h-1/5">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-green-400"></div>
        <div className="flex flex-col gap-2">
          {/* Username placeholder */}
          <div className="w-20 h-4 bg-green-400 rounded-lg"></div>
          {/* Title placeholder */}
          <div className="w-32 h-4 bg-green-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default LiveCard
