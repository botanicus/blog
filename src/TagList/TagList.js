import React, { memo } from 'react'
import Join from '../Join/Join'

/* \u00a0 is the same as &nbsp; */
export default memo(({ tags }) => (
  <Join items={tags}>
    {({ slug, name }) => (
      <a href={`/tags/${slug}`}>{name.replace(/ /g, "\u00a0")}</a>
    )}
  </Join>
))
