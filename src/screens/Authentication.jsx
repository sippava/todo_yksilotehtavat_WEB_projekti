import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser"

export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({ authenticationMode }) {
  const { user, setUser, signUp, signIn } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const signFunction =
      authenticationMode === AuthenticationMode.SignUp
        ? signUp
        : signIn

    signFunction()
      .then(() => {
        navigate(
          authenticationMode === AuthenticationMode.SignUp
            ? '/signin'
            : '/'
        )
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <div>
      <h1>
        {authenticationMode === AuthenticationMode.SignIn
          ? 'Sign in'
          : 'Sign up'}
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value
              })
            }
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={user.password || ''}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
          />
        </label>

        <button type="submit">
          {authenticationMode === AuthenticationMode.SignIn
            ? 'Login'
            : 'Submit'}
        </button>
      </form>

      <Link
        to={
          authenticationMode === AuthenticationMode.SignIn
            ? '/signup'
            : '/signin'
        }
        onClick={() =>
          setUser({
            email: '',
            password: ''
          })
        }
      >
        {authenticationMode === AuthenticationMode.SignIn
          ? 'No account? Sign up'
          : 'Already signed up? Sign in'}
      </Link>
    </div>
  )
}