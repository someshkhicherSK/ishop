'use client'
import dynamic from "next/dynamic"
import { useRef } from "react";

const JodiEditor = dynamic(()=>import('jodit-react'),{ssr:false});

function TextEditor({value,changehandler}) {
    const editor = useRef(null);
  return (
    <JodiEditor 
    ref={editor}
    value={value}
    tabIndex={1}
    onChange={(data)=>changehandler(data)}
    />
  )
}

export default TextEditor