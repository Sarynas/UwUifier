import type { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        const DatabaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        const database = DatabaseServer.getTables();
        const enlocale = database.locales.global.en;

        const bearNames = database.bots.types.bear.firstName
        const usecNames = database.bots.types.usec.firstName

        for (const index in bearNames)
        {
            bearNames[index] += "-Chan"
        }

        const replacementtable =
        {
            "\n": "\n",
            "\r": "\r",
            " L": " L",
            "L ": "L ",
            "L": "W",
            "Aw": "Aw",
            "Tw": "Tw",
            // " W": " W",
            // "W": "R",
            "r ": "r ",
            " R": " W",
            " r": " w",
            "R": "W",
            "r": "w",
            "Ab": "Awb",
            "Ac": "Awc",
            // "Ad": "Adw",
            "Ae": "Aw",
            "Af": "Awf",
            "Ag": "Agw",
            "Aj": "Awj",
            "Ak": "Awk",
            "Am": "Awm",
            "An": "Awn",
            "Ap": "Awp",
            "Aq": "Awq",
            // "Ar": "Awr",
            "Av": "Awv",
            "Ax": "Awx",
            "Ue": "Uwe",
            "Your": "Y-Y-Youw",
            "You": "UwU",
            "OO": "OwO",
            "With": "Wiff"
        }

        for (let i in replacementtable)
		{
			replacementtable[i.toLowerCase()] = replacementtable[i].toLowerCase()
			replacementtable[i.toUpperCase()] = replacementtable[i].toUpperCase()
		}

        for (const index in usecNames)
        {
            //usecNames[index]= this.uwuify(usecNames[index], replacementtable, logger)

            usecNames[index] += "-Chan"

        }
        

        const blacklist = []
        for (const localekey in enlocale)
        {
            if (blacklist.includes(localekey))
            {
                continue
            }
            const value = enlocale[localekey];
            if (value.includes("/color"))
            {
                continue
            }
            if (value.includes("{onlyfoundinraid}"))
            {
                continue
            }
            if (value.includes("{durability}"))
            {
                continue
            }
            if (value.includes("{target}"))
            {
                continue
            }
            if (value.includes("{kill}"))
            {
                continue
            }
            if (value.includes("{Location}"))
            {
                continue
            }
            if (value.includes("{exitName}"))
            {
                continue
            }
            if (value.includes("{time}"))
            {
                continue
            }
            if (value.includes("{date}"))
            {
                continue
            }
            if (value.includes("{buyerNickname}"))
            {
                continue
            }
            if (value.includes("{itemCount}"))
            {
                continue
            }
            if (value.includes("{soldItem}"))
            {
                continue
            }
            if (value.includes("CHARACTER"))
            {
                enlocale[localekey] = "CHAWAWCTER ^-^"
                continue
            }
            if (value.includes("Attention! This is a Beta version of Escape from Tarkov."))
            {
                enlocale[localekey] = "A-attenwtion, p-pwayews~! (◕‿◕) Dis is a B-Beta vewsion of Escapey fwom Tawkov-nyaa~ "
                continue
            }

            enlocale[localekey] = this.uwuify(value, replacementtable, logger)
        }
    }
    private uwuify(stringtouwuify: string, replacementtable, logger: ILogger): string
    {
        if (stringtouwuify === "")
        {
            return stringtouwuify
        }
        var re = new RegExp(Object.keys(replacementtable).join("|"),"gi");
        const string = stringtouwuify.replace(re, function(matched)
        {
            const replacement = replacementtable[matched]
            if (!replacement)
            {
                //logger.error(`Could not find replacement for ${matched}`); Catching Error
                return matched
            }
            return replacementtable[matched];
        })
        return string
    }
}


module.exports = { mod: new Mod() }