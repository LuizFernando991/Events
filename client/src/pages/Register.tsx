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
import ConfirmCodeForm from '@/components/ConfirmCodeForm'

const Register: FC = () => {
  const [activationToken, setActivationToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser, user, confirmRegister } = useAuth()

  const navigator = useNavigate()

  useEffect(() => {
    if (user) {
      navigator('/dashboard')
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

  const handleOnFormSubmit = async (data: {
    email: string
    password: string
    username: string
    name: string
  }) => {
    try {
      setIsLoading(true)
      const token = await registerUser(data)
      setActivationToken(token)
    } catch (err) {
      //
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
                  {...register('name', {
                    required: 'Campo obrigatório',
                    maxLength: {
                      value: 40,
                      message: 'Máximo de 40 caracteres'
                    }
                  })}
                  id="name"
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
                  {...register('username', {
                    required: 'Campo obrigatório',
                    maxLength: {
                      value: 40,
                      message: 'Máximo de 40 caracteres'
                    }
                  })}
                  id="username"
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
                  {...register('email', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Digite um email válido'
                    }
                  })}
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
                  {...register('password', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 8,
                      message: 'A senha deve ter no mínimo 8 caracteres'
                    }
                  })}
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
              Cadastrar
            </Button>
            <Link to="/login">
              Já tem uma conta? <span className="text-primary">Entrar</span>
            </Link>
          </CardFooter>
        </form>
      </Card>
      {!!activationToken && (
        <ConfirmCodeForm
          activationToken={activationToken}
          onSubmitForm={confirmRegister}
        />
      )}
    </div>
  )
}

export default Register
