import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../context/auth-provider/auth-provider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { Button, Input } from '@mantine/core'

const signupSchema = yup.object({
	login: yup
		.string()
		.required('Обязательное поле')
		.max(100, 'Максимум 100 символов')
		.matches(/^[a-zA-Z0-9_]+$/, 'Некорректный логин'),
})

export const Login = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()

	const from = location.state?.from || '/'

	type FormValues = {
		login: string
	}
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log('user', data.login)
		if (typeof data.login === 'string') {
			auth.signin(data.login, () => {
				navigate(from, { replace: true })
			})
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(signupSchema),
	})
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errors.login && <p className={styles.error}>{errors.login.message}</p>}
				<Input
					size='sm'
					radius='md'
					{...register('login')}
					placeholder='Введите логин'
					error={errors.login?.message}
				/>
				{/* <input
					type='text'
					{...register('login')}
					placeholder='Введите логин'
				/> */}

				<Button
					className={styles.button}
					type='submit'>
					Sign in
				</Button>
			</form>
			<Link to='/'>
				<Button className={styles.button}>Back to main</Button>
			</Link>
		</div>
	)
}
