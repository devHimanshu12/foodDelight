import { LinkConfig } from "./linkConfig";

export interface NavConfig extends LinkConfig{
  value:string;
  class?:string;
  id?:number;
}
