import { BlogPosts } from 'app/components/posts';
import AnimatedWrapper from 'app/components/animatedwrapper';
export const metadata = {
  title: 'Blog',
  description: 'Read my writing.',
}

export default function Page() {
  return (
    <AnimatedWrapper>
      <section>
        <h1 className='container headingXl'>Blog</h1>
        <BlogPosts />
      </section>
    </AnimatedWrapper>
  );
}
