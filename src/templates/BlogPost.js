import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Button from "../components/Button"
import BlogRelatedPosts from "../components/BlogRelatedPosts"
import BlogBuildsHighlight from "../components/BlogBuildsHighlight" // Ensure this file exists or comment out
import { renderRichText } from "gatsby-source-contentful/rich-text" 
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// Helper for reading time
const getReadingTime = raw => {
  try {
    const doc = JSON.parse(raw)
    const text = doc.content.map(n => n.content?.map(c => c.value).join(" ")).join(" ")
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / 200)
  } catch { return 5 }
}

const BlogPostTemplate = ({ data }) => {
  const post = data.contentfulBlogPost
  const relatedPosts = data.relatedPosts?.nodes || [] // ✅ Fix: Extract nodes correctly
  const coverImage = getImage(post.coverImage)
  
  // Simple options for Rich Text rendering to style it correctly
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-gray-300 leading-relaxed text-lg">{children}</p>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-bold text-neon-cyan mt-8 mb-4">{children}</h3>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2 marker:text-neon-cyan">{children}</ul>,
    },
  };

  const richTextContent = renderRichText(post.body, options) // Use standard Gatsby Contentful render
  const readingTime = getReadingTime(post.body.raw)
  const publishDate = new Date(post.publishDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        pathname={`/blog/${post.slug}`}
        image={post.coverImage?.url}
      />

      {/* 🔹 Editorial Header */}
      <section className="relative pt-32 pb-12 bg-carbon-black text-center px-6">
        <div className="max-w-4xl mx-auto">
            
            {/* Category & Date */}
            <div className="flex items-center justify-center gap-4 text-sm font-mono text-gray-500 mb-6 uppercase tracking-widest">
                {post.category && <span className="text-neon-cyan">{post.category.name}</span>}
                <span>•</span>
                <span>{publishDate}</span>
                <span>•</span>
                <span>{readingTime} min lectura</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {post.title}
            </h1>

            {/* Excerpt / Lead */}
            <p className="text-xl md:text-2xl text-gray-400 font-light italic max-w-3xl mx-auto leading-relaxed border-l-4 border-neon-cyan pl-6 text-left">
                {post.excerpt}
            </p>
        </div>
      </section>

      {/* 🔹 Main Image */}
      {coverImage && (
        <div className="w-full max-w-6xl mx-auto px-4 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <GatsbyImage image={coverImage} alt={post.title} className="w-full max-h-[600px] object-cover" />
            </div>
        </div>
      )}

      {/* 🔹 Content Body */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* We use standard HTML/JSX rendering here, controlled by 'options' above */}
        <div className="prose prose-lg prose-invert prose-a:text-neon-cyan prose-strong:text-white max-w-none">
            {richTextContent}
        </div>

        {/* Tags Footer */}
        {post.tags && (
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag.slug} className="text-xs text-gray-400 bg-dark-gray px-3 py-1 rounded-full border border-white/5">
                        #{tag.name}
                    </span>
                ))}
            </div>
        )}
      </article>

      {/* 🔹 CTA: Contextual */}
      <section className="py-20 bg-dark-gray border-y border-white/5 text-center px-6">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
                ¿Necesitas hardware para esto?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
                Diseñamos máquinas optimizadas para las tecnologías que acabas de leer. 
                Sin cuellos de botella.
            </p>
            <Button to="/configuraciones" color="neongreen" variant="solid">
                Ver Arquitecturas Disponibles
            </Button>
        </div>
      </section>

      {/* 🔹 Builds Highlight (Optional) */}
      {/* <BlogBuildsHighlight category={post.category} /> */}

      {/* 🔹 Related Posts (Now connected correctly) */}
      <div className="bg-carbon-black">
          <BlogRelatedPosts posts={relatedPosts} />
      </div>

    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!, $categorySlug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        raw
      }
      excerpt
      publishDate
      coverImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      category {
        name
        slug
      }
      tags {
        name
        slug
      }
    }

    # ✅ Correctly fetching related posts by category
    relatedPosts: allContentfulBlogPost(
      filter: {
        slug: { ne: $slug }
        category: { slug: { eq: $categorySlug } }
      }
      limit: 3
      sort: { publishDate: DESC }
    ) {
      nodes {
        title
        slug
        excerpt
        category { slug }
        coverImage {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
      }
    }
  }
`;

export default BlogPostTemplate