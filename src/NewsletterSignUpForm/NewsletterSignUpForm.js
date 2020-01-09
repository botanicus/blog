import React, { memo } from 'react'
import Mailchimp from 'react-mailchimp-form'
import { mailchimpURL } from '../config'
import { assert } from '../utils'
import styles from './NewsletterSignUpForm.module.css'
import { registerFont, FontAwesomeIcon } from '../FontAwesome/FontAwesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

registerFont(faArrowRight)

const fields = [
  {
    name: 'EMAIL',
    placeholder: 'your@email.com',
    type: 'email',
    required: true
  }
]

export const NewsletterSignUpLink = ({ children }) => (
  <a href={mailchimpURL} target="_blank" rel="noopener noreferrer">{children}</a>
)

export default memo(() => (
  <div className={assert(styles.box)}>
    <em className={assert(styles.here)}>Subscribe here</em>
    <FontAwesomeIcon icon={faArrowRight} color="darkgreen" className={assert(styles.arrow)} />{' '}
    <Mailchimp action={mailchimpURL} fields={fields} />
  </div>
))
