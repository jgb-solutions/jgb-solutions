import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"
import { z } from "zod"

const contactSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	subject: z.string(),
	message: z.string()
})

type ContactData = z.infer<typeof contactSchema>

export const sendContactEmail = createServerFn().handler(
	async ({ data }: { data: ContactData }) => {
		const validatedData = contactSchema.parse(data)
		const resend = new Resend(process.env.RESEND_API_KEY)
		try {
			const result = await resend.emails.send({
				from: "Moxa Contact Form <onboarding@resend.dev>",
				to: ["jgbneatdesign@gmail.com"],
				subject: `Contact Form: ${validatedData.subject}`,
				replyTo: validatedData.email,
				html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `
			})
			return { success: true, data: result }
		} catch (error) {
			console.error("Resend error:", error)
			return { success: false, error }
		}
	}
)
