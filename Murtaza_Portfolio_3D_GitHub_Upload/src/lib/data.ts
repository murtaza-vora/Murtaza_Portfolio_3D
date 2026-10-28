// need to change UI type
export interface NavItem {
  label: string;
  href: string;
}

export interface SkillItem {
  number: number;
  symbol: string;
  name: string;
  category: "Languages" | "Visualization & BI" | "ML & AI" | "Data Engineering" | "Cloud";
  description: string;
  projects: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  role: string;
  description: string;
  features: string[];
  tech: string[];
  link?: string;
  github?: string;
  uiType: "dashboard" | "email-builder" | "sme-store" | "timeline";
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  year: string;
  badge?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  type: "Work" | "Education" | "Internship";
  tags?: string[];
}

export interface AchievementItem {
  number: string;
  suffix?: string;
  label: string;
  caption: string;
  detail: string;
  logo: string;
  index: string;
}

export const PROFILE = {
  name: "Murtaza Vora",
  preferredName: "Murtaza Vora",
  handle: "murtaza-vora",
  ghostWord: "Murtaza",
  headline: "AI Developer | Data Scientist | Data Analyst",
  subheading: "Where data meets intelligence — analytics, automation, and AI-driven innovation.",
  location: "Vancouver, Canada",
  email: "murtaza.vora.ds@gmail.com",
  phone: "+1 782 778 6655",
  phoneUrl: "tel:+17827786655",
  linkedin: "https://www.linkedin.com/in/murtaza-vora-805945253/",
  github: "https://github.com/murtaza-vora",
  resumePath: "/resume.pdf",
  summaryVerbatim:
    "Data analyst with 3+ years of experience turning large datasets into decisions, now moving toward AI engineering and data science roles. I have analyzed 1M+ records with SQL and Python, built 10+ Power BI dashboards, and automated reporting that saves 25+ hours a month. Alongside that work I have built machine learning projects in Python and Scikit-learn, and I hold a Microsoft Azure Data Scientist certification and a Master's in Analytics from Northeastern University. I bring the business judgment of an analyst and the technical depth to build, test, and ship models that solve real problems.",
  quote:
    "Data analyst by experience, AI engineer and data scientist by direction.",
  idDetails: {
    idNumber: "MKV-2k26-AIENG",
    dept: "Data & Analytics",
    validTill: "2026 / Permanent",
    signature: "Murtaza K. Vora",
  },
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_CATEGORIES = [
  "All",
  "Languages",
  "Visualization & BI",
  "ML & AI",
  "Data Engineering",
  "Cloud",
] as const;

export const SKILLS: SkillItem[] = [
  { number: 1, symbol: "Py", name: "Python", category: "Languages", description: "Data analysis, statistical modeling, machine learning, and automation with Pandas, NumPy, and Scikit-Learn.", projects: ["Stock Market Analysis", "Wasabi Bank Transaction Analysis", "Upmeals Demi"] },
  { number: 2, symbol: "R", name: "R", category: "Languages", description: "Statistical analysis, exploratory data analysis, and data visualization.", projects: ["Statistical Analysis"] },
  { number: 3, symbol: "Sq", name: "SQL", category: "Languages", description: "Complex queries, joins, and window functions for analyzing millions of transactional records.", projects: ["Deloitte Reporting", "Wasabi Bank Transaction Analysis", "Upmeals Demi"] },
  { number: 4, symbol: "Dx", name: "DAX", category: "Languages", description: "Measures, KPIs, and calculated columns for enterprise Power BI reporting.", projects: ["Upmeals Dashboards", "Deloitte Reporting"] },
  { number: 5, symbol: "Ps", name: "PySpark", category: "Languages", description: "Distributed data processing for large datasets and scalable transformations.", projects: ["Data Engineering"] },
  { number: 6, symbol: "Pq", name: "Power Query", category: "Languages", description: "Data cleaning, shaping, and transformation before modeling and reporting.", projects: ["Upmeals Dashboards", "Deloitte Reporting"] },

  { number: 7, symbol: "Pb", name: "Power BI", category: "Visualization & BI", description: "Interactive dashboards and executive reporting built on clean, well-modeled data.", projects: ["Upmeals Demi", "Deloitte Reporting", "Wasabi Bank Transaction Analysis"] },
  { number: 8, symbol: "Tb", name: "Tableau", category: "Visualization & BI", description: "Visual analytics and dashboards that make trends easy to explore.", projects: ["Dashboard Development"] },
  { number: 9, symbol: "Xl", name: "Excel", category: "Visualization & BI", description: "Fast analysis, pivot models, and stakeholder-ready reports.", projects: ["Business Analysis", "Skill Safari"] },
  { number: 10, symbol: "Mp", name: "Matplotlib", category: "Visualization & BI", description: "Custom charts and statistical visualizations for analysis and storytelling.", projects: ["Stock Market Analysis"] },

  { number: 11, symbol: "Ml", name: "Machine Learning", category: "ML & AI", description: "Supervised and unsupervised models, feature preparation, and evaluation.", projects: ["Stock Market Analysis"] },
  { number: 12, symbol: "Pm", name: "Predictive Modeling", category: "ML & AI", description: "Forecasting and risk models that support planning and decisions.", projects: ["Stock Market Analysis"] },
  { number: 13, symbol: "Ai", name: "Generative AI", category: "ML & AI", description: "Applying large language models to real tasks, with a focus on practical, reliable use.", projects: ["Applied AI"] },
  { number: 14, symbol: "Pe", name: "Prompt Engineering", category: "ML & AI", description: "Designing and refining prompts to get consistent, high quality model output.", projects: ["Applied AI"] },
  { number: 15, symbol: "Sk", name: "Scikit-Learn", category: "ML & AI", description: "Classification, clustering, and preprocessing pipelines, including K-means.", projects: ["Stock Market Analysis"] },
  { number: 16, symbol: "St", name: "Statistics", category: "ML & AI", description: "Hypothesis testing, A/B experiments, anomaly detection with Z-score and IQR, and Monte Carlo simulation.", projects: ["Wasabi Bank Transaction Analysis", "Skill Safari A/B Testing"] },

  { number: 17, symbol: "Et", name: "ETL Pipelines", category: "Data Engineering", description: "Extracting, transforming, and loading data from multiple sources into reliable reporting layers.", projects: ["Deloitte Reporting", "Upmeals Demi"] },
  { number: 18, symbol: "Dw", name: "Data Warehousing", category: "Data Engineering", description: "Structuring data for fast, consistent analytics across teams.", projects: ["Deloitte Reporting"] },
  { number: 19, symbol: "Dm", name: "Data Modeling", category: "Data Engineering", description: "Designing clean schemas and relationships that keep dashboards accurate.", projects: ["Upmeals Dashboards", "Deloitte Reporting"] },
  { number: 20, symbol: "So", name: "SQL Optimization", category: "Data Engineering", description: "Tuning queries and workflows to run faster on large datasets.", projects: ["Deloitte Reporting"] },

  { number: 21, symbol: "Az", name: "Azure ML", category: "Cloud", description: "Building and deploying machine learning solutions on Microsoft Azure.", projects: ["Azure Data Scientist Certification"] },
  { number: 22, symbol: "Aw", name: "AWS", category: "Cloud", description: "Cloud services for storing, processing, and analyzing data.", projects: ["Cloud Data Work"] },
  { number: 23, symbol: "Db", name: "Databricks", category: "Cloud", description: "Collaborative notebooks and Spark workloads for large scale analytics.", projects: ["Data Engineering"] },
  { number: 24, symbol: "Sf", name: "Snowflake", category: "Cloud", description: "Cloud data warehouse for fast, scalable analytical queries.", projects: ["Data Warehousing"] },
  { number: 25, symbol: "Jp", name: "Jupyter", category: "Cloud", description: "Notebook based exploration, experimentation, and clear documentation of analysis.", projects: ["Stock Market Analysis"] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "saobts",
    index: "01",
    title: "Smart Mobility Solution",
    kicker: "Master final year Capstone",
    role: "Data Scientist",
    description:
      "A research-driven smart traffic system that uses Vehicle-to-Everything (V2X) communication, computer vision, and reinforcement learning to reduce transit delays and optimize traffic flow in urban environments.",
      features: [
        "Detects vehicles in traffic footage using computer vision with YOLO and CNN models.",
        "Simulates realistic urban traffic scenarios in SUMO to test control strategies safely.",
        "Uses reinforcement learning (D3QN) to optimize traffic light timing at intersections.",
        "Built around Vehicle-to-Everything (V2X) communication with roadside units to reduce transit delays.",
      ],
      tech: ["Python", "YOLO", "CNN", "SUMO", "Reinforcement Learning", "D3QN", "V2X", "Git"],
      link: "https://github.com/murtaza-vora/Smart-Mobility-Solution",
      uiType: "dashboard",
  },
  {
    id: "Stock market",
  
    index: "02",
  
    title: "Machine Learning Stock Portfolio Optimization",
  
    kicker: "Machine Learning · Quantitative Analytics",
  
    role: "Data Scientist / ML Developer",
  
    description:
      "Developed a machine learning-driven portfolio strategy that analyzes historical market data, engineers technical and risk features, clusters stocks by market behavior, and uses portfolio optimization to construct risk-adjusted investment portfolios benchmarked against the S&P 500.",
  
    features: [
  
      "Collected and analyzed historical market data for 150+ liquid S&P 500 stocks using yfinance.",
  
      "Engineered multi-horizon returns, volatility, liquidity, and Fama-French factor exposures using rolling regression.",
  
      "Applied monthly K-Means clustering to identify groups of stocks with similar risk, return, and market characteristics.",
  
      "Used Efficient Frontier optimization to construct portfolios targeting improved risk-adjusted returns and evaluated performance against the S&P 500.",
  
    ],
  
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Statsmodels",
      "yfinance",
      "PyPortfolioOpt",
      "Matplotlib"
    ],
  
    uiType: "email-builder",
  },
  {
    id: "YVR Airport Hackathon",

    index: "03",

    title: "AI-Powered Airport Safety & Monitoring",

    kicker: "Computer Vision · AI · Smart Airport",

    role: "AI Developer / Data Scientist",

   description:
      "Developed an AI-powered computer vision system for airport monitoring that uses YOLO-based object detection to identify people, unattended baggage, garbage, and high-traffic areas, enabling real-time alerts and data-driven maintenance decisions.",

    features: [

      "Built YOLOv9-based computer vision models to detect and classify people, baggage, garbage, and other objects from camera feeds.",

      "Implemented person counting and occupancy monitoring to identify high-volume areas and support airport facility management.",

      "Developed unattended-object detection to identify potentially abandoned baggage and trigger visual alerts for operational teams.",

      "Created a monitoring interface with real-time detection outputs and generated structured JSON/CSV data for analysis and reporting.",

    ],

    tech: [
      "Python",
      "YOLOv9",
      "OpenCV",
      "Computer Vision",
      "Machine Learning",
      "NumPy",
      "Pandas",
      "JSON",
     "CSV"
   ],

  
    uiType: "sme-store",
  },
  {
    id: "sme-empowerment",
    index: "04",

    title: "AI-Powered IFTA Audit & Risk Detection",

    kicker: "Data Analytics · Machine Learning · AWS",

    role: "Data Analyst / AI Developer",

    description:
      "Built an end-to-end AWS-native machine learning pipeline to automate IFTA compliance auditing by extracting fuel and distance records, engineering audit-focused features, detecting anomalous reporting patterns, and prioritizing high-risk cases for investigation.",

    features: [

      "Built an automated data pipeline using Amazon S3 and Textract to extract and normalize fuel invoices and distance records from unstructured documents.",

      "Engineered compliance-focused features including fuel efficiency, fuel cost per kilometer, jurisdictional fuel distribution, missing purchases, and temporal trip anomalies.",

      "Applied Z-Score analysis, rule-based detection, Isolation Forest, and K-Means clustering to identify anomalous records and segment audit risk.",

      "Implemented SHAP-based explainability and AWS Glue/Athena analytics to provide transparent risk scores and prioritize audit investigations.",

    ],

    tech: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "SHAP",
      "AWS S3",
      "AWS Textract",
      "AWS Glue",
      "Amazon Athena",
      "AWS SageMaker",
      "MLflow",
      "SQL"
    ],

    uiType: "timeline",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "MS-Azure-DS",
    index: "01",
    title: "Microsoft Azure Associate Data Scientist (Dp-100)",
    issuer: "Microsoft",
    year: "December 2024",
    badge: "Microsoft Certified",
  },
  {
    id: "Internship Certificate",
    index: "02",
    title: "Business Analyst",
    issuer: "Skill Safari/ India",
    year: "July 2022",
    badge: "A+",
  },
  {
    id: "Google Prompting",
    index: "03",
    title: "Google Prompting Essentials",
    issuer: "Google/Coursera",
    year: "October 2026",
    badge: "Google",
  },
  {
    id: "IBM",
    index: "04",
    title: "Machine Learning with Python",
    issuer: "IBM",
    year: "August 2023",
    badge: "IBM",
  },
  {
    id: "Google",
    index: "05",
    title: "The Nuts and Bolts of Machine Learning",
    issuer: "Google",
    year: "August 2023",
    badge: "Google",
  },
  {
    id: "Google_Capstone",
    index: "06",
    title: "Google Advanced Data Analytics Capstone",
    issuer: "Google",
    year: "August 2025",
    badge: "A+",
  },
  {
    id: "IFC",
    index: "07",
    title: "Investment Funds in Canada(IFC)",
    issuer: "CSI",
    year: "March 2026",
    badge: "88.0%",
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "August 2025 – July 2026",
    title: "Data Analyst",
    organization: "Upmeals Technologies Inc",
    location: "Vancouver,  Canada",
    description:
      "Contributed to Demi (UpMeals OS), a food management platform for recipe management, food costing, production & operations planning, by analyzing 500+ daily records to identify costing & inventory inefficiencies and developing 4+ Power BI dashboards & data visualizations for production KPIs, contributing to a 4% reduction in inventory costs across 2+ departments.",
    type: "Work",
    tags: ["Python", "AWS", "PowerBI", "LLMs", "SQL"],
  },
  {
    year: "June 2024 – June 2025",
    title: "Data Analyst",
    organization: "Deloitte India",
    location: "Bengaluru, India",
    description:
      "Led requirements gathering across 5+ stakeholders while managing multiple concurrent analytics projects and deliverables across 3 client teams.",
    type: "Work",
    tags: ["Workflows", "PowerBI", "Analysis"],
  },
  // {
  //   year: "2024 – 2025",
  //   title: "BSc (Hons) Software Engineering — First Class",
  //   organization: "Cardiff Metropolitan University, UK (via ICBT Campus)",
  //   location: "Sri Lanka / UK",
  //   description:
  //     "Graduated with First Class Honours. Completed final year dissertation on Smart Operation & Beneficiary Tracking System for the Department of Agriculture.",
  //   type: "education",
  //   tags: ["First Class", "Cardiff Met", "Software Engineering", "Distinction"],
  // },
  {
    year: "June 2021 - July 2022",
    title: "Business Analyst Intern",
    organization: "Skill Safari",
    location: "India",
    description:
      "Worked with business stakeholders to design A/B experiments, conducted quantitative and qualitative analysis to identify business growth, customer, and process opportunities & communicate insights that increased conversion rates by 10%.",
    type: "Internship",
    tags: ["Bussiness Accumen", "Reporting", "Internship", "PowerBI"],
  },
  {
    year: "September 2022 – April 2024",
    title: "Master's In Analytics",
    organization: "Northeastern University",
    location: "Vancouver, Canada",
    description:
      "During my master’s at Northeastern University, I focused on Data Analytics, Applied Machine Intelligence, and AI, working on real-world projects involving Python, SQL, machine learning, data visualization, and predictive analytics.",
    type: "Education",
    tags: ["Predictive Analytics", "Machine Learning", "Deep Learning", "Applied Machine Intelligence"],
  },
  {
    year: "2018 – 2022",
    title: "Bachelor of Technology in Information Technology",
    organization: "Parul University",
    location: "India",
    description:
      "During my bachelor’s in Information Technology at Parul University, I built a strong foundation in programming, databases, software development, data structures, and web technologies, while working on academic projects involving Python, SQL, data analytics, and machine learning.",
    type: "Education",
    tags: ["Data Structure", "Analytics", "Software Engineering"],
  },
  // {
  //   year: "2020 – 2022",
  //   title: "ICT Instructor",
  //   organization: "Department of Rural Development",
  //   location: "Batticaloa, Sri Lanka",
  //   description:
  //     "Taught information and communication technology fundamentals, basic programming, robotics, electronics, and IoT through practical hands-on exercises.",
  //   type: "Work",
  //   tags: ["Robotics", "IoT", "ICT Education", "Electronics"],
  // },
  // {
  //   year: "2019",
  //   title: "National Vocational Qualification (NVQ Level 4 & 3)",
  //   organization: "TVEC Sri Lanka / Miani Technical Institute",
  //   location: "Batticaloa, Sri Lanka",
  //   description:
  //     "NVQ Level 4 ICT Technician & NVQ Level 3 Computer Applications Assistant certifications.",
  //   type: "education",
  //   tags: ["NVQ Level 4", "TVEC", "Computer Applications"],
  // },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: "01/06",
    number: "3+",
    suffix: "Years",
    label: "Data & AI Experience",
    caption: "Data Science · Analytics · Machine Learning",
    detail:
      "Over three years of experience across data science, analytics, machine learning, LLM evaluation, and business intelligence.",
    logo: "DataAI",
  },

  {
    index: "02/06",
    number: "3.7",
    label: "Master's GPA",
    caption: "Northeastern University",
    detail:
      "Graduated with a 3.7 GPA in the Master of Professional Studies in Analytics, specializing in Applied Machine Intelligence.",
    logo: "Northeastern",
  },

  {
    index: "03/06",
    number: "2nd",
    suffix: "Place",
    label: "YVR Hackathon",
    caption: "AI · Data · Innovation",
    detail:
      "Runner-up at the YVR Airport Hackathon, developing a data-driven solution to address real-world airport challenges.",
    logo: "YVR",
  },

  {
    index: "04/06",
    number: "Co-",
    label: "Founder",
    caption: "NEU Data Analytics Association",
    detail:
      "Co-founded a student-led data analytics association at Northeastern University to connect students through analytics, AI, workshops, and collaborative projects.",
    logo: "NEU",
  },

  {
    index: "05/06",
    number: "10+",
    label: "Hackathons Hosted",
    caption: "Community · Innovation · Technology",
    detail:
      "Hosted and organized hackathons and technology-focused events, bringing students together to build, collaborate, and solve real-world problems.",
    logo: "Hackathon",
  },

  {
    index: "06/06",
    number: "Azure",
    label: "Data Scientist Certified",
    caption: "Microsoft DP-100",
    detail:
      "Microsoft Certified: Azure Data Scientist Associate, demonstrating hands-on knowledge of machine learning workflows and Azure-based data science.",
    logo: "Microsoft",
  },
];
