import {useState} from "react";
import {useAuth} from "../../Context/authContext";
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from "../Alerts/Alert";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Register() {
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
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
                  className="block text-gray-700 text-sm font-bold my-2"
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
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold my-2"
                >
                  PASSWORD
                </label>
              </Col>
            </Row>
          </div>

          <div className="items-center justify-between">
            <Row>
              <Col>
                <div>
                  <button className="bg-blue-500 hover:bg-green-500 text-black font-bold text-sm py-2 px-4 rounded">
                    Registro
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </div>
        </Container>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        ¿Ya tienes una cuenta? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}
