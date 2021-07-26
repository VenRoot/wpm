import fs from "fs";
import process from "process";
import * as CONF from "../conf.json";
import {name as appname} from "../package.json";
const checkDir = async () => 
{
    if(!fs.existsSync(`${process.env.APPDATA}\\${appname}`)) fs.mkdirSync(`${process.env.APPDATA}\\${appname}`);
    if(!fs.existsSync(`${process.env.APPDATA}\\${appname}\\config.json`)) fs.writeFileSync(`${process.env.APPDATA}\\${appname}\\config.json`, JSON.stringify(CONF.default_config));
}