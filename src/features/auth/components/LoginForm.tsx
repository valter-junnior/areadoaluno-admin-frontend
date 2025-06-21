import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/app/hooks/useAuth'
import { loginService } from '@/app/services/authService'
import { useNavigate } from 'react-router-dom'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => loginService({ email, password }),
    onSuccess: (response) => {
      const { access_token, user } = response.data
      login({ token: access_token, user })
      navigate('/dashboard')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Área do Aluno</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Entre com seu email e senha para acessar o sistema.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">
            {(error as any)?.response?.data?.message || 'Erro ao fazer login'}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Entrando...' : 'Login'}
        </Button>
      </div>
    </form>
  )
}
