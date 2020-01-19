import React, { useEffect, useContext, useRef, memo } from 'react'
import ReactDOM from 'react-dom'
import LangContext from '../LangContext'
import { navigate } from 'hookrouter'
import HashTag from '../HashTag/HashTag'
import YouTube from '../YouTube/YouTube'
import Spinner from '../Spinner/Spinner'
import { Tooltip } from 'react-tippy'
import { markdownToHTML } from '../utils'
import { assert } from '../utils'

import styles from './PostPageBody.module.css'
import 'react-tippy/dist/tippy.css'

const translations = {
  spinner: ["the post", "la entrada"]
}

const TouchFriendlyAbbr = ({ text, tooltipText }) => (
  <Tooltip title={tooltipText} position="bottom" trigger="click">{text} <b style={{color: 'green'}}>(?)</b></Tooltip>
)

export default memo(function PostBody ({ post }) {
  const { t } = useContext(LangContext)

  const bodyRef = useRef(null)

  useEffect(() => {
    const bodyElement = bodyRef.current
    if (!bodyElement) return

    console.log('~ Processing post body.')

    Array.from(bodyElement.querySelectorAll('YouTube')).forEach((video) => {
      ReactDOM.render(<YouTube src={video.getAttribute('src')} />, video)
    })

    Array.from(bodyElement.querySelectorAll('abbr[title]')).forEach((abbr) => {
      ReactDOM.render(<TouchFriendlyAbbr text={abbr.innerText} tooltipText={abbr.title} />, abbr)
    })

    Array.from(bodyElement.querySelectorAll('i.hashtag')).forEach((i) => {
      ReactDOM.render(<HashTag>{i.innerText}</HashTag>, i)
    })

    Array.from(bodyElement.querySelectorAll('a[href^="/"]')).forEach((a) => {
      a.addEventListener('click', (event) => {
        console.log(`~ Navigating to ${a.href}`)
        navigate(a.href)
        event.preventDefault()
      })
    })

    Array.from(bodyElement.querySelectorAll(`img[src^="${post.slug}/"]`)).forEach((img) => {
      // img.src will print the whole URL, which is incorrect at this case, as it's assuming the frontend to be the root.
      console.log(img, img.getAttribute('src'))
      const path = img.getAttribute('src')
      img.src = `https://raw.githubusercontent.com/botanicus/data.blog/master/output/${path}`
    })
  }, [post])

  // const errorComponent = <FetchError error={error} />

  return (
    post && post.body ?
      <div className={assert(styles.post)} dangerouslySetInnerHTML={{ __html: markdownToHTML(post.body)}} ref={bodyRef} />
        :
      <Spinner title={t(translations.spinner)} />
  )
})
