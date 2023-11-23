const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateSlug } = require("../utilities/controllerUtilities");

async function index(req, res) {
    
    try {
        const { published, search } = req.query;

        let whereCondition = {};

        if (published === "true") {
            whereCondition.published = true; 
        }

        if (published === "false") {
            whereCondition.published = false; 
        }

        if (search) {
            whereCondition.OR = [
                { title: { contains: search } },
                { content: { contains: search } },
            ];
        }

        const result = await prisma.post.findMany({
            where: whereCondition,
        });

        res.json({ message: "Post trovati con successo", result });
    }
    catch (error) {
       console.error(error);
    }
   
};

async function store(req, res) {
    let requestUpdated;
    { try {
        
        const elements = await prisma.post.findMany();
        
        const request = {...req.body};

        request.slug = generateSlug(request.title, elements);

        requestUpdated = request
    } 
    catch (error) {
       console.error(error);
    }}
   

    try {
        const result = await prisma.post.create({
           data: requestUpdated   
       });

       res.json({"message": "post creato correttamente", result})
    } catch (error) {
       console.error(error);
   }
};

async function update(req, res) {
    
    let requestUpdated;
        if (req.body.title){
            { try {
            
            const elements = await prisma.post.findMany();
            
            const request = {...req.body};

            request.slug = generateSlug(request.title, elements);

            requestUpdated = request
        } 
        catch (error) {
        console.error(error);
        }}
    } else {
        requestUpdated = req.body
    }
    

    try {
        const result = await prisma.post.update({
            where: {
                slug: req.params.slug
            },
            data: requestUpdated
        });

        res.json({"message":"post modificato con successo", result})
    } catch (error) {
       console.error(error);
    }
};

async function show(req, res) {
    try {
        const result = await prisma.post.findUnique({
            where: {
                slug: req.params.slug
            }
       });

       res.json({"message":"post trovato con successo", result});
    }
   catch (error) {
        console.error(error);
   }
};

async function destroy(req, res) {
    try {
        const result = await prisma.post.delete({
            where: {
                slug: req.params.slug
            }
       });

       res.json({"message":"post trovato con successo"});
     
    }
   catch (error) {
        console.error(error);
   }

};


   

module.exports = {
    index,
    store,
    update,
    show,
    destroy
}