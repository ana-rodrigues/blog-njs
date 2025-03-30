import styles from './footer.module.css';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className={`container ${styles.footer}`}>
      <p className={`paragraphSm ${styles.footerCredits}`}>
        All pixels carefully crafted using{' '}
        <span>
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>
        </span>{' '}
        and{' '}
        <span>
          <a href="https://framer.com/motion" target="_blank" rel="noopener noreferrer">Framer Motion</a>
        </span>. {' '}
        The carousel uses{' '}
        <span>
          <a href="https://www.embla-carousel.com/" target="_blank" rel="noopener noreferrer">Embla Carousel</a>
        </span>. {' '}
        Fonts are{' '}
        <span>
          <a href="https://pangrampangram.com/products/editorial-old" target="_blank" rel="noopener noreferrer">Editorial Old New</a>
        </span>, {' '}
        <span>
          <a href="https://pangrampangram.com/products/neue-montreal" target="_blank" rel="noopener noreferrer">Neue Montreal</a>
        </span>{' '}
        by Pangram Type Foundry, and{' '}
        <span>
          <a href="https://www.departuremono.com/" target="_blank" rel="noopener noreferrer">Departure Mono</a>
        </span>{' '}
        by Tobias Fried. Icons from the{' '}
        <span>
          <a href="https://github.com/grassmunk/Chicago95" target="_blank" rel="noopener noreferrer">Chicago 95 theme by grasmunk</a>
        </span>{' '}
        and from{' '}
        <span>
          <a href="https://tabler.io/icons" target="_blank" rel="noopener noreferrer">Tabler Icons</a>
        </span>.
      </p>
      <p className='paragraphSm'>
        &copy;{currentYear} Ana Fernandes Rodrigues
      </p>
    </footer>
  )
}

export default Footer;