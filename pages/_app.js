import { Component } from 'react';

import MainLayout from './components/MainLayout.js'

import './css/app.css';
import './css/navigation.css';

export default function MyApp({ Component, pageProps }) {
	return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}