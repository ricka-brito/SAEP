"use client";

import Button from "@/components/button";
import Header from "@/components/header";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { getAllDisciplinasByTurma, getTurmaById, postAtividade } from "@/service/apicalls";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Disciplina() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const [openModal, setOpenModal] = useState(false);

  const searchId = searchParams.get("id");

  const {data} = useQuery({queryKey: ["data"], queryFn: () => getAllDisciplinasByTurma(Number(searchId!))})
  const {data: dataTurma} = useQuery({queryKey: ["dataTurma"], queryFn: () => getTurmaById(Number(searchId!))})

  const onSubmit = (name: string, turma_name: string) => {
    postAtividade(name, turma_name).then(() =>  setTimeout(() => queryClient.refetchQueries({queryKey: ["data"]}), 1000))
  }
  return (
    <main className="bg-white">
      <Header />
      <div className="w-full flex items-center flex-col">
        <div className="w-2/3 mt-10">
          <div className="flex justify-between">
            <h1 className="text-black mb-2 mx-4 font-bold text-2xl">
              Turma: {dataTurma?.name}
            </h1>
            <Button onClick={() => setOpenModal(true)}>
              <h1>Cadastrar atividade</h1>
            </Button>
          </div>
          <Table
            data={data!}
            onDelete={() => {}}
            onView={() => {}}
          />
        </div>
      </div>
      <Modal
        isOpen={openModal}
        title="Cadastrar atividade"
        onClose={() => setOpenModal(false)}
        onSubmit={(name) => onSubmit(name, dataTurma?.name!)}
      ></Modal>
    </main>
  );
}
