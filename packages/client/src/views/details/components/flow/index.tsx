import React, { memo, useState } from 'react'

function Flow() {
  console.log(12313)

  const [state, setState] = useState(0)

  return (
    <div onClick={() => setState(state + 1)}>{state}</div>
  )
}

export default memo(Flow)