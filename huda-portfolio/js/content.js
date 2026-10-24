/* ALL EDITABLE CONTENT LIVES HERE. Items marked demo/placeholder are labeled on the page. */
window.SITE = {
  name: "Huda",
  title: "AI Automation Specialist",
  tagline: "Automating Repetitive Work. Building Smarter Systems.",
  intro: "I'm Huda, an AI Automation Specialist passionate about building intelligent workflows that reduce repetitive work, connect tools, and help businesses operate more efficiently.",
  heroImage: "",   // empty = built-in illustration; the Admin Panel can upload a photo
  theme: "charcoal-orange",
  awards: [],       // {title, org, year, text}; the Awards section stays hidden while empty
  heroAlt: "Diagram of connected automation nodes: trigger, AI step and actions",
  email: "hudarasool244@gmail.com",
  emailIsPlaceholder: false,
  /* icon: "linkedin" or "instagram". Add Instagram only with a real URL, e.g. {label:"Instagram", icon:"instagram", url:"https://instagram.com/..."} */
  socials: [
    {label:"LinkedIn", icon:"linkedin", url:"https://www.linkedin.com/in/huda-rasool-4abb76416/"}
  ],
  nav: [["Home","index.html#home"],["Services","services.html"],["Portfolio","portfolio.html"],["About","about.html"],["Process","index.html#process"],["Contact","contact.html"]],
  stats: [
    {value: 7, label: "Months", desc: "AI Automation Experience"},
    {text: "AI Workflows", desc: "Workflow Automation"},
    {text: "AI Agents", desc: "Intelligent Task Execution"},
    {text: "Integrations", desc: "Connected Applications"}
  ],
  /* price: leave "" to show "Custom Quote". Add e.g. price:"$50" to show "Starting at $50 per workflow". Never put in a price you do not offer. */
  services: [
    {icon:"flow", title:"AI Workflow Automation", text:"Automate repetitive business tasks by connecting triggers, actions, and your favorite apps into reliable workflows. From data entry and lead management to notifications and routine reporting, I help simplify processes and save valuable time.", price:"", unit:"per workflow"},
    {icon:"agent", title:"AI Agents & Intelligent Assistants", text:"Create AI-powered assistants that help process information, categorize requests, summarize content, prepare responses, and support specific business tasks. Design workflows with clear instructions, structured outputs, and human review where needed.", price:"", unit:"per project"},
    {icon:"plug", title:"API, Webhook & App Integrations", text:"Connect compatible applications and services using APIs and webhooks. Move information between systems, trigger actions automatically, and build smoother processes with validation and appropriate error handling.", price:"", unit:"per integration"},
    {icon:"gear", title:"End-to-End AI Automation Systems", text:"Build complete automation solutions that combine workflows, AI capabilities, and app integrations into a coordinated system. From initial process mapping to testing and refinement, the goal is to solve real operational problems with practical automation.", price:"", unit:"per project"}
  ],
  servicesPage: {
    eyebrow: "AI AUTOMATION SERVICES",
    heading: ["Less Manual Work.", "Smarter Automated Systems."],
    intro: "I design practical AI-powered workflows, intelligent agents, and connected systems that help businesses reduce repetitive tasks, improve efficiency, and simplify everyday operations.",
    approach: {
      title: "Automation Built Around Real Problems.",
      steps: [
        {title:"Discover", text:"Understand the repetitive task, business challenge, and desired outcome."},
        {title:"Design", text:"Map the workflow and choose the right tools, logic, and AI capabilities."},
        {title:"Build", text:"Connect the necessary applications and configure the automation."},
        {title:"Test & Improve", text:"Check results, handle errors, and refine the workflow for practical use."}
      ]
    },
    cta: {
      title: "Ready to Automate Your Workflow?",
      text: "Tell me about the repetitive tasks or disconnected processes slowing you down. Let's explore how AI automation can make your work simpler and more efficient.",
      button: "Discuss Your Project \u2197"
    }
  },
  process: [
    {title:"Discover", text:"Understand the problem and repetitive tasks."},
    {title:"Design", text:"Map the process and choose suitable tools."},
    {title:"Automate", text:"Connect applications and configure AI-powered steps."},
    {title:"Test and Improve", text:"Validate outputs, handle errors, and refine the workflow."}
  ],
  /* Suggested examples only. Remove what you do not use, add what you know. */
  toolsNote: "Placeholder list of tools I use or am learning. Edit to match real skills.",
  tools: [
    {group:"Automation platforms", items:["n8n","Make","Zapier"]},
    {group:"AI services and models", items:["OpenAI APIs"]},
    {group:"Integration technologies", items:["REST APIs","Webhooks","JSON"]},
    {group:"Development tools", items:["Python","JavaScript","Git"]},
    {group:"Data and productivity", items:["Google Sheets"]}
  ],
  /* No real testimonials yet: principles are shown instead. Add {name,role,org,text} to use testimonials. */
  testimonials: [],
  principles: [
    {title:"Start with the problem", text:"I begin with the task that slows you down, not with a tool."},
    {title:"Keep humans in control", text:"Where judgment matters, automations hand off for review."},
    {title:"Be honest about scope", text:"I describe only what I can build and have tested."}
  ],
  cta: {
    title: "Let's Automate the Work That Slows You Down.",
    text: "Have a repetitive task, disconnected workflow, or business process that could work smarter? Let's explore an automation solution that fits your needs."
  },
  brand: "Practical AI automation that saves time and connects the tools you already use.",
  sections: {
    services: {title:"AI Automation Services", text:"Focused on practical work I can genuinely deliver. Services will grow as my skills do."},
    projects: {title:"Featured Automation Projects", text:"Labeled demo concepts until real projects are added. None are client work or verified results."},
    process: {title:"My Automation Process"},
    tools: {title:"Tools and Technologies"},
    trust: {title:"How I Work", text:"Genuine feedback will appear here once available. Until then, these are my working principles."}
  },
  hero: {
    headline: "Building Smarter Systems. One Workflow at a Time.",
    text: "I'm Huda, an AI Automation Specialist passionate about connecting tools, reducing repetitive work, and building practical AI-powered workflows."
  },
  about: {
    heading: ["About","Huda"], photo: "", photoAlt: "Portrait of Huda",
    journeyTitle: "Learning journey", journeyNote: "Only confirmed milestones are stated as fact. Tagged items are placeholders to replace.",
    skillsTitle: "Technical skills", awardsTitle: "Awards and Achievements", goalsTitle: "Current learning goals", missionTitle: "Professional mission",
    intro: ["I'm Huda, a developing AI Automation Specialist with 7 months of hands-on learning and building in AI automation. I enjoy problem-solving, workflow design, and making everyday processes more efficient.",
            "I'm early in my career and I say so: I build practical demo projects and describe only what I have actually done."],
    /* confirmed:false items display a "Placeholder" tag. Replace them with your real milestones. */
    journey: [
      {when:"7 months ago", text:"Started learning AI automation and workflow building.", confirmed:true},
      {when:"Milestone to add", text:"Add a real milestone, such as your first working workflow.", confirmed:false},
      {when:"Milestone to add", text:"Add another real milestone, such as a tool or integration you learned.", confirmed:false},
      {when:"Today", text:"Building practical demo projects and growing my skills.", confirmed:true}
    ],
    goals: ["Placeholder: add a tool or skill you are learning next","Placeholder: add a type of project you want to build","Placeholder: add a goal for how you want to grow"],
    mission: "To help people spend less time on repetitive work by building practical, reliable automations that connect the tools they already use."
  },
  contact: {
    heading: ["Let's","work together"], whatsappNumber: "",
    lead: "Have a repetitive task or a disconnected workflow? Tell me about it and we can explore whether automation is a good fit.",
    formIntro: "Have an automation, AI agent or integration project in mind? Reach out and tell me what you'd like to simplify.",
    whatsapp: "Available on request. Email me and I'll share it.",
    extraTypes: ["Something else / not sure yet"],
    budgets: ["Prefer not to say","Under $500","$500 to $1,000","$1,000 to $2,500","$2,500 or more","Custom quote"]
  },

  /* PORTFOLIO PAGE DATA. tools: [] until confirmed. thumb: "" uses the generated placeholder; set a path like "assets/projects/x.jpg" later.
     All entries are demo concepts, not client work. Set demo:false only for real projects. */
  portfolio: {
    eyebrow: "MY PORTFOLIO — AI AUTOMATION",
    headline: ["Small Systems.", "Smarter Outcomes."],
    intro: "Explore my AI automation concepts, intelligent workflows, AI-powered systems, and app integrations. I'm Huda, an AI Automation Specialist with 7 months of experience, focused on learning and building practical solutions that reduce repetitive work and connect everyday tools.",
    categories: [
      {id:"workflow", label:"AI Workflows"},
      {id:"agents", label:"AI Agents"},
      {id:"integrations", label:"API and App Integrations"},
      {id:"business", label:"Business Automation"}
    ],
    items: [
      {id:"lead-intake", cat:"workflow", title:"Smart Lead Intake Workflow", short:"Organizes incoming lead information and prepares a consistent follow-up process.", full:"A demo concept showing how lead details from a form could be cleaned, organized in one place, and queued for a consistent follow-up.", steps:["A new lead submission arrives","Fields are validated and tidied","The lead is saved to a shared sheet","A follow-up task is prepared for review"], tools:[], benefit:"Expected to reduce manual copying and keep follow-up consistent.", thumb:"", demo:true},
      {id:"weekly-report", cat:"business", title:"Automated Weekly Reporting", short:"Collects approved information and prepares a structured weekly report.", full:"A demo concept where approved data sources are gathered on a schedule and assembled into a structured weekly summary.", steps:["A weekly schedule starts the workflow","Approved data is collected","Figures are arranged into a report template","The draft is sent for review"], tools:[], benefit:"Expected to save time compiling recurring reports.", thumb:"", demo:true},
      {id:"task-notify", cat:"business", title:"Task and Notification Automation", short:"Routes task updates and sends notifications when defined conditions are met.", full:"A demo concept that watches for task changes and notifies the right person only when a defined condition is met.", steps:["A task update is detected","Conditions are checked","The matching person or channel is chosen","A notification is sent"], tools:[], benefit:"Expected to cut missed updates and manual reminders.", thumb:"", demo:true},
      {id:"inbox-assistant", cat:"agents", title:"AI Email and Inbox Assistant", short:"Categorizes incoming messages and prepares concise summaries for human review.", full:"A demo concept in which an AI step sorts incoming messages into categories and writes short summaries. A person reviews everything before action.", steps:["A new message arrives","AI assigns a category","AI writes a short summary","The result is held for human review"], tools:[], benefit:"Expected to speed up triage while a person stays in control.", thumb:"", demo:true},
      {id:"doc-extraction", cat:"workflow", title:"Document Data Extraction", short:"Extracts useful information from documents and structures it for verification.", full:"A demo concept that pulls key fields from documents into a structured format so a person can verify them.", steps:["A document is received","Text is extracted","Key fields are identified by AI","Structured data is saved for verification"], tools:[], benefit:"Expected to reduce manual data entry, with checks before use.", thumb:"", demo:true},
      {id:"knowledge-assistant", cat:"agents", title:"AI Knowledge Assistant", short:"Helps organize information and retrieve relevant answers from an approved knowledge source.", full:"A demo concept of an assistant that answers questions using only an approved knowledge source and flags what it cannot answer.", steps:["A question is submitted","Relevant approved content is retrieved","An answer is drafted from that content","Unclear questions are passed to a person"], tools:[], benefit:"Expected to make approved information quicker to find.", thumb:"", demo:true},
      {id:"data-sync", cat:"integrations", title:"Cross-App Data Synchronization", short:"Keeps selected records aligned across connected applications.", full:"A demo concept showing selected records kept consistent between two connected applications.", steps:["A record changes in the source app","The change is read through an API","Fields are mapped to the target format","The target app is updated and the result logged"], tools:[], benefit:"Expected to reduce duplicate data entry and mismatched records.", thumb:"", demo:true},
      {id:"webhook-router", cat:"integrations", title:"Webhook Event Router", short:"Receives events, validates required information, and routes data to the appropriate next step.", full:"A demo concept that receives webhook events, checks that required fields are present, and sends each event to the right next step.", steps:["A webhook event is received","Required fields are validated","The event type decides the route","Invalid events are logged for review"], tools:[], benefit:"Expected to keep incoming events organized and failures visible.", thumb:"", demo:true},
      {id:"connected-app", cat:"integrations", title:"Connected App Integration", short:"Demonstrates how supported applications exchange information through APIs or webhooks.", full:"A demo concept illustrating how two supported applications can exchange information through APIs or webhooks.", steps:["App A triggers an event","Data is sent through an API or webhook","The payload is transformed","App B receives and stores it"], tools:[], benefit:"Expected to show how tools can share data without manual steps.", thumb:"", demo:true},
      {id:"whatsapp-sales-support", cat:"agents", title:"AI WhatsApp Sales & Support Agent", short:"A sample n8n workflow for AI-assisted WhatsApp sales and customer support handling.", full:"An importable n8n workflow JSON supplied as a portfolio example. Before running it, configure the required WhatsApp and AI credentials, review every node, and test with non-production data.", steps:["Receive an incoming message","Process the message through the configured workflow","Prepare an AI-assisted response","Review and test before production use"], tools:["n8n","WhatsApp","AI model integration"], benefit:"Demonstrates a possible starting point for organizing sales and support messages.", thumb:"", demo:true, workflow:"workflows/01-ai-whatsapp-sales-support-agent.json"},
      {id:"email-whatsapp-outreach", cat:"workflow", title:"AI Email + WhatsApp Outreach — Phase 2", short:"A larger n8n workflow example for coordinating email and WhatsApp outreach steps.", full:"An importable n8n workflow JSON provided as a portfolio demo. Review all nodes and configure your own approved provider credentials and consent rules before testing or using it.", steps:["Review the workflow nodes and trigger","Configure approved email and WhatsApp connections","Test with a small, consented test list","Monitor execution results and errors"], tools:["n8n","Email","WhatsApp"], benefit:"Shows how multi-step outreach processes can be structured and tested.", thumb:"", demo:true, workflow:"workflows/02-ai-email-whatsapp-outreach-phase-2.json"},
      {id:"email-outreach-automation", cat:"workflow", title:"AI Email Outreach Automation", short:"An n8n workflow example for automating parts of an email outreach process.", full:"An importable n8n workflow JSON supplied for demonstration. Configure the relevant email, data source, and AI credentials yourself, and follow applicable anti-spam and privacy rules.", steps:["Inspect the workflow and its input data","Set up the required credentials","Test with internal sample records","Review messages before any live sending"], tools:["n8n","Gmail/email","AI integration"], benefit:"Demonstrates a repeatable approach to email workflow automation.", thumb:"", demo:true, workflow:"workflows/03-ai-email-outreach-automation.json"},
      {id:"smart-email-response", cat:"agents", title:"Smart AI Welcome Email Response", short:"A compact workflow example for drafting AI-assisted responses to incoming email.", full:"An importable n8n workflow JSON intended as a portfolio demo. Set up the required email and model credentials, and test outputs before enabling any automatic responses.", steps:["Receive or select an email event","Process the message with the configured AI step","Prepare a response draft","Review behavior before enabling live actions"], tools:["n8n","Email","Mistral AI"], benefit:"Shows how email response preparation can be assisted by an AI workflow.", thumb:"", demo:true, workflow:"workflows/04-smart-email-response.json"}
    ]
  }
};

/* Merge content saved by the Admin Panel (data/content.json) over the defaults above. */
(function(){
  function merge(a,b){for(var k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object'&&!Array.isArray(a[k]))merge(a[k],b[k]);else a[k]=b[k]}return a}
  if(window.__DATA){var d=JSON.parse(JSON.stringify(window.__DATA));delete d.nav;merge(window.SITE,d)}
})();
