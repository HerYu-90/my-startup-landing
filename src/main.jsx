import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const steps = [
  { number: '01', title: '반려견 등록', detail: '우리 아이의 견종과 나이를 알려주세요.', screen: 'profile' },
  { number: '02', title: '산책 시작', detail: '오늘 컨디션에 맞춰 산책을 시작해요.', screen: 'start' },
  { number: '03', title: '걷고, 기록하고', detail: '산책 경로와 거리, 시간이 자동으로 기록돼요.', screen: 'walk' },
  { number: '04', title: '기분도 남기기', detail: '산책 후 오늘의 기분을 가볍게 남겨요.', screen: 'diary' },
  { number: '05', title: '다음 길 추천', detail: '쌓인 기록으로 우리 아이에게 맞는 길을 찾아요.', screen: 'recommend' },
];

const features = [
  {
    icon: 'route',
    title: '우리 아이 맞춤 코스',
    description: '견종과 나이, 그날의 컨디션까지 고려해 부담 없는 산책 코스를 추천해요.',
    tone: 'green',
  },
  {
    icon: 'pin',
    title: '산책은 알아서 기록',
    description: 'GPS로 이동 경로와 거리, 시간을 자동으로 저장해 산책에만 집중할 수 있어요.',
    tone: 'green',
  },
  {
    icon: 'heart',
    title: '차곡차곡 컨디션 다이어리',
    description: '산책 후 기분과 상태를 기록하고, 우리 아이의 변화를 한눈에 살펴봐요.',
    tone: 'green',
  },
];

function Icon({ name, size = 24 }) {
  const paths = {
    route: <><path d="M4 19c3.5-1.5 3-6 6.5-7.5S15 13 20 5" /><circle cx="5" cy="19" r="2" /><circle cx="20" cy="5" r="2" /><path d="M10 11.5 8.5 9m7.2 2.3 2.2-2.1" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    heart: <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    paw: <><ellipse cx="12" cy="15.5" rx="5.2" ry="4" /><ellipse cx="5.5" cy="9" rx="2" ry="2.6" /><ellipse cx="10" cy="6.5" rx="2" ry="2.6" /><ellipse cx="15" cy="6.5" rx="2" ry="2.6" /><ellipse cx="18.5" cy="9" rx="2" ry="2.6" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function WalkIllustration() {
  return (
    <svg className="walk-art" viewBox="0 0 560 380" role="img" aria-label="초록 옷을 입은 보호자와 강아지의 산책">
      <circle cx="285" cy="178" r="148" fill="#effff2" />
      <circle cx="135" cy="132" r="8" fill="#20c95a" />
      <circle cx="435" cy="112" r="5" fill="#20c95a" />
      <path d="M116 310h335" stroke="#d8f5df" strokeWidth="8" strokeLinecap="round" />
      <path d="M226 232c-5-30-3-56 5-79h49c13 21 17 47 14 79Z" fill="#18c653" />
      <path d="m238 225-8 72m47-70 14 70" stroke="#111813" strokeWidth="17" strokeLinecap="round" />
      <path d="M220 300h-17m94 0h17" stroke="#111813" strokeWidth="11" strokeLinecap="round" />
      <path d="m225 164-32 46m81-45 39 35" stroke="#f4bd91" strokeWidth="14" strokeLinecap="round" />
      <circle cx="253" cy="132" r="27" fill="#f4bd91" />
      <path d="M227 128c-1-24 13-39 34-36 14 2 22 12 21 27-12-7-24-9-36-5-5 6-11 11-19 14Z" fill="#111813" />
      <path d="m312 200 78 16" stroke="#111813" strokeWidth="3" strokeLinecap="round" />
      <path d="M347 242c13-24 35-32 62-25 18 5 29 19 43 19l13 3c17 4 24 19 19 34l-7 19c-6 15-24 23-43 18l-57-4c-25-2-40-17-43-35-2-11 3-21 13-29Z" fill="#111813" />
      <path d="M422 228c5-21 23-33 36-25 10 6 8 18 1 33m-54 69-4 25m49-23 4 23" fill="#111813" stroke="#111813" strokeWidth="12" strokeLinecap="round" />
      <path d="M438 235c15 11 29 13 43 8" stroke="#18c653" strokeWidth="7" strokeLinecap="round" />
      <circle cx="459" cy="248" r="3" fill="#fff" />
      <path d="M474 264c5 3 10 3 14 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="513" cy="184" r="15" fill="#18c653" />
      <path d="m507 184 4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M157 240c-10-12-7-24 5-29" fill="none" stroke="#18c653" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function PhoneMockup({ screen = 'walk', compact = false }) {
  const content = {
    profile: <><div className="mock-greeting">반가워요, 보호자님!</div><div className="mock-dog-avatar">🐶</div><strong>초코를 소개해 주세요</strong><div className="mock-input">견종　말티즈</div><div className="mock-input">나이　3살</div><div className="mock-button">우리 아이 등록하기</div></>,
    start: <><div className="mock-topline">오늘의 산책</div><div className="mock-weather">☀️　산책하기 좋은 날이에요</div><div className="mock-map map-soft"><span className="map-route" /></div><strong>초코와 함께 걸어볼까요?</strong><div className="mock-button">산책 시작하기</div></>,
    walk: <><div className="mock-topline">초코와 산책 중</div><div className="mock-map"><span className="map-route" /></div><div className="mock-stats"><div><b>1.2</b><small>km</small><span>거리</span></div><div><b>24</b><small>분</small><span>시간</span></div></div><div className="mock-button">산책 완료</div></>,
    diary: <><div className="mock-topline">오늘 산책 어땠나요?</div><div className="diary-face">☺</div><strong>기분 좋게 잘 걸었어요!</strong><div className="mood-row"><span>😊</span><span>😌</span><span>😴</span></div><div className="mock-input">오늘의 한마디를 남겨주세요</div><div className="mock-button">기록 저장하기</div></>,
    recommend: <><div className="mock-topline">초코를 위한 오늘의 코스</div><div className="mock-map"><span className="map-route long-route" /></div><strong>초록빛 공원 한 바퀴</strong><div className="mock-recommend">🐾　1.5km · 25분 · 완만한 길</div><div className="mock-button">이 코스로 산책하기</div></>,
  }[screen];
  return (
    <div className={`phone ${compact ? 'phone-compact' : ''}`} aria-label="멍스텝 앱 화면 예시">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="mock-header"><span>9:41</span><span>●●● ▰</span></div>
        {content}
      </div>
    </div>
  );
}

function App() {
  const [heroEmail, setHeroEmail] = useState('');
  const [form, setForm] = useState({ email: '', breed: '', age: '', region: '', privacy: false, marketing: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [showSticky, setShowSticky] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 620);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    const applySection = document.getElementById('apply');
    const observer = new IntersectionObserver(([entry]) => setApplyVisible(entry.isIntersecting), { threshold: 0.05 });
    if (applySection) observer.observe(applySection);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToForm = (email = '') => {
    if (email) {
      setHeroEmail(email);
      setForm((current) => ({ ...current, email }));
    }
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('apply-email')?.focus({ preventScroll: true }), 450);
  };

  const updateForm = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = '올바른 이메일 주소를 입력해 주세요.';
    if (!form.breed.trim()) nextErrors.breed = '견종을 입력해 주세요.';
    if (!form.age) nextErrors.age = '나이를 선택해 주세요.';
    if (!form.region.trim()) nextErrors.region = '지역을 입력해 주세요.';
    if (!form.privacy) nextErrors.privacy = '개인정보 수집 및 이용에 동의해 주세요.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.querySelector('.field-error, .consent-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    console.info('멍스텝 사전 신청 (데모):', { ...form });
    setSubmitted(true);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="멍스텝 홈"><span className="brand-mark"><Icon name="paw" size={21} /></span><span>멍스텝</span></a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <a href="#how-it-works">이용 방법</a><a href="#features">주요 기능</a><a href="#apply">사전 신청</a>
        </nav>
        <button className="header-cta" onClick={() => scrollToForm()}>출시 알림 받기 <Icon name="arrow" size={17} /></button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> 우리 아이를 위한 똑똑한 산책</div>
            <h1>걸을수록<br />우리 아이에게<br /><span>꼭 맞는 산책길</span></h1>
            <p className="hero-description">견종·나이·컨디션을 고려한 산책 코스 추천부터<br className="desktop-break" /> 매일의 산책 기록까지, 멍스텝과 함께해요.</p>
            <form className="hero-signup" onSubmit={(event) => { event.preventDefault(); scrollToForm(heroEmail); }}>
              <label className="sr-only" htmlFor="hero-email">이메일 주소</label>
              <input id="hero-email" type="email" required placeholder="이메일 주소를 입력해 주세요" value={heroEmail} onChange={(event) => setHeroEmail(event.target.value)} />
              <button type="submit">출시 알림 받기 <Icon name="arrow" size={17} /></button>
            </form>
            <p className="hero-note"><Icon name="check" size={15} /> 출시 소식을 가장 먼저 알려드려요</p>
            <div className="hero-social-proof"><div className="avatar-stack"><span>🐕</span><span>🐩</span><span>🐕‍🦺</span></div><span><b>산책이 더 즐거워질</b> 보호자님을 기다려요</span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-label label-top"><span className="label-icon"><Icon name="route" size={19} /></span><span><b>오늘의 산책 코스</b><small>초코에게 딱 맞는 길</small></span></div>
            <WalkIllustration />
            <div className="visual-label label-bottom"><span className="sun-icon">☀</span><span><b>산책하기 좋은 날</b><small>초코와 함께 걸어볼까요?</small></span></div>
            <div className="hero-paw"><Icon name="paw" size={22} /></div>
          </div>
        </section>

        <section className="problem-section">
          <div className="section-shell problem-inner">
            <div className="section-heading">
              <div className="eyebrow">EVERYDAY WALK</div>
              <h2>오늘도 같은 길만<br className="mobile-break" /> 걷고 있나요?</h2>
              <p>매일 산책은 소중하니까, 조금 더 우리 아이답게.</p>
            </div>
            <div className="problem-grid">
              <article className="problem-card"><span className="problem-emoji">🔁</span><h3>늘 걷던 그 길, 조금 지겨워요</h3><p>새로운 코스를 찾고 싶어도<br />어디로 가야 할지 막막해요.</p><span className="problem-scribble">~</span></article>
              <article className="problem-card"><span className="problem-emoji">🐾</span><h3>우리 아이에게 맞는지 모르겠어요</h3><p>나이와 컨디션을 고려한<br />산책이 쉽지 않아요.</p><span className="problem-scribble">✳</span></article>
              <article className="problem-card"><span className="problem-emoji">📝</span><h3>산책 기록이 기억에만 남아요</h3><p>얼마나 걸었는지, 오늘 기분은<br />어땠는지 놓치기 쉬워요.</p><span className="problem-scribble">♡</span></article>
            </div>
          </div>
        </section>

        <section className="journey-section section-shell" id="how-it-works">
          <div className="section-heading">
            <div className="eyebrow">A LITTLE WALK, A LOT OF CARE</div>
            <h2>산책이 쌓일수록<br /><span>더 잘 알게 되니까</span></h2>
            <p>처음부터 다음 산책까지, 멍스텝이 함께할게요.</p>
          </div>
          <div className="journey-layout">
            <div className="step-list">
              {steps.map((step, index) => (
                <button className={`step-item ${activeStep === index ? 'active' : ''}`} key={step.number} onClick={() => setActiveStep(index)}>
                  <span className="step-number">{step.number}</span><span className="step-copy"><b>{step.title}</b><small>{step.detail}</small></span><span className="step-arrow"><Icon name="arrow" size={18} /></span>
                </button>
              ))}
            </div>
            <div className="phone-showcase">
              <div className="showcase-orbit orbit-one" /><div className="showcase-orbit orbit-two" />
              <div className="showcase-caption"><span>멍스텝 앱 미리보기</span><b>{steps[activeStep].number} / 05</b></div>
              <PhoneMockup screen={steps[activeStep].screen} />
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-shell">
            <div className="section-heading">
              <div className="eyebrow">MADE FOR YOUR BEST FRIEND</div>
              <h2>매일의 산책을 바꾸는<br /><span>작은 차이</span></h2>
              <p>우리 아이에게 꼭 필요한 산책 경험을 담았어요.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className={`feature-card ${feature.tone}`} key={feature.title}>
                  <div className="feature-top"><span className="feature-icon"><Icon name={feature.icon} size={26} /></span><span className="feature-index">0{index + 1}</span></div>
                  <h3>{feature.title}</h3><p>{feature.description}</p>
                  <div className="feature-doodle" aria-hidden="true">{index === 0 ? <span className="doodle-route">⌁</span> : index === 1 ? <span className="doodle-pin">⌖</span> : <span className="doodle-heart">♡</span>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="apply-section section-shell" id="apply">
          <div className="apply-card">
            <div className="apply-aside">
              <div className="eyebrow"><span className="eyebrow-dot" /> COMING SOON</div>
              <h2>첫 산책 소식,<br /><span>가장 먼저 만나보세요</span></h2>
              <p>멍스텝의 새로운 소식을 전해드릴게요.<br />우리 아이와 함께할 산책을 기대해 주세요!</p>
              <div className="apply-art-wrap"><WalkIllustration /></div>
              <div className="apply-aside-note"><span>🐾</span> 산책이 기다려지는 매일을 위해</div>
            </div>
            <div className="apply-form-side">
              {submitted ? (
                <div className="success-state" role="status">
                  <span className="success-icon"><Icon name="check" size={34} /></span>
                  <div className="eyebrow">YOU'RE ON THE LIST</div>
                  <h3>사전 신청이<br />완료되었어요!</h3>
                  <p><b>{form.email}</b>로 멍스텝의 출시 소식을<br className="desktop-break" /> 가장 먼저 전해드릴게요.</p>
                  <div className="success-paw"><Icon name="paw" size={25} /></div>
                  <button className="text-button" onClick={() => { setSubmitted(false); document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }}>멍스텝 더 둘러보기 <Icon name="arrow" size={17} /></button>
                </div>
              ) : (
                <form className="application-form" onSubmit={submitForm} noValidate>
                  <div className="form-heading"><h3>사전 신청하기</h3><p>간단한 정보를 남겨주시면 출시 소식을 알려드려요.</p></div>
                  <div className="form-field">
                    <label htmlFor="apply-email">이메일 <span>*</span></label>
                    <input id="apply-email" name="email" type="email" autoComplete="email" placeholder="hello@example.com" value={form.email} onChange={updateForm} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <small className="field-error" id="email-error">{errors.email}</small>}
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="breed">반려견 견종 <span>*</span></label>
                      <input id="breed" name="breed" placeholder="예: 말티즈" value={form.breed} onChange={updateForm} aria-invalid={Boolean(errors.breed)} />
                      {errors.breed && <small className="field-error">{errors.breed}</small>}
                    </div>
                    <div className="form-field">
                      <label htmlFor="age">반려견 나이 <span>*</span></label>
                      <select id="age" name="age" value={form.age} onChange={updateForm} aria-invalid={Boolean(errors.age)}>
                        <option value="">나이 선택</option><option value="1세 미만">1세 미만</option><option value="1–3세">1–3세</option><option value="4–7세">4–7세</option><option value="8세 이상">8세 이상</option>
                      </select>
                      {errors.age && <small className="field-error">{errors.age}</small>}
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="region">산책하는 지역 <span>*</span></label>
                    <input id="region" name="region" placeholder="예: 서울시 마포구" value={form.region} onChange={updateForm} aria-invalid={Boolean(errors.region)} />
                    {errors.region && <small className="field-error">{errors.region}</small>}
                  </div>
                  <div className="consent-list">
                    <label className={`consent-item ${errors.privacy ? 'has-error' : ''}`}><input name="privacy" type="checkbox" checked={form.privacy} onChange={updateForm} /><span className="custom-check"><Icon name="check" size={14} /></span><span><b>[필수]</b> 개인정보 수집 및 이용에 동의합니다.</span><button type="button" className="policy-link" onClick={() => window.alert('데모 페이지입니다. 입력 정보는 서버로 전송되지 않습니다.')}>내용 보기</button></label>
                    {errors.privacy && <small className="field-error consent-error">{errors.privacy}</small>}
                    <label className="consent-item"><input name="marketing" type="checkbox" checked={form.marketing} onChange={updateForm} /><span className="custom-check"><Icon name="check" size={14} /></span><span><b>[선택]</b> 멍스텝 소식과 혜택을 받아볼게요.</span></label>
                  </div>
                  <button className="submit-button" type="submit">사전 신청하고 출시 알림 받기 <Icon name="arrow" size={18} /></button>
                  <p className="form-privacy-note"><Icon name="check" size={14} /> 입력하신 정보는 출시 알림 목적으로만 사용돼요.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-inner"><span className="closing-paw"><Icon name="paw" size={24} /></span><p>우리 아이의 오늘 산책이<br className="mobile-break" /> 내일의 좋은 길이 되도록</p><button onClick={() => scrollToForm()}>멍스텝과 함께하기 <Icon name="arrow" size={17} /></button></div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><Icon name="paw" size={18} /></span> 멍스텝</div><p>걸을수록 우리 아이에게 꼭 맞는 산책길</p><small>© 2026 Mungstep. All rights reserved.</small></footer>

      <button className={`sticky-cta ${showSticky && !applyVisible ? 'visible' : ''}`} onClick={() => scrollToForm(heroEmail)} aria-hidden={!showSticky || applyVisible} tabIndex={showSticky && !applyVisible ? 0 : -1}>
        <span><b>우리 아이 산책길, 멍스텝에서</b><small>출시 소식을 가장 먼저 받아보세요</small></span><span className="sticky-button">사전 신청 <Icon name="arrow" size={16} /></span>
      </button>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
