import {useState} from "react";
import {useAuth} from "../../../context/authContext2";
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BotonForm from '../../Boton/BotonForm/BotonForm'
import '../Ingreso.css'

export function Login({width}) {
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
    <div className='Contenedor-Principal--form'>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <Container className='Contenedor-form' style={{width:width}}>
          <div className="Contenedor-input">
            <Row>
              <Col>
                <label
                  htmlFor="email"
                  className="label-ingreso">
                    EMAIL
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  className=" input-ingreso shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div className="Contenedor-input">
            <Row>
              <Col>
                <label 
                className="label-ingreso"
                htmlFor="password">
                  PASSWORD
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  className="input-ingreso shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  placeholder="******"
                  id="password"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div className="Contenedor-input">
            <Row>
              <Col className='contendor-botonForm--ingreso'> 
                <BotonForm texto={'login'}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <a
                    href="#!"
                    className="a-ingreso font-bold text-sm"
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
        <p className="p-ingreso mb-2 text-sm flex justify-between px-3">
          ¿No tienes una cuenta? <Link className='link-ingreso' to="/Register"> Regístrate</Link>
        </p>
      </Row>

      <div className='contendor-botonForm--ingreso' onClick={handleGoogleSignin} >
        <BotonForm texto={'iniciar con google'} width={'36rem'}/>
      </div>
    </div>
  );
}
