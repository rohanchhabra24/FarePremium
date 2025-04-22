import { useState } from "react";
import {
  Box, Button, TextField, Typography, Container, Card, CardContent
} from "@mui/material";
import { sendContactEmail } from "../utils/sendContactEmail";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactEmail({
        user_name: form.name,
        user_email: form.email,
        user_message: form.message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Email send failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>

            {submitted ? (
              <Typography color="success.main" mt={2}>
                ✅ Your message has been sent. We’ll get back to you shortly!
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Contact;
