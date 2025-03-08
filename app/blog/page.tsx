import { BlogPosts } from 'app/components/posts';
import AnimatedWrapper from 'app/components/animatedwrapper';
export const metadata = {
  title: 'Blog',
  description: 'Read my writing.',
}

export default function Page() {
  return (
    <AnimatedWrapper>
        <h1 className='container visuallyHidden'>Blog</h1>
        <BlogPosts />
    </AnimatedWrapper>
  );
}
