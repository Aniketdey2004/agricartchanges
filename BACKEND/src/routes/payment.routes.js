import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    auth: {
        user: 'agricart022@gmail.com',
        pass: 'xhig yqzq rcoq gsog' // Use an application-specific password
    }
});

// Route to serve the payment form
router.get('/payment-form', (req, res) => {
    const { planId } = req.query;
    res.send(`
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .payment-form {
                        background-color: white;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        width: 300px;
                    }
                    .payment-form h1 {
                        text-align: center;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .payment-form label {
                        display: block;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    .payment-form input {
                        width: 100%;
                        padding: 8px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        font-size: 14px;
                    }
                    .payment-form button {
                        width: 100%;
                        background-color: #28a745;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .payment-form button:hover {
                        background-color: #218838;
                    }
                </style>
            </head>
            <body>
                <div class="payment-form">
                    <h1>Payment Form</h1>
                    <form action="/api/v1/payment/submit-payment" method="post">
                        <input type="hidden" name="planId" value="${planId}" />
                        
                        <label for="userEmail">Your Email:</label>
                        <input type="email" id="userEmail" name="userEmail" required />

                        <label for="accountName">Account Name:</label>
                        <input type="text" id="accountName" name="accountName" required />
                        
                        <label for="bankName">Bank Name:</label>
                        <input type="text" id="bankName" name="bankName" required />
                        
                        <label for="ifscCode">IFSC Code:</label>
                        <input type="text" id="ifscCode" name="ifscCode" required />
                        
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

// Route to handle the form submission and send an email
router.post('/submit-payment', async (req, res) => {
    const { planId, userEmail, accountName, bankName, ifscCode } = req.body;

    // Validate input
    if (!planId || !userEmail || !accountName || !bankName || !ifscCode) {
        return res.status(400).send('All fields are required');
    }

    // Email content for payment submission
    const mailOptions = {
        from: userEmail, // The user's email will be the sender
        to: 'agricart022@gmail.com', // AgriCart email
        subject: 'New Payment Details Submitted',
        text: `A subscriber has submitted payment details for Plan ID: ${planId}.
               \nAccount Name: ${accountName}
               \nBank Name: ${bankName}
               \nIFSC Code: ${ifscCode}`
    };

    try {
        // Send the payment details to the company email
        await transporter.sendMail(mailOptions);
        res.send('Thank you for your submission. We will process your payment soon.');
    } catch (error) {
        console.log('Error sending payment details:', error);
        res.status(500).send('There was an error processing your payment.');
    }
});

export default router;
