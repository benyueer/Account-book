import React, { useState } from 'react'
import styles from './login.module.css'
console.log(styles)

function Login() {
  console.log('login')
  const [name, setName] = useState('')
  return (
    <div className={styles.main}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  )
}

export default React.memo(Login)