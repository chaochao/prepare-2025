// app/components/ExampleClientComponent.tsx
import React from "react"
import { useEffect, useState } from "react"

 // Mark as Client Component

export default function Component() {
  // Only access browser APIs after mount
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  console.log(process)
  // Now safe to use browser APIs
  return (<><div>{window.innerWidth}</div><p>Env Var: {process.env.NEXT_PUBLIC_TEST}</p></>
  )
}