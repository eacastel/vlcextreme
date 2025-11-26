import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Button from '../components/Button';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaClock } from 'react-icons/fa';

const BlogIndexPage = ({ data }) => {
    const posts = data.allContentfulBlogPost.nodes;

    // Helper to color-code categories
    const getCategoryColor = (slug) => {
        if (slug?.includes('ai') || slug?.includes('inteligencia')) return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
        return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
    };

    return (
        <Layout>
            <Seo
                title="Bitácora de Ingeniería | VLCExtreme"
                description="Artículos técnicos, benchmarks y guías de optimización para hardware de alto rendimiento. Gaming, IA y Workstations."
                pathname="/blog"
            />

            {/* 🔹 Hero Section */}
            <section className="relative bg-carbon-black py-24 text-center px-6 border-b border-white/5 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-neon-cyan/5 blur-[100px] pointer-events-none"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">
                        Knowledge Base
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Bitácora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Ingeniería</span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
                        Análisis técnico, comparativas de silicio y guías de optimización. 
                        Entiende el hardware antes de encargarlo.
                    </p>
                    <Button to="/configuraciones" color="neoncyan" variant="outline">
                        Explorar Arquitecturas
                    </Button>
                </div>
            </section>

            {/* 🔹 Posts Grid */}
            <section className="bg-dark-gray py-20 px-4">
                <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => {
                        const image = getImage(post.coverImage);
                        
                        // Reading time calculation
                        const getReadingTime = (raw) => {
                            try {
                                const doc = JSON.parse(raw);
                                const text = doc.content.map(n => n.content?.map(c => c.value).join(' ')).join(' ');
                                const words = text.trim().split(/\s+/).length;
                                return Math.ceil(words / 200);
                            } catch { return 5; }
                        };
                        const readingTime = getReadingTime(post.body?.raw);

                        return (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.category?.slug || 'general'}/${post.slug}`}
                                className="group block bg-carbon-black rounded-xl overflow-hidden border border-white/5 hover:border-neon-cyan/50 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                            >
                                {/* Image */}
                                <div className="h-56 overflow-hidden relative">
                                    {image ? (
                                        <GatsbyImage 
                                            image={image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">VLCExtreme</div>
                                    )}
                                    {/* Category Badge */}
                                    {post.category && (
                                        <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase px-2 py-1 rounded border backdrop-blur-md ${getCategoryColor(post.category.slug)}`}>
                                            {post.category.name}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-mono">
                                        <span>{new Date(post.publishDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="flex items-center gap-1"><FaClock className="mb-0.5"/> {readingTime} min</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-neon-cyan transition-colors">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    {post.tags && (
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {post.tags.slice(0,3).map(tag => (
                                                <span key={tag.slug} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};

export const query = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        excerpt
        publishDate
        body { raw }
        category {
          name
          slug
        }
        tags {
          name
          slug
        }
        coverImage {
          gatsbyImageData(layout: CONSTRAINED, width: 800, placeholder: BLURRED)
        }
      }
    }
  }
`;

export default BlogIndexPage;