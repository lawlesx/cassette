import Image from 'next/image'

const LandingBanner = () => {
  return (
    <div className="w-full h-[21rem] relative rounded-lg overflow-hidden flex flex-col-reverse">
      <div className="absolute h-full w-full">
        <Image src="/images/landing.jpg" alt="Landing" fill style={{ objectFit: 'cover' }} priority />
      </div>
      {/* ------------------------------ Overlay Mask ------------------------------ */}
      <svg
        className="w-full h-full absolute -bottom-1 left-0"
        viewBox="0 0 1312 467"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1311.73 0.203438H0.273193V466.796H1311.73V0.203438Z" fill="url(#paint0_linear_1_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_1_3"
            x1="656"
            y1="0.203438"
            x2="656"
            y2="466.796"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="0.583333" stopColor="#030303" stopOpacity="0" />
            <stop offset="1" stopColor="#030303" stopOpacity="0.94" />
          </linearGradient>
        </defs>
      </svg>
      <p className="text-5xl text-primary font-bold relative w-1/2 px-8 py-6">
        Catch your favourite creators on
        <span className="text-vibrant pl-2">Cassette</span>
      </p>
      <p className="text-orange-800 absolute bottom-2 right-4">
        <a href="https://www.freepik.com/free-photo/rendering-abstract-futuristic-background-with-glowing-neon-blue-orange-lights_10860238.htm">
          Image by wirestock
        </a>{' '}
        on Freepik
      </p>
    </div>
  )
}

export default LandingBanner
