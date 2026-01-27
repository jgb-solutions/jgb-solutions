import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useServerFn } from "@tanstack/react-start"
import { sendContactEmail, contactSchema } from "@/lib/functions/contact"

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema)
	})

	const sendEmail = useServerFn(sendContactEmail)

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true)
		setSubmitStatus("idle")

		try {
			const response = await sendEmail({ data })

			if (response.success) {
				setSubmitStatus("success")
				reset()
			} else {
				setSubmitStatus("error")
			}
		} catch (error) {
			console.error("[Contact Form] Submission error:", error)
			setSubmitStatus("error")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section id="contact" className="py-20 px-6 md:px-20 bg-secondary dark:bg-card">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-light mb-6 text-center">Let's Work Together</h2>
				<p className="text-muted-foreground text-center mb-12">
					Have a challenging project? Let's transform it into an elegant, scalable solution
					together.
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<Input placeholder="Name" {...register("name")} aria-invalid={!!errors.name} />
							{errors.name && (
								<p className="text-sm text-red-600 dark:text-red-400 mt-1">
									{errors.name.message}
								</p>
							)}
						</div>
						<div>
							<Input
								type="email"
								placeholder="Email"
								{...register("email")}
								aria-invalid={!!errors.email}
							/>
							{errors.email && (
								<p className="text-sm text-red-600 dark:text-red-400 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<Input placeholder="Subject" {...register("subject")} aria-invalid={!!errors.subject} />
						{errors.subject && (
							<p className="text-sm text-red-600 dark:text-red-400 mt-1">
								{errors.subject.message}
							</p>
						)}
					</div>
					<div>
						<Textarea
							placeholder="Message"
							className="min-h-[150px]"
							{...register("message")}
							aria-invalid={!!errors.message}
						/>
						{errors.message && (
							<p className="text-sm text-red-600 dark:text-red-400 mt-1">
								{errors.message.message}
							</p>
						)}
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : "Send Message"}
					</Button>
					{submitStatus === "success" && (
						<p className="text-green-600 dark:text-green-400 text-center font-medium">
							✓ Message sent successfully! We'll get back to you soon.
						</p>
					)}
					{submitStatus === "error" && (
						<p className="text-red-600 dark:text-red-400 text-center font-medium">
							✗ Failed to send message. Please try again or email us directly.
						</p>
					)}
				</form>
			</div>
		</section>
	)
}

