/* TODO: tests. */
import React from 'react'
import FetchedData, { useFetchedData } from '../FetchedData/FetchedData'
import styles from '../HomePage/HomePage.module.css'
import { assert } from '../utils'
import { Link } from 'react-router-dom'

const TagPreview = ({ slug, name }) => (
  <ul>
    <li><Link to={`/tags/${slug}`}>{name}</Link></li>
  </ul>
)

const TagPreviewList = ({ tags }) => (
  tags.map((tag) => <TagPreview key={tag.slug} {...tag} />)
)

const NoTagsPlaceholder = () => (
  <div className={assert(styles.empty)}>There are no tags yet.</div>
)

const TagList = ({ tags }) => (
  tags.length ? <TagPreviewList tags={tags} /> : <NoTagsPlaceholder />
)

export default function TagsPage () {
  const [isLoading, tags, error] = useFetchedData(
    'https://raw.githubusercontent.com/botanicus/data.blog/master/output/tags.json', []
  )

  return (
    <FetchedData isLoading={isLoading} error={error}>
      <TagList tags={tags} />
    </FetchedData>
  )
}