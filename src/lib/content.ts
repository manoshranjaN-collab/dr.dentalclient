// Real content extracted from klaas-dentist-template.webflow.io homepage.

const CDN = "https://cdn.prod.website-files.com/633daa121f1308def083b05d";
const CDN2 = "https://cdn.prod.website-files.com/633daa121f130819bf83b08d";

export const nav = {
  brand: "Klaas",
  slogan: "Dentist template",
  links: [
    { label: "Home", href: "/" },
    { label: "Treatments", href: "#treatments" },
    { label: "Categories", href: "#categories" },
    { label: "About us", href: "#about" },
    { label: "The Team", href: "#team" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "Welcome",
  title: "Excellent dental services",
  text: "We offer dental services at a highly innovative level, with a guarantee for all treatments.",
  quickLinks: ["Treatments", "About", "The team", "Gallery"],
  image: `${CDN}/633dcddd0fc6852af40f954b_pexels-cedric-fauntleroy-4269942.webp`,
};

export type Category = {
  name: string;
  title: string;
  text: string;
  treatments: string[];
  image: string;
};

export const categories: Category[] = [
  {
    name: "General",
    title: "General Dentistry",
    text: "We specialize in helping patients with general treatments and making their smiles look great.",
    treatments: [
      "Dental hygiene",
      "Dental fillings",
      "Dental crowns",
      "Dental bridges",
    ],
    image: `${CDN2}/6344150a957ad877aa8578db_pexels-cedric-fauntleroy-4270940.avif`,
  },
  {
    name: "Cosmetic",
    title: "Cosmetic Dentistry",
    text: "Our dental cosmetic clinic helps patients get a beautiful smile with healthy teeth.",
    treatments: ["Teeth whitening", "White fillings", "Cosmetic dentures"],
    image: `${CDN2}/6344153692736defe3cac7e6_pexels-cedric-fauntleroy-4269360.avif`,
  },
  {
    name: "Orthodontics",
    title: "Teeth Straightening",
    text: "We specialize in helping patients with teeth straightening and making their smiles look great.",
    treatments: ["Fixed braces", "Lingual braces", "Invisible braces"],
    image: `${CDN2}/634414e33807de5d3bb44386_pexels-cedric-fauntleroy-4266945.avif`,
  },
];

export type Treatment = { name: string; text: string; image: string };

export const featuredTreatments: Treatment[] = [
  {
    name: "Dental hygiene",
    text: "We specialize in helping patients with dental hygiene and making their smiles look great",
    image: `${CDN2}/63440fabb807f7a802544ec0_pexels-cedric-fauntleroy-4269942.avif`,
  },
  {
    name: "Dental fillings",
    text: "We specialize in helping patients with dental fillings and making their smiles look great",
    image: `${CDN2}/6345b011a928fa56b2c8c526_pexels-polina-zimmerman-4687360.avif`,
  },
  {
    name: "Dental crowns",
    text: "We specialize in helping patients with dental crowns and making their smiles look great",
    image: `${CDN2}/634431ff10cfb6a317b70b6e_pexels-cedric-fauntleroy-4269694.avif`,
  },
  {
    name: "Teeth whitening",
    text: "We specialize in helping patients with teeth whitening and making their smiles look great",
    image: `${CDN2}/63441077c05a9965bbdae24a_pexels-anna-shvets-3845810.avif`,
  },
];

export const about = {
  eyebrow: "About us",
  items: [
    {
      title: "Passion",
      text: "We are passionate about helping people smile and live healthily",
    },
    {
      title: "Team",
      text: "First-class dental treatment options to meet your needs",
    },
    {
      title: "Experience",
      text: "High-quality and affordable dental care services",
    },
  ],
  knowHow: { label: "Know-how", pre: "We have Over", years: "20 years", post: "of experience" },
  image: `${CDN}/63440da2dd9f1c24783c8a70_pexels-polina-zimmerman-4687246.webp`,
  stats: [
    { value: "30+", label: "expert members" },
    { value: "8+", label: "high-quality clinics" },
    { value: "20K", label: "successful treatments" },
  ],
};

export type Member = { name: string; role: string; image: string };

export const team: Member[] = [
  {
    name: "Helen Kato",
    role: "Dentist",
    image: `${CDN2}/6349b9fb8a12a186c7739164_pexels-polina-zimmerman-4687344.avif`,
  },
  {
    name: "Robert Thurman",
    role: "Dentist",
    image: `${CDN2}/6349b97385de805d006289c3_pexels-cedric-fauntleroy-4269942.avif`,
  },
  {
    name: "Joshua Minor",
    role: "Manager",
    image: `${CDN2}/6349b984d9c4f6364e7c3c98_pexels-cedric-fauntleroy-4269699.avif`,
  },
  {
    name: "Rhonda Thielen",
    role: "Dental nurse",
    image: `${CDN2}/6349b96d53116523a77ec59d_pexels-pavel-danilyuk-6812458.avif`,
  },
];

export const clinics = ["New York", "London", "Berlin"];

export type Article = { category: string; title: string; image: string };

export const articles: Article[] = [
  {
    category: "Prevention",
    title: "Oral health and the challenges of living with teeth",
    image: `${CDN2}/6349b9633465a52b4fef2553_pexels-tima-miroshnichenko-5355833.avif`,
  },
  {
    category: "Care",
    title: "Dental problems and how you can take preventative measures",
    image: `${CDN2}/6349b95210b7b20eb4c35f8d_pexels-cedric-fauntleroy-4269363.avif`,
  },
  {
    category: "Health",
    title: "How to keep your teeth and gums in tip-top shape",
    image: `${CDN}/63440f6f3c42c434c4a70131_pexels-cedric-fauntleroy-4269931%20(1).webp`,
  },
];

export const contact = {
  eyebrow: "Contact",
  title: "We are passionate about helping people smile.",
  email: "clinic@klaas.com",
  phone: "333 (55) 328 786",
};
