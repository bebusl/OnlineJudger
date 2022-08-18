import React,{useRef} from 'react'

function Input({validation}:{validation:()=>boolean}) {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
    <>
    <input ref={inputRef} />
    {!validation&&<p>밸리데이션 에러</p>}
    </>
  )
}

export default Input