import {useState} from "react";
import {useAuth} from "../../../Context/authContext";
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    <div style={{ width:'100%' }}>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <Container className='mb-1'style={{ width:width}}>
          <div className="mb-4">
          <Row>
              <Col>
                <label style={{ width:'100%' }}
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold my-2">
                  EMAIL
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input style={{ width:'100%'}}
                  className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
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
                <label style={{ width:'100%'}}
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold my-2">
                  PASSWORD
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input style={{ width:'100%'}}
                  className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-thigh focus:outline-none focus:shadow-outline"
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
                <div>
                  <button className="Boton text-sm py-2 px-4">
                    Registro
                  </button>
                </div>
            </Row>
          </div>
        </Container>
      </form>
      <p style={{ width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="my-4 text-sm flex justify-between px-3">
        ¿Ya tienes una cuenta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
