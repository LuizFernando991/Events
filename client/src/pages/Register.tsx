import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { login, user } = useAuth()

  const navigator = useNavigate()

  useEffect(() => {
    if (user) {
      navigator('/dashbord')
    }
  }, [navigator, user])

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  })

  const handleOnFormSubmit = (data: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      login(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-grow w-full flex items-center justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle className="font-bold text-primary">Cadastre-se!</CardTitle>
          <CardDescription>Junte-se ao events!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleOnFormSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid w-full items-center">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input
                  {...register('name', { required: 'Campo obrigatório' })}
                  id="email"
                  placeholder="seu nome"
                  className={errors.name ? 'border-rose-500' : ''}
                />
                <p
                  className={`text-sm text-rose-400 ${errors['name']?.message ? ' ' : 'invisible'}`}
                >
                  {errors['name']?.message || 'placeholder error'}
                </p>
              </div>
            </div>
            <div className="grid w-full items-center">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register('username', { required: 'Campo obrigatório' })}
                  id="email"
                  placeholder="nome de usuário"
                  className={errors.name ? 'border-rose-500' : ''}
                />
                <p
                  className={`text-sm text-rose-400 ${errors['username']?.message ? ' ' : 'invisible'}`}
                >
                  {errors['username']?.message || 'placeholder error'}
                </p>
              </div>
            </div>
            <div className="grid w-full items-center">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email', { required: 'Campo obrigatório' })}
                  id="email"
                  placeholder="email@email.com"
                  className={errors.email ? 'border-rose-500' : ''}
                />
                <p
                  className={`text-sm text-rose-400 ${errors['email']?.message ? ' ' : 'invisible'}`}
                >
                  {errors['email']?.message || 'placeholder error'}
                </p>
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  {...register('password', { required: 'Campo obrigatório' })}
                  type="password"
                  id="password"
                  placeholder="senha"
                  className={errors.password ? 'border-rose-500' : ''}
                />
              </div>
              <p
                className={`text-sm text-rose-400 ${errors['password']?.message ? ' ' : 'invisible'}`}
              >
                {errors['password']?.message || 'placeholder error'}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" size="lg" disabled={isLoading}>
              Entrar
            </Button>
            <Link to="/login">
              Já tem uma conta? <span className="text-primary">Entrar</span>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Register
