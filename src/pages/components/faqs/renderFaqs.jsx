import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import QuestionsAndAnswers from './questionsAndAnswers'

function RenderFAQs() {
  return (
    <div>
        <Header />
        <QuestionsAndAnswers />
        <Footer />
    </div>
  )
}

export default RenderFAQs