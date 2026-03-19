// take reference from models made in eraser.io

import mongoose, { schems } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"; //npm i bcrypt - to encrypt/decrypt passwords when saved in db.

const userSchema = new schems(
    {
    username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps : true}
)

//bcrypt (hash) the password of user in db
userSchema.pre ("save", async function (next){
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
 //checks if pass is true or false
userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare (password, this.password);
}

//generating access token (both are jwt tokens)
userSchema.methods.generateAccessToken = function() {
      return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//generating refresh token
userSchema.methods.generateRefreshToken = function() {
     return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// what is jwt? A bearer token

export const User = mongoose.model("User", userSchema)


//THEORY

// bcrypt
// Used to hash (encrypt) passwords
// You never store real passwords in DB
// Example: "123456" → hashed → $2b$10$abc...
// During login, bcrypt compares entered password with hashed one
// Purpose: Password security

// JWT (JSON Web Token)
// Used for authentication (login system)
// After login, server gives a token
// That token is sent with every request to verify user
// Purpose: User authentication (who you are)