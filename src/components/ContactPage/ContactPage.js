import React, {useRef} from "react";
import emailjs from '@emailjs/browser'

export const ContactPage = () => {

  const form = useRef()
  
  const submitForm = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_dy1enlb', 'template_9ht6b5t', form.current, 'user_9X8kPJFZA4CtJoKGtOw8Y')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      form.current.reset()
  }
  

  return (
    <div className="section">
      <form onSubmit={submitForm} ref={form}>
        <h2>Contact</h2>
        <input type="text"  className="name-input" name="name" placeholder="Name" required />
        <input type="text"  className="email-input" name="email" placeholder="Email" required />
        <textarea type="text"  name="message" placeholder="Message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
