import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Entry, IEntry } from '../../../../models';
import { db } from '../../../../database';

type Data = 
| { message: any }
| IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  try {
    
    const { id } = req.query;
    
    await db.connect();
    const entryDB = await Entry.findById(id);
  
    if(!entryDB){
      await db.disconnect();
      return res.status(400).json({message: 'No hay entrado con ese ID'});
    }
  
    await db.disconnect();
    return res.status(200).json(entryDB);
    
  } catch (error) {
    await db.disconnect();
    console.log({error});
    return res.status(400).json({message: 'Bad request'});
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  try {
    
    const { id } = req.query;
    
    await db.connect();
    const entryDB = await Entry.findById(id);
  
    if(!entryDB){
      await db.disconnect();
      return res.status(400).json({message: 'No hay entrado con ese ID'});
    }
  
    const { 
      description = entryDB.description, 
      status = entryDB.status, 
    } = req.body;
    
    entryDB.description = description;
    entryDB.status = status;
  
    await entryDB.save();
    await db.disconnect();
    return res.status(200).json(entryDB);
    
  } catch (error) {
    await db.disconnect();
    console.log({error});
    return res.status(400).json({message: 'Bad request'});
  }
}