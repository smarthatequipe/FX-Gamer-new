import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  date: string
  author?: {
    name: string
    avatar: string
  }
}

// Função para obter todos os posts
function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // Verifica se o diretório existe
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Diretório de posts não encontrado:', postsDirectory);
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map(fileName => {
    // Remove a extensão ".md" do nome do arquivo para obter o id
    const id = fileName.replace(/\.md$/, '');
    
    // Lê o arquivo markdown como string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Usa gray-matter para analisar a seção de metadados do post
    const matterResult = matter(fileContents);
    
    // Verifica se todos os campos necessários existem
    const frontmatter = matterResult.data;
    
    // Cria um objeto Post com valores padrão para campos ausentes
    const post: Post = {
      id,
      title: frontmatter.title || 'Sem título',
      excerpt: frontmatter.excerpt || 'Sem descrição',
      content: matterResult.content || '',
      coverImage: frontmatter.coverImage || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1470',
      category: frontmatter.category || 'Sem categoria',
      date: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      author: frontmatter.author || {
        name: 'Autor Desconhecido',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1470',
      }
    };
    
    return post;
  });
  
  // Ordena os posts por data, do mais recente para o mais antigo
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Função para obter um post específico pelo ID
function getPostById(id: string): Post | undefined {
  const posts = getPosts();
  return posts.find(post => post.id === id);
}

// Dados mockados como fallback
const mockPosts: Post[] = [
  {
    id: "1",
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
    id: "2",
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
];

export async function generateStaticParams() {
  const posts = getPosts();
  // Se não houver posts, use os mockados como fallback
  const allPosts = posts.length > 0 ? posts : mockPosts;
  
  return allPosts.map((post) => ({
    id: post.id.toString()
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostById(params.id);
  
  // Se não encontrar o post real, tenta nos mockados
  const fallbackPost = !post ? mockPosts.find(p => p.id === params.id) : null;
  
  if (!post && !fallbackPost) {
    return {
      title: 'Post não encontrado | FXGAMES'
    };
  }

  const finalPost = post || fallbackPost;
  
  return {
    title: `${finalPost?.title} | FXGAMES`,
    description: finalPost?.excerpt,
    openGraph: {
      title: finalPost?.title || '',
      description: finalPost?.excerpt || '',
      images: [finalPost?.coverImage || ''],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostById(params.id);
  
  // Se não encontrar o post real, tenta nos mockados
  const fallbackPost = !post ? mockPosts.find(p => p.id === params.id) : null;

  if (!post && !fallbackPost) {
    notFound();
  }

  const finalPost = post || fallbackPost;
  
  if (!finalPost) {
    notFound();
  }

  return (
    <article className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge>{finalPost.category}</Badge>
            <time className="text-sm text-muted-foreground">
              {format(new Date(finalPost.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
            </time>
          </div>
          <h1 className="text-4xl font-bold mb-4">{finalPost.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{finalPost.excerpt}</p>
          <div className="relative aspect-video mb-8">
            <Image
              src={finalPost.coverImage}
              alt={finalPost.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          {finalPost.author && (
            <div className="flex items-center gap-3 mb-8">
              <Image
                src={finalPost.author.avatar}
                alt={finalPost.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm">Por <strong>{finalPost.author.name}</strong></span>
            </div>
          )}
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: finalPost.content }}
        />

        <Separator className="my-12" />
        
        <Comments postId={finalPost.id} />
        
        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </article>
  )
}