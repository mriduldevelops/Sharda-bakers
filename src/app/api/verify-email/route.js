import userModel from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        // Connect to the database
        await dbConnect();

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        // Validate OTP
        if (user.verificationCode !== otp) {
            return NextResponse.json({ message: "Invalid OTP!" }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.verificationCode = null; // Clear the OTP after successful verification
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
