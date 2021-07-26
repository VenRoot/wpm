import * as https from "https";
import * as readline from "readline";
import {execSync, exec} from "child_process";
import {platforms} from "./interfaces"

export const install = async (args:any) => {
    for (let i = 1; i < args._.length; i++) {
        const element = args._[i] as string;
        console.log(`Installing following packages: ${element}`);
        const pack = await packageAvailable(args._[i]);
        if(!pack.exists) { console.log(`Package ${element} not found in any registries`); break; }

        console.log(`Package ${element} found in the ${pack.platform} registry`);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`Would you like to install ${element} from ${pack.platform}?`, async answer => {
            if(answers.yes.includes(answer)) {
                console.log(`Installing the package using choco...`);
                exec(`choco install ${element}`);
                rl.close();
            }
            else
            {
                console.log("Aborting...");
                process.exit(0);
                
            }
        })
    }
}

export const uninstall = async (args:any) => {
    for(let i = 1; i < args._.length; i++)
    {
        const element = args._[i] as string;
        const prop = await getLocalPackage(element);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`Are you sure you want to uninstall ${element}?`, async answer => {

        });
    }
}

const answers = {yes: ["y", "Y", "yes", "YES"], no: ["n", "N", "no", "NO"]};



const getLocalPackage = async (packageName: string) => {
    return new Promise<{installed: boolean, platform: platforms}>(resolve => {
        
    });
}

const packageAvailable = async(packageName: string) => {
    return new Promise<{exists: boolean, platform: string}>(async resolve => {
        const choco = await chocoPackage(packageName);
        resolve(choco);
        /**
         * Add multiple platforms like GitHub
         */
    })
    
    
}

const chocoPackage = async (packageName: string) => {
    return new Promise<{exists: boolean, platform: string}>((resolve) => {
        const options = {
            hostname: "community.chocolatey.org",
            port: 443,
            path: `/packages/${packageName}`,
            method: 'GET'
        };
        const req = https.request(options, owo => {
            console.log(owo.statusCode)
            switch(owo.statusCode)
            {
                case 200: resolve({exists: true, platform: "choco"}); break;
                case 404: resolve({exists: false, platform: "choco"}); break;
            }
            /**
             * IT can only check if the package exists by the HTTPS status codes, which is not a good approach.
             * More information about the chocolatey api needed
             */
        });
        req.on('error', err => {
            console.error(err);
        });
        
        
        req.end();
    })
}
