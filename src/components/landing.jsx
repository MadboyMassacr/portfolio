import { useState, useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";


export default function Landing() {
  const [activeSection, setActiveSection] = useState('home');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    'Type `help` to learn available commands.'
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(true);


  // Command history
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Mock data
  const projects = [
    {
      title: "C-Shell",
      description: "Built a modular shell from scratch in C supporting I/O redirection, piping, signal handling, background/foreground job control, and command history.",
      tags: ["C", "Operating Systems"],
      image: "https://picsum.photos/400/300?random=1",
      link:"https://github.com/MadboyMassacr/C-Shell"
    },
    {
      title: "Network File System",
      description: "Designed a C-based distributed file system inspired by NFS using a client-server model; implemented concurrency, TCP socket communication, persistence, and a central Naming Server for coordinating between clients and multiple storage servers.",
      tags: ["C", "Operating System", "Networks", "TCP/IP"],
      image: " https://picsum.photos/400/300?random=2",
      link : "https://github.com/MadboyMassacr/Network-File-Systems"
    },
        {
      title: "Neural Modelling",
      description: "Merging neuroscience with machine learning, this was a project where we tried out various neural models and architectures to see their perforance in reinforcement learning tasks. We used PyTorch to implement various models and trained them on OpenAI Gym environments.",
      tags: ["ML", "Neuroscience", "Reinforcement Learning"],
      image: " https://picsum.photos/400/300?random=4",
      link: "https://github.com/MadboyMassacr/NeuralTraining"
    },
    {
      title: "Ray Tracing Renderer",
      description: "Built a ray tracing engine from scratch in C++ to render high-fidelity images based on physically accurate light simulation. Implemented multi-level Bounding Volume Hierarchies (BVH) to significantly accelerate ray-object intersection tests. Also used cosine-weighted sampling for global illumination to enhance image realism and reduce noise.",
      tags: ["C++", "Ray Tracing", "BVH", "Rendering"],
      image: " https://picsum.photos/400/300?random=3",
      link: "https://github.com/MadboyMassacr/Ray-Tracer"
    },
    {
      title: "Avenir",
      description: "A sigle page website made as a course project for Product Management course. This website incorporates various marketing startegies like customer segmentation, focusing on target audience, and peer feedback to optimize the product's market fit.",
      tags: ["Wix", "Marketing", "Product Management"],
      image: " https://picsum.photos/400/300?random=4",
      link: "https://maneeshmanoj2004.wixsite.com/avenir"
    },
    {
      title: "Vampire Diaries",
      description: "A sigle page website showcasing some of my favourite animations and effects.",
      tags: ["React", "Animation", "CSS"],
      image: " https://picsum.photos/400/300?random=4",
      link: "https://vampire-diaries-nu.vercel.app"
    },

  ];

  const experience = [
  {
    title: "Frontend Developer",
    company: "Nirvana Vacation Rentals",
    link: "https://nirvana-site-fork-n2oc.vercel.app/",
    date: "April 2025 – June 2025",
    points: [
      "Developed a vacation rental booking website for the Assistant Vice President of AIG using React",
      "Implemented features like property listings, booking management, and activty recommendations.",
      "Made the website responsive and maintainable by non-tech people.",
    ]
  },
  {
    title: "Frontend Developer",
    company: "Shucon Tech",
    date: "December 2024 – April 2025",
    points: [
      "Developed a responsive hospital management system using React",
      "Built for Swami Vivekanand Health Mission Society; made frontend for receptionist dashboard for patient and appointment management, and admin panel for user access control.",
    ]
  },
  {
    title: "Open Source Contributor",
    company: "Wikimedia Foundation",
    link: "https://phabricator.wikimedia.org/T375968",
    date: "October 2024",
    points: [
      "Built a Flask-based application that lets users upload CSV/TSV files and select metadata fields (e.g., description, creation date, author, license) to extract from MediaWiki using its public API.Automated metadata retrieval and output generation by processing file contents, fetching data via API calls, and delivering a structured TSV file for download.",
    ]
  },
  {
    title: "Frontend Developer",
    company: "Battlechest Games",
    link: "https://battlechest.gg",
    date: "July 2024 – Sept 2024",
    points: [
      "Debugging and resolving issues across the Battlechest.gg platform to ensure smooth user experience.",
      "Enhancing and implementing multiple new features to improve functionality and user engagement.",
      "Optimizing the website for mobile responsiveness using a Next.js, Django, and Vercel stack."
    ]
  },
  {
    title: "DevOps Intern",
    company: "Patenti Technology Solutions",
    date: "Jan 2024 – April 2024",
    points: [
      "Developed and deployed AWS Lambda automation to schedule EC2 instance uptime during working hours, improving cost-efficiency and resource management.",
      "Automated S3 bucket backups and implemented AWS WAF rules to enhance security against threats such as XSS, DDoS, and other common attacks.",
      "Investigated and benchmarked multiple strategies to mitigate Lambda cold starts, analyzing resource usage and startup latency to recommend optimal solutions."
    ]
  },
  {
    title: "MS Research Student",
    company: "Cognitive Science Lab, IIIT-H",
    date: "April 2024 – Present",
    points: [
      "Conducting research on healthy aging biomarkers in the Indian brain using MRI, fMRI, and DTI, with the goal of enabling early detection of neurodegenerative diseases like Parkinson’s and Alzheimer’s.",
      "Applying image processing, statistical analysis, and machine learning to extract, analyze, and validate potential diagnostic markers from brain imaging data."
    ]
  },
];


  const skills = [
  {
    field: 'Languages',
    skills: ['C', 'C++', 'JavaScript', 'Python'],
  },
  {
    field: 'Web Development',
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Node.js", "Django", "MongoDB", "MySQL", "Bootstrap", "Tailwind"],
  },
  {
    field: 'Machine Learning & Data Science',
    skills: ['TensorFlow', 'Keras', 'PyTorch', 'Pandas', 'NumPy', 'SciPy', 'scikit-learn', 'OpenCV'],
  },
  {
    field: 'DevOps & Tools',
    skills: ['Docker', 'AWS', 'Git', 'GitHub', 'Vercel', 'Heroku', 'Postman', 'Insomnia'],
  },
];



  // Refs
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Handle command execution
  const executeCommand = () => {
    const input = terminalInput.trim();
    if (!input) return;

    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    if (input.toLowerCase() === 'whoami') {
      setTerminalOutput([
        ...terminalOutput,
        '$ whoami',
        JSON.stringify(
          {
            name: "Maneesh Manoj",
            role: "CS Student & Frontend Developer",
            interests: ["WebDev", "DevOps", "ML", "Valorant"]
          },
          null,
          2
        )
      ]);
    } else if (input.toLowerCase() === 'stack') {
      setTerminalOutput(prev => [...prev, '$ stack']);
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev,
            `# ${skill.field}:`,
            skill.skills.join(', '),
            ''
          ]);
        }, 500 * (index + 1));
      });
    } else if (input.toLowerCase() === 'experience') {
      setTerminalOutput(prev => [...prev, '$ experience']);
      experience.forEach((exp, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev,
            `${index + 1}. ${exp.title} @ ${exp.company}`,
            `   - ${exp.date}`,
            `   - ${exp.points.join(' | ')}`,
            exp.link ? `   - Link: ${exp.link}` : '',
            ''
          ]);
        }, 500 * (index + 1));
      });
    } else if (input.toLowerCase() === 'projects') {
      setTerminalOutput(prev => [...prev, '$ projects']);
      projects.forEach((project, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev,
            `${index + 1}. ${project.title}`,
            `   - ${project.description}`,
            `   - Tags: ${project.tags.join(', ')}`,
            `   - Link: ${project.link}`,
            ''
          ]);
        }, 500 * (index + 1));
      });
    } else if (input.toLowerCase() === 'contact') {
      setTerminalOutput([
        ...terminalOutput,
        '$ contact',
        'Email: maneeshmanoj2004@gmail.com',
        'Location: Hyderabad, India',
        '',
        '# Social:',
        'GitHub → github.com/MadboyMassacr',
        'LinkedIn → linkedin.com/in/maneesh-manoj',
      ]);
    } else if (input.toLowerCase() === 'help') {
      setTerminalOutput([
        ...terminalOutput,
        '$ help',
        'Available Commands:',
        '- `whoami`: Display personal details.',
        '- `stack`: Show tech stack.',
        '- `experience`: List work experience.',
        '- `projects`: List recent projects.',
        '- `contact`: Get contact information.',
        '- `clear`: Clear the terminal.',
        '- `help`: Display this message.'
      ]);
    } else if (input.toLowerCase() === 'clear') {
      setTerminalOutput([]);
    } else {
      setTerminalOutput([...terminalOutput, `$ ${input}`, 'Command not found. Type "help" for available commands.']);
    }

    setTerminalInput('');
    setIsTyping(false);
  };

  // Cursor blink animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal output
  useEffect(() => {
  const terminal = terminalRef.current;
  if (!terminal) return;

  terminal.scrollTo({
    top: terminal.scrollHeight,
    behavior: 'smooth'
  });
}, [terminalOutput.length]); // 👈 Trigger on length change


  // Terminal box with bigger size and history navigation
  return (
    <div className="bg-black text-green-400 min-h-screen font-mono">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black border-b border-green-800">
        <div className="px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">$ maneeshmanoj.dev</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-10">
                {['home', 'about', 'stack', 'experience', 'projects', 'contact'].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={`text-lg capitalize ${
                      activeSection === section ? 'text-green-300 underline' : 'hover:text-green-300'
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                  </a>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-green-400 hover:text-white focus:outline-none"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900">
            <div className="px-4 pt-4 pb-4 space-y-2">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`block px-4 py-3 rounded-md text-lg font-medium capitalize ${
                    activeSection === section ? 'text-green-300 bg-gray-800' : 'text-green-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-10">
            <h1 className="text-5xl md:text-6xl font-bold"><Typewriter
        words={["Hi, I'm Maneesh"]}
        cursor
        typeSpeed={60}
        deleteSpeed={0}
        delaySpeed={1000}
      /></h1>
            {/* <p className="text-2xl text-green-300">
              <Typewriter
        words={["$ Computer Science Student @ IIIT Hyderabad | Frontend Developer"]}
        typeSpeed={25}
        deleteSpeed={0}
        delaySpeed={1000}
      /></p> */}
      <p
  className="text-2xl text-green-300"
>
  $ Computer Science Student @ IIIT Hyderabad | Frontend Developer
</p>

            <p
              className="text-xl leading-relaxed"

            >
              I'm a frontend engineer who loves bringing UI/UX to life with clean, scalable code. While frontend is my craft, I'm also curious about infrastructure automation (DevOps) and the possibilities of machine learning.
            </p>

            <div className="flex gap-6 mt-6">
              <a href="https://drive.google.com/file/d/1BqdqXetKzlRLUrNBdJ--SxaPDoHpnawD/view?usp=sharing" target="_blank" className="px-6 py-3 bg-green-900 hover:bg-green-800 rounded text-green-100 text-lg transition">
                My Resume
              </a>
              <a href="#contact" className="px-6 py-3 border border-green-600 hover:border-green-400 rounded text-green-300 hover:text-green-100 text-lg transition">
                Contact Me
              </a>
            </div>
          </div>

          {/* Terminal Box in Introduction */}
          <div className="md:w-1/2 w-full">
            <div className="relative inline-block w-full">
              <pre
                ref={terminalRef}
                className="bg-gray-900 p-10 rounded shadow-lg text-base mb-4 min-h-[350px] h-[550px] overflow-y-auto"
              >
                {terminalOutput.map((line, index) => (
                  <span
                    key={index}
                    className={
                      index === 0 && terminalOutput.length === 1
                        ? `${cursorBlink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`
                        : undefined
                    }
                  >
                    {line}
                    <br />
                  </span>
                ))}
                <span>$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onChange={(e) => {
                    setTerminalInput(e.target.value);
                    setIsTyping(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      executeCommand();
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      if (history.length > 0) {
                        const newIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
                        setHistoryIndex(newIndex);
                        setTerminalInput(history[newIndex]);
                      }
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      if (history.length > 0) {
                        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : history.length - 1;
                        setHistoryIndex(newIndex);
                        setTerminalInput(history[newIndex] || '');
                      } else {
                        setTerminalInput('');
                      }
                    }
                  }}
                  autoFocus
                  className="bg-transparent border-none outline-none text-green-400 text-base w-auto inline-block"
                  style={{
                    fontFamily: 'inherit',
                    color: 'inherit',
                    padding: 0,
                    margin: 0,
                  }}
                />
                {!inputFocused && (
  <span className={`inline-block ml-1 text-base ${cursorBlink ? 'block' : 'hidden'}`}>|</span>
)}

              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section id="about" className="py-20 px-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b border-green-700 pb-3">About Me</h2>
        <div className="grid md:grid-cols-2 gap-16 mt-8">
          <div>
            <pre className="bg-gray-900 p-8 rounded shadow text-green-300 text-lg overflow-x-auto">
              {`# Education:
              Pursuing BTech and MS in Computer Science @ IIIT Hyderabad

              # Skills:
              Full Stack Dev | DevOps on AWS | ML | Product Management

              # Languages:
              Python | JavaScript | C | C++ | Bash | SQL`}
            </pre>
          </div>
          <div className="space-y-6 text-xl">
            <p>
              I'm a fourth-year CS dual degree student passionate about building robust frontend applications,
              automations on AWS, and experimenting with machine learning models.
            </p>
            <p>I have worked with multiple companies and clients to deliver websites and automations.</p>
            <p>
              Currently working on a research in the field of Cognitive Neuroscience. I am trying to use computer vision and ML on fMRI data to find healthy aging markers in Indian population. This can help detect neurodegenerative diseases like Alzheimer's at an early stage.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section id="stack" className="py-20 px-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b border-green-700 pb-3">Tech Stack</h2>

        {/* Wrapper for indentation */}
        <div className="pl-4 space-y-10">

          {/* Web Development */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Web Development</h3>
            <ul className="list-disc list-inside text-gray-400 text-xl space-y-1 ml-4">
              <li>HTML5, CSS3, JavaScript, React, Next.js, Node.js, Django, MongoDB, MySQL, Bootstrap, Tailwind</li>
            </ul>
          </div>

          {/* Machine Learning */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Machine Learning & Data Science</h3>
            <ul className="list-disc list-inside text-gray-400 text-xl space-y-1 ml-4">
              <li>TensorFlow, Keras, PyTorch, Pandas, NumPy, SciPy, scikit-learn, OpenCV</li>
            </ul>
          </div>

          {/* DevOps & Tools */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">DevOps & Tools</h3>
            <ul className="list-disc list-inside text-gray-400 text-xl space-y-1 ml-4">
              <li>Docker, AWS, Git, GitHub, Vercel, Heroku, Postman, Insomnia</li>
            </ul>
          </div>
          
        </div>
      </motion.section>




      {/* Experience Section */}
      <motion.section id="experience" className="py-20 px-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b border-green-700 pb-3">Experience</h2>

        {/* Wrapper for indentation */}
        <div className="pl-4 space-y-10">
          {experience.map((exp, index) => (
            <div key={index} className="group relative pl-4 border-l-2 border-gray-700">
              <div className="absolute left-0 top-1.5 w-3 h-3 bg-green-400 rounded-full group-hover:scale-110 transition-transform" />
              <div className="ml-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="text-2xl font-semibold text-white">
                    {exp.title} <span className="text-gray-400">@ {exp.company}</span>
                  </h3>
                  <span className="text-xl text-gray-500">{exp.date}</span>
                </div>
                <ul className="list-disc list-inside text-gray-400 text-xl mt-2 space-y-1">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                {exp.link && (
                  <div className="mt-3">
                    <span className="text-gray-400 text-xl mr-2">Link:</span>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline text-xl"
                    >
                      {exp.link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>




      {/* Projects Section */}
      <motion.section id="projects" className="py-20 px-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b border-green-700 pb-3">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {projects.map((project, index) => (
            <motion.div key={index} className="bg-gray-900 rounded shadow hover:shadow-green-900/30 transition p-6" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
              <p className="mb-4 text-lg">{project.description}</p>
              <div className="flex flex-wrap gap-3 mb-5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-sm px-3 py-1 bg-green-900 text-green-100 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 text-lg"
        >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>



      {/* Contact Section */}
      <motion.section id="contact" className="py-20 px-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b border-green-700 pb-3">Contact</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-12 items-center">
          {/* Wider Contact Block */}
          <div className="md:col-span-2">
            <pre className="bg-gray-900 p-8 rounded text-green-300 text-lg overflow-x-auto">
      {`$ contact me:
      Email: maneeshmanoj2004@gmail.com
      Location: Hyderabad, India

      # Social:
      GitHub   → https://github.com/MadboyMassacr
      LinkedIn → https://www.linkedin.com/in/maneesh-manoj`}
            </pre>
          </div>

          {/* Centered Image */}
          <div className="flex justify-center">
            <img
              src="/maneesh.jpg"
              alt="Maneesh Manoj"
              className="rounded-lg max-h-90 object-cover shadow-lg"
            />
          </div>
        </div>
      </motion.section>


      {/* Footer */}
      <footer className="border-t border-green-800 mt-20 py-8 text-center text-lg text-green-700">
        <p>© {new Date().getFullYear()} Maneesh Manoj — Built with React, TailwindCSS, and passion.</p>
      </footer>
    </div>
  );
}