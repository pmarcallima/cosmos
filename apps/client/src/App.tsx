import { FormEvent, useMemo, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Compass,
  Hash,
  Headphones,
  Inbox,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Volume2,
} from 'lucide-react'

type Channel = { name: string; unread?: number; voice?: boolean }
type Message = { author: string; time: string; body: string; initials: string; color: string }

const channels: Channel[] = [
  { name: 'boas-vindas' },
  { name: 'anúncios', unread: 3 },
  { name: 'geral' },
  { name: 'ideias-e-feedback' },
  { name: 'desenvolvimento', unread: 8 },
  { name: 'Sala Lounge', voice: true },
  { name: 'Sala de foco', voice: true },
]

const initialMessages: Message[] = [
  { author: 'Lia Martins', time: 'Hoje às 08:42', body: 'Bom dia, pessoal! O novo espaço de projetos já está no ar. O que vocês acham do fluxo de canais?', initials: 'LM', color: '#f0a36b' },
  { author: 'Caio Nunes', time: 'Hoje às 08:47', body: 'Ficou muito mais fácil de encontrar as discussões. Gostei especialmente da separação entre conversa e foco.', initials: 'CN', color: '#8c83f5' },
  { author: 'Você', time: 'Hoje às 08:51', body: 'Também senti isso. Podemos testar threads para tirar decisões importantes do meio da conversa principal.', initials: 'PM', color: '#66c5a3' },
]

function App() {
  const [selectedChannel, setSelectedChannel] = useState('geral')
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const channelLabel = useMemo(() => channels.find((channel) => channel.name === selectedChannel), [selectedChannel])

  function sendMessage(event: FormEvent) {
    event.preventDefault()
    const body = draft.trim()
    if (!body) return
    setMessages((current) => [...current, { author: 'Você', time: 'agora', body, initials: 'PM', color: '#66c5a3' }])
    setDraft('')
  }

  return (
    <main className="app-shell">
      <aside className="rail">
        <button className="brand-mark" aria-label="Cosmos"><Sparkles size={21} /></button>
        <div className="rail-divider" />
        <button className="server active">N</button>
        <button className="server server-gradient">+</button>
        <button className="server muted"><Compass size={19} /></button>
        <div className="rail-spacer" />
        <button className="server muted"><Settings size={18} /></button>
      </aside>

      <aside className="sidebar">
        <button className="workspace-picker"><span><b>Cosmos Community</b><small>Espaço de colaboração</small></span><ChevronDown size={17} /></button>
        <div className="sidebar-actions"><button><Bell size={16} /> Notificações</button><button><ShieldCheck size={16} /> Segurança</button></div>
        <div className="channel-heading"><span>CANAIS DE TEXTO</span><button aria-label="Adicionar canal"><Plus size={16} /></button></div>
        <nav className="channel-list">
          {channels.map((channel) => (
            <button key={channel.name} className={`channel ${selectedChannel === channel.name ? 'selected' : ''}`} onClick={() => setSelectedChannel(channel.name)}>
              {channel.voice ? <Volume2 size={17} /> : <Hash size={17} />}<span>{channel.name}</span>{channel.unread && <em>{channel.unread}</em>}
            </button>
          ))}
        </nav>
        <div className="profile-card"><div className="avatar small">PM<span className="status-dot" /></div><div className="profile-copy"><b>Pedro Marçal</b><small>online</small></div><button aria-label="Configurações"><Settings size={16} /></button></div>
      </aside>

      <section className="conversation">
        <header className="topbar"><div className="channel-title"><Hash size={20} /><strong>{channelLabel?.name}</strong><span className="topbar-rule" /><p>Conversa aberta para todos</p></div><div className="topbar-actions"><button onClick={() => setSearchOpen(!searchOpen)} aria-label="Pesquisar"><Search size={19} /></button><button aria-label="Membros"><Users size={19} /></button><button aria-label="Caixa de entrada"><Inbox size={19} /></button><button aria-label="Mais opções"><MoreHorizontal size={20} /></button></div></header>
        {searchOpen && <div className="search-panel"><Search size={17} /><input autoFocus placeholder="Buscar mensagens, pessoas ou canais" /></div>}
        <div className="message-area"><div className="channel-intro"><div className="intro-icon"><Hash size={30} /></div><h1>Bem-vindo ao #{channelLabel?.name}</h1><p>Este é o começo do canal. Compartilhe ideias, decisões e atualizações com o time.</p></div>
          <div className="messages">{messages.map((message, index) => <article className="message" key={`${message.author}-${index}`}><div className="avatar" style={{ background: message.color }}>{message.initials}</div><div><div className="message-meta"><b>{message.author}</b>{message.author === 'Você' && <span className="you-badge">VOCÊ</span>}<time>{message.time}</time></div><p>{message.body}</p></div></article>)}</div>
        </div>
        <form className="composer" onSubmit={sendMessage}><button type="button" aria-label="Adicionar anexo"><Plus size={19} /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Conversar em #${channelLabel?.name}`} /><button type="button" aria-label="Ativar microfone"><Mic size={18} /></button><button type="button" aria-label="Iniciar vídeo"><Video size={18} /></button><button className="send-button" type="submit" aria-label="Enviar mensagem"><Send size={17} /></button></form>
      </section>

      <aside className="member-panel"><div className="member-header"><span>MEMBROS — 8</span><button><MoreHorizontal size={17} /></button></div><div className="member-group"><small>ONLINE — 5</small><Member initials="LM" name="Lia Martins" role="Admin" color="#f0a36b" /><Member initials="CN" name="Caio Nunes" role="Produto" color="#8c83f5" /><Member initials="PM" name="Pedro Marçal" role="Você" color="#66c5a3" /><Member initials="AR" name="Ana Rocha" role="Design" color="#d9829b" /></div><div className="member-group"><small>OFFLINE — 3</small><Member initials="GF" name="Gui Ferreira" role="Backend" color="#596079" offline /><Member initials="BC" name="Bia Costa" role="QA" color="#596079" offline /></div></aside>
    </main>
  )
}

function Member({ initials, name, role, color, offline = false }: { initials: string; name: string; role: string; color: string; offline?: boolean }) {
  return <div className={`member ${offline ? 'offline' : ''}`}><div className="avatar tiny" style={{ background: color }}>{initials}<span className="status-dot" /></div><span><b>{name}</b><small>{role}</small></span></div>
}

export default App
