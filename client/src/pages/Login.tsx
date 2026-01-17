import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import "../styles/register.css"
import { loginUser } from "../slices/auth/authActions"
import type { AppDispatch, RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { ServerError } from "../types/errors"
import Loader from "../components/Loader"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const loginSchema = z.object({
    email: z
      .email("Invalid email address")
      .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email is not valid"),
    password: z
      .string({ error: "password is required" })
      .min(8, "password must be at least 8 characters")
      .max(50, "password can contain up to 50 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/,
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  })

  type LoginForm = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap()
      console.log(user)
      navigate("/")
    } catch (err: unknown) {
      console.error("Login error:", err)
      const error = err as ServerError
      setError("root", {
        message:
          typeof error.message === "string" ? error.message : error.message[0],
      })
    }
  }

  if (loading) {
    return <Loader loading={loading} />
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Login</h2>

        <label>
          Email:
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="error-message"> {errors.email.message}</p>
          )}
        </label>

        <label>
          Password:
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="error-message"> {errors.password.message}</p>
          )}
          {error && <p className="error-message"> {error.message}</p>}
        </label>
        {errors.root && (
          <p>
            {"\u2022 "}
            {errors.root.message}
          </p>
        )}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
