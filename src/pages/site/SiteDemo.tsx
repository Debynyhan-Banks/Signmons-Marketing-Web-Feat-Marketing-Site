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

type LiveDemoSubmitResponse = {
  leadId?: string;
  status?: string;
  message?: string;
};

type LiveDemoStatusResponse = {
  leadId?: string;
  status?: string;
  message?: string;
};

const stripControlChars = (value: string) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

const sanitizeText = (value: string) => stripControlChars(value).trim();
const normalizeEmail = (value: string) => sanitizeText(value).toLowerCase();

const normalizePhone = (value: string) => {
  const trimmed = sanitizeText(value);
  if (!trimmed) return '';
  if (trimmed.startsWith('+')) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return trimmed;
};

const isValidE164 = (value: string) => /^\+[1-9]\d{9,14}$/.test(value);
const getTimeZone = (fallbackTimeZone: string) =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || fallbackTimeZone;

const getUtmParams = () => {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || undefined;
  const medium = params.get('utm_medium') || undefined;
  const campaign = params.get('utm_campaign') || undefined;
  if (!source && !medium && !campaign) return undefined;
  return { source, medium, campaign };
};

const normalizeStatus = (status: string | undefined) =>
  (status || 'queued').toLowerCase().replace(/\s+/g, '_');

const isSuccessStatus = (status: string) =>
  ['completed', 'success', 'succeeded', 'booked', 'connected'].some((token) =>
    status.includes(token),
  );

const isFailureStatus = (status: string) =>
  ['failed', 'error', 'rejected', 'cancelled', 'timed_out', 'timeout'].some((token) =>
    status.includes(token),
  );

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
  const pollTimeoutRef = useRef<number | null>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [liveStatus, setLiveStatus] = useState('');
  const [liveError, setLiveError] = useState('');
  const [submittingLive, setSubmittingLive] = useState(false);

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
      if (pollTimeoutRef.current) {
        window.clearTimeout(pollTimeoutRef.current);
      }
    };
  }, []);

  const resolveStatusLabel = (status: string) => {
    if (!status) return '';
    if (isSuccessStatus(status)) return siteDemoContent.liveFlow.statusLabels.success;
    if (isFailureStatus(status)) return siteDemoContent.liveFlow.statusLabels.failed;
    if (status.includes('queued') || status.includes('pending')) {
      return siteDemoContent.liveFlow.statusLabels.queued;
    }
    return siteDemoContent.liveFlow.statusLabels.inProgress;
  };

  const pollDemoStatus = async (targetLeadId: string, attempt: number) => {
    if (attempt >= siteDemoContent.liveFlow.api.pollMaxAttempts) {
      setLiveError(siteDemoContent.liveFlow.errors.statusPollFailed);
      setLiveStatus('failed');
      return;
    }

    try {
      const response = await fetch(
        `${siteDemoContent.liveFlow.api.statusEndpointBase}/${targetLeadId}`,
      );
      const payload = (await response.json()) as LiveDemoStatusResponse;
      if (!response.ok) {
        throw new Error(payload.message || siteDemoContent.liveFlow.errors.statusPollFailed);
      }

      const normalized = normalizeStatus(payload.status);
      setLiveStatus(normalized);

      if (isSuccessStatus(normalized) || isFailureStatus(normalized)) {
        return;
      }
    } catch {
      setLiveError(siteDemoContent.liveFlow.errors.statusPollFailed);
      setLiveStatus('failed');
      return;
    }

    pollTimeoutRef.current = window.setTimeout(() => {
      void pollDemoStatus(targetLeadId, attempt + 1);
    }, siteDemoContent.liveFlow.api.pollIntervalMs);
  };

  const startLiveDemo = async () => {
    const normalizedPhone = normalizePhone(phone);
    if (!isValidE164(normalizedPhone)) {
      setLiveError(siteDemoContent.liveFlow.errors.invalidPhone);
      return;
    }
    if (!consent) {
      setLiveError(siteDemoContent.liveFlow.errors.consentRequired);
      return;
    }

    setSubmittingLive(true);
    setLeadId('');
    setLiveStatus('');
    setLiveError('');

    const safeName = sanitizeText(name);
    const safeEmail = normalizeEmail(email);
    const safeCompany = sanitizeText(company);
    const utm = getUtmParams();

    const payload: Record<string, unknown> = {
      phone: normalizedPhone,
      consentToAutoCall: true,
      consentTextVersion: siteDemoContent.liveFlow.api.consentTextVersion,
      timezone: getTimeZone(siteDemoContent.liveFlow.api.fallbackTimeZone),
    };

    if (safeName) payload.name = safeName;
    if (safeEmail) payload.email = safeEmail;
    if (safeCompany) payload.company = safeCompany;
    if (utm) payload.utm = utm;
    if (typeof window !== 'undefined') payload.referrerUrl = window.location.href;

    try {
      const response = await fetch(siteDemoContent.liveFlow.api.submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const submitPayload = (await response.json()) as LiveDemoSubmitResponse;
      if (!response.ok) {
        throw new Error(submitPayload.message || siteDemoContent.liveFlow.errors.requestFailed);
      }

      if (!submitPayload.leadId) {
        throw new Error(siteDemoContent.liveFlow.errors.missingLeadId);
      }

      setLeadId(submitPayload.leadId);
      setLiveStatus(normalizeStatus(submitPayload.status));
      await pollDemoStatus(submitPayload.leadId, 0);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : siteDemoContent.liveFlow.errors.requestFailed;
      setLiveError(message);
    } finally {
      setSubmittingLive(false);
    }
  };

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

      <div className="live-demo-section fade-in">
        <p className="section-tag">{siteDemoContent.liveFlow.tag}</p>
        <h2 className="section-title">{siteDemoContent.liveFlow.title}</h2>
        <p className="section-sub">{siteDemoContent.liveFlow.subtitle}</p>
        <div className="live-demo-card">
          <div className="live-demo-grid">
            <div className="form-group">
              <label htmlFor="demo-phone">{siteDemoContent.liveFlow.fields.phoneLabel}</label>
              <input
                id="demo-phone"
                type="tel"
                className="chat-input"
                placeholder={siteDemoContent.liveFlow.fields.phonePlaceholder}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="demo-name">{siteDemoContent.liveFlow.fields.nameLabel}</label>
              <input
                id="demo-name"
                type="text"
                className="chat-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="demo-email">{siteDemoContent.liveFlow.fields.emailLabel}</label>
              <input
                id="demo-email"
                type="email"
                className="chat-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="demo-company">{siteDemoContent.liveFlow.fields.companyLabel}</label>
              <input
                id="demo-company"
                type="text"
                className="chat-input"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>
          </div>
          <label className="check-opt" htmlFor="demo-consent">
            <input
              id="demo-consent"
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />{' '}
            {siteDemoContent.liveFlow.fields.consentLabel}
          </label>
          <button
            className="btn-primary live-demo-submit"
            type="button"
            onClick={() => void startLiveDemo()}
            disabled={submittingLive}
          >
            {submittingLive
              ? siteDemoContent.liveFlow.submittingLabel
              : siteDemoContent.liveFlow.submitLabel}
          </button>
          {leadId ? <p className="live-demo-meta">Lead ID: {leadId}</p> : null}
          {liveStatus ? (
            <p className="live-demo-status" data-status={liveStatus}>
              {resolveStatusLabel(liveStatus)}
            </p>
          ) : null}
          {liveError ? <p className="contact-form-error">{liveError}</p> : null}
        </div>
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
