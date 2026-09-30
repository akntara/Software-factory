import { useMemo, useState } from "react";

const starterTasks = [
  {
    id: 1,
    title: "Review the Q3 product roadmap",
    project: "Product",
    date: "Today",
    time: "10:30 AM",
    color: "violet",
    completed: false,
  },
  {
    id: 2,
    title: "Send the proposal to Olivia",
    project: "Client work",
    date: "Today",
    time: "12:00 PM",
    color: "amber",
    completed: false,
  },
  {
    id: 3,
    title: "Sketch ideas for the new dashboard",
    project: "Design",
    date: "Today",
    time: "2:00 PM",
    color: "rose",
    completed: true,
  },
  {
    id: 4,
    title: "Read through user interview notes",
    project: "Research",
    date: "Tomorrow",
    time: "9:00 AM",
    color: "blue",
    completed: false,
  },
];

const filters = ["All tasks", "Today", "Upcoming", "Completed"];
const projectColors = {
  violet: "bg-violet-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  blue: "bg-blue-400",
};

function Icon({ name, size = 18, className = "" }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    inbox: <><path d="M4 4h16l2 11v5H2v-5L4 4Z" /><path d="M2 15h6l2 3h4l2-3h6" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.6-1.4-2.4 1.4-1.1A7 7 0 0 1 7 13l-1.7-.7v-2.8L7 8.8a7 7 0 0 1 .4-1.6L6 6.1l1.4-2.4 1.7.6a8 8 0 0 1 1.6-.9L11 1.6h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 .4 1.6l1.7.7v2.8l-1.7.7a7 7 0 0 1-.4 1.6Z" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-white">
        <span className="font-display text-lg font-bold">d.</span>
      </div>
      {!compact && <span className="font-display text-lg font-bold tracking-tight text-ink">daymark</span>}
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const isRegister = mode === "register";

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setNotice("");
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (isRegister && !values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (isRegister && values.confirm !== values.password) {
      nextErrors.confirm = "Your passwords don't match.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onLogin(isRegister ? values.name.trim() : values.email.split("@")[0]);
  }

  return (
    <main className="auth-shell min-h-screen bg-canvas">
      <div className="auth-side relative hidden min-h-screen overflow-hidden lg:flex">
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-14 py-12 text-white xl:px-20">
          <Brand />
          <div className="max-w-lg pb-10">
            <div className="mb-7 flex items-center gap-2 text-sm text-white/70">
              <span className="h-px w-8 bg-white/40" /> A little more clarity, every day
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              Make room for <span className="text-[#c3d9b9]">good work.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/70">
              A calmer place to collect your thoughts, find your focus, and move the things that matter forward.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["M", "J", "A"].map((letter, index) => (
                  <span key={letter} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-[#244d3c] text-[10px] font-semibold ${["bg-[#e6bd9b]", "bg-[#c6d2c9]", "bg-[#d9c2d8]"][index]} text-[#33443a]`}>{letter}</span>
                ))}
              </div>
              <span className="text-xs text-white/70">A little more focused, together.</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-white/45">
            <span>Thoughtfully made for your everyday.</span>
            <span>© 2025 Daymark</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:col-start-2 lg:px-16">
        <div className="lg:hidden"><Brand /></div>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12">
          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold text-forest">YOUR SPACE TO BEGIN</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              {isRegister ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isRegister ? "A fresh start is just a few details away." : "Pick up right where your best work begins."}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#eef1ed] p-1">
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setMode(tab); setErrors({}); setNotice(""); }}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${mode === tab ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {tab === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {notice && <p role="status" className="mb-4 rounded-lg bg-[#edf6ed] px-4 py-3 text-sm text-forest">{notice}</p>}
          <form className="space-y-4" onSubmit={submit} noValidate>
            {isRegister && <Field label="Your name" value={values.name} error={errors.name} onChange={(value) => update("name", value)} placeholder="Alex Morgan" autoComplete="name" />}
            <Field label="Email address" type="email" value={values.email} error={errors.email} onChange={(value) => update("email", value)} placeholder="you@example.com" autoComplete="email" />
            <Field label="Password" type="password" value={values.password} error={errors.password} onChange={(value) => update("password", value)} placeholder="At least 8 characters" autoComplete={isRegister ? "new-password" : "current-password"} />
            {isRegister && <Field label="Confirm password" type="password" value={values.confirm} error={errors.confirm} onChange={(value) => update("confirm", value)} placeholder="Enter your password again" autoComplete="new-password" />}
            {!isRegister && <div className="-mt-1 text-right"><button type="button" className="text-xs font-medium text-forest hover:underline" onClick={() => setNotice("Password recovery is a prototype flow. Your information stays on this device.")}>Forgot password?</button></div>}
            <button className="!mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#285941] focus:outline-none focus:ring-4 focus:ring-forest/15" type="submit">
              {isRegister ? "Create your account" : "Sign in to Daymark"} <Icon name="chevron" size={16} />
            </button>
          </form>
          <p className="mt-7 text-center text-xs leading-5 text-muted">By continuing, you agree to our <span className="font-medium text-ink">Terms</span> and <span className="font-medium text-ink">Privacy Policy</span>.</p>
        </div>
        <p className="text-center text-xs text-muted lg:hidden">Thoughtfully made for your everyday.</p>
      </div>
    </main>
  );
}

function Field({ label, type = "text", value, error, onChange, ...props }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-[#a7aea8] focus:border-forest focus:ring-4 focus:ring-forest/10 ${error ? "border-red-300" : "border-line"}`}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Sidebar({ active, onSelect, user, onLogout }) {
  return (
    <aside className="flex w-full flex-col border-b border-line bg-white px-5 py-4 lg:min-h-screen lg:w-[248px] lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
      <div className="flex items-center justify-between lg:block">
        <Brand />
        <button className="rounded-lg p-2 text-muted hover:bg-canvas lg:hidden" onClick={onLogout} aria-label="Sign out"><Icon name="logout" /></button>
      </div>
      <div className="mt-8 hidden rounded-xl bg-canvas p-3 lg:flex lg:items-center lg:gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#e5ece5] text-sm font-semibold text-forest">{user.charAt(0).toUpperCase()}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{user}</p>
          <p className="text-xs text-muted">Personal space</p>
        </div>
        <Icon name="more" className="text-muted" size={16} />
      </div>
      <p className="mb-2 mt-8 hidden px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#a0a8a1] lg:block">Workspace</p>
      <nav className="mt-5 flex gap-1 overflow-x-auto lg:mt-0 lg:flex-col" aria-label="Task filters">
        {filters.map((filter, index) => {
          const selected = active === filter;
          return (
            <button key={filter} onClick={() => onSelect(filter)} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition lg:w-full ${selected ? "bg-[#edf3ed] font-semibold text-forest" : "text-[#657068] hover:bg-canvas hover:text-ink"}`}>
              <Icon name={["inbox", "calendar", "grid", "check"][index]} size={17} />
              <span>{filter}</span>
              {filter === "Today" && <span className="ml-auto hidden rounded-md bg-white px-1.5 py-0.5 text-[10px] text-muted lg:inline">3</span>}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto hidden border-t border-line pt-5 lg:block">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#657068] transition hover:bg-canvas hover:text-ink" onClick={() => onSelect("All tasks")}><Icon name="settings" size={17} /> Preferences</button>
        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#657068] transition hover:bg-canvas hover:text-ink" onClick={onLogout}><Icon name="logout" size={17} /> Sign out</button>
      </div>
    </aside>
  );
}

function TaskRow({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`group flex items-start gap-3 border-b border-line px-4 py-4 transition last:border-b-0 hover:bg-[#fcfdfb] sm:items-center sm:px-5 ${task.completed ? "opacity-65" : ""}`}>
      <button
        aria-label={task.completed ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition sm:mt-0 ${task.completed ? "border-forest bg-forest text-white" : "border-[#cbd2cb] text-transparent hover:border-forest"}`}
      >
        {task.completed && <Icon name="check" size={12} />}
      </button>
      <div className="min-w-0 flex-1">
        <button onClick={() => onEdit(task)} className={`block max-w-full truncate text-left text-sm font-medium ${task.completed ? "text-muted line-through" : "text-ink hover:text-forest"}`}>{task.title}</button>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1.5"><i className={`h-2 w-2 rounded-full ${projectColors[task.color] ?? "bg-blue-400"}`} />{task.project}</span>
          <span className="flex items-center gap-1"><Icon name="clock" size={12} />{task.date}, {task.time}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 sm:opacity-0 sm:transition group-hover:opacity-100 group-focus-within:opacity-100">
        <button aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)} className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-canvas hover:text-ink">Edit</button>
        <button aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)} className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-red-50 hover:text-red-600">Delete</button>
      </div>
    </article>
  );
}

function TaskDialog({ initialTask, onClose, onSave }) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [project, setProject] = useState(initialTask?.project ?? "Personal");
  const [date, setDate] = useState(initialTask?.date ?? "Today");
  const [time, setTime] = useState(initialTask?.time ?? "3:00 PM");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Give your task a name before saving.");
      return;
    }
    onSave({ ...initialTask, title: title.trim(), project, date, time, color: initialTask?.color ?? "blue" });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#15251c]/35 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="task-dialog-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-forest">{initialTask ? "Make a change" : "A small next step"}</p>
            <h2 id="task-dialog-title" className="mt-1 font-display text-xl font-semibold text-ink">{initialTask ? "Edit task" : "Add a task"}</h2>
          </div>
          <button aria-label="Close dialog" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-canvas"><Icon name="close" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-1.5 block text-sm font-medium text-ink">What needs doing?</label>
            <input autoFocus id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); setError(""); }} placeholder="e.g. Prepare for the team sync" className="w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-forest focus:ring-4 focus:ring-forest/10" />
            {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-project" className="mb-1.5 block text-sm font-medium text-ink">Project</label>
              <select id="task-project" value={project} onChange={(event) => setProject(event.target.value)} className="w-full rounded-xl border border-line bg-white px-3 py-3 text-sm outline-none focus:border-forest">
                {["Personal", "Product", "Client work", "Design", "Research"].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="task-date" className="mb-1.5 block text-sm font-medium text-ink">When</label>
              <select id="task-date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-line bg-white px-3 py-3 text-sm outline-none focus:border-forest">
                {["Today", "Tomorrow", "This week", "Later"].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="task-time" className="mb-1.5 block text-sm font-medium text-ink">Time</label>
            <input id="task-time" value={time} onChange={(event) => setTime(event.target.value)} placeholder="3:00 PM" className="w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-forest focus:ring-4 focus:ring-forest/10" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted hover:bg-canvas">Cancel</button>
            <button type="submit" className="rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#285941]">{initialTask ? "Save changes" : "Add task"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState("Today");
  const [query, setQuery] = useState("");
  const [dialogTask, setDialogTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState("");
  const todayTasks = tasks.filter((task) => task.date === "Today");
  const completedToday = todayTasks.filter((task) => task.completed).length;
  const progress = todayTasks.length ? Math.round((completedToday / todayTasks.length) * 100) : 0;
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === "All tasks" || (filter === "Today" && task.date === "Today") || (filter === "Upcoming" && task.date !== "Today" && !task.completed) || (filter === "Completed" && task.completed);
    const matchesQuery = `${task.title} ${task.project}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [tasks, filter, query]);

  function saveTask(task) {
    if (task.id) setTasks((current) => current.map((item) => item.id === task.id ? task : item));
    else setTasks((current) => [{ ...task, id: Date.now(), completed: false }, ...current]);
    setDialogOpen(false);
    setDialogTask(null);
    setToast(task.id ? "Your changes are saved." : "Task added to your list.");
    window.setTimeout(() => setToast(""), 2600);
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setToast("Task removed.");
    window.setTimeout(() => setToast(""), 2600);
  }

  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <Sidebar active={filter} onSelect={setFilter} user={user} onLogout={onLogout} />
      <main className="min-w-0 flex-1">
        <header className="flex h-[72px] items-center justify-between border-b border-line bg-white/70 px-5 sm:px-8 lg:px-10">
          <div className="relative w-full max-w-[360px]">
            <Icon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a8a1]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search tasks" placeholder="Search anything..." className="w-full rounded-xl border border-transparent bg-[#f0f2ef] py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-[#9ca49d] focus:border-[#d9e3d9] focus:bg-white" />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[#dfe4df] bg-white px-1.5 py-0.5 text-[10px] text-muted sm:block">⌘ K</kbd>
          </div>
          <div className="ml-4 flex items-center gap-3">
            <button onClick={() => { setDialogTask(null); setDialogOpen(true); }} className="flex items-center gap-2 rounded-xl bg-forest px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#285941] sm:px-4"><Icon name="plus" size={17} /><span className="hidden sm:inline">New task</span><span className="sm:hidden">New</span></button>
            <div className="hidden h-8 w-px bg-line sm:block" />
            <button onClick={onLogout} className="hidden h-9 w-9 place-items-center rounded-full bg-[#e5ece5] text-sm font-semibold text-forest hover:ring-2 hover:ring-forest/20 sm:grid" title="Sign out">{user.charAt(0).toUpperCase()}</button>
          </div>
        </header>

        <div className="mx-auto max-w-[1160px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-muted">{greeting}, {user.split(" ")[0]} <span aria-hidden="true">✳</span></p>
              <h1 className="font-display text-[30px] font-semibold tracking-tight text-ink sm:text-[34px]">{filter === "Today" ? "Your day, in focus." : filter}</h1>
              <p className="mt-1.5 text-sm text-muted">A good day starts with one thing at a time.</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm text-[#59645c] shadow-card">
              <Icon name="calendar" size={16} className="text-forest" />
              {new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date())}
            </div>
          </div>

          <section className="mb-6 grid gap-4 sm:grid-cols-[1.35fr_1fr_1fr]">
            <div className="relative overflow-hidden rounded-2xl bg-[#285840] p-5 text-white shadow-card sm:p-6">
              <div className="absolute -right-7 -top-10 h-36 w-36 rounded-full border-[22px] border-white/[.06]" />
              <div className="absolute -bottom-16 right-20 h-32 w-32 rounded-full border-[18px] border-white/[.05]" />
              <p className="relative text-sm text-white/70">A little progress goes a long way</p>
              <div className="relative mt-4 flex items-end justify-between">
                <div><p className="font-display text-3xl font-semibold">{completedToday}<span className="text-xl font-normal text-white/60"> / {todayTasks.length}</span></p><p className="mt-1 text-xs text-white/65">tasks completed today</p></div>
                <div className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-white/25 text-sm font-semibold" style={{ background: `conic-gradient(#d5e7c9 ${progress}%, transparent 0)` }}><span className="grid h-10 w-10 place-items-center rounded-full bg-[#285840]">{progress}%</span></div>
              </div>
            </div>
            <StatCard label="Open tasks" value={tasks.filter((task) => !task.completed).length} note="Across your workspace" icon="inbox" />
            <StatCard label="Coming up" value={tasks.filter((task) => task.date !== "Today" && !task.completed).length} note="Ready when you are" icon="calendar" />
          </section>

          <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
              <div>
                <h2 className="font-display text-base font-semibold text-ink">{filter === "Today" ? "Today’s tasks" : filter}</h2>
                <p className="mt-0.5 text-xs text-muted">{visibleTasks.length} {visibleTasks.length === 1 ? "thing" : "things"} on your list</p>
              </div>
              <button onClick={() => { setDialogTask(null); setDialogOpen(true); }} className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-forest transition hover:bg-[#f0f5f0]"><Icon name="plus" size={15} /> Add a task</button>
            </div>
            {visibleTasks.length ? (
              <div>{visibleTasks.map((task) => <TaskRow key={task.id} task={task} onToggle={(id) => setTasks((current) => current.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))} onEdit={(item) => { setDialogTask(item); setDialogOpen(true); }} onDelete={deleteTask} />)}</div>
            ) : (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#edf3ed] text-forest"><Icon name="check" size={20} /></div>
                <p className="mt-3 text-sm font-semibold text-ink">Nothing on this list just yet</p>
                <p className="mt-1 text-xs text-muted">Enjoy the breathing room, or add a task to get started.</p>
                <button onClick={() => { setDialogTask(null); setDialogOpen(true); }} className="mt-4 text-xs font-semibold text-forest hover:underline">Create a task</button>
              </div>
            )}
          </section>
          <p className="mt-6 text-center text-xs text-[#a0a8a1]">Take a breath. You’re right where you need to be.</p>
        </div>
      </main>
      {dialogOpen && <TaskDialog initialTask={dialogTask} onClose={() => { setDialogOpen(false); setDialogTask(null); }} onSave={saveTask} />}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-[#233d2d] px-4 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>}
    </div>
  );
}

function StatCard({ label, value, note, icon }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between"><p className="text-sm font-medium text-muted">{label}</p><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f1f5f1] text-forest"><Icon name={icon} size={16} /></span></div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState("");
  return user ? <Dashboard user={user} onLogout={() => setUser("")} /> : <AuthScreen onLogin={setUser} />;
}
