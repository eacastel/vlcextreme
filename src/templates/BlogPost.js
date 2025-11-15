import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Button from "../components/Button"
import BlogCTA from "../components/BlogCTA"
import BlogRelatedPosts from "../components/BlogRelatedPosts"
import BlogBuildsHighlight from "../components/BlogBuildsHighlight"
import { renderRichText } from "../utils/renderRichText"



const getReadingTime = raw => {
  try {
    const doc = JSON.parse(raw)
    const text = doc.content
      .map(n => n.content?.map(c => c.value).join(" "))
      .join(" ")
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / 200)
  } catch {
    return null
  }
}

const BlogPostTemplate = ({ data }) => {
  const post = data.contentfulBlogPost
  const coverImage = getImage(post.coverImage)
const richTextContent = renderRichText(post.body.raw)
  const readingTime = getReadingTime(post.body.raw)
  const publishDate = new Date(post.publishDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.metaDescription || post.excerpt}
        pathname={`/blog/${post.slug}`}
        image={post.coverImage?.file?.url}
      />

      {/* 🔹 Hero Section */}
      <section className="relative pt-20 pb-1 bg-carbon-black text-light-gray">
        {coverImage && (
          <div className="w-full max-h-[500px] overflow-hidden rounded-lg mb-10">
            <GatsbyImage
              image={coverImage}
              alt={post.coverImage.description || post.title}
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <p className="text-medium-gray text-sm mb-2">
            {post.byline && <span>{post.byline}</span>}
            {post.publishDate && <span> · {publishDate}</span>}
            {readingTime && <span> · {readingTime} min de lectura</span>}
          </p>

          {post.category && (
            <p className="text-neon-yellow text-md uppercase tracking-widest my-4">
              {post.category.name}
            </p>
          )}

          <p className="relative text-xl md:text-2xl font-light italic text-neon-green leading-snug mb-2 text-left mt-14 mx-auto before:absolute before:inset-y-0 before:-left-4 before:w-1 before:bg-neon-green">{post.excerpt}</p>
        </div>
      </section>

      {/* 🔹 Main Content */}
      <article className="prose prose-invert prose-lg max-w-4xl mx-auto px-4 py-10">
        {richTextContent}
      </article>

      {/* 🔹 Tags */}
      {post.tags?.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 pb-10 text-light-gray">
          <h4 className="text-base font-semibold mb-2">Etiquetas:</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag.slug}
                className="bg-carbon-gray text-xs px-3 py-1 rounded-full uppercase tracking-wide"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🔹 CTA: Configura tu PC */}
      <section className="py-16 bg-dark-gray text-center">
        <h2 className="text-3xl font-bold text-light-gray mb-4">
          ¿Listo para tu PC a medida?
        </h2>
        <p className="text-medium-gray mb-6 max-w-xl mx-auto">
          Configura tu ordenador personalizado optimizado para Gaming,
          Producción o Inteligencia Artificial.
        </p>
        <Button to="/configuraciones" color="neongreen">
          Ver Configuraciones Disponibles
        </Button>
      </section>

      {/* 🔹 Builds Highlighted */}
      <BlogBuildsHighlight category={post.category} />

      {/* 🔹 Related Posts */}
      <BlogRelatedPosts tags={post.tags} currentSlug={post.slug} />

      {/* 🔹 Blog CTA */}
      <BlogCTA />
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
      byline
      publishDate(formatString: "DD MMMM YYYY", locale: "es")
      author {
        name
        photo {
          gatsbyImageData(width: 40, height: 40, layout: FIXED)
        }
      }
      coverImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
      category {
        name
        slug
      }
      tags {
        ... on ContentfulTag {
          name
          slug
        }
      }
    }

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
        coverImage {
          gatsbyImageData(layout: CONSTRAINED, width: 600)
          description
        }
        category {
          slug
        }
      }
    }
  }
`;

export default BlogPostTemplate
