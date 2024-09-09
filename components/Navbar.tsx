import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "@/assets/black_logo (1).png"

function Navbar() {
  return (
    <header className='sticky top-5 z-50 flex h-[58px] w-full items-center rounded-3xl bg-white bg-opacity-75 px-5 py-2.5 backdrop-blur-md backdrop-filter md:h-24 md:px-8 md:py-4'>
      <div className='flex w-full items-center justify-between'>
      <Image src={logo} alt="logo" width={200} height={200} />
      <button data-theme="myTheme" className='hidden md:flex btn btn-primary text-white'>
        Support Us!
      </button>
      </div>
    </header>
  )
}

export default Navbar
