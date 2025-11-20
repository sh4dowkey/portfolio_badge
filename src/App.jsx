import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Terminal as TerminalIcon } from "lucide-react";

extend({ MeshLineGeometry, MeshLineMaterial });

const profileData = {
  name: "Anant Kumar Pandey",
  title: "Cybersecurity Enthusiast",
  email: "anant.pandey017@gmail.com",
  location: "ODISHA ,IN",
  phone: "+91-9337056057",
  linkedin: "https://www.linkedin.com/in/anant-ku-pandey",
  github: "https://github.com/sh4dowkey",
  summary: "Proactive cybersecurity enthusiast with practical experience in vulnerability assessment, red-team techniques, and security automation.",
  skills: {
    cybersecurity: ["Red-team", "Pentesting", "Vuln Assessment", "Credential Harvesting", "Lateral Movement", "Kerberoasting", "OSINT", "Web Application Security", "Network Security", "Malware Analysis"],
    tools: ["Burp Suite", "Nmap", "Wireshark", "Metasploit", "Nessus", "BloodHound", "Shodan", "theHarvester", "Gobuster", "Hydra", "John the Ripper", "SQLMap"],
    programming: ["Python", "Go", "Bash", "Java", "C", "JavaScript", "PowerShell", "Assembly"],
    frameworks: ["OWASP Top 10", "MITRE ATT&CK", "NIST", "Linux", "Windows", "Active Directory"],
    specialties: ["Cloud Security", "Container Security", "API Security", "IoT Security"]
  },
  projects: [
    { name: "CrawlX", desc: "High-performance concurrent web crawler built in Go", tech: ["Go", "Concurrency"], url: "https://github.com/sh4dowkey/CrawlX" },
    { name: "AD Attack-Defense Lab", desc: "Complete Active Directory penetration testing environment", tech: ["AD", "BloodHound", "PowerShell"], url: "https://github.com/sh4dowkey/AD-Lab" },
    { name: "Python Web Crawler", desc: "OSINT reconnaissance and data gathering tool", tech: ["Python", "BeautifulSoup"], url: "https://github.com/sh4dowkey/CLI-Web-Crawler" },
  ],
  certs: ["Google Cybersecurity Professional", "EC-Council C|CT (In Progress)", "OWASP API Security Top 10"],
  exp: [
    { role: "Cybersecurity Certification", company: "Teachnook", period: "FEB-MAR 2025", items: ["Network scanning & enumeration", "Custom CLI web crawler development", "OWASP Top 10 vulnerability exploitation"] },
    { role: "Cybersecurity Intern", company: "AICTE-IBM SkillsBuild", period: "JAN-FEB 2025", items: ["Lateral movement detection in AD environments", "Security incident analysis", "Threat hunting & investigation"] }
  ],
};

const commands = {
  help: () => `╔════════════════════════════════════════╗
║         AVAILABLE COMMANDS             ║
╚════════════════════════════════════════╝

📋 INFORMATION
  help         Show this help message
  about        Bio & professional summary
  whoami       Current user information
  stats        View your session stats
  
🛠️ SKILLS & EXPERTISE  
  skills       All technical skills
  tools        Security tools arsenal
  languages    Programming languages
  frameworks   Frameworks & methodologies
  
💼 PROFESSIONAL
  experience   Work history
  projects     Featured projects
  certs        Certifications
  
📞 CONTACT & LINKS
  contact      Contact information
  github       Open GitHub profile
  linkedin     Open LinkedIn profile
  email        Send email
  download     Download resume
  
🎨 TERMINAL COMMANDS
  neofetch     System information
  cowsay       Wise cow with wisdom
  banner       ASCII art banner
  clear        Clear terminal
  history      Show command history
  date         Display current date/time
  
🎮 FUN COMMANDS
  joke         Cybersecurity joke
  quote        Security quote
  hack         Matrix animation
  matrix       Full matrix effect
  fortune      Random fortune cookie
  lolcat       Rainbow text
  ascii        Random ASCII art
  weather      Show weather
  coffee       Get virtual coffee
  
🎯 MINI GAMES
  rps          Rock Paper Scissors (rps rock/paper/scissors)
  quiz         Security quiz (quiz 1/2/3 to answer)
  
🎵 EFFECTS
  glitch       Glitch effect
  party        Party mode toggle
  
🔍 SECRET
  secret       Find hidden commands
  
❌ EXIT
  exit         Try to exit (good luck!)

💡 TIP: Use arrow keys for history | Tab for autocomplete`,

  about: () => `╔════════════════════════════════════════╗
║           ABOUT ME                     ║
╚════════════════════════════════════════╝

👤 ${profileData.name}
🎯 ${profileData.title}
📍 ${profileData.location}

${profileData.summary}

I specialize in offensive security, with hands-on experience in
penetration testing, vulnerability assessment, and security automation.

🔍 Current Focus:
  • Advanced persistent threats (APT) simulation
  • Cloud security assessment
  • Red team operations
  • Security tool development`,

  whoami: () => `anantsec

You are: ${profileData.name}
Role: ${profileData.title}
Location: ${profileData.location}
Access Level: Root (Cybersecurity Professional)

"In the digital realm, I am the shield and the sword."`,

  skills: () => `╔════════════════════════════════════════╗
║       TECHNICAL SKILLS                 ║
╚════════════════════════════════════════╝

🛡️ CYBERSECURITY EXPERTISE
${profileData.skills.cybersecurity.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}

🔧 SECURITY TOOLS
${profileData.skills.tools.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}

💻 PROGRAMMING LANGUAGES
${profileData.skills.programming.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}

📚 FRAMEWORKS & STANDARDS
${profileData.skills.frameworks.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}`,

  tools: () => `╔════════════════════════════════════════╗
║       SECURITY TOOLS ARSENAL           ║
╚════════════════════════════════════════╝

🔍 RECONNAISSANCE
   • Nmap - Network scanning
   • Shodan - Internet-wide scanning
   • theHarvester - OSINT gathering
   • Gobuster - Directory enumeration

🎯 EXPLOITATION
   • Metasploit - Exploitation framework
   • Burp Suite - Web app testing
   • SQLMap - SQL injection
   • Hydra - Password cracking

🕵️ POST-EXPLOITATION
   • BloodHound - AD analysis
   • Mimikatz - Credential extraction
   
🔐 DEFENSE & ANALYSIS
   • Wireshark - Network analysis
   • Nessus - Vulnerability scanning`,

  languages: () => `╔════════════════════════════════════════╗
║       PROGRAMMING LANGUAGES            ║
╚════════════════════════════════════════╝

🐍 Python         ████████████ Expert
   Security automation, tool development
   
🔵 Go             ██████████   Advanced
   High-performance tools
   
💻 Bash           ███████████  Expert
   System automation
   
☕ Java           ████████     Intermediate
   Application security
   
⚡ C              ████████     Intermediate
   System programming
   
🌐 JavaScript     ████████     Intermediate
   Web app testing`,

  frameworks: () => `╔════════════════════════════════════════╗
║    FRAMEWORKS & METHODOLOGIES          ║
╚════════════════════════════════════════╝

📋 SECURITY STANDARDS
   • OWASP Top 10 - Web application security
   • MITRE ATT&CK - Threat modeling
   • NIST Cybersecurity Framework
   
🖥️ OPERATING SYSTEMS
   • Kali Linux (Primary)
   • Parrot Security OS
   • Windows Server
   • Ubuntu/Debian`,

  projects: () => `╔════════════════════════════════════════╗
║       FEATURED PROJECTS                ║
╚════════════════════════════════════════╝

${profileData.projects.map((p, i) => `📁 [${i + 1}] ${p.name}
    ${p.desc}
    💻 Tech: ${p.tech.join(", ")}
    🔗 ${p.url}
`).join('\n')}`,

  experience: () => `╔════════════════════════════════════════╗
║       WORK EXPERIENCE                  ║
╚════════════════════════════════════════╝

${profileData.exp.map((e) => `🏢 ${e.role}
   ${e.company} | ${e.period}
   
   Responsibilities:
${e.items.map((item) => `   • ${item}`).join('\n')}
`).join('\n')}`,

  certs: () => `╔════════════════════════════════════════╗
║       CERTIFICATIONS                   ║
╚════════════════════════════════════════╝

${profileData.certs.map((c, i) => `📜 [${i + 1}] ${c}`).join('\n\n')}`,

  contact: () => `╔════════════════════════════════════════╗
║       CONTACT INFORMATION              ║
╚════════════════════════════════════════╝

📧 Email:    ${profileData.email}
📱 Phone:    ${profileData.phone}
🔗 LinkedIn: ${profileData.linkedin}
💻 GitHub:   ${profileData.github}
📍 Location: ${profileData.location}

💡 Tip: Use 'email' to compose a message
    Use 'github' or 'linkedin' to visit profiles`,

  github: () => {
    window.open(profileData.github, "_blank");
    return "🚀 Opening GitHub profile...";
  },

  linkedin: () => {
    window.open(profileData.linkedin, "_blank");
    return "🚀 Opening LinkedIn profile...";
  },

  email: () => {
    window.location.href = `mailto:${profileData.email}`;
    return `📧 Opening email client...`;
  },

  neofetch: () => `            ..,
          ..,,;;:::..                              anantsec@kali
        .,;;::::;;;;::,.                           ──────────────────
      ..,::;;;;;;;;;;;;:,..                        OS: Kali Linux 2025.1
    ..,::;;;;;;;;;;;;;;;;;;:,.                     Host: Portfolio Terminal
  ..,:::;;;;;;;;;;;;;;;;;;;;::,..                  Kernel: 6.6.9-custom-sec
.,::;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,.                Uptime: ∞ (Always Learning)
:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:                Packages: 2847 (dpkg)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;.               Shell: zsh 5.9
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;.               Resolution: responsive@60Hz
:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:                DE: React + Three.js
.,::;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,.                Theme: Kali Dark
  ..,:::;;;;;;;;;;;;;;;;;;;;::,..                  Terminal: anantsec-term
    ..,::;;;;;;;;;;;;;;;;;;:,.                     CPU: Neural Processing
      ..,::;;;;;;;;;;;;::,..                       GPU: WebGL 2.0
        .,;;::::;;;;::,.                           Memory: Optimized
          ..,,;;:::..                              
            ..,                                    

┌────────────────────────────────────────────────┐
│ 🔐 SECURITY STATUS                             │
│ ────────────────────────────────────────────── │
│ User: anantsec (root)                          │
│ Location: ${profileData.location}                            │
│ Status: 🟢 Active | Available                  │
│ Mode: Offensive Security                       │
└────────────────────────────────────────────────┘

💡 Try 'cowsay' for wisdom!`,

  cowsay: () => {
    const messages = [
      "Hack the planet!",
      "Security is a process, not a product.",
      "Stay curious. Stay ethical.",
      "There's no patch for human stupidity.",
      "Coffee + Code + Security = Life",
      "sudo make me a sandwich"
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const len = msg.length;
    const top = " " + "_".repeat(len + 2);
    
    return `${top}
< ${msg} >
 ${"-".repeat(len + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||

           ~ anantsec ~`;
  },

  banner: () => `
   █████╗ ███╗   ██╗ █████╗ ███╗   ██╗████████╗███████╗███████╗ ██████╗
  ██╔══██╗████╗  ██║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝██╔════╝██╔════╝
  ███████║██╔██╗ ██║███████║██╔██╗ ██║   ██║   ███████╗█████╗  ██║     
  ██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║   ██║   ╚════██║██╔══╝  ██║     
  ██║  ██║██║ ╚████║██║  ██║██║ ╚████║   ██║   ███████║███████╗╚██████╗
  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝ ╚═════╝
  
            [ Cybersecurity Portfolio Terminal ]
            "Security through knowledge"
               
  Type 'help' for available commands`,

  clear: () => "CLEAR",

  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
      "A SQL query walks into a bar...\n'Can I JOIN you?' 😄",
      "How many programmers does it take to change a light bulb?\nNone. It's a hardware problem. 💡",
      "Why did the hacker break up?\nToo many trust issues. 🔐",
      "What's a hacker's favorite season?\nPhishing season! 🎣",
      "Why don't hackers ever get lost?\nThey always find a backdoor! 🚪"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  },

  quote: () => {
    const quotes = [
      '"The only truly secure system is powered off." - Gene Spafford',
      '"Security is not a product, but a process." - Bruce Schneier',
      '"Hackers are breaking systems for profit." - Anonymous',
      '"In God we trust. All others we monitor." - NSA',
      '"Privacy is not something you can just have; it\'s something you must protect." - Anonymous',
      '"The best way to predict the future is to invent it." - Alan Kay'
    ];
    return `💭 ${quotes[Math.floor(Math.random() * quotes.length)]}`;
  },

  hack: () => `Initializing hack sequence...
    
[████████████████████] 100%

ACCESS GRANTED
MAINFRAME BREACHED

Just kidding! This is a portfolio 😄
Type 'help' for real commands.`,

  matrix: () => `MATRIX_ACTIVATED
    
01001000 01100101 01101100 01101100 01101111
ハッカー サイバーセキュリティ
01010111 01101111 01110010 01101100 01100100

Wake up, Neo... The Matrix has you...
Follow the white rabbit. 🐰

Type 'clear' to exit the matrix.`,

  stats: () => {
    const uptime = Math.floor((Date.now() - window.sessionStart) / 1000);
    const mins = Math.floor(uptime / 60);
    const secs = uptime % 60;
    return `╔════════════════════════════════════════╗
║         SESSION STATISTICS             ║
╚════════════════════════════════════════╝

⏱️  Session Time: ${mins}m ${secs}s
📊 Commands Run: ${window.commandCount || 0}
🎯 Achievements: ${window.achievements?.length || 0}/10
💯 Skill Level: ${window.commandCount > 50 ? "Elite Hacker" : window.commandCount > 20 ? "Advanced User" : window.commandCount > 5 ? "Intermediate" : "Newbie"}

Keep exploring! Type 'secret' for hidden features.`;
  },

  history: () => {
    const h = window.commandHistory || [];
    if (h.length === 0) return "No command history yet. Start typing!";
    return `╔════════════════════════════════════════╗
║         COMMAND HISTORY                ║
╚════════════════════════════════════════╝

${h.slice(-10).map((c, i) => `${h.length - 10 + i + 1}. ${c}`).join('\n')}

Total commands: ${h.length}`;
  },

  date: () => {
    const now = new Date();
    return `╔════════════════════════════════════════╗
║         SYSTEM TIME                    ║
╚════════════════════════════════════════╝

📅 Date: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Time: ${now.toLocaleTimeString('en-US')}
🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}

"Time is the most valuable thing a man can spend." - Theophrastus`;
  },

  fortune: () => {
    const fortunes = [
      "🔮 You will discover a critical vulnerability today... in your coffee brewing technique.",
      "🔮 A great opportunity awaits... after you patch those 47 security updates.",
      "🔮 Your next penetration test will be successful... but you'll forget to screenshot the proof.",
      "🔮 You will become rich and famous... in your GitHub contribution graph.",
      "🔮 Love is in the air... but so are malware packets. Stay vigilant!",
      "🔮 Today you will learn something new... probably from Stack Overflow.",
      "🔮 Your code will compile on the first try... said no developer ever.",
      "🔮 A bug you thought was fixed will return... with friends.",
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  },

  lolcat: () => `🌈 RAINBOW MODE ${window.rainbowMode ? 'DISABLED' : 'ACTIVATED'} 🌈
    
${window.rainbowMode ? "Colors restored to normal hacker green." : "Your terminal is now 20% more fabulous!"}`,

  ascii: () => {
    const arts = [
      `    /\\_/\\  
   ( o.o ) 
    > ^ <
   /|   |\\
  (_|   |_)
  
  Script Kitty`,
      `    .---.
   /     \\
   \\.@-@./
   /\`\\_/\`\\
  //  _  \\\\
 | \\     )|_
/\`\\_\`>  <_/ \\
\\__/'---'\\__/

Cyber Cat`,
      `  ___
 {o,o}
 |)__)
 -"-"-
 
 Wise Owl`,
      `   ^  ^
  (◕‿◕)
   ︶︶
   
Happy Face`,
    ];
    return arts[Math.floor(Math.random() * arts.length)];
  },

  weather: () => `☀️ WEATHER REPORT ☀️
    
Location: ${profileData.location}
Temperature: 72°F / 22°C
Condition: Perfect for coding
Humidity: 60%
Wind: 5 mph

⚠️  Alert: High probability of coding sessions
💻 Recommended: Indoor hacking activities

(Note: This is a simulated weather report 😄)`,

  coffee: () => {
    const coffees = [
      `      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|  
( C|/\\/\\/\\/\\/|
 '-./\\/\\/\\/\\/|
   '_________'
    '-------'

☕ Here's your virtual coffee!
Caffeine level: MAXIMUM
Type: Espresso
Status: ☑ Debugging fuel acquired`,
      `    (  )   (   )  )
     ) (   )  (  (
     ( )  (    ) )
     _____________
    <_____________> ___
    |             |/ _ \\
    |               | | |
    |               |_| |
 ___|             |\\___/
/    \\___________/    \\
\\_____________________/

☕ Coffee break activated!
Achievement unlocked: Caffeinated Coder`,
    ];
    return coffees[Math.floor(Math.random() * coffees.length)];
  },

  rps: () => `🎮 ROCK PAPER SCISSORS 🎮

Type: rps rock, rps paper, or rps scissors
Let's see if you can beat the AI!

⭐ Fun fact: Even AI needs luck sometimes!`,

  quiz: () => {
    const questions = [
      {
        q: "What does XSS stand for?",
        opts: ["1) Cross-Site Scripting", "2) X-Ray Security System", "3) eXtreme Security Standard"],
        answer: 1
      },
      {
        q: "Which port is used for HTTPS?",
        opts: ["1) 80", "2) 443", "3) 8080"],
        answer: 2
      },
      {
        q: "What is a zero-day vulnerability?",
        opts: ["1) A bug found on day 0", "2) Unknown vulnerability to vendor", "3) A vulnerability that takes 0 days to exploit"],
        answer: 2
      }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];
    window.currentQuiz = q;
    return `🎯 SECURITY QUIZ 🎯

${q.q}

${q.opts.join('\n')}

Type: quiz 1, quiz 2, or quiz 3 to answer!`;
  },

  glitch: () => `G̴̢̛̲͉̈́L̵̰̈́̕I̷͓͌T̴̰̃C̴̣̈́H̷̰̎ ̶̧̛M̶̱̆O̸̧̍D̸͙͝E̴̬̿ ̶̣̈A̸̰͝C̶̝͐T̸͓̋I̷͙͘V̶̰̌A̷̧͝T̸̰̔Ė̶͜D̶̯̾

S̶y̷s̶t̸e̵m̴ ̶c̸o̴r̴r̷u̸p̷t̶i̶o̸n̷.̸.̴.̸
R̴̢̀ê̴͜ḇ̴̾o̵̰̍o̸̧͝t̷̰̕i̷̺͌ṇ̴̾g̶̣̓.̵͙̏.̴̰̈́.̴̧̎

[OK] System recovered
[OK] All data intact
[INFO] Just kidding, everything is fine! 😄`,

  secret: () => `🔐 HIDDEN COMMANDS DISCOVERED! 🔐

Congratulations, curious hacker! You found the secret menu:

🎨 sudo       Try it... if you dare
🎯 level      Check your hacker level
🐉 dragon     Summon ASCII dragon

Type any of these to unlock new experiences!`,

  sudo: () => `[sudo] password for anantsec: 

⚠️  PERMISSION DENIED ⚠️

Nice try! But even root can't give you more powers here 😄

"With great power comes great responsibility" - Uncle Ben

💡 You already have all the access you need!`,

  download: () => {
    return `📥 DOWNLOADING RESUME...

[████████████████████] 100%

✅ Resume downloaded successfully!

💼 File: Anant_Kumar_Pandey_Resume.pdf
📊 Size: 2.4 MB
🔐 Secure: ✓

(Simulated download - In production, this would download the actual file)`;
  },

  level: () => {
    const count = window.commandCount || 0;
    let level, title, next;
    if (count < 5) { level = 1; title = "Script Kiddie"; next = 5; }
    else if (count < 10) { level = 2; title = "Junior Pentester"; next = 10; }
    else if (count < 20) { level = 3; title = "Security Analyst"; next = 20; }
    else if (count < 50) { level = 4; title = "Senior Researcher"; next = 50; }
    else if (count < 100) { level = 5; title = "Elite Hacker"; next = 100; }
    else { level = 6; title = "Cyber Legend"; next = "MAX"; }
    
    const progress = next === "MAX" ? 100 : Math.floor((count / next) * 100);
    const bars = "█".repeat(Math.floor(progress / 5)) + "░".repeat(20 - Math.floor(progress / 5));
    
    return `╔════════════════════════════════════════╗
║         HACKER LEVEL SYSTEM            ║
╚════════════════════════════════════════╝

👤 Current Level: ${level}
🏆 Title: ${title}
📊 Commands: ${count}${next !== "MAX" ? `/${next}` : " (MAX)"}

Progress: [${bars}] ${progress}%

${next !== "MAX" ? `🎯 Next Level: ${next - count} commands to go!` : "🎉 MAX LEVEL ACHIEVED! You're a legend!"}`;
  },

  dragon: () => `
                           ______________
                      ,===:'.,            \`-._
                           \`:.  \`---.__         \`-._
                             \`:.     \`-.-\`\`         \`.
                                \\.        \`  ,       \\
                                 \\       ,\` \\  '~-._/
                                  \\        /            \\
                                   \\      (              \\
                                    \\     (               \\
                                     \\    (                \\
                                      \\   (                 \\
                                       \\  (                  \\
                                        \\ (                   \\
                                         \\(                    \\
                                          \\                     \\
                                           \\                     \\
                                            \\                     \\

🐉 The Cyber Dragon has been summoned!
Ancient wisdom: "The best defense is a good offense... and regular backups."`,

  party: () => {
    window.partyMode = !window.partyMode;
    return `🎉🎊🎈 PARTY MODE ${window.partyMode ? 'ACTIVATED' : 'DEACTIVATED'} 🎈🎊🎉

${window.partyMode ? `
♪┏(・o･)┛♪┗ ( ･o･) ┓♪

🎵 Let's celebrate cybersecurity! 🎵
🎪 Everything is more fun now!
🌟 Type commands and see the magic!
` : "Party's over... back to serious hacking! 💼"}`;
  },
};

function Badge() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment background blur={0.75}>
        <color attach="background" args={["#050508"]} />
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };
  const { nodes, materials } = useGLTF("https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb");
  const frontTex = useTexture("/assets/front.png");
  const backTex = useTexture("/assets/back.png");
  const bandTexture = useTexture("/assets/band.png");
  const { width, height } = useThree((s) => s.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clamp = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clamp * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))} onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial map={frontTex} transparent clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial map={backTex} transparent clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <group scale={2.25} position={[0, -1.2, -0.05]}>
              <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            </group>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={bandTexture} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}

function TypewriterText({ text, speed = 15, onComplete }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <>{displayText}</>;
}

function KaliTerm() {
  const [hist, setHist] = useState([
    { type: "sys", txt: "╭──(anantsec㉿kali)-[~] $ Welcome to anantsec terminal", animated: false },
    { type: "sys", txt: 'Type "help" or "neofetch" for info', animated: false },
  ]);
  const [inp, setInp] = useState("");
  const [exitCount, setExitCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.sessionStart) window.sessionStart = Date.now();
    if (!window.commandCount) window.commandCount = 0;
    if (!window.commandHistory) window.commandHistory = [];
    if (!window.achievements) window.achievements = [];
  }, []);

  useEffect(() => {
    window.rainbowMode = rainbowMode;
    window.partyMode = partyMode;
  }, [rainbowMode, partyMode]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [hist]);

  useEffect(() => {
    if (inp) {
      const allCommands = Object.keys(commands);
      const matches = allCommands.filter(cmd => cmd.startsWith(inp.toLowerCase()));
      setSuggestions(matches);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [inp]);

  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#6dd4ff', '#51cf66', '#ffd43b', '#ff8787', '#74c0fc', '#b197fc'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    
    window.commandCount = (window.commandCount || 0) + 1;
    window.commandHistory = window.commandHistory || [];
    window.commandHistory.push(cmd);
    
    const parts = cmd.split(' ');
    const key = parts[0].toLowerCase();
    const arg = parts[1];
    
    const newH = [...hist, { 
      type: "inp", 
      txt: `╭──(anantsec㉿kali)-[~] $ ${cmd}`, 
      animated: false,
      color: partyMode ? getRandomColor() : "#6dd4ff"
    }];

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setSuggestions([]);

    // RPS handling
    if (key === "rps" && arg) {
      const choices = ["rock", "paper", "scissors"];
      if (!choices.includes(arg)) {
        newH.push({ type: "err", txt: "Invalid choice! Use: rock, paper, or scissors", animated: true });
      } else {
        const ai = choices[Math.floor(Math.random() * 3)];
        let result;
        if (arg === ai) result = "It's a tie! 🤝";
        else if (
          (arg === "rock" && ai === "scissors") ||
          (arg === "paper" && ai === "rock") ||
          (arg === "scissors" && ai === "paper")
        ) result = "🎉 You win! Great choice!";
        else result = "🤖 AI wins! Better luck next time!";
        
        newH.push({ type: "out", txt: `You chose: ${arg}\nAI chose: ${ai}\n\n${result}`, animated: true });
      }
      setHist(newH);
      setInp("");
      return;
    }

    // Quiz answer handler
    if (key === "quiz" && arg) {
      const q = window.currentQuiz;
      if (!q) {
        newH.push({ type: "err", txt: "No active quiz! Type 'quiz' first.", animated: true });
      } else {
        const ans = parseInt(arg);
        if (ans === q.answer) {
          newH.push({ type: "out", txt: "✅ CORRECT! You're a security genius! 🎉\n\nType 'quiz' for another question!", animated: true });
          window.commandCount += 5; // Bonus!
        } else {
          newH.push({ type: "out", txt: `❌ Wrong! The correct answer was option ${q.answer}.\n\nType 'quiz' to try another!`, animated: true });
        }
      }
      setHist(newH);
      setInp("");
      return;
    }

    // Exit flow (double-confirm)
    if (key === "exit") {
      if (exitCount === 0) {
        newH.push({
          type: "out",
          txt: `⚠️  Nice try! You can't escape that easily 😄\n\n💡 Use "clear" to clear terminal\n💡 Type "exit" again to leave`,
          animated: true
        });
        setExitCount(1);
        setHist(newH);
        setInp("");
        return;
      } else {
        newH.push({ type: "out", txt: "👋 Goodbye! Redirecting...", animated: true });
        setHist(newH);
        setTimeout(() => {
          window.location.href = "https://anantsec.netlify.app";
        }, 1400);
        return;
      }
    }

    if (exitCount > 0) setExitCount(0);

    if (key === "lolcat") setRainbowMode(!rainbowMode);
    if (key === "party") setPartyMode(!partyMode);

    if (commands[key]) {
      const out = commands[key]();
      if (out === "CLEAR") {
        setHist([{ type: "sys", txt: "╭──(anantsec㉿kali)-[~] $ Terminal cleared", animated: false }]);
        setInp("");
        return;
      }
      newH.push({ type: "out", txt: out, animated: true, color: rainbowMode ? getRandomColor() : undefined });
      setIsTyping(true);
    } else {
      newH.push({ type: "err", txt: `bash: ${cmd}: command not found\n\n💡 Type 'help' for available commands`, animated: true });
      setIsTyping(true);
    }
    
    setHist(newH);
    setInp("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isTyping) {
        if (suggestions.length > 0 && selectedSuggestion >= 0) {
          setInp(suggestions[selectedSuggestion]);
          setSuggestions([]);
        } else {
          run(inp);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInp(suggestions[selectedSuggestion]);
        setSuggestions([]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
      } else if (cmdHistory.length > 0) {
        const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInp(cmdHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
      } else if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInp("");
        } else {
          setHistoryIndex(newIndex);
          setInp(cmdHistory[newIndex]);
        }
      }
    }
  };

  const quickCommands = ["help", "neofetch", "about", "skills", "projects", "contact", "stats", "secret"];

  return (
    <div style={{ 
      /* keep whole KaliTerm container same as earlier if you had one,
         here we don't change the outer header / borders — only the input style */
      borderRadius: "12px",
      overflow: "hidden",
      border: partyMode ? "2px solid #ff6b6b" : "1px solid #1a1a1a",
      boxShadow: partyMode
        ? "0 0 30px rgba(255,107,107,0.5), 0 12px 48px rgba(0,0,0,0.9)"
        : "0 12px 48px rgba(0,0,0,0.9)",
      fontFamily: '"Fira Code", monospace',
      color: "#d4d4d4",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      animation: partyMode ? "party-pulse 2s infinite" : "none"
    }}>
      <div style={{ 
        background: partyMode ? "linear-gradient(90deg, #ff6b6b, #6dd4ff, #51cf66, #ffd43b)" : "linear-gradient(180deg, #1a1a1a, #0d0d0d)",
        padding: "10px 16px",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        backgroundSize: partyMode ? "300% 100%" : "100% 100%",
        animation: partyMode ? "gradient-shift 3s ease infinite" : "none"
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56", boxShadow: "0 0 10px #ff5f56" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", boxShadow: "0 0 10px #ffbd2e" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f", boxShadow: "0 0 10px #27c93f" }} />
        </div>
        <TerminalIcon size={16} color={partyMode ? "#fff" : "#6dd4ff"} />
        <span style={{ fontSize: "14px", fontWeight: 700, color: partyMode ? "#fff" : "#6dd4ff", textShadow: partyMode ? "0 0 10px #fff" : "none" }}>
          anantsec@kali: ~
        </span>
        <span style={{ marginLeft: "auto", fontSize: "11px", color: partyMode ? "#fff" : "#999", display: "flex", gap: "8px", alignItems: "center" }}>
          {partyMode && "🎉"}
          {rainbowMode && "🌈"}
          Commands: {window.commandCount || 0}
        </span>
      </div>

      <div 
        className="terminal-body" 
        style={{ 
          flex: 1, 
          padding: "16px", 
          overflow: "auto", 
          fontSize: "13px", 
          lineHeight: "1.6", 
          whiteSpace: "pre-wrap",

          /* Background image */
          backgroundImage: "url('/assets/kali-dragon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          /* Glassy effect */
          backgroundColor: "rgba(5, 8, 12, 0.8)",     // lighter, more transparent
          backdropFilter: "blur(6px)",                 // GLASS EFFECT
          WebkitBackdropFilter: "blur(6px)",           // Safari support

          border: "1px solid rgba(255, 255, 255, 0.08)", // subtle glass border
          borderRadius: "8px",

          backgroundBlendMode: "overlay",

          wordBreak: "break-word",
          position: "relative"
        }}
        onClick={() => inputRef.current?.focus()}
      >

        {hist.map((e, i) => {
          const col = e.color || (e.type === "inp" ? "#6dd4ff" : e.type === "err" ? "#ff6b6b" : e.type === "out" ? "#e0e0e0" : "#9ed6ff");
          return (
            <div key={i} style={{ color: rainbowMode && e.type === "out" ? getRandomColor() : col, marginBottom: "12px", animation: partyMode && e.type === "out" ? "bounce 0.5s" : "none" }}>
              {e.animated && i === hist.length - 1 ? (
                <TypewriterText text={e.txt} speed={1} onComplete={() => setIsTyping(false)} />
              ) : (
                e.txt
              )}
            </div>
          );
        })}

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "16px", flexWrap: "wrap" }}>
            <span style={{ color: "#6dd4ff", fontWeight: 700, whiteSpace: "pre", minWidth: "fit-content", textShadow: partyMode ? "0 0 5px #6dd4ff" : "none" }}>
              ╭──(anantsec㉿kali)-[~] $
            </span>

            {/* -- SIMPLE INLINE INPUT (no card / no rounded box) -- */}
            <input
              ref={inputRef}
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command..."
              autoComplete="off"
              spellCheck="false"
              disabled={isTyping}
              style={{
                flex: 1,
                background: "transparent",    // no card background
                border: "none",               // no border
                outline: "none",
                color: "#d4d4d4",
                fontFamily: "inherit",
                fontSize: "inherit",
                padding: 0,
                margin: 0,
                caretColor: "#6dd4ff",
                minWidth: "60px",             // ensure small width on empty input so cursor appears
                // keep it inline and flush with prompt like real terminal
              }}
            />
          </div>

          {suggestions.length > 0 && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "80px",
              background: "rgba(10, 15, 20, 0.98)",
              border: "1px solid rgba(109, 212, 255, 0.3)",
              borderRadius: "6px",
              marginTop: "4px",
              padding: "4px",
              minWidth: "200px",
              zIndex: 1000,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}>
              {suggestions.map((sug, i) => (
                <div
                  key={sug}
                  onClick={() => {
                    setInp(sug);
                    setSuggestions([]);
                  }}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    background: i === selectedSuggestion ? "rgba(109, 212, 255, 0.2)" : "transparent",
                    color: i === selectedSuggestion ? "#6dd4ff" : "#999",
                    borderRadius: "4px",
                    fontSize: "12px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(109, 212, 255, 0.2)";
                    e.target.style.color = "#6dd4ff";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== selectedSuggestion) {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#999";
                    }
                  }}
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "16px", paddingTop: "12px", borderTop: "1px dashed #333" }}>
          {quickCommands.map((s) => (
            <button
              key={s}
              onClick={() => !isTyping && run(s)}
              disabled={isTyping}
              style={{ 
                background: partyMode ? "linear-gradient(45deg, #ff6b6b, #6dd4ff)" : "rgba(109, 212, 255, 0.1)",
                border: "1px solid rgba(109, 212, 255, 0.3)",
                color: partyMode ? "#fff" : "#6dd4ff",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: isTyping ? "not-allowed" : "pointer",
                fontSize: "11px",
                fontFamily: "inherit",
                transition: "all 0.3s",
                opacity: isTyping ? 0.5 : 1,
                fontWeight: 500,
                boxShadow: partyMode ? "0 0 10px rgba(109, 212, 255, 0.5)" : "none"
              }}
              onMouseEnter={(e) => {
                if (!isTyping) {
                  e.target.style.background = partyMode ? "linear-gradient(45deg, #6dd4ff, #ff6b6b)" : "rgba(109, 212, 255, 0.25)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(109, 212, 255, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = partyMode ? "linear-gradient(45deg, #ff6b6b, #6dd4ff)" : "rgba(109, 212, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = partyMode ? "0 0 10px rgba(109, 212, 255, 0.5)" : "none";
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}



export default function App() {
  return (
    <div style={{ height: "100vh", width: "100%", background: "linear-gradient(135deg, #050505 0%, #0a0a0f 50%, #050508 100%)", display: "grid", gridTemplateColumns: "42% 58%", gap: 0, overflow: "hidden" }} className="main-grid">
      <div className="badge-panel" style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "transparent", 
        padding: 0, 
        margin: 0, 
        overflow: "hidden", 
        width: "100%", 
        height: "100%",
        position: "relative"
      }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Badge />
        </div>
      </div>

      <div className="right-panel" style={{ 
        padding: "32px", 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        overflow: "hidden",
        position: "relative"
      }}>
        <KaliTerm />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body, html, #root {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(109,212,255,0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(109,212,255,0.5);
        }

        @keyframes party-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255,107,107,0.5), 0 12px 48px rgba(0,0,0,0.9); 
          }
          25% { 
            box-shadow: 0 0 30px rgba(109,212,255,0.5), 0 12px 48px rgba(0,0,0,0.9); 
          }
          50% { 
            box-shadow: 0 0 20px rgba(81,207,102,0.5), 0 12px 48px rgba(0,0,0,0.9); 
          }
          75% { 
            box-shadow: 0 0 30px rgba(255,212,59,0.5), 0 12px 48px rgba(0,0,0,0.9); 
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #6dd4ff; }
          50% { text-shadow: 0 0 20px #6dd4ff, 0 0 30px #6dd4ff; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes rainbow {
          0% { color: #ff6b6b; }
          20% { color: #6dd4ff; }
          40% { color: #51cf66; }
          60% { color: #ffd43b; }
          80% { color: #ff8787; }
          100% { color: #ff6b6b; }
        }
        
        /* Tablet Responsiveness */
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 45vh 55vh !important;
          }
          
          .badge-panel {
            height: 45vh !important;
          }
          
          .right-panel {
            padding: 20px !important;
            height: 55vh !important;
          }
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 40vh 60vh !important;
            height: 100vh !important;
          }
          
          .badge-panel {
            height: 40vh !important;
            min-height: 300px;
          }
          
          .right-panel {
            padding: 12px !important;
            height: 60vh !important;
          }
          
          .terminal-body {
            font-size: 11px !important;
            padding: 12px !important;
          }
          
          .terminal-body input {
            font-size: 11px !important;
          }
          
          .terminal-body button {
            font-size: 10px !important;
            padding: 4px 8px !important;
          }
        }
        
        /* Small Mobile Devices */
        @media (max-width: 480px) {
          .main-grid {
            grid-template-rows: 35vh 65vh !important;
          }
          
          .badge-panel {
            height: 35vh !important;
            min-height: 250px;
          }
          
          .right-panel {
            padding: 8px !important;
            height: 65vh !important;
          }
          
          .terminal-body {
            font-size: 10px !important;
            padding: 8px !important;
          }
        }
        
        /* Landscape Mobile */
        @media (max-width: 968px) and (orientation: landscape) {
          .main-grid {
            grid-template-columns: 45% 55% !important;
            grid-template-rows: 1fr !important;
          }
          
          .badge-panel {
            height: 100vh !important;
          }
          
          .right-panel {
            height: 100vh !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}