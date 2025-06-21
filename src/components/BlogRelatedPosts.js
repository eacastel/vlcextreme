import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogRelatedPosts = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="related-posts-title"
      className="bg-carbon-black py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="related-posts-title"
          className="text-3xl font-bold text-light-gray mb-8"
        >
          Artículos Relacionados
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => {
            const image = getImage(post.coverImage);

            return (
              <Link
                key={post.slug}
                to={`/blog/${post.category.slug}/${post.slug}`}
                className="block bg-dark-gray rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                {image && (
                  <GatsbyImage
                    image={image}
                    alt={post.coverImage.description || post.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-light-gray mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-medium-gray">
                    {post.excerpt?.slice(0, 120)}...
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogRelatedPosts;
