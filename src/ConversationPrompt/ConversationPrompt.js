import React, { memo, useContext } from 'react'
import LangContext from '../LangContext'
import { assert } from '../utils'
import styles from './ConversationPrompt.module.css'
import { A } from 'hookrouter'
import { aboutPagePath } from '../routes'
import { registerFont, FontAwesomeIcon } from '../FontAwesome/FontAwesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import promptsEN from './prompts.en'
import promptsES from './prompts.es'

registerFont(faArrowRight)

const translations = {
  about: [
    /* FIXME: why is aboutPagePath undefined? */
    <>You can find out more about me on the <A href={aboutPagePath || '/about'}>about page</A>.</>,
    <>You can find out more about me on the <A href={aboutPagePath || '/about'}>about page</A>.</>,
  ]
}

const findPrompt = (prompts, tagNames) => {
  const result = Object.entries(prompts).find(([ promptTagName ]) => (
    tagNames.includes(promptTagName)
  ))
  return result && result[1]
}

export default memo(function ConversationPrompt ({ tagNames = [] }) {
  const { t, lang } = useContext(LangContext)
  const prompts = (lang === 'en') ? promptsEN : promptsES

  const prompt = tagNames.includes('now') ? prompts.default : (findPrompt(prompts, tagNames) || prompts.default)

  return (
    <div className={assert(styles.compact)}>
      {prompt}

      <p>
        <FontAwesomeIcon icon={faArrowRight} color="darkgreen" />{' '}
        {t(translations.about)}
      </p>
    </div>
  )
})
