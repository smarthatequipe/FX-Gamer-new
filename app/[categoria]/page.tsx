import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface CategoryPageProps {
  params: {
    categoria: string
  }
}

const categorias = {
  noticias: "Notícias",
  reviews: "Reviews",
  guias: "Guias"
}

export async function generateStaticParams() {
  return Object.keys(categorias).map((categoria) => ({
    categoria: categoria,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoria = params.categoria
  const categoriaTitle = categorias[categoria as keyof typeof categorias]

  if (!categoriaTitle) {
    return {
      title: 'Categoria não encontrada | FXGAMES'
    }
  }

  return {
    title: `${categoriaTitle} | FXGAMES`,
    description: `Confira as últimas ${categoriaTitle.toLowerCase()} sobre games no FXGAMES`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoria = params.categoria
  const categoriaTitle = categorias[categoria as keyof typeof categorias]

  if (!categoriaTitle) {
    notFound()
  }

  // Dados mockados para exemplo - substituir por dados do CMS
  const posts = [
    {
      id: 1,
      title: "Review: Palworld - O Pokémon com Armas que Conquistou a Internet",
      excerpt: "Descubra por que este jogo controverso está fazendo tanto sucesso...",
      coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1470",
      category: "Reviews",
      date: "2024-02-20",
    },
    {
      id: 2,
      title: "Guia Completo: Como Dominar Helldivers 2",
      excerpt: "Aprenda as melhores estratégias para sobreviver neste shooter cooperativo...",
      coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1470",
      category: "Guias",
      date: "2024-02-19",
    },
  ].filter(post => post.category === categoriaTitle)

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">{categoriaTitle}</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button>Carregar mais</Button>
      </div>
    </div>
  )
}