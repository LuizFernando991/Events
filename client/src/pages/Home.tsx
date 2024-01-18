import { FC } from 'react'
import { Button } from '@/components/ui/button'

const Home: FC = () => {
  return (
    <div id="container">
      <section className="h-[60vh] bg-home-first bg-cover bg-center">
        <div className="flex justify-center flex-col h-full backdrop-blur-[2px] px-20 items-center">
          <div className="text-white flex flex-col justify-center h-full">
            <h1 className="text-3xl w-[320px] font-bold">
              Crie, organize e participe de eventos do seu jeito!
            </h1>
            <p className="mt-5 font-bold text-primary-foreground">
              Simples para quem organiza e fácil para quem participa.
            </p>
            <Button className="bg-[#e11d48] hover:bg-[#e11d47d3] mt-4">
              Cadastre-se
            </Button>
          </div>
        </div>
      </section>
      <section className="h-[30vh] bg-[#f5f8fa] flex justify-center">
        <div className="flex h-full gap-4 items-center px-20">
          <div className="flex justify-center flex-col font-bold text-xl ">
            <p>ARTE.</p>
            <p>SHOWS.</p>
            <p>PALESTRAS.</p>
            <p>E MUITO +.</p>
          </div>
          <div className="hidden w-[2px] h-[60%] bg-[#d2d6d9] md:flex ma:justify-center md:items-center  " />
          <div className="flex justify-center flex-col text-sm text-[#61565b]">
            <p>
              São inúmeros eventos para participar, escolha o que mais combina
              com você.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
