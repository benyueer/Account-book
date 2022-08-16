import { IRoute, routes } from "./config";

export const systemRouters: IRoute[] = routes.filter(route => route.path === '/system')[0].children!

export const baseRouters: IRoute[] = routes.filter(route => route.path === '/main')[0].children!