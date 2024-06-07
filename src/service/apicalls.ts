import { instance } from "./network/instance";

export async function getToken(user: string, password: string) {
  const { data } = await instance.post<{ access: string; refresh: string }>(
    "/token/",
    { email: user, password: password }
  );

  return data.access;
}

export async function getUserInfo() {
  const { data } = await instance.get<{
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
  }>("/v1/user/me/");

  return data;
}

export async function createNewUser(email: string, password: string, first_name: string, last_name: string) {
  const { data } = await instance.post<{
    email: string;
    password: string;
    first_name: string;
    last_name: Date;
  }>("/v1/user/me/");

  return data;
}

export async function postTurma(name: string) {
  await instance.post("/v1/turmas/", { name: name });
}

export async function getAllTurmas() {
  const { data } = await instance.get<
    {
      id: number;
      name: string;
      user: number;
      atividades: {
        id: number;
        name: string;
        turma: number;
      }[];
    }[]
  >("/v1/turmas/");

  return data?.map((i) => {
    return { number: i.id, name: i.name };
  });
}

export async function deleteTurma(id: number) {
  try{
    const { status } = await instance.delete(`/v1/turmas/${id}`);
    return status;
  }
  catch {
    return 400
  }

}

export async function getAllDisciplinasByTurma(id: number) {
  const { data } = await instance.get<
    {
      id: number;
      name: string;
      turma: number;
    }[]
  >(`/v1/turmas/${id}/atividades/`);

  return data?.map((i) => {
    return { number: i.id, name: i.name };
  });
}

export async function postAtividade(name: string, turma_name: string) {
  await instance.post("/v1/atividades/", { name: name, turma_name: turma_name });
}

export async function getTurmaById(id: number) {
  const { data } = await instance.get<
    {
      id: number;
      name: string;
      user: number;
      atividades: {
        id: number;
        name: string;
        turma: number;
      }[];
    }
  >(`/v1/turmas/${id}/`);

  return data;
}
