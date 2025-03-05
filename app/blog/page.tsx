
import { BlogPosts } from 'app/components/posts';
export const metadata = {
  title: 'Blog',
  description: 'Read my writing.',
}

export default function Page() {
  return (
    
      <section>
          <h1 className='container headingXl'>Blog</h1>
          <BlogPosts />
      </section>
  );
}
