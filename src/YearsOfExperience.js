import React from 'react'
import config from './config'

const year = new Date().getFullYear()

export default function YearsOfExperience () {
  return <abbr title={`From ${config.startYear} on`}>{year - config.startYear}</abbr>
}
