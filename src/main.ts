import { Index } from "./app/controllers/index/index.controller";
import { Register } from "./modules/core/decorators";
import { loadDB } from "./modules/database/database.module";
import { app, bootstrap } from "./modules/server/server.module";

@Register({
  controllers: [Index],
  services: [],
  context: app
})
export class Main{

  public static async main(args: string[]): Promise<void>{
    try{
      await loadDB({})
      bootstrap((port) => console.log(`Server running on http://127.0.0.1:${port}.`))
    }catch(e){ throw e }
  }

}