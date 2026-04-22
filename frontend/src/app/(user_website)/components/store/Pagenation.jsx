import React from 'react'

function Pagenation() {
  return (
    <div className='flex justify-center gap-x-2'>
        <div className='w-[40px] h-[35px] cursor-pointer text-white bg-[#1ABA1A] rounded-[6px] flex items-center justify-center'>1</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>2</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>3</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>4</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>...</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>20</div>
        <div className='w-[40px] h-[35px] cursor-pointer border border-[#DEE2E6] rounded-[6px] flex items-center justify-center'>Next</div>
    </div>
  )
}

export default Pagenation