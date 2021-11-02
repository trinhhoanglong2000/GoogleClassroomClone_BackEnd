import ClassMessage from "../models/classes.js"
export const GetClass = async (req,res)=>{
    try{
        const classes = await ClassMessage.find()
            
        res.status(200).json(classes);
    }
    catch (error){
        res.status(404).json({message:error.message})
    }

}
export const CreateClass = async (req,res)=>{
    const post = req.body;

    const newClass = new ClassMessage(post)
    try {
        await newClass.save();
        
        res.status(201).json(newClass);
    } catch (error) {
        res.status(404).json({message:error.message})

    }

}
