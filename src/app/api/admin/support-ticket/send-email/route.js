import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
});

// Helper function to validate email addresses
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export async function POST(req) {
    try {
      const { to, subject, html, altEmail } = await req.json();
    
      // Validate required fields
      if (!to || !subject || !html) {
        console.error("Missing required fields");
        return NextResponse.json(
          { error: "Missing required fields (to, subject, or html)" },
          { status: 400 }
        );
      }
  
      // Validate email addresses
      if (!isValidEmail(to)) {
        console.error("Invalid primary email address:", to);
        return NextResponse.json(
          { error: "Invalid primary email address" },
          { status: 400 }
        );
      }
  
      if (altEmail && !isValidEmail(altEmail)) {
        console.error("Invalid alternative email address:", altEmail);
        return NextResponse.json(
          { error: "Invalid alternative email address" },
          { status: 400 }
        );
      }
  
      // Prepare recipients
      const recipients = [to, altEmail].filter(Boolean).join(",");
  
      // Send email to the primary email and alternative email (if provided)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients,
        subject,
        html,
      };
    
      // Send the email
      await transporter.sendMail(mailOptions);

      return NextResponse.json(
        { message: "Email sent successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
}