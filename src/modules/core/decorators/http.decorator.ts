import 'reflect-metadata'

export interface DataHttpType{
  url: string
  callback: Function
  method: string
  middlewares: Function[]
}

const value = (url: string, callback: Function, method: string, middlewares: Function[]) => {
  return { url, callback, method, middlewares: [...middlewares] }
}

export function Get(url: string, ...args: Function[]): MethodDecorator{
  return function(target: any, key: string | symbol){
    Reflect.defineMetadata(`router:${key.toString()}`, 
    value(url, target[key], 'get', args), 
    Object.getPrototypeOf(target))
  }
}

export function Post(url: string, ...args: Function[]): MethodDecorator{
  return function(target: any, key: string | symbol){
    Reflect.defineMetadata(`router:${key.toString()}`, 
    value(url, target[key], 'post', args), 
    Object.getPrototypeOf(target))
  }
}

export function Put(url: string, ...args: Function[]): MethodDecorator{
  return function(target: any, key: string | symbol){
    Reflect.defineMetadata(`router:${key.toString()}`, 
    value(url, target[key], 'put', args), 
    Object.getPrototypeOf(target))
  }
}

export function Patch(url: string, ...args: Function[]): MethodDecorator{
  return function(target: any, key: string | symbol){
    Reflect.defineMetadata(`router:${key.toString()}`, 
    value(url, target[key], 'patch', args), 
    Object.getPrototypeOf(target))
  }
}

export function Delete(url: string, ...args: Function[]): MethodDecorator{
  return function(target: any, key: string | symbol){
    Reflect.defineMetadata(`router:${key.toString()}`, 
    value(url, target[key], 'delete', args), 
    Object.getPrototypeOf(target))
  }
}