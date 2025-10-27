import type { TSection } from "../types";

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Muhammad Tahir — 3D Portfolio",
    fullName: "Muhammad Tahir",
    email: "tahir121-web@mail.com",
  },
  hero: {
    name: "Muhammad Tahir",
    p: ["Freelance MERN Stack & AI Chatbot Developer", "Expert in Intelligent Web Apps for Startups & SMBs"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I help startups and small businesses unlock the power of intelligent web applications and automation. As a top-rated Freelance MERN Stack & AI Chatbot Developer, I deliver projects that drive growth, efficiency, and outstanding user experiences—with proven results across multiple industries.

What I Offer:

⚡️ Full-Stack Web Development: Scalable MERN stack solutions for business platforms, portals, and SaaS products.

🤖 AI-Powered Chatbots & Automation: Custom chatbots (GPT, NLP) to automate support, lead generation, and customer engagement.

🎨 3D & Interactive Interfaces: Modern, immersive UI with Three.js, React Three Fiber, and tailored animations.

🔗 API Design & Integration: Secure, robust REST APIs connecting your apps to scalable cloud infrastructure.

☁️ Cloud Deployment & DevOps: Fast, reliable deployment using Vercel, Render, Docker—and ongoing optimization.

Why Clients Choose Me:

Delivered 20+ successful remote projects for startups & SMEs—4.9/5 star rating on Upwork

Fast and open client communication (always available for calls and updates)

Hands-on experience with real business needs: from MVPs to full-scale systems

Committed to deadlines, quality, and exceeding expectations

Strong portfolio: https://github.com/tahir121-web

Recent Success Stories:

Built a medical AI chatbot platform that automates triage and user onboarding, saving hundreds of staff hours

Developed a laptop marketplace with advanced authentication, payment workflow, and seamless UX

Crafted a 3D developer portfolio that showcases innovation and technical skill

Let's work together to transform your ideas into intelligent digital solutions. Message me your project needs for a free consult!`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Following projects showcases my skills and experience through
    real-world examples of my work. Each project is briefly described with
    links to code repositories and live demos in it. It reflects my
    ability to solve complex problems, work with different technologies,
    and manage projects effectively.`,
    },
  },
};