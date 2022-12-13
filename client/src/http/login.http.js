import axios from 'axios';

export async function loginCall(inputsToSend) {
  const res = await axios.post(
    `http://localhost:3001/auth/login`,
    inputsToSend,
  );
  return res.data;
}
