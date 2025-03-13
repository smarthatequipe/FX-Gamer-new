import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"

// Interface para o tipo Post
interface Post {
  id: number | string
  title: string
  excerpt: string
  coverImage: string
  category: string
  date: string
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
      coverImage: frontmatter.coverImage || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1470',
      category: frontmatter.category || 'Sem categoria',
      date: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
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

export default function Home() {
  // Carrega os posts do sistema de arquivos
  const posts = getPosts();
  
  // Caso não existam posts, usa os dados mockados como fallback
  const featuredPosts: Post[] = posts.length > 0 ? posts : [
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
  ];

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