import { Controller, Get } from "../../../modules/core/decorators";
import { View } from "../../../modules/core/views";

@Controller()
export class Index{

  @Get('')
  public home(): View{
    return new View('index.hbs', {name: 'ElSombrero'})
  }

}