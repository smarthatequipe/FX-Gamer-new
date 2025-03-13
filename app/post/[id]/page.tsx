import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Comments } from "@/components/comments"
import { Newsletter } from "@/components/newsletter"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface PostPageProps {
  params: {
    id: string
  }
}

// Dados mockados - substituir por dados do CMS
const posts = [
  {
    id: 1,
    title: "Review: Palworld - O Pokémon com Armas que Conquistou a Internet",
    excerpt: "Descubra por que este jogo controverso está fazendo tanto sucesso...",
    content: `
      <p>Palworld chegou como uma verdadeira surpresa no início de 2024, conquistando milhões de jogadores em poucos dias. O jogo, que mistura elementos de Pokémon com mecânicas de sobrevivência e construção, tem gerado tanto buzz quanto controvérsia.</p>
      <h2>Gameplay Inovadora</h2>
      <p>A principal inovação de Palworld está na forma como combina diferentes gêneros. Você pode capturar criaturas (chamadas de "Pals"), mas também usá-las para construir bases, lutar com armas de fogo e criar uma linha de produção automatizada.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1470",
    category: "Reviews",
    date: "2024-02-20",
    author: {
      name: "João Silva",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1470",
    }
  },
  {
    id: 2,
    title: "Guia Completo: Como Dominar Helldivers 2",
    excerpt: "Aprenda as melhores estratégias para sobreviver neste shooter cooperativo...",
    content: `
      <p>Helldivers 2 é um dos jogos mais desafiadores de 2024. Neste guia completo, vamos explorar as melhores estratégias para sobreviver em suas missões.</p>
      <h2>Equipamento Essencial</h2>
      <p>A escolha do equipamento certo é fundamental para o sucesso em Helldivers 2. Vamos analisar as melhores opções para cada tipo de missão.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1470",
    category: "Guias",
    date: "2024-02-19",
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1470",
    }
  }
]

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString()
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = posts.find(p => p.id.toString() === params.id)
  
  if (!post) {
    return {
      title: 'Post não encontrado | FXGAMES'
    }
  }

  return {
    title: `${post.title} | FXGAMES`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find(p => p.id.toString() === params.id)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge>{post.category}</Badge>
            <time className="text-sm text-muted-foreground">
              {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
            </time>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="relative aspect-video mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex items-center gap-3 mb-8">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm">Por <strong>{post.author.name}</strong></span>
          </div>
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-12" />
        
        <Comments postId={post.id} />
        
        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </article>
  )
}