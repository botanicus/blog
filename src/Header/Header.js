import React, { memo, useContext, useState } from 'react'
import { navigate } from 'hookrouter'
import { assert } from '../utils'
import { UnhighlightedLink } from '../Link/Link'
import LangContext from '../LangContext'
import SettingsContext from '../SettingsContext'
import StateContext from '../StateContext'
import styles from './Header.module.css'
import { UK, MX } from '../flags'
import * as routes from '../routes'
import getTagTranslation from '../TagsPage/translations'
import Modal from 'react-modal'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'))

const translations = {
  tagline: [
    <>On programming, Ruby, React.js, languages and&nbsp;life.</>,
    "Acerca de programación, Ruby, React.js, idiomas y la vida."
  ],
  // NOTE: These has to be in reverse.
  alert: [
    <>
      Esta entrada todavía no está traducida a Español.<br /> ...
    </>,
    <>
      This post hasn't been translated to English yet.<br /> Press continue to go to the blog home page (in English) or press cancel to stay on this page (in the current language version).<br />
    </>,
  ]
}

const DevModeIndicator = ({ settings }) => (
  settings.dev && <div className={styles.indicator}>{JSON.stringify(settings)}</div>
)

const langs = {en: UK, es: MX}

export default memo(function Header () {
  const { t, lang, setLang } = useContext(LangContext)
  const state = useContext(StateContext)
  const settings = useContext(SettingsContext)

  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const toLang = (lang === 'en') ? 'es' : 'en'
  const FlagIcon = langs[toLang]

  function switchLang () {
    localStorage.setItem('lang', toLang)

    setLang(toLang)

    state.helpers.reset(toLang)

    // Simple routes without :slug.
    Object.entries(routes[lang]).forEach(([ routeName, routePath ]) => {
      if (window.location.pathname === routePath) {
        return navigate(routes[toLang][routeName])
      }
    })

    const fromSlug = window.location.pathname.split('/').slice(-1)[0]

    // Posts.
    if (routes[lang].getPostPagePath(fromSlug) === window.location.pathname) {
      const post = state.posts.find(post => post.slug === fromSlug)
      if (post && post.translations[toLang]) {
        navigate(routes[toLang].getPostPagePath(post.translations[toLang]))
      } else {
        setModalIsOpen(true)
      }
    // Tags.
    } else if (routes[lang].getTagPagePath(fromSlug) === window.location.pathname) {
      const toSlug = getTagTranslation(toLang, fromSlug)
      window.location = (toSlug ? routes[toLang].getTagPagePath(toSlug) : routes[toLang].tagsPagePath)
    }
  }

  return (
    <>
      {/* The modal. */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
      >
        <h2>Test</h2>
        {t(translations.alert)}
        {/* TODO: close or link to /. */}
      </Modal>

      {/* The header. */}
      <header className={assert(styles.header)}>
        <h1>
          <UnhighlightedLink to="/">Jakub Šťastný</UnhighlightedLink>
        </h1>

        <p>
          {t(translations.tagline)}
        </p>

        <DevModeIndicator settings={settings} />

        <div style={{position: 'absolute', top: 0, right: 0, padding: 5}}>
          <div className={assert(styles.lang)}>
            {/* This will need to happen for posts and tags. */}
            {/* <NavLink to={page[toLang].route} activeClassName={styles.toLangLink}> */}
            <span onClick={switchLang}>
              <FlagIcon />
            </span>
          </div>
        </div>
      </header>
    </>
  )
})
