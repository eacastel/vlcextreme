import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogRelatedPosts = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
         <div className="h-px bg-white/10 flex-grow"></div>
         <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
            Lectura Relacionada
         </h2>
         <div className="h-px bg-white/10 flex-grow"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {posts.map(post => {
          const image = getImage(post.coverImage);

          return (
            <Link
              key={post.slug}
              to={`/blog/${post.category?.slug || 'general'}/${post.slug}`}
              className="group block bg-dark-gray rounded-xl overflow-hidden border border-white/5 hover:border-neon-cyan/30 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                {image && (
                  <GatsbyImage
                    image={image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogRelatedPosts;