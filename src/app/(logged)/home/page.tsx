"use client";

import Button from "@/components/button";
import Header from "@/components/header";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTurma, getAllTurmas, postTurma } from "@/service/apicalls";
import SweetAlert2 from "react-sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();


  const [show, setShow] = useState(false);
  
  const {data, isError} = useQuery({queryKey: ["data"], queryFn: () => getAllTurmas()})


  const onSubmit = async (name: string) => {
    postTurma(name).then(() =>  setTimeout(() => queryClient.refetchQueries({queryKey: ["data"]}), 1000))

  };

  const onDelete = async (id: number) => {

      const status = await deleteTurma(id);
      if(status != 204) {
        setShow(true);
      } 


    setTimeout(() => queryClient.refetchQueries({queryKey: ["data"]}), 1000);

    queryClient.refetchQueries({queryKey: ["data"]})

  };

  return (
    <main className="bg-white">
      <Header />
      <div className="w-full flex items-center flex-col">
        <div className="w-2/3 mt-10">
          <div className="flex justify-between">
            <h1 className="text-black mb-2 mx-4 font-bold text-2xl">Turmas</h1>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <h1>Cadastrar turma</h1>
            </Button>
          </div>
          <Table
            options
            data={data!}
            onDelete={onDelete}
            onView={(i) => router.push(`atividades?id=${i}`)}
          />
        </div>
      </div>
      <Modal
        isOpen={openModal}
        title="Cadastrar turma"
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
      ></Modal>
      <SweetAlert2
        show={show}
        title={"Fail"}
        text="It's not possible to delete this class, because it has activities"
        icon="error"
        onConfirm={() => setShow(false)}
      />
    </main>
  );
}
