import React, { Fragment } from 'react'
import PostStatusLine from '../PostStatusLine/PostStatusLine'
import styles from './PostPreview.module.css'

// NOTE: This fn doesn't have .name.
// TODO: Use h1, but put it into some <article or what is being used for this and tweak the styles so it isn't that big.
// ["title", "tags", "digest", "date", "slug", "excerpt", "path", "links"]
// {title: "zen", slug: "zen", path: "/tags/zen"}
const lang = '🇬🇧'

export default ({ slug, title, date, tags, excerpt }) => (
  <Fragment>
    <h2 className={styles.title}><a href={`/posts/${slug}`}>{title} {lang}</a></h2>
    <PostStatusLine date={date} tags={tags} />
    <p>{excerpt}</p>
  </Fragment>
)
