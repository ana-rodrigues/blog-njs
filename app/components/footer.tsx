import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={`container ${styles.footer}`}>

        <div className={`${styles.preFooter}`}>
            <div className='link'>
              <a href="https://www.linkedin.com/in/ana-fernandes-rodrigues">Linkedin</a>
              <img className={`inline`} src='/media/url.png' alt='Square company logotype ' />
            </div>
            <div className='link'>
              <a href="mailto:hello@anarodrigues.design">hello@anarodrigues.design</a>
              <img className={`inline`} src='/media/url.png' alt='Square company logotype ' />
            </div>
        </div>

    </footer>
  )
}

export default Footer