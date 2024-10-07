import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import AppleProvider from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email"
import nodemailer from "nodemailer" 

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
      callbackUrl: "https://local.apple-signin.flickmate.com/api/auth/callback/apple",
    }),
    EmailProvider({
      server: {
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
              user: "kpwkjxw4hzb37wln@ethereal.email",
              pass: "Gr7byRTdkyZutdxABg"
          }
      },
      from: "noreply@example.com",
      async sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from }
      }) {
          const { host } = new URL(url)
          const transport = nodemailer.createTransport(server)
          await transport.sendMail({
              to: email,
              from,
              subject: `Sign in to ${host}`,
              text: `Sign in to ${host}\n${url}\n\n`,
              html: `<html><body><p>Sign in to ${host}</p><p><a href="${url}">Click here to sign in</a></p></body></html>`
          })
      },
  }),
  ],
  // Add a database here if you want to persist user data
  // database: process.env.DATABASE_URL,
})

export { handler as GET, handler as POST }