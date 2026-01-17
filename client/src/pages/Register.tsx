import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import "../styles/register.css"
import { registerUser } from "../slices/auth/authActions"
import type { AppDispatch, RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { ServerError } from "../types/errors"
import Loader from "../components/Loader"

function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const registerSchema = z.object({
    name: z
      .string({ message: "Name is required" })
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long")
      .regex(
        /^[\u0590-\u05FFA-Z](?:[\u0590-\u05FF a-z]*[\u0590-\u05FFa-z])?$/,
        "user's name can only contain Hebrew and English letters"
      ),
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
    confirmPassword: z
      .string({ error: "password is required" })
      .min(8, "password must be at least 8 characters")
      .max(50, "password can contain up to 50 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/,
        "confirm password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  })

  type RegisterForm = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" })
      return
    }

    try {
      const user = await dispatch(registerUser(data)).unwrap()
      console.log(user)
      navigate("/")
    } catch (err: unknown) {
      console.error("Registration error:", err)
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
        <h2>Register</h2>
        <label>
          Name:
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="error-message"> {errors.name.message}</p>
          )}
        </label>

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
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="error-message"> {errors.confirmPassword.message}</p>
          )}
        </label>
        {error && <p className="error-message"> {error.message}</p>}
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

export default Register
