import {z} from 'zod';


export const signupSchema = z.object({
    username:z.string().min(3, {
        message:"Username must be between 3 to 20 characters"
    }).max(20, {
        message:"Username must be between 3 to 20 characters"
    }),
    email:z.string().email({
        message:"Invalid email address"
    }),
    password:z.string().min(4, {
        message:"Password must be at least 4 characters long"
    })

})


export const signinSchema = z.object({
    email:z.string().email({
        message:"Invalid email address"
    }),
    password:z.string().min(4, {
        message:"Password must be at least 4 characters long"
    })
})  

