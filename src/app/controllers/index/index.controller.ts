import { Controller, Get } from "../../../modules/core/decorators";
import { View } from "../../../modules/core/views";

@Controller()
export class Index{

  @Get('')
  public index(): View{
    return new View('index.hbs', {name: 'ElSombrero'})
  }

  @Get('/find')
  public find(): {name: string}{
    return {name: 'Hello World'}
  }

}