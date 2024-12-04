import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuración de la prueba
export const options = {
  vus: 1, // Número de usuarios virtuales
  iterations: 20, // Número de iteraciones (una por cada usuario)
};

const BASE_URL = 'http://localhost:4001'; // Reemplaza con la URL de tu API.
const SIGNUP_ENDPOINT = '/api/signup'; // Endpoint de registro.
const LOGIN_ENDPOINT = '/api/login'; // Endpoint de inicio de sesión.

// Array de usuarios únicos
const users = [
  { name: 'user1', email: 'user1@example.com', password: 'password123' },
  { name: 'user2', email: 'user2@example.com', password: 'password123' },
  { name: 'user3', email: 'user3@example.com', password: 'password123' },
  { name: 'user4', email: 'user4@example.com', password: 'password123' },
  { name: 'user5', email: 'user5@example.com', password: 'password123' },
  { name: 'user6', email: 'user6@example.com', password: 'password123' },
  { name: 'user7', email: 'user7@example.com', password: 'password123' },
  { name: 'user8', email: 'user8@example.com', password: 'password123' },
  { name: 'user9', email: 'user9@example.com', password: 'password123' },
  { name: 'user10', email: 'user10@example.com', password: 'password123' },
  { name: 'user11', email: 'user11@example.com', password: 'password123' },
  { name: 'user12', email: 'user12@example.com', password: 'password123' },
  { name: 'user13', email: 'user13@example.com', password: 'password123' },
  { name: 'user14', email: 'user14@example.com', password: 'password123' },
  { name: 'user15', email: 'user15@example.com', password: 'password123' },
  { name: 'user16', email: 'user16@example.com', password: 'password123' },
  { name: 'user17', email: 'user17@example.com', password: 'password123' },
  { name: 'user18', email: 'user18@example.com', password: 'password123' },
  { name: 'user19', email: 'user19@example.com', password: 'password123' },
  { name: 'user20', email: 'user20@example.com', password: 'password123' },
];

export default function () {
  // Obtiene el usuario correspondiente a la iteración actual
  const user = users[__ITER];

  const signupPayload = JSON.stringify(user);
  const loginPayload = JSON.stringify({ email: user.email, password: user.password });

  const headers = { 'Content-Type': 'application/json' };

  // Registro del usuario
  const signupResponse = http.post(`${BASE_URL}${SIGNUP_ENDPOINT}`, signupPayload, { headers });
  check(signupResponse, { 'registro status es 200': (r) => r.status === 200 });

  // Inicio de sesión del usuario
  const loginResponse = http.post(`${BASE_URL}${LOGIN_ENDPOINT}`, loginPayload, { headers });
  check(loginResponse, { 'login status es 200': (r) => r.status === 200 });

  sleep(1); // Simula un tiempo de espera entre solicitudes.
}