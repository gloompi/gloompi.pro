import React from 'react'
import PropTypes from 'prop-types'
import {IoSocialNodejs} from 'react-icons/lib/io'
import {IoSocialHtml5} from 'react-icons/lib/io'
import {IoSocialCss3} from 'react-icons/lib/io'
import {IoSocialSass} from 'react-icons/lib/io'
import {IoSocialPython} from 'react-icons/lib/io'
import {IoSocialJavascriptOutline} from 'react-icons/lib/io'
import {IoSocialAngular} from 'react-icons/lib/io'
import {IoSocialWordpress} from 'react-icons/lib/io'
import {IoAndroidPhonePortrait} from 'react-icons/lib/io'

export default function TechIcon(props) {
  const {tech} = props
  
  if(tech == 'node') return <IoSocialNodejs />

  if(tech == 'html5') return <IoSocialHtml5 />

  if(tech == 'css3') return <IoSocialCss3 />

  if(tech == 'sass') return <IoSocialSass />

  if(tech == 'python')return <IoSocialPython />

  if(tech == 'js') return <IoSocialJavascriptOutline />

  if(tech == 'angular') return <IoSocialAngular />

  if(tech == 'wp') return <IoSocialWordpress />

  if(tech == 'adaptive') return <IoAndroidPhonePortrait />

  return tech
}