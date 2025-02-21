import userModel from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        await dbConnect();

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return NextResponse.json({ message: "Email not verified. Please verify your email." }, { status: 403 });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return NextResponse.json({
            message: "User logged in successfully.",
            token
        }, { status: 200 });

    } catch (error) {
        console.error("Sign-In Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
