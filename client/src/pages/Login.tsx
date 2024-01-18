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

const Login: FC = () => {
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
      email: '',
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
    <div className="h-[90vh] flex items-center justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle className="font-bold text-primary">Entrar:</CardTitle>
          <CardDescription>Entre com sua conta Events!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleOnFormSubmit)}>
          <CardContent className="grid gap-4">
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
            <Link to="/register">
              Ainda não tem uma conta?{' '}
              <span className="text-primary">Criar</span>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
