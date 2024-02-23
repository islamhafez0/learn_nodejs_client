import React from 'react'
import App from './App'
import App2 from './App2'
import ArticleDetails from './ArticleDetails'
import {Routes, Route} from "react-router-dom"
import PopUp from './PopUp'
const MainApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App2 />} />
        <Route path="/articles" element={<App />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </>
  )
}

export default MainApp