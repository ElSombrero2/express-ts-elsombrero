import 'reflect-metadata' 
import { app } from '../../server/server.module'
import { DataHttpType } from './http.decorator'
import { Request, Response } from 'express'
import { View } from '../views'
import Container from 'typedi'

interface RegisterArgs{
  controllers: any[],
  services: any[]
}

export function Register(obj: RegisterArgs): ClassDecorator{

  return function(target: Function){
    obj.services.map((s) => Container.get(s))
    obj.controllers.map((constructor) => {
      const keys = Reflect.getMetadataKeys(constructor)
      .filter((key: string) => {
        if(key.startsWith('router:')) 
          return key
      })
      const path = Reflect.getMetadata('custom:baseurl', constructor)
      const middlewares = Reflect.getMetadata('custom:middlewares', constructor)
      const instance = Container.get(constructor)
      keys.map(async (key) => {
        const data: DataHttpType = Reflect.getMetadata(key, constructor)
        const fun = app[data.method] as Function
        fun.apply(app, [path + data.url, ...middlewares, ...data.middlewares, async (req: Request, res: Response) => {
          try{
            const result: any | View = await data.callback.apply(instance, [{
              request: (req as Request), 
              response: res,
              body: req.body, 
              params: req.params,
              query: req.query,
              file: (req as any)?.file,
              files: (req as any)?.files,
              headers: req.headers
            }])
            if(result instanceof View) res.render(result.view, result.data)
            else if(result) res.json(result)
          }catch(e){
            res.status(e.httpStatus || 500).json({
              status: e.httpStatus || 500,
              title: e.title,
              message: e.detail || 'Internal Server Error.'
            }) 
          }
        }])
      })
    })
  }
}