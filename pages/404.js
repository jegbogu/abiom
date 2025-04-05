import Link from 'next/link'
import classes from './404.module.css'
export default function Custom404() {
    return (
      <div className={classes.error}>
        <h1>Oops, this page is not adventure ready</h1>
        <p>If this is an error, please contact us at  abiomsupply@gmail.com</p>
        <button><Link href='/shop'>But Our Products are here</Link></button>
      </div>
    )
  }