"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Implementar lógica de inscrição na newsletter
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível realizar sua inscrição. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-muted p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Receba as últimas notícias</h2>
      <p className="text-muted-foreground mb-4">
        Inscreva-se em nossa newsletter para receber as últimas notícias e análises do mundo dos games.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Inscrevendo..." : "Inscrever"}
        </Button>
      </form>
    </div>
  )
}