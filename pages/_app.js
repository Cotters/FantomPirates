import { Component } from 'react';

import Layout from './components/layout.js'

import './css/app.css';
import './css/navigation.css';

export default function MyApp({ Component, pageProps }) {
	return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}