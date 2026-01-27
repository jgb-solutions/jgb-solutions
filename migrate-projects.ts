
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projects = [
  {
    title: "JGB SOLUTIONS",
    type: "WEBSITE",
    description: "This is the website that you are looking at right now. It's our business home on the internet.",
    url: "https://jgb.solutions/",
    image: "https://jgb.vercel.app/assets/images/screenshots/jgb-solutions.jpg",
    slug: "jgb-solutions"
  },
  {
    title: "SIMONE FIEVRE",
    type: "WEBSITE",
    description: "Simone Fievre is a beautiful fashion and blog website that we created to help showcase her work and knowledge in health and beauty science.",
    url: "https://www.simonefievre.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/simonefievre.jpg",
    slug: "simone-fievre"
  },
  {
    title: "GWO NÈG",
    type: "WEBSITE",
    description: "We bult Gwo Nèg to help James Cantave spreads his love for health and fitness to his many fans and friends following him on social media and other places on the internet.",
    url: "https://www.gwoneg.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/gwo-neg.jpg",
    slug: "gwo-neg"
  },
  {
    title: "AKOLAD CRÉATIONS",
    type: "WEBSITE",
    description: "Akolad is a design and development agency.",
    url: "http://akoladcreations.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/akolad.jpg",
    slug: "akolad-creations"
  },
  {
    title: "ECHO JOUNAL",
    type: "WEBSITE",
    description: "Echo Jounal is an Haitian news website that publishes breaking news and a bunch of jokes.",
    url: "https://www.echojounal.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/echojounal.jpg",
    slug: "echo-jounal"
  },
  {
    title: "PRÈS TRAVAYÈ",
    type: "WEBSITE",
    description: "Près Travayè is an Haitian news website that publishes breaking news.",
    url: "http://www.prestravaye.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/prestravaye.jpg",
    slug: "pres-travaye"
  },
  {
    title: "ENEPH",
    type: "WEBSITE",
    description: "ENEPH is a non-profit organization that helps kids of young age.",
    url: "https://www.eneph.org/",
    image: "https://jgb.vercel.app/assets/images/screenshots/eneph.jpg",
    slug: "eneph"
  },
  {
    title: "MP3PAM",
    type: "WEB APP",
    description: "MP3Pam is a free entertainment platform for sharing all kinds of audios.",
    url: "https://mp3pam.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/mp3pam.jpg",
    slug: "mp3pam"
  },
  {
    title: "HAÏTI INFO TOUTAN",
    type: "WEB APP",
    description: "Haïti Info Toutan is a breaking news web app that we created in collaboration with one of our partners to shared news instantly.",
    url: "https://infotoutan.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/infotoutan.jpg",
    slug: "haiti-info-toutan"
  },
  {
    title: "FESTIVAL FILM",
    type: "WEBSITE",
    description: "Festival Film is an online event website for Haitian films.",
    url: "https://festivalfilm.jgb.solutions/",
    image: "https://jgb.vercel.app/assets/images/screenshots/festival-film.jpg",
    slug: "festival-film"
  },
  {
    title: "FOOTKOLE",
    type: "WEBSITE",
    description: "Footkole is a popular Haitian website for soccer.",
    url: "https://www.footkole.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/footkole.jpg",
    slug: "footkole"
  },
  {
    title: "FORUM TELECOM HAÏTI",
    type: "WEBSITE",
    description: "We made Forum Telecom Haiti in collaboration with one of our partners to support telecom events in Haiti and the local areas.",
    url: "https://www.forumtelecomhaiti.org/",
    image: "https://jgb.vercel.app/assets/images/screenshots/forumtelecomhaiti.jpg",
    slug: "forum-telecom-haiti"
  },
  {
    title: "GEEK509",
    type: "WEBSITE",
    description: "Geek509 is fun website for movie and Tv show news and recently has been publishing tech articles and tutorials to help young Haitians interested in tech.",
    url: "https://www.geek509.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/geek509.jpg",
    slug: "geek509"
  },
  {
    title: "HAÏTI NUMÉRIQUE 2030",
    type: "WEBSITE",
    description: "",
    url: "https://hn2030.jgb.solutions/",
    image: "https://jgb.vercel.app/assets/images/screenshots/hn2030.jpg",
    slug: "haiti-numerique-2030"
  },
  {
    title: "JUNO7",
    type: "CONSULTING",
    description: "",
    url: "https://www.juno7.ht/",
    image: "https://jgb.vercel.app/assets/images/screenshots/juno7.jpg",
    slug: "juno7"
  },
  {
    title: "JUNO7 HAÏTI",
    type: "WEBSITE",
    description: "",
    url: "https://juno7haiti.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/juno7haiti.jpg",
    slug: "juno7-haiti"
  },
  {
    title: "LOVE AND HOPE ORG.",
    type: "WEBSITE",
    description: "",
    url: "http://www.loveandhopeorganizationhaiti.org/",
    image: "https://jgb.vercel.app/assets/images/screenshots/loveandhopeorganizationhaiti.jpg",
    slug: "love-and-hope-org"
  },
  {
    title: "OUANAMINTHE FC",
    type: "WEBSITE",
    description: "",
    url: "https://www.ouanaminthefc.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/ouanaminthefc.jpg",
    slug: "ouanaminthe-fc"
  },
  {
    title: "SODEI",
    type: "WEBSITE",
    description: "",
    url: "http://www.sodei.net/",
    image: "https://jgb.vercel.app/assets/images/screenshots/sodei.jpg",
    slug: "sodei"
  },
  {
    title: "GARDERIE JARDIN FLEURI",
    type: "WEBSITE",
    description: "",
    url: "http://garderiejardinfleuri.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/jardin-fleuri.jpg",
    slug: "garderie-jardin-fleuri"
  },
  {
    title: "NB HAÏTI",
    type: "WEBSITE",
    description: "",
    url: "http://nbhaiti.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/nb-haiti.jpg",
    slug: "nb-haiti"
  },
  {
    title: "MINDVALLEY HAITI",
    type: "WEBSITE",
    description: "",
    url: "http://mindvalleyhaiti.b-thelight.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/mindvalley-haiti.jpg",
    slug: "mindvalley-haiti"
  },
  {
    title: "SKYPOOLS RESORT",
    type: "WEBSITE",
    description: "",
    url: "http://skypool.kalikobeachclub.com/",
    image: "https://jgb.vercel.app/assets/images/screenshots/skypool.jpg",
    slug: "skypools-resort"
  }
];

async function processProjects() {
  const contentDir = path.join(process.cwd(), 'content/projects');
  const imageDir = path.join(process.cwd(), 'public/images/projects');

  // Ensure directories exist
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

  for (const project of projects) {
    console.log(`Processing ${project.title}...`);

    // Download image
    let imagePath = '/placeholder.svg';
    if (project.image) {
      const imageName = path.basename(project.image);
      const localImagePath = path.join(imageDir, imageName);
      try {
        execSync(`curl -L "${project.image}" -o "${localImagePath}"`, { stdio: 'pipe' });
        imagePath = `/images/projects/${imageName}`;
        console.log(`  Downloaded image to ${localImagePath}`);
      } catch (e) {
        console.error(`  Failed to download image for ${project.title}: ${e.message}`);
      }
    }

    // Create MDX content
    const mdxContent = `---
title: "${project.title.replace(/"/g, '\\"')}"
category: "${project.type}"
description: "${project.description.replace(/"/g, '\\"') || 'No description available.'}"
image: "${imagePath}"
client: "${project.title.replace(/"/g, '\\"')}"
year: "2022"
services: ["${project.type}"]
---

${project.description ? `## Project Overview\n\n${project.description}` : ''}

[Visit Project](${project.url})
`;

    const filePath = path.join(contentDir, `${project.slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);
    console.log(`  Created MDX file at ${filePath}`);
  }
}

processProjects();
