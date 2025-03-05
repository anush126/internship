import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function myimages () {

    const user = auth();
    if (!user.userId) return [];



     const images = await db.query.images.findMany({
        where:(model,{eq})=> eq(model.userid, user.userId),
       orderBy: (model,{desc})=> desc(model.id),
     });
    
     
 

    return images;
};
