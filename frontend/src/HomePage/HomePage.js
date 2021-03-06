import React, { useContext, /*useState,*/ memo } from 'react'
import { useTitle } from 'hookrouter'
import PostPreview from '../PostPreview/PostPreview'
import Spinner from '../Spinner/Spinner'
import StateContext from '../StateContext'
import LangContext from '../LangContext'
import styles from './HomePage.module.css'
import { assert } from '../utils'
// import InfiniteScroll from 'react-infinite-scroll-component'

const translations = {
  title: ["Jakub's blog", "Blog de Jakub"],
  empty: ["There are no posts yet.", "Todavía no hay ningunas entradas."],
  posts: ["the posts", "las entradas"]
}

export default memo(function HomePage () {
  const { setLang, t } = useContext(LangContext)
  const state = useContext(StateContext)

  useTitle(t(translations.title))

  const MissingTranslationsWarning = () => (
    <div className={assert(styles.missingTranslationsBox)}>
      <p>
        Disculpa, pero todavía no he traducida todas las entradas a español. Ya hay algunas, pero necesito más tiempo (nada más estoy empezando ahora, fin de enero de 2020).
        Si hablas inglés, te recomiendo cambiar el idioma (haz click a la banderita arriba). Si no, tienes que esperar unas (pocas) semanas. Disculpa el desmadre.
      </p>
    </div>
  )

  const PostPreviewList = ({ posts }) => (
    <>
      {setLang === 'es' && <MissingTranslationsWarning />}
      {posts.map((post) => <PostPreview key={post.slug} {...post} />)}
    </>
  )

  const NoPostsPlaceholder = () => (
    <div className={assert(styles.empty)}>{t(translations.empty)}</div>
  )

  function PostList ({ posts }) {
    // TODO: use window.innerHeight to set.
    // const perPage = 5
    // const [ displayedPosts, setDisplayedPosts ] = useState(posts.slice(0, perPage))
    // const [ position, setPosition ] = useState(perPage)

    // function showMorePosts () {
    //   console.log(position)
    //   setDisplayedPosts(displayedPosts.concat(posts.slice(position, position + perPage)))
    //   setPosition(position + perPage)
    // }

    if (!posts.length) return <NoPostsPlaceholder />

    return <PostPreviewList posts={posts} />
    // return (
    //   <InfiniteScroll
    //     dataLength={perPage}
    //     hasMore={displayedPosts.length === posts.length}
    //     loader={<>Loading ...</>}
    //     next={showMorePosts}
    //   >
    //     <PostPreviewList posts={displayedPosts} />
    //   </InfiniteScroll>
    // )
  }

  return state.postsFetched ? <PostList posts={state.posts} /> : <Spinner title={t(translations.posts)} />
})
