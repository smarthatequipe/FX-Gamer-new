import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Post {
  id: number
  title: string
  excerpt: string
  coverImage: string
  category: string
  date: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{post.category}</Badge>
          <time className="text-sm text-muted-foreground">
            {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
          </time>
        </div>
        <Link href={`/post/${post.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-muted-foreground">{post.excerpt}</p>
      </CardContent>
    </Card>
  )
}