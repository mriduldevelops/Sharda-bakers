import userModel from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { email, username, password } = await req.json();

        // Connect to the database
        await dbConnect();

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationCode: otp,
        });
        await newUser.save();

        // Construct verification link
        const verificationLink = `http://localhost:3000/email-verification?email=${encodeURIComponent(email)}&otp=${otp}`;


        // Send verification email using Resend
        const response = await resend.emails.send({
            from: 'Sharda Bakers <onboarding@resend.dev>', // Update with your verified domain
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h2>Email Verification</h2>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>Click the link below to verify your email:</p>
                <a href="${verificationLink}">${verificationLink}</a>
            `,
        });

        if (response.error) {
            console.error('Resend Email Error:', response.error);
            return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
        }

        return NextResponse.json({ message: "User registered. Verification email sent." }, { status: 201 });

    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
