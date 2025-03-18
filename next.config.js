module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'blog-njs-culu.vercel.app',
          port: '',
          pathname: '/media/**', // Adjust this to match the path pattern of your images
        },
        {
          protocol: 'https',
          hostname: 'anarodrigues.design',
          port: '',
          pathname: '/**', // Adjust this as needed
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/**', // Adjust this as needed
        },
      ],
    },
  };