"use client";

import { useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bot, BookOpen, Check, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Clock3, Code2, ExternalLink, FileText,
  Globe2, LayoutDashboard, Link2, Menu, MoreHorizontal, Plus, Search, Settings,
  Sparkles, WandSparkles, X, Play, PanelLeftClose, Bell, Command, MessageSquare,
  MonitorPlay, Zap, ArrowRight, CircleCheck, LoaderCircle
} from "lucide-react";

type Project = { name: string; url: string; status: "Ready" | "Training" | "Draft"; pages: number; updated: string; color: string; initials: string };

const initialProjects: Project[] = [
  { name: "Acme Commerce", url: "acme-commerce.com", status: "Ready", pages: 42, updated: "12 min ago", color: "violet", initials: "AC" },
  { name: "Northstar Studio", url: "northstar.studio", status: "Training", pages: 18, updated: "38 min ago", color: "blue", initials: "NS" },
  { name: "Bloom Wellness", url: "bloomwellness.co", status: "Ready", pages: 27, updated: "Yesterday", color: "green", initials: "BW" },
  { name: "Vertex Analytics", url: "vertexanalytics.io", status: "Draft", pages: 0, updated: "Yesterday", color: "orange", initials: "VA" },
];

const navGroups = [
  { label: "WORKSPACE", items: [{ label: "Overview", icon: LayoutDashboard }, { label: "Projects", icon: Globe2 }, { label: "Recordings", icon: MonitorPlay }] },
  { label: "BUILD", items: [{ label: "AI Knowledge", icon: BookOpen }] },
];

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [projects, setProjects] = useState(initialProjects);
  const [showNew, setShowNew] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [creating, setCreating] = useState(false);

  const filtered = projects.filter(p => (p.name + " " + p.url).toLowerCase().includes(query.toLowerCase()));
  const createProject = () => {
    if (!siteUrl.trim()) { setNotice("Enter a website URL to continue."); return; }
    let normalized = siteUrl.trim();
    if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;
    try { new URL(normalized); } catch { setNotice("Please enter a valid website URL."); return; }
    setCreating(true);
    window.setTimeout(() => {
      const host = new URL(normalized).hostname.replace(/^www\./, "");
      setProjects(prev => [{ name: projectName.trim() || host.split(".")[0].replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()), url: host, status: "Draft", pages: 0, updated: "Just now", color: "violet", initials: host.slice(0, 2).toUpperCase() }, ...prev]);
      setCreating(false); setShowNew(false); setActive("Projects"); setSiteUrl(""); setProjectName(""); setNotice("Project created in this demo. Connect the backend to crawl and train it.");
    }, 650);
  };

  const pageTitle = active === "Overview" ? "Good morning" : active;
  const pageSub = active === "Overview" ? "Here's what's happening with your chatbot demos today." : active === "Projects" ? "Manage your websites and AI demo projects." : active === "Recordings" ? "Review and share browser walkthrough recordings." : active === "AI Knowledge" ? "Explore the content powering your AI assistants." : "Personalize your workspace.";

  return (
    <div className="app-shell">
      {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand-row"><div className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></div><span className="brand-name">demo<span>studio</span></span><button className="icon-button sidebar-collapse" aria-label="Collapse sidebar"><PanelLeftClose size={17}/></button></div>
        <button className="workspace-switch"><div className="workspace-avatar">S</div><div className="workspace-meta"><strong>Studio Workspace</strong><span>Free plan</span></div><ChevronDown size={16} className="muted-icon"/></button>
        <div className="sidebar-content">
          {navGroups.map(group => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(item => <button key={item.label} onClick={() => {setActive(item.label);setMobileNav(false);}} className={`nav-item ${active === item.label ? "nav-active" : ""}`}><item.icon size={18}/><span>{item.label}</span>{item.label === "Projects" && <span className="nav-count">{projects.length}</span>}</button>)}</div>)}
          <div className="nav-group"><div className="nav-label">PREFERENCES</div><button onClick={() => setActive("Settings")} className={`nav-item ${active === "Settings" ? "nav-active" : ""}`}><Settings size={18}/><span>Settings</span></button></div>
        </div>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><div><strong>Need a hand?</strong><p>Visit our help center</p></div><ArrowUpRight size={15} className="muted-icon"/></div><div className="profile-row"><div className="profile-avatar">NU</div><div className="profile-meta"><strong>Your workspace</strong><span>Free account</span></div><MoreHorizontal size={19} className="muted-icon"/></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{active}</strong></div></div><div className="topbar-right"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects..." /><kbd>⌘ K</kbd></div><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up.")}><Bell size={18}/><i/></button><div className="top-avatar">NU</div></div></header>
        <div className="page-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/>{active === "Overview" ? "YOUR AI WORKSPACE" : "WORKSPACE"}</div><h1>{pageTitle}{active === "Overview" && <span className="wave"> ✨</span>}</h1><p>{pageSub}</p></div><button className="primary-button" onClick={() => {setNotice("");setShowNew(true);}}><Plus size={17}/> New demo</button></div>
          {notice && <div className="notice"><CircleCheck size={17}/><span>{notice}</span><button aria-label="Dismiss" onClick={() => setNotice("")}><X size={15}/></button></div>}

          {active === "Overview" && <>
            <div className="welcome-banner"><div className="banner-copy"><div className="banner-tag"><Sparkles size={13}/> YOUR DEMO WORKSPACE</div><h2>Turn any website into an<br className="desktop-break"/> interactive AI experience.</h2><p>Build a smart, shareable chatbot demo from a website in minutes.</p><button className="banner-button" onClick={() => setShowNew(true)}>Create your first demo <ArrowRight size={16}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-window"><div className="art-window-top"><span/><span/><span/><div className="art-url">yourwebsite.com</div></div><div className="art-page-lines"><i/><i/><i/><div className="art-card"/><i/><i/></div><div className="bot-bubble"><Bot size={22}/><span className="bubble-dot"/></div><div className="sparkle-float"><Sparkles size={22}/></div></div></div><div className="banner-glow"/></div>
            <div className="section-heading"><div><h2>Workspace overview</h2><p>A quick look at your demo activity.</p></div><button className="text-button" onClick={() => setActive("Projects")}>View all projects <ArrowRight size={15}/></button></div>
            <div className="stats-grid"><StatCard icon={<Globe2 size={18}/>} label="Total projects" value={String(projects.length).padStart(2,"0")} change="Your workspace" tone="purple" /><StatCard icon={<BookOpen size={18}/>} label="Pages discovered" value={String(projects.reduce((n,p)=>n+p.pages,0))} change="Across all projects" tone="blue" /><StatCard icon={<MonitorPlay size={18}/>} label="Demo recordings" value="08" change="Sample dashboard data" tone="orange" /><StatCard icon={<Activity size={18}/>} label="Knowledge status" value="Active" change="Backend not connected" tone="green" /></div>
            <div className="content-grid"><section className="panel projects-panel"><div className="panel-heading"><div><h3>Recent projects</h3><p>Your latest website demos</p></div><button className="icon-button" aria-label="More project options" onClick={() => setActive("Projects")}><MoreHorizontal size={19}/></button></div><div className="project-table"><div className="table-head"><span>PROJECT</span><span>STATUS</span><span>UPDATED</span><span/></div>{filtered.slice(0,4).map(p=><div className="project-row" key={p.url}><div className="project-cell"><div className={`project-icon ${p.color}`}>{p.initials}</div><div className="project-name"><strong>{p.name}</strong><span><Globe2 size={12}/>{p.url}</span></div></div><div><StatusPill status={p.status}/></div><div className="updated-cell"><Clock3 size={13}/>{p.updated}</div><button className="row-action" aria-label={`Open ${p.name}`} onClick={() => {setActive("Projects");setNotice(`Selected project: ${p.name}`);}}><ChevronRight size={17}/></button></div>)}</div><button className="panel-footer-link" onClick={() => setActive("Projects")}>See all projects <ArrowRight size={15}/></button></section>
            <section className="panel activity-panel"><div className="panel-heading"><div><h3>Getting started</h3><p>Your path to a shareable demo</p></div><span className="tiny-progress">1 of 4</span></div><div className="progress-track"><span/></div><div className="checklist"><div className="check-item completed"><span className="check-circle"><Check size={13}/></span><div><strong>Workspace created</strong><p>Your studio is ready to go</p></div></div><div className="check-item"><span className="check-circle"><Globe2 size={13}/></span><div><strong>Add a website</strong><p>Choose a site to turn into a demo</p></div><button onClick={() => setShowNew(true)} className="mini-link">Start <ArrowRight size={13}/></button></div><div className="check-item"><span className="check-circle"><WandSparkles size={13}/></span><div><strong>Train your AI</strong><p>Prepare knowledge from your site</p></div></div><div className="check-item"><span className="check-circle"><Link2 size={13}/></span><div><strong>Share your demo</strong><p>Send a link to your team or client</p></div></div></div><div className="tip-box"><div className="tip-icon"><Zap size={16}/></div><div><strong>Pro tip</strong><p>Start with a public website that has clear product or service pages.</p></div></div></section></div>
          </>}

          {active === "Projects" && <section className="panel full-panel"><div className="panel-heading"><div><h3>All projects</h3><p>{projects.length} website projects in your workspace</p></div><button className="secondary-button" onClick={() => setShowNew(true)}><Plus size={16}/> Add website</button></div><div className="all-projects-grid">{filtered.map(p=><div className="project-card" key={p.url}><div className="project-card-top"><div className={`project-icon large ${p.color}`}>{p.initials}</div><button className="icon-button" aria-label="Project menu" onClick={() => setNotice(`Project: ${p.name} · ${p.pages} pages`)}><MoreHorizontal size={18}/></button></div><h3>{p.name}</h3><p className="project-card-url"><Globe2 size={13}/>{p.url}</p><div className="project-card-meta"><StatusPill status={p.status}/><span><FileText size={13}/>{p.pages} pages</span></div><div className="project-card-footer"><span>Updated {p.updated.toLowerCase()}</span><button onClick={() => setNotice(`${p.name}: demo preview is a UI prototype until backend services are connected.`)}>Open project <ArrowRight size={14}/></button></div></div>)}</div>{filtered.length===0&&<div className="empty-state"><Search size={24}/><strong>No projects found</strong><span>Try another search term.</span></div>}</section>}

          {active === "Recordings" && <section className="panel full-panel"><div className="panel-heading"><div><h3>Demo recordings</h3><p>Browser walkthroughs for your website demos.</p></div><span className="sample-label">SAMPLE DATA</span></div><div className="empty-feature"><div className="feature-illustration"><MonitorPlay size={34}/><Play size={15} className="play-overlay"/></div><h3>Your recordings will live here</h3><p>Once recording is connected, you’ll be able to capture browser walkthroughs and share them with a link.</p><button className="secondary-button" onClick={() => setNotice("Recording needs the Playwright and storage backend, which is not connected yet.")}> <CircleHelp size={16}/> How recording works</button></div></section>}

          {active === "AI Knowledge" && <section className="panel full-panel"><div className="panel-heading"><div><h3>AI Knowledge</h3><p>Website content that your chatbot can use to answer questions.</p></div><span className="sample-label">BACKEND PENDING</span></div><div className="knowledge-cards"><div className="knowledge-card"><div className="knowledge-icon purple"><BookOpen size={20}/></div><strong>Website pages</strong><span>Content gathered from each site</span><b>{projects.reduce((n,p)=>n+p.pages,0)} <small>sample pages</small></b></div><div className="knowledge-card"><div className="knowledge-icon blue"><Sparkles size={20}/></div><strong>Knowledge chunks</strong><span>Searchable AI context</span><b>Not connected</b></div><div className="knowledge-card"><div className="knowledge-icon green"><Zap size={20}/></div><strong>Vector search</strong><span>Relevant answers, faster</span><b>Not connected</b></div></div><div className="knowledge-note"><CircleHelp size={17}/><div><strong>This is currently a frontend prototype</strong><p>Live crawling, embeddings, and AI answers need backend setup. No website is crawled or trained from this screen yet.</p></div></div></section>}

          {active === "Settings" && <section className="panel full-panel settings-panel"><div className="panel-heading"><div><h3>Workspace settings</h3><p>Manage your demo studio preferences.</p></div></div><div className="setting-row"><div><strong>Workspace name</strong><p>The name displayed in your sidebar.</p></div><input aria-label="Workspace name" defaultValue="Studio Workspace"/></div><div className="setting-row"><div><strong>Project visibility</strong><p>New demos are private until you choose to share them.</p></div><span className="setting-value">Private by default</span></div><div className="setting-row"><div><strong>AI provider</strong><p>Connect an AI API to power generated responses.</p></div><span className="setting-value pending">Not connected</span></div><div className="setting-row"><div><strong>Data storage</strong><p>Connect Supabase to store projects and knowledge.</p></div><span className="setting-value pending">Not connected</span></div><div className="settings-foot"><button className="primary-button" onClick={() => setNotice("Settings are local prototype values and are not saved to a backend yet.")}>Save preferences</button></div></section>}
          <footer className="page-footer"><span>© 2025 Demo Studio</span><span><span className="footer-status"/>{' '}All systems nominal <span className="footer-separator">·</span> <button onClick={() => setNotice("This is the frontend prototype. Backend services are not connected yet.")}>System status</button></span></footer>
        </div>
      </main>

      {showNew && <div className="modal-backdrop" onMouseDown={e => {if(e.target===e.currentTarget)setShowNew(false);}}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-top"><div className="modal-symbol"><Sparkles size={21}/></div><button className="icon-button" aria-label="Close dialog" onClick={() => setShowNew(false)}><X size={19}/></button></div><div className="modal-heading"><h2 id="modal-title">Create a new demo</h2><p>Start with a website URL. You can configure the chatbot after creating your project.</p></div><label className="form-label" htmlFor="website-url">Website URL <span>*</span></label><div className="url-input"><Globe2 size={17}/><input id="website-url" autoFocus placeholder="https://example.com" value={siteUrl} onChange={e => {setSiteUrl(e.target.value);setNotice("");}} onKeyDown={e => {if(e.key==="Enter")createProject();}}/></div><label className="form-label" htmlFor="project-name">Project name <span className="optional">(optional)</span></label><input className="text-input" id="project-name" placeholder="e.g. My Company Website" value={projectName} onChange={e => setProjectName(e.target.value)}/>{notice && <p className="form-error">{notice}</p>}<div className="modal-info"><Zap size={16}/><p>In this prototype, creating a project adds it to the dashboard only. Website crawling and AI training require backend setup.</p></div><div className="modal-actions"><button className="secondary-button" onClick={() => setShowNew(false)}>Cancel</button><button className="primary-button" disabled={creating} onClick={createProject}>{creating ? <><LoaderCircle size={16} className="spin"/> Creating...</> : <>Create project <ArrowRight size={16}/></>}</button></div><div className="modal-secure"><Check size={13}/> Your website URL is only used to create the project entry in this demo.</div></div></div>}
    </div>
  );
}

function StatCard({icon,label,value,change,tone}:{icon:React.ReactNode;label:string;value:string;change:string;tone:string}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-change"><span className="stat-neutral"><ArrowDownRight size={13}/></span>{change}</div></div>;
}
function StatusPill({status}:{status:Project["status"]}) {
  return <span className={`status-pill status-${status.toLowerCase()}`}><i/>{status}</span>;
}