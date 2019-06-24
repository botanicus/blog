import React from 'react'
import Gravatar from 'react-gravatar'
import { gravatarEmail } from '../config'
import styles from './Gravatar.module.css'

export default ({ className }) => (
  <Gravatar className={[styles.gravatar, className].filter(Boolean).join(' ')} email={gravatarEmail} size={100} alt="&lt;gravatar&gt;" />
)
