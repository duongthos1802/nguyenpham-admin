import React from 'react'
import styles from './style.module.scss'

const ShortItemInfo = ({ actionData, name, note, img, size }) => {

  return (
    <div className={`${styles.item} ${size === 'large' ? styles.large : ''}`}>
      {img && (
        <div className={styles.img}>
          <img src={img} alt="alt" />
        </div>
      )}
      <div className={styles.description}>
        {name && <h5 className={styles.name}>{name}</h5>}
        {note && <p className={styles.note}>{note}</p>}
      </div>
      {actionData && <div className={styles.actionData}>{actionData}</div>}
    </div>
  )
}

export default ShortItemInfo
