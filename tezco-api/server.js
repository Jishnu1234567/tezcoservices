const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Helper for clean email rows
const emailRow = (label, value) => `
    <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
        <strong style="color: #333;">${label}:</strong> 
        <span style="color: #666;">${value || 'Not provided'}</span>
    </div>`;

// Health Check
app.get('/health', (req, res) => res.send("Server is alive"));

// 🎓 COLLEGE FORM ENDPOINT
app.post('/api/college', async (req, res) => {
    const { name, email, phone, course, college, package, idea, deadline } = req.body;
    try {
        await resend.emails.send({
            from: 'Tezco College <onboarding@resend.dev>',
            to: ['tezcoservices@gmail.com'],
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
                </div>
            `
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("College Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✉️ CONTACT FORM ENDPOINT (UPDATED)
app.post('/api/contact', async (req, res) => {
    const { first_name, last_name, email, phone, service, budget, message } = req.body;
    
    try {
        await resend.emails.send({
            from: 'Tezco Website <onboarding@resend.dev>',
            to: ['tezcoservices@gmail.com'],
            replyTo: email,
            subject: `📩 New Enquiry: ${service} - ${first_name} ${last_name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #0055CC; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #0055CC;">New Website Message</h2>
                    ${emailRow('Full Name', `${first_name} ${last_name}`)}
                    ${emailRow('Email', email)}
                    ${emailRow('Phone/WhatsApp', phone)}
                    ${emailRow('Service Interested', service)}
                    ${emailRow('Budget Range', budget)}
                    <div style="margin-top: 20px;">
                        <strong>Message:</strong>
                        <p style="background: #f4f7ff; padding: 15px; border-radius: 5px; color: #444; line-height: 1.6;">${message}</p>
                    </div>
                </div>
            `
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