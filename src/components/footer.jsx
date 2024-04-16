import React from 'react'
import '../css/footer.scss'
const Footer = () => {
  return (
    <div>
      <footer>
      <div className='Line'></div>
        <p className="footer-links">
            <a href="https://github.com/0memo07" target="_blank">
            View Source on Github
            </a>
            <span> / </span>
            <a href="mailto:omemo0135@gmail.com" target="_blank">
            Need any help?
            </a>
            <span> / </span>
            <a href="https://instagram.com/mhmettyq" target="_blank">
            Say Hi on İnstagram
            </a>
            <span> / </span>
            {/* <a href="" target="_blank">
            Read My Blog
            </a> */}
        </p>
        <p>
            © 2024 <strong>MeMo</strong> - All Rights Reserved
        </p>
    </footer>
    </div>
  )
}

export default Footer
