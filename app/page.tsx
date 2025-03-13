import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Dados mockados para exemplo
  const featuredPosts = [
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
  ]

  return (
    <div className="container py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-8">Últimas Notícias</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button>Ver mais notícias</Button>
        </div>
      </section>
    </div>
  )
}