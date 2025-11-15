import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Button from '../components/Button';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const BlogIndexPage = ({ data }) => {
    const posts = data.allContentfulBlogPost.nodes;

    return (
        <Layout>
            <Seo
                title="Blog sobre Ordenadores de Alto Rendimiento en Valencia | VLCExtreme"
                description="Descubre artículos sobre PCs Gaming, estaciones de trabajo para creadores e inteligencia artificial. Guías, comparativas y consejos desde Valencia."
                pathname="/blog"
            />

            {/* Hero */}
            <section className="relative bg-carbon-black py-20 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-4">Tecnología sin Límites</h1>
                <p className="text-xl text-medium-gray max-w-3xl mx-auto mb-6">
                    Guías, comparativas y consejos sobre ordenadores personalizados para gaming, creación y proyectos de inteligencia artificial desde Valencia.
                </p>
                <Button to="/configuraciones" color="neoncyan">
                    Ver Configuraciones Destacadas
                </Button>
            </section>

            {/* Posts Grid */}
            <section className="bg-dark-gray py-16 px-4">
                <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => {
                        const image = getImage(post.coverImage);
                        const getReadingTime = (raw) => {
                            try {
                                const doc = JSON.parse(raw);
                                const text = doc.content
                                    .map(n => n.content?.map(c => c.value).join(' '))
                                    .join(' ');
                                const words = text.trim().split(/\s+/).length;
                                return Math.ceil(words / 200);
                            } catch {
                                return null;
                            }
                        };
                        const readingTime = getReadingTime(post.body?.raw);

                        return (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.category.slug}/${post.slug}`}
                                className="block bg-carbon-black rounded-lg overflow-hidden shadow hover:shadow-xl transition"
                            >
                                {image && (
                                    <GatsbyImage image={image} alt={post.coverImage.description || post.title} className="h-48 w-full object-cover" />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-light-gray mb-2">{post.title}</h3>
                                    {post.byline && <p className="text-neon-yellow text-sm mb-1">{post.byline}</p>}
                                    <p className="text-medium-gray text-sm mb-2">{post.excerpt}</p>
                                    <p className="text-xs text-medium-gray italic">
                                        {new Date(post.publishDate).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })} · {readingTime} min lectura
                                    </p>
                                    {post.tags && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span
                                                    key={tag.slug}
                                                    className="text-xs text-neon-cyan border border-neon-cyan px-2 py-0.5 rounded-full"
                                                >
                                                    {tag.name}
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

            {/* CTA */}
            <section className="bg-footer-gray py-20 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-light-gray mb-4">
                    ¿Buscas el mejor ordenador para tus proyectos?
                </h2>
                <p className="text-xl text-medium-gray mb-6">
                    Podemos ayudarte a elegir el equipo perfecto según tu carga de trabajo o estilo de juego.
                </p>
                <Button to="/contacto" color="vividred">
                    Contacta con un Experto
                </Button>
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
        byline
        publishDate
        body {
          raw
        }
        category {
          slug
        }
        tags {
          ... on ContentfulTag {
            name
            slug
          }
        }
        coverImage {
          gatsbyImageData(layout: CONSTRAINED, width: 800)
          description
        }
      }
    }
  }
`;

export default BlogIndexPage;
