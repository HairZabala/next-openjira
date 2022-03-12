import mongoose from "mongoose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  
  const id = req.page.params?.id || '';

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    
  // if( !mongoose.isValidObjectId(id) ) {
  if( !checkMongoIDRegExp.test(id) ) {
    return new Response(JSON.stringify({message: 'El id no es válido.'}),{
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  return NextResponse.next();
  

}
