import { useState } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";
// import { formatDate } from "../lib/utils";
import Link from "next/link";


interface FormData {
  title: string;
  content: string;
  id: string;
}

interface Notes {
  notes: {
    title: string;
    content: string;
    id: string;
    // createdAt: string;
  }[];
}

export default function Home({ notes }: Notes) {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  const router = useRouter()
const refreshData = () => {
  router.replace(router.asPath)
}
  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
        setForm({ title: "", content: "", id: "" })})
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      })
    } catch (error) {
      console.log(error);
    }
  }
  // async function updateNote(id: string) {
  //   try {
  //     fetch(`http://localhost:3000/api/note/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "PUT",
  //     }).then(() => {
  //       refreshData();
  //     })
  //   } catch (error) {
  //     console.log("Fail",error);
  //   }
  // }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <div>
        <h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className="w-auto min-w-[50%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
            required
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
            required
          />
          <button type="submit" className="w-60 m-auto bg-slate-600 text-white rounded p-1">
            Add +
          </button>
        </form>
        <div className="w-auto min-w-[50%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
          <ul>
          {notes.map((note) => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <Link href={`/notes/${note.id}` }>
                    <h3 className="font-bold">{note.title}</h3>
                  </Link>
                  <p className="text-sm">{note.content}</p>
                  {/* <p className="text-sm">{formatDate(note.createdAt)}</p> */}
                </div>
                <button onClick={() => deleteNote(note.id)} className="bg-red-500 px-4 rounded-full text-white">x</button>
                                {/* <button onClick={() => updateNote(note.title, note.content, note.id)} className="bg-blue-500 px-3 text-white rounded">Edit</button> */}

              </div>
            </li>

          ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    },
  });

  return {
    props: {
      notes,
    },
  };
};
