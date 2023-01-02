import {prisma} from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest,   res: NextApiResponse){
const noteId = req.query.id
const {title, content} = req.body

if(req.method === "DELETE") {
    const deleteNote = await prisma.note.delete({
        where: {id: Number(noteId)}
    })
    res.json(deleteNote)
}
  // UPDATE
  else if (req.method === 'PUT') {
    const updateNote = await prisma.note.update({
      where: { id: Number(noteId) },
      data: {
        title, 
        content,
      }
    })
    res.status(200).json({ message: 'Note updated' })
    res.json(updateNote)

  } 
  else{
    console.log("Note could not be created")
}
}