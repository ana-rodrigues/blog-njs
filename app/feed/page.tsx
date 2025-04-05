import { BlogPosts } from 'app/components/posts';
import AnimatedWrapper from 'app/components/animatedwrapper';
export const metadata = {
  title: 'Feed',
  description: 'Articles and experiments',
}

export default function Page() {
  return (
    <AnimatedWrapper>
        <h1 className='container visuallyHidden'>Feed</h1>
        <BlogPosts />
    </AnimatedWrapper>
  );
}
