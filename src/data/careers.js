export const careers = [
  // SOFTWARE & DEVELOPMENT
  {
    id: "software-developer",
    title: "Software Developer",
    category: "Technology",
    subcategory: "Software Development",
    description: "Design, develop, and maintain software applications and systems. Write code, debug programs, and collaborate with teams to create solutions that solve real-world problems.",
    detailedDescription: "Software developers are the creative minds behind computer programs and applications. They design, test, and develop software to meet users' needs. Some develop applications that allow people to do specific tasks on computers or devices, while others develop the underlying systems that run devices or control networks.",
    interests: ["problem-solving", "technology", "creativity", "logical-thinking", "innovation"],
    salaryRange: { entry: 65000, median: 120000, senior: 180000 },
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Coding bootcamp + portfolio",
      "Self-taught with strong portfolio"
    ],
    skills: ["Programming (Python, Java, JavaScript)", "Problem Solving", "Algorithms", "Version Control (Git)", "Software Architecture", "Debugging", "Collaboration"],
    outlook: "Much faster than average (25% growth)",
    workEnvironment: "Office or remote, collaborative team environment",
    typicalDay: [
      "Write and review code",
      "Attend team meetings and standups",
      "Debug and test software",
      "Collaborate with designers and product managers",
      "Learn new technologies and frameworks"
    ],
    actionSteps: [
      "Learn programming fundamentals (Python or JavaScript recommended)",
      "Take AP Computer Science in high school",
      "Build personal projects and contribute to open source",
      "Create a GitHub portfolio",
      "Participate in hackathons and coding competitions",
      "Consider internships at tech companies"
    ],
    relatedCareers: ["data-scientist", "web-developer", "mobile-developer", "devops-engineer"]
  },
  {
    id: "web-developer",
    title: "Web Developer",
    category: "Technology",
    subcategory: "Software Development",
    description: "Build and maintain websites and web applications. Create user interfaces, implement functionality, and ensure optimal performance across devices.",
    detailedDescription: "Web developers create and maintain websites, ensuring they look good, work well, and provide a great user experience. They may focus on front-end (what users see), back-end (server and database), or full-stack (both).",
    interests: ["design", "technology", "creativity", "problem-solving", "visual-thinking"],
    salaryRange: { entry: 55000, median: 95000, senior: 145000 },
    education: [
      "Bachelor's degree in Web Development or Computer Science",
      "Coding bootcamp specializing in web development",
      "Self-taught with strong portfolio"
    ],
    skills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Responsive Design", "APIs", "Git", "UI/UX Principles"],
    outlook: "Faster than average (16% growth)",
    workEnvironment: "Office, remote, or freelance",
    typicalDay: [
      "Design and code website features",
      "Test across different browsers and devices",
      "Optimize performance and accessibility",
      "Collaborate with designers and clients",
      "Update and maintain existing websites"
    ],
    actionSteps: [
      "Learn HTML, CSS, and JavaScript fundamentals",
      "Build personal website and projects",
      "Complete online courses (freeCodeCamp, The Odin Project)",
      "Create responsive designs",
      "Learn a modern framework like React",
      "Build a portfolio website showcasing your work"
    ],
    relatedCareers: ["software-developer", "ux-designer", "mobile-developer"]
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer",
    category: "Technology",
    subcategory: "Software Development",
    description: "Create applications for mobile devices including smartphones and tablets. Develop for iOS, Android, or cross-platform solutions.",
    detailedDescription: "Mobile app developers design and build applications for mobile operating systems. They work on everything from games to productivity tools, focusing on touch interfaces and mobile-specific features like GPS, cameras, and sensors.",
    interests: ["technology", "innovation", "problem-solving", "user-experience", "creativity"],
    salaryRange: { entry: 68000, median: 125000, senior: 175000 },
    education: [
      "Bachelor's degree in Computer Science or Software Engineering",
      "Mobile development bootcamp",
      "Self-taught with published apps"
    ],
    skills: ["Swift/Kotlin", "React Native/Flutter", "Mobile UI/UX", "API Integration", "App Store Guidelines", "Testing"],
    outlook: "Much faster than average (22% growth)",
    workEnvironment: "Tech companies, startups, or freelance",
    typicalDay: [
      "Design mobile app interfaces",
      "Write and test code",
      "Optimize app performance",
      "Fix bugs and crashes",
      "Submit updates to app stores"
    ],
    actionSteps: [
      "Learn programming basics (Swift for iOS or Kotlin for Android)",
      "Download Xcode or Android Studio",
      "Build simple apps (calculator, to-do list)",
      "Publish an app to the App Store or Google Play",
      "Join mobile development communities",
      "Study mobile design patterns"
    ],
    relatedCareers: ["software-developer", "web-developer", "ux-designer"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    subcategory: "Data & Analytics",
    description: "Analyze complex data to help organizations make better decisions. Use statistics, machine learning, and programming to extract insights from data.",
    detailedDescription: "Data scientists combine statistics, programming, and domain expertise to extract meaningful insights from data. They build predictive models, create visualizations, and help organizations make data-driven decisions.",
    interests: ["mathematics", "problem-solving", "analysis", "technology", "research"],
    salaryRange: { entry: 75000, median: 130000, senior: 190000 },
    education: [
      "Bachelor's degree in Data Science, Statistics, or Computer Science",
      "Master's degree often preferred",
      "Bootcamp with strong math background"
    ],
    skills: ["Python/R", "Statistics", "Machine Learning", "SQL", "Data Visualization", "Communication", "Critical Thinking"],
    outlook: "Much faster than average (36% growth)",
    workEnvironment: "Office or remote, cross-functional teams",
    typicalDay: [
      "Clean and prepare data",
      "Build predictive models",
      "Create data visualizations",
      "Present findings to stakeholders",
      "Collaborate with engineering teams"
    ],
    actionSteps: [
      "Excel in math courses (statistics, calculus)",
      "Learn Python programming",
      "Study statistics and probability",
      "Work with datasets (Kaggle competitions)",
      "Learn SQL for database queries",
      "Build a portfolio of data projects"
    ],
    relatedCareers: ["machine-learning-engineer", "data-analyst", "software-developer"]
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Technology",
    subcategory: "Artificial Intelligence",
    description: "Design and implement AI systems that learn from data. Build models for everything from recommendation systems to autonomous vehicles.",
    detailedDescription: "Machine learning engineers create systems that can learn and improve from experience without being explicitly programmed. They work on cutting-edge AI applications in areas like computer vision, natural language processing, and robotics.",
    interests: ["artificial-intelligence", "mathematics", "problem-solving", "innovation", "research"],
    salaryRange: { entry: 90000, median: 155000, senior: 220000 },
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Master's degree in Machine Learning or AI (often required)",
      "PhD for research positions"
    ],
    skills: ["Python", "TensorFlow/PyTorch", "Mathematics", "Deep Learning", "Model Deployment", "Cloud Platforms"],
    outlook: "Much faster than average (40% growth)",
    workEnvironment: "Tech companies, research labs, startups",
    typicalDay: [
      "Train and evaluate ML models",
      "Optimize model performance",
      "Deploy models to production",
      "Research new algorithms",
      "Collaborate with data scientists"
    ],
    actionSteps: [
      "Master mathematics (linear algebra, calculus, statistics)",
      "Learn Python and machine learning libraries",
      "Complete online courses (fast.ai, Coursera)",
      "Build ML projects (image classification, chatbots)",
      "Study AI research papers",
      "Participate in Kaggle competitions"
    ],
    relatedCareers: ["data-scientist", "ai-researcher", "software-developer"]
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    category: "Technology",
    subcategory: "Security",
    description: "Protect computer systems and networks from cyber threats. Identify vulnerabilities, implement security measures, and respond to security incidents.",
    detailedDescription: "Cybersecurity specialists defend organizations against cyber attacks and data breaches. They monitor systems for security threats, conduct security audits, implement protective measures, and respond to incidents when they occur.",
    interests: ["technology", "problem-solving", "detail-oriented", "ethical-hacking", "investigation"],
    salaryRange: { entry: 70000, median: 115000, senior: 165000 },
    education: [
      "Bachelor's degree in Cybersecurity or Computer Science",
      "Security certifications (CompTIA Security+, CEH, CISSP)",
      "Technical training programs"
    ],
    skills: ["Network Security", "Ethical Hacking", "Security Tools", "Incident Response", "Risk Assessment", "Encryption"],
    outlook: "Much faster than average (35% growth)",
    workEnvironment: "Corporate IT departments, government agencies, security firms",
    typicalDay: [
      "Monitor security systems",
      "Conduct vulnerability assessments",
      "Respond to security incidents",
      "Implement security policies",
      "Train employees on security practices"
    ],
    actionSteps: [
      "Learn networking fundamentals",
      "Study operating systems (Linux, Windows)",
      "Practice ethical hacking (TryHackMe, HackTheBox)",
      "Earn entry-level certifications",
      "Set up a home lab for security testing",
      "Join cybersecurity clubs and competitions"
    ],
    relatedCareers: ["network-engineer", "penetration-tester", "software-developer"]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Technology",
    subcategory: "Infrastructure",
    description: "Bridge development and operations teams. Automate deployment processes, manage cloud infrastructure, and ensure reliable software delivery.",
    detailedDescription: "DevOps engineers streamline the software development lifecycle by automating processes, managing infrastructure as code, and ensuring smooth deployment pipelines. They work to make software releases faster, more reliable, and more frequent.",
    interests: ["automation", "problem-solving", "technology", "efficiency", "systems-thinking"],
    salaryRange: { entry: 75000, median: 135000, senior: 185000 },
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Self-taught with certifications (AWS, Docker, Kubernetes)",
      "Technical bootcamp"
    ],
    skills: ["Linux", "Docker/Kubernetes", "CI/CD", "Cloud Platforms (AWS, Azure)", "Scripting", "Monitoring Tools"],
    outlook: "Much faster than average (30% growth)",
    workEnvironment: "Tech companies, startups, enterprise IT",
    typicalDay: [
      "Manage cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance",
      "Troubleshoot production issues",
      "Improve development workflows"
    ],
    actionSteps: [
      "Learn Linux command line",
      "Study cloud platforms (start with AWS free tier)",
      "Practice with Docker containers",
      "Learn Git and CI/CD concepts",
      "Build automated deployment pipelines",
      "Get cloud certifications"
    ],
    relatedCareers: ["software-developer", "cloud-architect", "systems-administrator"]
  },

  // DESIGN CAREERS
  {
    id: "ux-designer",
    title: "UX Designer",
    category: "Design",
    subcategory: "User Experience",
    description: "Design user experiences for digital products. Research user needs, create wireframes and prototypes, and ensure products are intuitive and enjoyable to use.",
    detailedDescription: "UX designers focus on creating products that provide meaningful and relevant experiences to users. They conduct user research, create personas, design user flows, build prototypes, and test designs to ensure optimal usability.",
    interests: ["design", "psychology", "problem-solving", "creativity", "user-empathy"],
    salaryRange: { entry: 60000, median: 105000, senior: 155000 },
    education: [
      "Bachelor's degree in Design, HCI, or Psychology",
      "UX design bootcamp",
      "Self-taught with strong portfolio"
    ],
    skills: ["User Research", "Wireframing", "Prototyping", "Figma/Sketch", "Usability Testing", "Information Architecture"],
    outlook: "Faster than average (18% growth)",
    workEnvironment: "Design agencies, tech companies, in-house teams",
    typicalDay: [
      "Conduct user research and interviews",
      "Create wireframes and prototypes",
      "Run usability tests",
      "Collaborate with developers and product managers",
      "Iterate on designs based on feedback"
    ],
    actionSteps: [
      "Learn design thinking principles",
      "Download Figma and complete tutorials",
      "Redesign existing apps/websites as practice",
      "Study psychology and human behavior",
      "Build a portfolio with case studies",
      "Take online UX courses (Coursera, Interaction Design Foundation)"
    ],
    relatedCareers: ["ui-designer", "product-designer", "ux-researcher"]
  },
  {
    id: "ui-designer",
    title: "UI Designer",
    category: "Design",
    subcategory: "Visual Design",
    description: "Create beautiful, functional interfaces for digital products. Focus on visual elements like typography, color, and layout to create engaging user experiences.",
    detailedDescription: "UI designers are responsible for the look and feel of digital products. They create visual designs that are aesthetically pleasing and align with brand guidelines while ensuring clarity and usability.",
    interests: ["visual-design", "creativity", "detail-oriented", "color-theory", "typography"],
    salaryRange: { entry: 55000, median: 95000, senior: 145000 },
    education: [
      "Bachelor's degree in Graphic Design or related field",
      "Design bootcamp",
      "Self-taught with strong portfolio"
    ],
    skills: ["Figma/Adobe XD", "Visual Design", "Typography", "Color Theory", "Design Systems", "Prototyping"],
    outlook: "Faster than average (16% growth)",
    workEnvironment: "Design studios, tech companies, freelance",
    typicalDay: [
      "Design interface mockups",
      "Create design system components",
      "Collaborate with UX designers",
      "Present designs to stakeholders",
      "Refine visual details"
    ],
    actionSteps: [
      "Study design principles and color theory",
      "Learn Figma or Adobe XD",
      "Create daily UI challenges",
      "Analyze well-designed apps and websites",
      "Build a portfolio on Behance or Dribbble",
      "Practice logo and icon design"
    ],
    relatedCareers: ["ux-designer", "graphic-designer", "web-developer"]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    category: "Design",
    subcategory: "Visual Communication",
    description: "Create visual concepts to communicate ideas that inspire, inform, and captivate consumers. Design logos, advertisements, publications, and brand identities.",
    detailedDescription: "Graphic designers use art and technology to communicate ideas through images and layouts. They work on a variety of products including websites, advertising, books, magazines, posters, packaging, and more.",
    interests: ["creativity", "visual-arts", "communication", "branding", "illustration"],
    salaryRange: { entry: 42000, median: 75000, senior: 120000 },
    education: [
      "Bachelor's degree in Graphic Design",
      "Associate degree in Design",
      "Self-taught with strong portfolio"
    ],
    skills: ["Adobe Creative Suite", "Typography", "Layout Design", "Branding", "Print Design", "Digital Design"],
    outlook: "Average (3% growth)",
    workEnvironment: "Design agencies, in-house creative teams, freelance",
    typicalDay: [
      "Meet with clients to understand needs",
      "Create design concepts and mockups",
      "Revise designs based on feedback",
      "Prepare files for print or digital use",
      "Manage multiple projects"
    ],
    actionSteps: [
      "Learn Adobe Illustrator and Photoshop",
      "Study design fundamentals",
      "Create personal branding projects",
      "Enter design contests",
      "Build a diverse portfolio",
      "Follow design trends and inspiration"
    ],
    relatedCareers: ["ui-designer", "brand-designer", "illustrator"]
  },
  {
    id: "product-designer",
    title: "Product Designer",
    category: "Design",
    subcategory: "Product Design",
    description: "Design end-to-end product experiences, combining UX research, interface design, and business strategy to create successful products.",
    detailedDescription: "Product designers take a holistic approach to designing digital products. They combine user research, interaction design, visual design, and business thinking to create products that are both useful and delightful.",
    interests: ["design", "strategy", "problem-solving", "innovation", "user-empathy"],
    salaryRange: { entry: 70000, median: 125000, senior: 180000 },
    education: [
      "Bachelor's degree in Design, HCI, or related field",
      "Design bootcamp with product focus",
      "Self-taught with strong portfolio and product thinking"
    ],
    skills: ["UX/UI Design", "Product Strategy", "User Research", "Prototyping", "Data Analysis", "Collaboration"],
    outlook: "Much faster than average (20% growth)",
    workEnvironment: "Tech companies, startups, product teams",
    typicalDay: [
      "Define product problems and opportunities",
      "Conduct user research",
      "Design and prototype solutions",
      "Work with engineers and PMs",
      "Measure and iterate on designs"
    ],
    actionSteps: [
      "Learn both UX and UI design skills",
      "Study product management basics",
      "Build complete product case studies",
      "Understand metrics and analytics",
      "Create end-to-end product designs",
      "Practice presenting design decisions"
    ],
    relatedCareers: ["ux-designer", "product-manager", "ui-designer"]
  },
  {
    id: "motion-graphics-designer",
    title: "Motion Graphics Designer",
    category: "Design",
    subcategory: "Animation",
    description: "Create animated graphics and visual effects for video, film, and digital media. Bring static designs to life through motion and animation.",
    detailedDescription: "Motion graphics designers create animated content for various media including film, television, advertising, and digital platforms. They combine graphic design principles with animation techniques to create engaging visual stories.",
    interests: ["animation", "creativity", "visual-storytelling", "technology", "film"],
    salaryRange: { entry: 48000, median: 85000, senior: 135000 },
    education: [
      "Bachelor's degree in Animation or Graphic Design",
      "Motion design bootcamp",
      "Self-taught with strong demo reel"
    ],
    skills: ["After Effects", "Cinema 4D", "Animation Principles", "Video Editing", "Compositing", "3D Modeling"],
    outlook: "Faster than average (16% growth)",
    workEnvironment: "Film studios, advertising agencies, freelance",
    typicalDay: [
      "Storyboard animation sequences",
      "Create 2D/3D motion graphics",
      "Animate logos and text",
      "Composite visual effects",
      "Render and export final videos"
    ],
    actionSteps: [
      "Learn After Effects fundamentals",
      "Study animation principles",
      "Create short animated videos",
      "Follow motion design tutorials",
      "Build a demo reel",
      "Practice with daily animation challenges"
    ],
    relatedCareers: ["video-editor", "3d-animator", "graphic-designer"]
  },
  {
    id: "3d-artist",
    title: "3D Artist",
    category: "Design",
    subcategory: "3D & Visual Effects",
    description: "Create three-dimensional models, animations, and visualizations for games, films, architecture, and product design.",
    detailedDescription: "3D artists use specialized software to create three-dimensional models and animations. They work in various industries including gaming, film production, architecture, product design, and advertising.",
    interests: ["3d-modeling", "creativity", "technology", "visual-arts", "detail-oriented"],
    salaryRange: { entry: 50000, median: 82000, senior: 130000 },
    education: [
      "Bachelor's degree in 3D Animation or Digital Arts",
      "Technical training in 3D software",
      "Self-taught with strong portfolio"
    ],
    skills: ["Blender/Maya/3ds Max", "Texturing", "Lighting", "Rendering", "Animation", "UV Mapping"],
    outlook: "Faster than average (14% growth)",
    workEnvironment: "Game studios, film production, architectural firms",
    typicalDay: [
      "Model 3D objects and characters",
      "Create textures and materials",
      "Set up lighting and cameras",
      "Render scenes",
      "Collaborate with art directors"
    ],
    actionSteps: [
      "Download Blender (free) and learn basics",
      "Complete 3D modeling tutorials",
      "Create simple models (furniture, props)",
      "Study real-world lighting and materials",
      "Build a portfolio of 3D work",
      "Join 3D art communities"
    ],
    relatedCareers: ["game-designer", "motion-graphics-designer", "industrial-designer"]
  },

  // TECHNOLOGY - SPECIALIZED
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    category: "Technology",
    subcategory: "Infrastructure",
    description: "Design and oversee cloud computing strategies for organizations. Plan cloud migrations, optimize costs, and ensure scalable, secure cloud infrastructure.",
    detailedDescription: "Cloud architects are responsible for managing an organization's cloud computing architecture. They design cloud infrastructure, oversee deployment, and ensure systems are secure, scalable, and cost-effective.",
    interests: ["architecture", "technology", "strategy", "problem-solving", "innovation"],
    salaryRange: { entry: 95000, median: 155000, senior: 210000 },
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Cloud certifications (AWS Solutions Architect, Azure Architect)",
      "Years of experience in IT infrastructure"
    ],
    skills: ["Cloud Platforms", "Architecture Design", "Security", "Cost Optimization", "Migration Planning", "DevOps"],
    outlook: "Much faster than average (28% growth)",
    workEnvironment: "Enterprise companies, consulting firms",
    typicalDay: [
      "Design cloud solutions",
      "Review architecture proposals",
      "Optimize cloud costs",
      "Plan migrations",
      "Mentor engineers"
    ],
    actionSteps: [
      "Start with cloud fundamentals courses",
      "Get hands-on with AWS/Azure free tiers",
      "Study for cloud certifications",
      "Learn infrastructure as code (Terraform)",
      "Build cloud-based projects",
      "Understand networking and security"
    ],
    relatedCareers: ["devops-engineer", "systems-architect", "network-engineer"]
  },
  {
    id: "game-developer",
    title: "Game Developer",
    category: "Technology",
    subcategory: "Gaming",
    description: "Create video games for consoles, PC, mobile devices, and VR platforms. Design gameplay mechanics, write code, and bring interactive entertainment to life.",
    detailedDescription: "Game developers combine creativity and technical skills to create interactive entertainment. They work on all aspects of game creation from concept and design to programming and testing.",
    interests: ["gaming", "programming", "creativity", "storytelling", "problem-solving"],
    salaryRange: { entry: 60000, median: 100000, senior: 150000 },
    education: [
      "Bachelor's degree in Game Development or Computer Science",
      "Game design bootcamp",
      "Self-taught with published games"
    ],
    skills: ["Unity/Unreal Engine", "C#/C++", "Game Design", "Physics", "AI Programming", "3D Math"],
    outlook: "Faster than average (16% growth)",
    workEnvironment: "Game studios, indie development, remote",
    typicalDay: [
      "Program game mechanics",
      "Implement gameplay features",
      "Fix bugs and optimize performance",
      "Playtest and iterate",
      "Collaborate with artists and designers"
    ],
    actionSteps: [
      "Learn Unity or Unreal Engine",
      "Complete game development tutorials",
      "Create simple games (platformer, puzzle)",
      "Join game jams",
      "Publish games on itch.io",
      "Study game design principles"
    ],
    relatedCareers: ["software-developer", "game-designer", "3d-artist"]
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    category: "Technology",
    subcategory: "Emerging Tech",
    description: "Develop decentralized applications and smart contracts using blockchain technology. Work on cryptocurrency, NFTs, and distributed systems.",
    detailedDescription: "Blockchain developers create applications that run on blockchain networks. They design and implement decentralized solutions, smart contracts, and cryptocurrency systems.",
    interests: ["cryptocurrency", "technology", "innovation", "problem-solving", "distributed-systems"],
    salaryRange: { entry: 85000, median: 145000, senior: 200000 },
    education: [
      "Bachelor's degree in Computer Science",
      "Blockchain development bootcamp",
      "Self-taught with blockchain projects"
    ],
    skills: ["Solidity", "Smart Contracts", "Cryptography", "Distributed Systems", "Web3.js", "Blockchain Protocols"],
    outlook: "Much faster than average (30% growth)",
    workEnvironment: "Crypto startups, blockchain companies, consulting",
    typicalDay: [
      "Write smart contracts",
      "Test blockchain applications",
      "Review security vulnerabilities",
      "Integrate with blockchain networks",
      "Research new protocols"
    ],
    actionSteps: [
      "Learn blockchain fundamentals",
      "Study Solidity programming",
      "Build simple smart contracts",
      "Deploy to test networks",
      "Contribute to open-source blockchain projects",
      "Understand cryptography basics"
    ],
    relatedCareers: ["software-developer", "cybersecurity-specialist", "backend-developer"]
  },

  // BUSINESS & TECHNOLOGY HYBRID
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business",
    subcategory: "Product",
    description: "Define product vision and strategy. Work with engineering, design, and business teams to build products that customers love.",
    detailedDescription: "Product managers are responsible for the strategy, roadmap, and feature definition of a product or product line. They work with cross-functional teams to deliver products that solve customer problems and achieve business goals.",
    interests: ["strategy", "leadership", "problem-solving", "communication", "innovation"],
    salaryRange: { entry: 75000, median: 135000, senior: 195000 },
    education: [
      "Bachelor's degree in Business, Computer Science, or related field",
      "MBA (for senior positions)",
      "Product management bootcamp"
    ],
    skills: ["Product Strategy", "Data Analysis", "Communication", "Roadmapping", "User Research", "Agile/Scrum"],
    outlook: "Much faster than average (22% growth)",
    workEnvironment: "Tech companies, startups, product organizations",
    typicalDay: [
      "Define product requirements",
      "Prioritize features",
      "Meet with stakeholders",
      "Analyze user data",
      "Make product decisions"
    ],
    actionSteps: [
      "Learn product management fundamentals",
      "Study successful products and companies",
      "Practice writing product specs",
      "Learn basic data analysis",
      "Build something (app, website, service)",
      "Develop communication skills"
    ],
    relatedCareers: ["product-designer", "business-analyst", "project-manager"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Technology",
    subcategory: "Data & Analytics",
    description: "Collect, process, and analyze data to help businesses make informed decisions. Create reports, dashboards, and visualizations.",
    detailedDescription: "Data analysts examine data sets to identify trends, develop charts and graphs, and present findings to stakeholders. They help organizations understand their data and make data-driven decisions.",
    interests: ["analysis", "mathematics", "problem-solving", "detail-oriented", "communication"],
    salaryRange: { entry: 55000, median: 85000, senior: 125000 },
    education: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "Data analytics bootcamp",
      "Self-taught with certifications"
    ],
    skills: ["SQL", "Excel", "Tableau/Power BI", "Statistics", "Python/R", "Data Visualization"],
    outlook: "Much faster than average (25% growth)",
    workEnvironment: "Various industries, office or remote",
    typicalDay: [
      "Query databases",
      "Clean and prepare data",
      "Create visualizations",
      "Build dashboards",
      "Present insights to teams"
    ],
    actionSteps: [
      "Learn SQL for data queries",
      "Master Excel and pivot tables",
      "Study statistics basics",
      "Learn Tableau or Power BI",
      "Analyze public datasets",
      "Build a portfolio of analysis projects"
    ],
    relatedCareers: ["data-scientist", "business-analyst", "financial-analyst"]
  },

  // CREATIVE & MEDIA
  {
    id: "video-editor",
    title: "Video Editor",
    category: "Design",
    subcategory: "Media Production",
    description: "Edit and assemble recorded footage into finished videos for various media including film, television, and online content.",
    detailedDescription: "Video editors take raw footage and transform it into polished, engaging content. They work on pacing, storytelling, color grading, and sound design to create compelling videos.",
    interests: ["film", "creativity", "storytelling", "detail-oriented", "technology"],
    salaryRange: { entry: 40000, median: 68000, senior: 110000 },
    education: [
      "Bachelor's degree in Film or Media Production",
      "Technical training in video editing",
      "Self-taught with strong portfolio"
    ],
    skills: ["Premiere Pro/Final Cut", "Color Grading", "Audio Editing", "Storytelling", "After Effects", "Compression"],
    outlook: "Average (7% growth)",
    workEnvironment: "Production companies, advertising, freelance, social media",
    typicalDay: [
      "Review and organize footage",
      "Edit video sequences",
      "Add effects and transitions",
      "Color grade footage",
      "Mix audio tracks"
    ],
    actionSteps: [
      "Learn Premiere Pro or DaVinci Resolve",
      "Study film editing techniques",
      "Edit videos for friends or local businesses",
      "Create YouTube content",
      "Build a demo reel",
      "Learn basic cinematography"
    ],
    relatedCareers: ["motion-graphics-designer", "content-creator", "cinematographer"]
  },
  {
    id: "content-creator",
    title: "Content Creator",
    category: "Design",
    subcategory: "Digital Media",
    description: "Create engaging content for digital platforms including YouTube, TikTok, Instagram, and blogs. Build an audience and monetize creative work.",
    detailedDescription: "Content creators produce original content for online platforms. They combine creativity, technical skills, and business acumen to build audiences and create sustainable careers through various monetization strategies.",
    interests: ["creativity", "communication", "entrepreneurship", "social-media", "storytelling"],
    salaryRange: { entry: 30000, median: 65000, senior: 150000 },
    education: [
      "No specific degree required",
      "Marketing or Communications degree helpful",
      "Self-taught with portfolio of content"
    ],
    skills: ["Video Production", "Writing", "Social Media", "SEO", "Photography", "Audience Building", "Brand Partnerships"],
    outlook: "Much faster than average (20% growth)",
    workEnvironment: "Independent, home-based, flexible",
    typicalDay: [
      "Plan content calendar",
      "Film or create content",
      "Edit and publish",
      "Engage with audience",
      "Analyze performance metrics"
    ],
    actionSteps: [
      "Choose a niche or topic you're passionate about",
      "Learn basic video/photo editing",
      "Start posting consistently",
      "Study successful creators",
      "Build a personal brand",
      "Learn about monetization options"
    ],
    relatedCareers: ["video-editor", "social-media-manager", "digital-marketer"]
  },

  // TRADITIONAL CAREERS WITH TECH ELEMENTS
  {
    id: "architect",
    title: "Architect",
    category: "Design",
    subcategory: "Architecture",
    description: "Design buildings and structures, combining aesthetics with functionality. Use technology like CAD and BIM to create innovative spaces.",
    detailedDescription: "Architects plan and design buildings and other structures. They work with clients to understand their needs, create designs, produce technical drawings, and oversee construction to ensure their vision is realized.",
    interests: ["design", "mathematics", "problem-solving", "creativity", "sustainability"],
    salaryRange: { entry: 55000, median: 95000, senior: 145000 },
    education: [
      "Bachelor's degree in Architecture (5-year program)",
      "Master's degree in Architecture",
      "Architectural license required for independent practice"
    ],
    skills: ["CAD Software", "3D Modeling", "Building Codes", "Sustainability", "Project Management", "Sketching"],
    outlook: "Average (5% growth)",
    workEnvironment: "Architecture firms, self-employed, construction companies",
    typicalDay: [
      "Meet with clients",
      "Create design concepts",
      "Produce technical drawings",
      "Review construction progress",
      "Coordinate with engineers"
    ],
    actionSteps: [
      "Take art and physics courses",
      "Learn CAD software (AutoCAD, Revit)",
      "Study famous buildings and architects",
      "Create design sketches",
      "Visit architecture schools",
      "Build models and design projects"
    ],
    relatedCareers: ["interior-designer", "urban-planner", "civil-engineer"]
  },
  {
    id: "industrial-designer",
    title: "Industrial Designer",
    category: "Design",
    subcategory: "Product Design",
    description: "Design physical products from consumer electronics to furniture. Combine aesthetics, ergonomics, and manufacturing considerations.",
    detailedDescription: "Industrial designers develop concepts and designs for manufactured products. They consider how products look, function, and are produced, creating everything from smartphones to cars to furniture.",
    interests: ["design", "innovation", "problem-solving", "creativity", "engineering"],
    salaryRange: { entry: 52000, median: 88000, senior: 130000 },
    education: [
      "Bachelor's degree in Industrial Design",
      "Portfolio required for admission",
      "Internships highly valued"
    ],
    skills: ["Sketching", "CAD (SolidWorks, Fusion 360)", "3D Modeling", "Prototyping", "Materials Knowledge", "Manufacturing"],
    outlook: "Average (4% growth)",
    workEnvironment: "Design consultancies, manufacturing companies, in-house teams",
    typicalDay: [
      "Sketch product concepts",
      "Create 3D CAD models",
      "Build prototypes",
      "Test designs",
      "Coordinate with engineers"
    ],
    actionSteps: [
      "Learn product sketching",
      "Master CAD software (Fusion 360 free for students)",
      "Study existing products",
      "Build portfolio of product designs",
      "Learn basic manufacturing processes",
      "Create physical prototypes"
    ],
    relatedCareers: ["3d-artist", "mechanical-engineer", "ux-designer"]
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    subcategory: "Mechanical",
    description: "Design and build mechanical systems and devices. Work on everything from engines to robotics to manufacturing equipment.",
    detailedDescription: "Mechanical engineers research, design, develop, and test mechanical and thermal devices including tools, engines, and machines. They work in virtually all industries.",
    interests: ["engineering", "mathematics", "problem-solving", "innovation", "hands-on"],
    salaryRange: { entry: 68000, median: 105000, senior: 145000 },
    education: [
      "Bachelor's degree in Mechanical Engineering (required)",
      "PE license for advancement",
      "Master's degree for specialized roles"
    ],
    skills: ["CAD", "Thermodynamics", "Materials Science", "Manufacturing", "FEA", "Problem Solving"],
    outlook: "Average (6% growth)",
    workEnvironment: "Manufacturing, automotive, aerospace, consulting",
    typicalDay: [
      "Design mechanical components",
      "Run simulations",
      "Test prototypes",
      "Review technical drawings",
      "Collaborate with teams"
    ],
    actionSteps: [
      "Excel in math and physics",
      "Learn CAD software",
      "Join robotics club",
      "Take engineering courses",
      "Build mechanical projects",
      "Apply to ABET-accredited programs"
    ],
    relatedCareers: ["aerospace-engineer", "robotics-engineer", "industrial-designer"]
  },
  {
    id: "electrical-engineer",
    title: "Electrical Engineer",
    category: "Engineering",
    subcategory: "Electrical",
    description: "Design and develop electrical systems and equipment. Work on power generation, electronics, telecommunications, and more.",
    detailedDescription: "Electrical engineers design, develop, test, and supervise the manufacture of electrical equipment such as electric motors, radar, navigation systems, communications systems, or power generation equipment.",
    interests: ["engineering", "technology", "mathematics", "problem-solving", "innovation"],
    salaryRange: { entry: 70000, median: 110000, senior: 150000 },
    education: [
      "Bachelor's degree in Electrical Engineering (required)",
      "PE license for advancement",
      "Master's degree for specialized fields"
    ],
    skills: ["Circuit Design", "Signal Processing", "Power Systems", "Microcontrollers", "MATLAB", "PCB Design"],
    outlook: "Average (7% growth)",
    workEnvironment: "Electronics companies, utilities, telecommunications, consulting",
    typicalDay: [
      "Design electrical systems",
      "Simulate circuits",
      "Test equipment",
      "Solve technical problems",
      "Document designs"
    ],
    actionSteps: [
      "Excel in math and physics",
      "Learn basic electronics",
      "Build Arduino projects",
      "Study circuit theory",
      "Join engineering programs",
      "Get hands-on with components"
    ],
    relatedCareers: ["computer-engineer", "robotics-engineer", "telecommunications-engineer"]
  },

  // HEALTHCARE WITH TECH
  {
    id: "biomedical-engineer",
    title: "Biomedical Engineer",
    category: "Engineering",
    subcategory: "Biomedical",
    description: "Apply engineering principles to medicine and biology. Design medical devices, artificial organs, and healthcare technology.",
    detailedDescription: "Biomedical engineers combine engineering principles with medical and biological sciences to design and create equipment, devices, computer systems, and software used in healthcare.",
    interests: ["healthcare", "engineering", "biology", "innovation", "problem-solving"],
    salaryRange: { entry: 65000, median: 105000, senior: 150000 },
    education: [
      "Bachelor's degree in Biomedical Engineering",
      "Master's or PhD for research",
      "Certification may be beneficial"
    ],
    skills: ["CAD", "Biology", "Medical Device Design", "FDA Regulations", "Signal Processing", "Materials Science"],
    outlook: "Much faster than average (10% growth)",
    workEnvironment: "Medical device companies, hospitals, research facilities",
    typicalDay: [
      "Design medical devices",
      "Test prototypes",
      "Analyze biological data",
      "Ensure regulatory compliance",
      "Collaborate with medical professionals"
    ],
    actionSteps: [
      "Excel in biology, chemistry, and physics",
      "Learn about medical devices",
      "Study CAD and engineering fundamentals",
      "Volunteer in healthcare settings",
      "Join biomedical engineering programs",
      "Research current medical technology"
    ],
    relatedCareers: ["mechanical-engineer", "medical-researcher", "clinical-engineer"]
  },

  // BUSINESS & FINANCE
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    category: "Business",
    subcategory: "Finance",
    description: "Analyze financial data to help businesses and individuals make investment decisions. Use data analysis and modeling.",
    detailedDescription: "Financial analysts evaluate investment opportunities, assess stock performance, study economic trends, and provide recommendations to businesses and individuals on investment decisions.",
    interests: ["finance", "mathematics", "analysis", "business", "economics"],
    salaryRange: { entry: 60000, median: 95000, senior: 150000 },
    education: [
      "Bachelor's degree in Finance, Accounting, or Economics",
      "CFA certification highly valued",
      "MBA for advancement"
    ],
    skills: ["Financial Modeling", "Excel", "Data Analysis", "Accounting", "Economics", "Communication"],
    outlook: "Faster than average (9% growth)",
    workEnvironment: "Financial institutions, corporations, consulting firms",
    typicalDay: [
      "Analyze financial statements",
      "Build financial models",
      "Research companies and markets",
      "Create reports and presentations",
      "Meet with clients or teams"
    ],
    actionSteps: [
      "Excel in math and economics",
      "Learn Excel and financial modeling",
      "Study financial statements",
      "Follow stock market and economy",
      "Join investment clubs",
      "Get internships in finance"
    ],
    relatedCareers: ["investment-banker", "data-analyst", "accountant"]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing Specialist",
    category: "Business",
    subcategory: "Marketing",
    description: "Promote products and services through digital channels. Use SEO, social media, email, and analytics to reach customers.",
    detailedDescription: "Digital marketing specialists develop and implement online marketing strategies. They use various digital channels to promote brands, engage customers, and drive business growth.",
    interests: ["marketing", "creativity", "analytics", "communication", "technology"],
    salaryRange: { entry: 48000, median: 78000, senior: 125000 },
    education: [
      "Bachelor's degree in Marketing or related field",
      "Digital marketing certifications (Google, HubSpot)",
      "Self-taught with proven results"
    ],
    skills: ["SEO/SEM", "Social Media Marketing", "Google Analytics", "Content Marketing", "Email Marketing", "Copywriting"],
    outlook: "Faster than average (10% growth)",
    workEnvironment: "Marketing agencies, corporations, startups, freelance",
    typicalDay: [
      "Plan marketing campaigns",
      "Create content for social media",
      "Analyze campaign performance",
      "Optimize ad spending",
      "Report on metrics"
    ],
    actionSteps: [
      "Learn digital marketing fundamentals",
      "Get Google Analytics certified",
      "Start a blog or social media page",
      "Practice SEO techniques",
      "Learn paid advertising basics",
      "Build portfolio of campaigns"
    ],
    relatedCareers: ["social-media-manager", "content-creator", "seo-specialist"]
  }
];

export const categories = [
  "All",
  "Technology",
  "Design",
  "Engineering",
  "Business",
];

export const interests = [
  "problem-solving",
  "creativity",
  "technology",
  "design",
  "mathematics",
  "communication",
  "innovation",
  "analysis",
  "leadership",
  "hands-on",
  "visual-arts",
  "business",
  "healthcare",
  "environment"
];

export const educationLevels = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Bootcamp/Certification",
  "Self-Taught"
];
