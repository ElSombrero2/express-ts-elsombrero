import { Controller, Get, View, HttpContext } from "elsombrero/core";

@Controller()
export class Index{

  @Get('')
  public index(): View{
    return new View('index.hbs', {name: 'ElSombrero'})
  }

  @Get('/find')
  public find(context: HttpContext): {name: string}{
    return {name: 'Hello World'}
  }

}