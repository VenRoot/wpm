import yargs = require("yargs");
import {hideBin} from "yargs/helpers";
const args:_args = yargs(hideBin(process.argv)).argv as _args;

import {install} from "./modules/install";
import {_args} from "./modules/interfaces";


yargs.help('--help').alias('-h','help').usage("Usage: $0 install uwu").argv;

/** If the user passes either install or i, both will be the value { _: [], i: true, install: true} */
const argv:_args = yargs.command('install', "Install a package").alias("i", 'install').example('$0 install nodejs', "Installs the latest version of nodejs").argv as _args;

/** All commands without -- land in the the argv._[] array */

const command = argv;
const par = argv._.slice(1);


/**
 * Strategy:
 * 
 * $0 install test --flag1 --flag2 owo
 * -> { _: [ 'install', 'test' ], flag1: true, flag2: 'owo' }
 */


// console.log(argv);
// console.log(args);
switch(true)
{
    case args._[0] === "install": install(args); break;
    case args.install: console.log("owo"); break;
}