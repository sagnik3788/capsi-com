import { TablerIcon } from "@tabler/icons";

export interface IRouteConfig {
    path: string;
    label: string; // To be used as tab title or header title
    icon?: TablerIcon;
    isAuthProtected: boolean;
    roles?: Array<string>;
    slug?: "[id]" | string;
  }
  
  const ROLES = {
    CONSUMER: "CONSUMER",
  };
  
  const Routes = {
    homePage: {
      path: "/",
      label: "Home",
      isAuthProtected: false,
      roles: [ROLES.CONSUMER],
    } as IRouteConfig,

    login: {
        path: "/login", //TODO: Change to route naming if  needed
        label: "Login",
        isAuthProtected: false,
        roles: [ROLES.CONSUMER],
      } as IRouteConfig,

    billings:{
        path:"/billings",
        label:"Billings",
    }as IRouteConfig,
    pricing:{
        path:"/pricing",
        label:"Pricing",
    }as IRouteConfig,
    edit:{
        path:"/edit",
        label:"Edit",
    }as IRouteConfig,
    
    howItWorks:{
        path:"/how-it-works",
        label:"How It Works",
    }as IRouteConfig,

}
export default Routes;