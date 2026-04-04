const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 8080;

app.use(express.json());

// UPDATED CORS: Added your custom domain
app.use(cors({
    origin: ["https://tezcoservices.vercel.app", "https://tezcoservices.com", "https://www.tezcoservices.com","http://tezcoservices.vercel.app", "http://tezcoservices.com", "http://www.tezcoservices.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const emailRow = (label, value) => `
    <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
        <strong style="color: #333;">${label}:</strong> 
        <span style="color: #666;">${value || 'Not provided'}</span>
    </div>`;

app.get('/health', (req, res) => res.send("Server is alive"));

// 🎓 COLLEGE FORM ENDPOINT
app.post('/api/college', async (req, res) => {
    const { name, email, phone, course, college, package, idea, deadline } = req.body;
    try {
        // 1. Send Notification to YOU
        await resend.emails.send({
            from: 'Tezco College <info@tezcoservices.com>',
            to: ['info@tezcoservices.com'],
            replyTo: email,
            subject: `🎓 College Project: ${course} - ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #00C8FF; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #00C8FF;">New College Project Request</h2>
                    ${emailRow('Student Name', name)}
                    ${emailRow('Email', email)}
                    ${emailRow('Phone', phone)}
                    ${emailRow('Course', course)}
                    ${emailRow('College', college)}
                    ${emailRow('Package', package)}
                    ${emailRow('Deadline', deadline)}
                    <div style="margin-top: 20px;">
                        <strong>Project Idea:</strong>
                        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #444;">${idea}</p>
                    </div>
                </div>`
        });

        // 2. AUTO-RESPONDER to Student
        await resend.emails.send({
            from: 'Tezco Systems <info@tezcoservices.com>',
            to: [email],
            subject: 'We received your Project Application!',
            html: `<h3>Hi ${name},</h3>
                   <p>Thank you for reaching out to Tezco Systems. We have received your request for the <b>${course}</b> project.</p>
                   <p>Our team is reviewing your requirements and will contact you via WhatsApp or Email within 24 hours.</p>
                   <br><p>Best Regards,<br>Tezco Systems Team</p>`
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("College Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✉️ CONTACT FORM ENDPOINT
app.post('/api/contact', async (req, res) => {
    const { first_name, last_name, email, phone, service, budget, message } = req.body;
    try {
        // 1. Send Notification to YOU
        await resend.emails.send({
            from: 'Tezco Website <info@tezcoservices.com>',
            to: ['info@tezcoservices.com'],
            replyTo: email,
            subject: `📩 New Enquiry: ${service} - ${first_name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #0055CC; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #0055CC;">New Website Message</h2>
                    ${emailRow('Full Name', `${first_name} ${last_name}`)}
                    ${emailRow('Email', email)}
                    ${emailRow('Phone/WhatsApp', phone)}
                    ${emailRow('Service', service)}
                    ${emailRow('Budget', budget)}
                    <div style="margin-top: 20px;">
                        <strong>Message:</strong>
                        <p style="background: #f4f7ff; padding: 15px; border-radius: 5px; color: #444;">${message}</p>
                    </div>
                </div>`
        });

        // 2. AUTO-RESPONDER to Client
        await resend.emails.send({
            from: 'Tezco Systems <info@tezcoservices.com>',
            to: [email],
            subject: 'Thank you for contacting Tezco Systems',
            html: `<p>Hello ${first_name},</p>
                   <p>Thanks for getting in touch. We have received your message regarding <b>${service}</b>.</p>
                   <p>One of our developers will get back to you shortly to discuss the next steps.</p>
                   <br><p>Regards,<br>Tezco Systems</p>`
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Contact Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});