"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { DialogTitle } from "@radix-ui/react-dialog"

export function Search() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Dados mockados - substituir por busca real
  const searchResults = [
    {
      id: 1,
      title: "Review: Palworld",
      category: "Reviews",
    },
    {
      id: 2,
      title: "Guia: Helldivers 2",
      category: "Guias",
    },
  ]

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        Pesquisar...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Pesquisar no site</DialogTitle>
        <CommandInput placeholder="Digite para pesquisar..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Resultados">
            {searchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => {
                  router.push(`/post/${result.id}`)
                  setOpen(false)
                }}
              >
                <span>{result.title}</span>
                <span className="ml-2 text-muted-foreground">
                  em {result.category}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}