import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import useSiteEffects from '../../hooks/useSiteEffects';
import { siteDemoContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';

type ChatRole = 'ai' | 'user' | 'success';

type ChatMessage = {
  id: number;
  role: ChatRole;
  text: string;
};

const SiteDemo = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'ai', text: siteDemoContent.chat.introMessage },
  ]);
  const nextIdRef = useRef(2);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);

  useSiteEffects();

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody) {
      return;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleVideoPlay();
    }
  };

  const sendMessage = () => {
    const value = chatInput.trim();
    if (!value) {
      return;
    }

    const userMessageId = nextIdRef.current;
    nextIdRef.current += 1;
    setMessages((prev) => [...prev, { id: userMessageId, role: 'user', text: value }]);
    setChatInput('');

    timeoutRef.current = window.setTimeout(() => {
      const reply = siteDemoContent.chat.responses[responseIndex % siteDemoContent.chat.responses.length];
      const aiMessageId = nextIdRef.current;
      nextIdRef.current += 1;
      setMessages((prev) => [...prev, { id: aiMessageId, role: 'ai', text: reply }]);

      if (responseIndex === siteDemoContent.chat.responses.length - 1) {
        successTimeoutRef.current = window.setTimeout(() => {
          const successMessageId = nextIdRef.current;
          nextIdRef.current += 1;
          setMessages((prev) => [
            ...prev,
            { id: successMessageId, role: 'success', text: siteDemoContent.chat.successMessage },
          ]);
        }, 600);
      }

      setResponseIndex((prev) => prev + 1);
    }, 900);
  };

  const handleChatInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <SiteNavigation
        activeLinkId="demo"
        navLinks={sitePrimaryLinks}
        ctaLabel={siteDemoContent.navCtaLabel}
        ctaHref={siteDemoContent.navCtaHref}
      />

      <SitePageHero
        tag={siteDemoContent.hero.tag}
        title={siteDemoContent.hero.title}
        accent={siteDemoContent.hero.accent}
        subtitle={siteDemoContent.hero.subtitle}
      />

      <div className="video-wrap fade-in">
        <div className="video-glow"></div>
        <div
          className={`video-frame${isVideoPlaying ? ' playing' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={siteDemoContent.video.frameLabel}
          onClick={handleVideoPlay}
          onKeyDown={handleVideoKeyDown}
        >
          <div className="video-placeholder">
            <div className="video-grid"></div>
            <div className="play-btn">▶</div>
            <p className="video-label">
              Watch the <strong>2:47 live demo</strong>
            </p>
          </div>
          <iframe
            title="Signmons live demo"
            src={isVideoPlaying ? siteDemoContent.video.url : ''}
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="chips fade-in">
        {siteDemoContent.chips.map((chip) => (
          <div key={chip.id} className="chip">
            <span className="dot">✓</span> {chip.text}
          </div>
        ))}
      </div>

      <div className="chat-section fade-in">
        <p className="section-tag">{siteDemoContent.chat.tag}</p>
        <h2 className="section-title">{siteDemoContent.chat.title}</h2>
        <p className="section-sub">{siteDemoContent.chat.subtitle}</p>
        <div className="chat-header">
          <div className="ai-avatar">🤖</div>
          <div className="ai-info">
            <strong>{siteDemoContent.chat.agentName}</strong>
            <span>
              <span className="online-dot"></span>
              {siteDemoContent.chat.statusLabel}
            </span>
          </div>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message) => (
            <div key={message.id} className={`msg ${message.role}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            placeholder={siteDemoContent.chat.inputPlaceholder}
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            onKeyDown={handleChatInputKeyDown}
          />
          <button className="chat-send" type="button" aria-label="Send message" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>

      <div className="try-section fade-in">
        <p className="section-tag">{siteDemoContent.channels.tag}</p>
        <h2 className="section-title">{siteDemoContent.channels.title}</h2>
        <div className="try-grid">
          {siteDemoContent.channels.items.map((item) => (
            <div key={item.id} className="try-card">
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteDemoContent.footerCopyright} />
    </>
  );
};

export default SiteDemo;
