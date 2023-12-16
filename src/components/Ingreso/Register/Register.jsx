import {useState} from "react";
import {useAuth} from "../../../context/authContext2";
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BotonForm from '../../Boton/BotonForm/BotonForm'
import '../Ingreso.css'

export function Register({width}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("El correo es invalido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ya esta registrado");
      }
      if (error.code === "auth/weak-password") {
        setError("La contraseña es debil, debe contener al menos 6 caracteres");
      }
    }
  };

  return (
    <div className='Contenedor-Principal--form'>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <Container className='Contenedor-form'style={{ width:width}}>
          <div className='contenedor-input'>
          <Row>
              <Col>
                <label
                  htmlFor="email"
                  className="label-ingreso block text-gray-700 text-sm font-bold my-2">
                  EMAIL
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  className="input-ingreso shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
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
                  htmlFor="password"
                  className="label-ingreso block text-gray-700 text-sm font-bold my-2">
                  PASSWORD
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  className="input-ingreso shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
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
            <Row className='contendor-botonForm--ingreso'>
                <BotonForm texto={'registro'}/>
            </Row>
          </div>
        </Container>
      </form>
      <p className="p-ingreso my-2 text-sm flex justify-between px-3">
        ¿Ya tienes una cuenta? <Link className='link-ingreso' to="/login">Login</Link>
      </p>
    </div>
  );
}
