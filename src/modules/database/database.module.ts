import mongoose from 'mongoose'

export async function loadDB(config){
  try{ await mongoose.connect(process.env.CS) }
  catch(e){ throw e }
}