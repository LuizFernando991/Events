import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()
  return (
    <div id="container" className="w-full grow">
      <section className="h-[40rem] bg-home-first bg-cover bg-center w-full">
        <div className="flex justify-center flex-col h-full backdrop-blur-[2px] items-center w-full">
          <div className="text-white flex flex-col justify-center h-full items-center max-w-[520px] p-2">
            <div>
              <h1 className="text-3xl font-bold text-wrap">
                Crie, organize e participe de eventos do seu jeito!
              </h1>
              <p className="mt-5 font-bold text-primary-foreground">
                Simples para quem organiza e fácil para quem participa.
              </p>
            </div>

            <Button
              className="bg-[#e11d48] hover:bg-[#e11d5e] mt-4 max-w-120 w-full"
              onClick={() => navigate('/register')}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-[#f5f8fa] flex justify-center">
        <div className="flex h-full gap-4 items-center px-2 md:px-20">
          <div className="flex justify-center flex-col font-bold text-xl text-primary">
            <p>ARTE.</p>
            <p>SHOWS.</p>
            <p>PALESTRAS.</p>
            <p>E MUITO +.</p>
          </div>
          <div className="hidden w-[2px] h-[40%] bg-[#d2d6d9] md:flex md:justify-center md:items-center  " />
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
