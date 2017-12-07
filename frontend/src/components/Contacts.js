import React from 'react'
import PropTypes from 'prop-types'

export default function Contacts() {
  return(
    <section class="contacts__wrap">
      <h3>Contacts</h3>
      <ul class="contacts__list">
        <li class="contacts__item"><i className="fa fa-skype"></i><span>gloompi</span></li>
        <li class="contacts__item"><i className="fa fa-phone"></i><span>+8-132-7001-8916</span></li>
        <li class="contacts__item"><i className="fa fa-envelope"></i><span>gloompique@yandex.ru</span></li>
        <li class="contacts__item"><i className="fa fa-map-marker"></i><span>Yangzhou city, China</span></li>
      </ul>
    </section>
  )
}