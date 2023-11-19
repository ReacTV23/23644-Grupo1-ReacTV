import {useState} from "react";
import {useAuth} from "../../Context/authContext";
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Inicio() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError(error.message);
      if (error.code === "auth/invalid-login-credentials") {
        setError("Credencial invalida, revise email o contraseña");
      }
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña Incorrecta");
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Ingresa tu E-mail");
    try {
      await resetPassword(user.email);
      setError("Te hemos enviado un mail para restaurar tu contraseña");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mb-4" >
      {error && <Alert message={error} />}
      <form className="" onSubmit={handleSubmit}>
        <Container fluid="md mt-4">
          <div className="mb-4">
            <Row>
              <Col>
                <input
                  className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                EMAIL
                </label>
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <Row>
              <Col>
                <input
                  className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  placeholder="******"
                  id="password"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="password">PASSWORD</label>
              </Col>
            </Row>
          </div>

          <div className="items-center justify-between">
            <Row>
              <Col>
                <div>
                  <button className="mt-4 text-sm text-blue font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <a
                    href="#!"
                    className="inline-block align-baseline font-bold text-sm"
                    onClick={handleResetPassword}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>{" "}
              </Col>
            </Row>
          </div>
        </Container>
      </form>

      <Row>
        <p className="my-4 text-sm flex justify-between px-3">
          ¿No tienes una cuenta? <Link to="/Register">Register</Link>{" "}
        </p>
      </Row>

      <button
        onClick={handleGoogleSignin}
        className="text-black rounded border-1 py-2 px-4 w-full "
      >
        Iniciar con Google
      </button>
    </div>
  );
}
