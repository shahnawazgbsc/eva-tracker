import React from 'react'
// import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'

export default ({ children, ...others }) => (
  <LinearGradient
    {...others}
    colors={['#077940', '#00A150', '#019C4E']}>
    {children}
  </LinearGradient>
)
