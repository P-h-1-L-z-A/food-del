import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://BhavyaFoodDel:01234567890@cluster0.7jzjlye.mongodb.net/food-del').then(()=>console.log("DB connected"));
}

