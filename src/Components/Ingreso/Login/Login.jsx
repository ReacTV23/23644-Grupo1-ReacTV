import {useState} from "react";
import {useAuth} from "../../../Context/authContext";
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Ingreso.css'

export function Login() {
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
        // if(tamañoPantalla > 768px and isAuth) {
        //   navigate("/home");
        // } else {
        //   navigate("/");
        // }
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
    <div className='mb-1' style={{ width:'360px' }}>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <Container className='mb-1'>
          <div className="mb-4">
            <Row>
              <Col>
                <label style={{ width:'100%' }}
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  EMAIL
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input style={{ width:'100%' }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <Row>
              <Col>
                <label style={{ width:'100%' }} htmlFor="password">PASSWORD</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input style={{ width:'100%' }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  placeholder="******"
                  id="password"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <Row>
              <Col> 
                <div className="mb-4">
                  <button className='Boton text-sm py-2 px-4'>
                    Login
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <a style={{ width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    href="#!"
                    className="font-bold text-sm"
                    onClick={handleResetPassword}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </form>

      <Row>
        <p style={{ width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mb-4 text-sm flex justify-between px-3">
          ¿No tienes una cuenta? <Link to="/Register"> Regístrate</Link>
        </p>
      </Row>

      <button
        onClick={handleGoogleSignin}
        className="Boton tborder-1 py-2 px-2 w-full">
        Iniciar con Google
      </button>
    </div>
  );
}
