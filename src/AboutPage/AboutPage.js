import React, { useContext, useEffect, memo } from 'react'
import { A, useTitle } from 'hookrouter'
import StateContext from '../StateContext'
import LangContext from '../LangContext'
import PostPageBody from '../PostPageBody/PostPageBody'
import Spinner from '../Spinner/Spinner'
import * as routes from '../routes'

import ContentEN from './content.en.js'
import ContentES from './content.es.js'

const translations = {
  title: ["About Jakub", "Acerca de Jakub"],
  lastStatusUpdate: ["latest status update", "la última actualización"],
  spinner: ["my life story", "la historia de mi vida"],
  myStorySlug: ['my-life-story', 'historia-de-mi-vida']
}

export default memo(function AboutPage ({ lang }) {
  const { t, setLang } = useContext(LangContext)
  const state = useContext(StateContext)

  setLang(lang)
  // TODO: Use this instead: (from the nowpage)
  // useEffect(() => {
  //   if (lang !== langSettings.lang) {
  //     setLang(lang)
  //     state.helpers.reset(lang)
  //   } else {
  //     lastStatusUpdate || state.helpers.getLatestStatusUpdate()
  //   }
  // })

  const { nowPagePath, getPostPagePath } = routes[lang]

  useTitle(t(translations.title))

  useEffect(() => { state.lastStatusUpdate || state.helpers.getLatestStatusUpdate() })

  const LastStatusUpdateLink = ({ post }) => (
    post ? <A href={getPostPagePath(post.slug)}>{post.title}</A> : <A href={nowPagePath}>{t(translations.lastStatusUpdate)}</A>
  )

  const myStory = state.helpers.getPost(t(translations.myStorySlug))

  const Content = (lang === 'en') ? ContentEN : ContentES

  return (
    <Content lastStatusUpdateLink={<LastStatusUpdateLink post={state.lastStatusUpdate} />}>
      {myStory ? <PostPageBody post={myStory} /> : <Spinner title={t(translations.spinner)} />}
    </Content>
  )
})
