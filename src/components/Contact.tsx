import Section from './Section';

export default function Contact() {
  return (
    <Section
      id="contact" num="05" kicker="Contact"
      title="Let's build something solid."
      sub="Looking for a PFE internship — backend or full-stack, Morocco or remote, ideally where code ships to production. I answer fast."
    >
      <div className="contact-box mt-8 grid grid-cols-1 gap-10 p-7 lg:grid-cols-2 lg:p-[42px]">
        <form action="mailto:ahmedouarrali12@gmail.com" method="post" encType="text/plain">
          <label htmlFor="n">Your name</label>
          <input id="n" name="name" type="text" placeholder="Your full name" required />
          <label htmlFor="e">Email address</label>
          <input id="e" name="email" type="email" placeholder="you@company.com" required />
          <label htmlFor="m">Project details</label>
          <textarea id="m" name="message" rows={5} placeholder="What are you building, and when?" required />
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-gold" type="submit">Send message</button>
          </div>
        </form>
        <div className="direct text-[.95rem]">
          <div><strong>Direct email</strong><br /><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></div>
          <div><strong>Phone</strong><br /><a href="tel:+212645372099">+212 645 372 099</a></div>
          <div><strong>LinkedIn</strong><br /><a href="https://www.linkedin.com/in/ahmed-ouarrali">linkedin.com/in/ahmed-ouarrali</a></div>
          <div><strong>GitHub</strong><br /><a href="https://github.com/AhmedOL0">github.com/AhmedOL0</a></div>
          <div><strong>Timezone</strong><br />Morocco (GMT+1) · working remotely worldwide</div>
        </div>
      </div>
    </Section>
  );
}
