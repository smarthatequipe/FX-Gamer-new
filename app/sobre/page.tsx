import { Metadata } from "next"

export function generateStaticParams() {
  return []
}

export const metadata: Metadata = {
  title: 'Sobre | FXGAMES',
  description: 'Conheça mais sobre o FXGAMES, seu portal de notícias e reviews de games',
}

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sobre o FXGAMES</h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p>
            O FXGAMES é um portal dedicado a trazer as melhores notícias, análises e guias do mundo dos games.
            Nossa missão é manter você informado sobre tudo que acontece no universo dos jogos eletrônicos.
          </p>

          <h2>Nossa História</h2>
          <p>
            Fundado em 2024, o FXGAMES nasceu da paixão por games e da vontade de criar um espaço
            onde jogadores possam encontrar conteúdo de qualidade sobre seus jogos favoritos.
          </p>

          <h2>Nossa Equipe</h2>
          <p>
            Contamos com uma equipe de especialistas apaixonados por games, sempre prontos para
            trazer as análises mais completas e os guias mais detalhados para nossos leitores.
          </p>

          <h2>Nosso Compromisso</h2>
          <p>
            Nos comprometemos a trazer conteúdo de qualidade, com análises imparciais e
            informações precisas sobre o mundo dos games.
          </p>
        </div>
      </div>
    </div>
  )
}