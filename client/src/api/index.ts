import axios from "axios";

const usuarioBase = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`;
const cofreBase = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/vault`;

export function registerUser(payload: {
  senhaCriptografada: string;
  email: string;
}) {
  return axios
    .post<{ sal: string; cofre: string }>(usuarioBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function loginUser(payload: { senhaCriptografada: string; email: string }) {
  return axios
    .post<{ sal: string; cofre: string }>(`${usuarioBase}/login`, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function saveVault({ cofreCriptografado }: { cofreCriptografado: string }) {
  return axios
    .put(cofreBase, { cofreCriptografado }, { withCredentials: true })
    .then((res) => res.data);
}
