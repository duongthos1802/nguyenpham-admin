import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ProductImage = (props) => {
  const {
    className,
    alt = 'lendor',
    src
  } = props

  const handleErrorFile = (event) => {
    event.target.onerror = null
    event.target.src = require('../../img/default-images.png')
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classNames('img-fluid', className)}
      onError={handleErrorFile}
    />
  )
}
ProductImage.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string
}

export default ProductImage