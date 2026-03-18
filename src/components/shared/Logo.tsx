'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-48 sm:w-60 md:w-[430px]">
        <Image
          src="/buddy-logo.png"
          alt="Buddy Logo"
          width={450}
          height={200}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
