import React, { useState } from 'react'

function StateHook() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You Clicked <strong>{count}</strong></p>
      <button onClick={() => setCount((p) => p + 1)}> Click for plus</button>
      <button onClick={() => setCount(count - 1)}> Click for min</button>

    </div>
  )
}

export default StateHook
