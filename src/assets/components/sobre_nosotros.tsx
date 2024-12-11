import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "/src/styles/sobre_nosotros.css";
import Nav from "./Nav";

const SobreNosotros: React.FC = () => {
  const teamMembers = [
    {
      name: "María José Romero",
      role: "Analista",
      image: "/src/assets/img/Administradores/majo.jpeg",
      github: "https://github.com/majoromero2006",
    },
    {
      name: "Santiago Cárdenas Hernández",
      role: "Analista",
      image: "/src/assets/img/Administradores/santiago.jpg",
      github: "https://github.com/SantiagoC18",
    },
    {
      name: "Shiuu Valenzuela Penagos",
      role: "Analista",
      image: "/src/assets/img/Administradores/shiuu.jpg",
      github: "https://github.com/Shiuu28",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="container">
      <Nav/>
      <h1>Sobre Nosotros</h1>

      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="member" key={index}>
            <img
              src={member.image}
              alt={member.name}
              onClick={() => window.open(member.github, "_blank")}
            />
            <p>{member.name}</p>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <script>
        {`
          function toggleExpand(img) {
            img.classList.toggle('expanded');
          }
        `}
      </script>
    </div>
  );
};

export default SobreNosotros;
