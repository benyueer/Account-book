import { IRoute, routes } from "./config";

export const systemRouters: IRoute[] = routes.filter(route => route.path === '/system')[0].children!
