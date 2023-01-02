import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import Link from 'next/link';
interface Notes {
  note: {
    title: string;
    content: string;
    id: string;
  };
}
const Note = ( note: Notes ) => {
  console.log(note)
  
  return(

    <>
    <p>{note.note.id}</p>
    <h2>{note.note.title}</h2>
    <p>{note.note.content}</p>
    <Link className="text-blue-600 hover:text-purple-600" href="/">Home</Link>
  </> 
  )

}

export default Note


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
    }
  }

  let note = await prisma.note.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      title: true,
      id: true,
      content: true
    },
  })

  return {
    props: { note: note },
  };
};