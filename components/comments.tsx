"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface CommentsProps {
  postId: number
}

export function Comments({ postId }: CommentsProps) {
  const [comment, setComment] = useState("")
  
  // Dados mockados - substituir por dados do Supabase
  const comments = [
    {
      id: 1,
      author: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1470",
      },
      content: "Excelente análise! Realmente o Palworld surpreendeu a todos com sua proposta única.",
      date: "2024-02-21T10:30:00",
    },
    {
      id: 2,
      author: {
        name: "Pedro Costa",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1470",
      },
      content: "Concordo com todos os pontos. O sistema de automação é realmente viciante!",
      date: "2024-02-21T11:15:00",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de envio do comentário
    setComment("")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comentários</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário..."
          className="mb-4"
        />
        <Button type="submit">Enviar comentário</Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(comment.date), "d MMM yyyy 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}