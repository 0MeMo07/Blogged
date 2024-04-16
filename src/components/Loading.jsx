import React from 'react'
import '../css/Loading.scss'
function Loading() {
  return (
    <>
    <div className="loading">
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
      <div className="loading-text">
        <span className="loading-text-words">B</span>
        <span className="loading-text-words">L</span>
        <span className="loading-text-words">O</span>
        <span className="loading-text-words">G</span>
        <span className="loading-text-words">G</span>
        <span className="loading-text-words">E</span>
        <span className="loading-text-words">D</span>
      </div>
    </div>
    </>
  )
}

export default Loading