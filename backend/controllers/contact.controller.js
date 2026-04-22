const nodemailer = require("nodemailer");
const contactController = {
    async contact(req, res) {
        try {
            const body = req.body
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.SMTP_USER, // tumhara email
                    pass: process.env.SMTP_PASS, // app password
                },
            });

            await transporter.sendMail({
                from: `"Contact Form" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER, // tumhara email
                subject: `New Contact Form Submission from ${body.firstName}`,
                html: `
        <h2>New Contact Request</h2>
        <h2>Subject: ${body.subject}</h2>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Email:</strong> ${body.contact}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
            });
            // ✅ Confirmation Mail to User
            await transporter.sendMail({
                from: `"iShop Website" <${process.env.SMTP_USER}>`,
                to: body.email,
                subject: "We received your message ✅",
                html: `
        <p>Hello ${body.firstName},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you soon.</p>
        <p><strong>Your Message:</strong> ${body.message}</p>
        <br/>
        <p><strong>Thankyou Again: ${body.firstName} ${body.lastName}</strong></p>
        <p>Regards,<br/>Support Team</p>
      `,
            });

            return res.status(200).json({ msg: "Message sent successfully!", success: true })

        } catch (error) {
            console.error("Error sending mail:", error);
            return res.status(500).json({ msg: "Failed to send message", success: false })

        }
    }
};

module.exports = contactController;