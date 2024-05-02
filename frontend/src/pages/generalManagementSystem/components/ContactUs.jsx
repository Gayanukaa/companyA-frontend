import React from 'react';
import Button from '@mui/material/Button';
import img from '../assets/card/Contact.png'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function ContactUs() {
  return (
    <div>
      <h1>We look forward to hearing from you</h1>
      <p>Do you have questions or would you like to meet in person? Then please contact our experienced sales team! We will be delighted to talk to you</p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.792091055798!2d79.89829207581748!3d6.795132919945465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1714583788943!5m2!1sen!2slk"
        width="1200"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe><br></br><br></br>
      <h1>Contact Us</h1>
      <p>You can contact our Customer Service for all questions and queries on any of the following channels during office hours</p><br></br><br></br>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
            borderRadius: 4,
            p: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Name" variant="outlined" required />
          <TextField id="email" label="Email" variant="outlined" type="email" required />
          <TextField id="subject" label="Subject" variant="outlined" required />
          <TextField
            id="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>


        <img src={img} className="rounded float" alt="..." style={{ height: 300, width: 300, marginLeft: 80, right: 1200 }} />
      </div>
    </div>
  );
}
