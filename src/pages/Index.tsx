import { useState } from "react";

const PURPOSE_TEXT =
  "Добровольное пожертвование на уставную деятельность АНО содействия сохранению исторического наследия и патриотического воспитания «ПАТРИОТ ДВ», ИНН 2502079223, ОГРН 1242500028583. НДС не облагается.";

const AMOUNT_DESCS: Record<string, string> = {
  "100 ₽": "100 ₽ — метр ткани для маскировочного изделия",
  "300 ₽": "300 ₽ — расходные материалы для одного занятия в мастерской",
  "500 ₽": "500 ₽ — тёплые вещи для одной гуманитарной посылки",
  "1 000 ₽": "1 000 ₽ — полная комплектация одной посылки с вещами первой необходимости",
  "Своя": "Любая сумма имеет значение и будет направлена на уставную деятельность",
};

const FAQS = [
  { q: "Нет опыта — можно прийти?", a: "Да, и именно таких участников мы ждём. Опыт не нужен совсем — всему обучим прямо на месте. Приходите — уже через час будете делать что-то полезное." },
  { q: "Я живу не в Артёме — могу помочь?", a: "Конечно. Мы работаем по всему Приморскому краю — Владивосток, Уссурийск, Находка и другие города. Также можно помочь дистанционно: передать материалы или стать инфопартнёром из любого города." },
  { q: "Сколько времени нужно уделять?", a: "Достаточно 2–3 часов в неделю — или даже разово, если удобно именно так. Мы подберём формат под ваш график. Главное — желание помочь." },
  { q: "Можно прийти с детьми?", a: "Да, и это очень приветствуется. Участие детей в совместных делах — лучший урок патриотического воспитания. Дети занимаются рядом со взрослыми, ветеранами, ровесниками." },
  { q: "Как я узнаю, что помощь дошла?", a: "Публикуем подробные фото- и видеоотчёты после каждой передачи. Все отчёты доступны в открытом доступе в нашем сообществе ВКонтакте. Можете проверить сами — ничего скрывать не нужно." },
  { q: "Безопасно ли делать финансовый перевод?", a: "АНО «ПАТРИОТ ДВ» — официально зарегистрированная некоммерческая организация, ОГРН 1242500028583, ИНН 2502079223. Финансовая отчётность публикуется в соответствии с требованиями законодательства РФ. Вы вправе запросить подтверждение о принятии пожертвования." },
  { q: "Мы — организация. Как можно сотрудничать?", a: "Рады партнёрству со школами, спортивными клубами, предприятиями и общественными организациями Приморского края. Проведём урок мужества, патриотический турнир или совместную акцию — бесплатно, с полной подготовкой с нашей стороны. Заполните форму выше и выберите «Партнёрство»." },
];

function copyText(text: string, setCopied: (v: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
}

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="p-copy-btn" onClick={() => copyText(text, setCopied)}>
      {copied ? "✅ Скопировано" : label}
    </button>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`p-faq-item${open ? " open" : ""}`}>
      <button className="p-faq-q" onClick={() => setOpen(!open)}>
        {q}
        <span className="p-faq-arrow">▾</span>
      </button>
      {open && <div className="p-faq-a">{a}</div>}
    </div>
  );
}

export default function Index() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeAmount, setActiveAmount] = useState("500 ₽");
  const [agreed, setAgreed] = useState(false);

  function handleForm(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header className="p-header">
        <div className="p-container">
          <div className="p-header-inner">
            <div className="p-logo-block">
              <div className="p-logo-icon">🛡</div>
              <div className="p-logo-text">
                <strong>ПАТРИОТ ДВ</strong>
                <span>АНО · Приморский край</span>
              </div>
            </div>
            <div className="p-header-trust">
              <strong>🔒 Официальная организация</strong><br />
              ОГРН 1242500028583 · ИНН 2502079223
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="p-hero">
        <div className="p-container">
          <div className="p-hero-inner">
            <div>
              <div className="p-hero-badge">
                <span>●</span> Работаем по всему Приморскому краю
              </div>
              <h1>
                Каждый житель Приморья<br />
                может сделать <em>что-то конкретное</em><br />
                для тех, кто служит Родине
              </h1>
              <p className="p-hero-sub">
                АНО «ПАТРИОТ ДВ» — официальная некоммерческая организация Приморского края.
                Содействуем сохранению исторического и культурного наследия, патриотическому
                воспитанию молодёжи и поддержке тех, кто служит Отечеству.
              </p>
              <div className="p-hero-hook">
                «За одним столом плетут маскировочные сети школьники, ветераны и
                предприниматели — каждое изделие уходит с сигналом: о вас помнят, вы не одни.»
              </div>
              <div className="p-hero-stats">
                <div className="p-stat-item">
                  <span className="p-stat-num">120+</span>
                  <span className="p-stat-label">волонтёров в крае</span>
                </div>
                <div className="p-stat-item">
                  <span className="p-stat-num">40+</span>
                  <span className="p-stat-label">акций проведено</span>
                </div>
                <div className="p-stat-item">
                  <span className="p-stat-num">15+</span>
                  <span className="p-stat-label">школ-партнёров</span>
                </div>
                <div className="p-stat-item">
                  <span className="p-stat-num">2024</span>
                  <span className="p-stat-label">год основания</span>
                </div>
              </div>
              <div className="p-btn-group">
                <a href="#form" className="p-btn p-btn-primary">Хочу участвовать →</a>
                <a href="#directions" className="p-btn p-btn-outline">Как могу помочь</a>
              </div>
            </div>

            {/* HERO FORM */}
            <div className="p-hero-card" id="form">
              <h3>Выберите удобный формат участия</h3>
              <p>Заполните форму — свяжемся в течение рабочего дня и всё объясним</p>
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✅</div>
                  <h3 style={{ color: "#4CAF50", marginBottom: "8px" }}>Заявка отправлена!</h3>
                  <p style={{ color: "var(--muted-c)", fontSize: "0.9rem" }}>Свяжемся в течение рабочего дня</p>
                </div>
              ) : (
                <form onSubmit={handleForm}>
                  <div className="p-form-group">
                    <label>Ваше имя</label>
                    <input type="text" placeholder="Как к вам обращаться?" required />
                  </div>
                  <div className="p-form-group">
                    <label>Телефон или ник ВКонтакте</label>
                    <input type="text" placeholder="+7 (___) ___-__-__ или @nik" required />
                  </div>
                  <div className="p-form-group">
                    <label>Город / район Приморья</label>
                    <input type="text" placeholder="Артём, Владивосток, Уссурийск…" />
                  </div>
                  <div className="p-form-group">
                    <label>Как хотите участвовать?</label>
                    <select defaultValue="">
                      <option value="">— выберите вариант —</option>
                      <option>Прийти лично — плести, собирать, помогать</option>
                      <option>Передать материалы или вещи</option>
                      <option>Школа / клуб / организация (партнёрство)</option>
                      <option>Информационная поддержка</option>
                      <option>Финансовая помощь</option>
                      <option>Ещё не решил(а) — расскажите подробнее</option>
                    </select>
                  </div>
                  <div className="p-check-row">
                    <input
                      type="checkbox"
                      id="pd"
                      required
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="pd">
                      Согласен(а) на обработку персональных данных. Контакты не передаются третьим лицам.
                    </label>
                  </div>
                  <button type="submit" className="p-btn p-btn-primary p-btn-full">
                    Отправить заявку
                  </button>
                  <div className="p-form-hint">🔒 Данные защищены · Ответим в течение дня</div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="p-section">
        <div className="p-container">
          <div className="p-mission-grid">
            <div className="p-mission-text">
              <span className="p-section-label">Наша миссия</span>
              <h2>Содействие сохранению исторического и культурного наследия Приморья</h2>
              <p>
                Мы убеждены: любовь к Родине — это не лозунг, а ежедневные действия.
                АНО «ПАТРИОТ ДВ» создаёт условия, в которых каждый житель Приморского края
                может стать частью живой истории своей страны.
              </p>
              <p>
                Работаем с детьми и молодёжью, ветеранами, школами, предприятиями и
                общественными организациями — от Артёма до самых отдалённых районов
                Приморского края.
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted-c)" }}>
                Организация официально зарегистрирована и действует в соответствии с Уставом
                и законодательством Российской Федерации.<br />
                <strong>ОГРН 1242500028583 · ИНН 2502079223</strong>
              </p>
            </div>
            <div className="p-mission-pillars">
              {[
                { i: "📜", t: "Историческая и культурная память", d: "Совместные проекты со школами, музеями и ветеранскими организациями края. Живое слово, а не только учебники." },
                { i: "🎖", t: "Патриотическое воспитание молодёжи", d: "Уроки мужества, встречи с ветеранами, турниры и акции по всему Приморскому краю. Бесплатно для школ." },
                { i: "🤝", t: "Поддержка тех, кто служит Отечеству", d: "Гуманитарные акции, волонтёрские мастерские, адресная помощь военнослужащим и их семьям." },
                { i: "👨‍👩‍👧‍👦", t: "Межпоколенческое единство", d: "За одним столом — школьники, пенсионеры и предприниматели. Преемственность поколений как живая традиция." },
              ].map((p, i) => (
                <div key={i} className="p-pillar">
                  <div className="p-pillar-icon">{p.i}</div>
                  <div>
                    <h4>{p.t}</h4>
                    <p>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="p-stats-bar">
        <div className="p-container">
          <div className="p-stats-inner">
            {[
              { n: "120+", l: "Волонтёров по Приморью" },
              { n: "40+", l: "Проведённых акций" },
              { n: "15+", l: "Школ и клубов-партнёров" },
              { n: "100%", l: "Открытая отчётность" },
            ].map((s, i) => (
              <div key={i}>
                <span className="p-sbar-num">{s.n}</span>
                <span className="p-sbar-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW WE WORK ── */}
      <section className="p-section">
        <div className="p-container">
          <div className="p-section-header">
            <span className="p-section-label navy">Как мы работаем</span>
            <h2>Каждый проект — от задачи до публичного отчёта</h2>
            <p>Прозрачная структура работы, которую может проверить любой желающий</p>
          </div>
          <div className="p-steps">
            {[
              { n: 1, t: "Определяем приоритеты", d: "Выбираем, кому нужна помощь больше всего: воспитательные программы, историческая память, поддержка ветеранов и их семей." },
              { n: 2, t: "Привлекаем участников", d: "Волонтёры, школы, предприятия и организации Приморского края — рядом с нами те, кому небезразлично." },
              { n: 3, t: "Реализуем вместе", d: "Уроки мужества, патриотические акции, гуманитарные мероприятия и культурные проекты по всему краю." },
              { n: 4, t: "Публикуем отчёт", d: "Фото, видео, цифры — каждое мероприятие задокументировано и доступно в открытом доступе." },
            ].map((s, i) => (
              <div key={i} className="p-step">
                <div className="p-step-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECTIONS ── */}
      <section className="p-section-alt" id="directions">
        <div className="p-container">
          <div className="p-section-header">
            <span className="p-section-label">Как вы можете помочь</span>
            <h2>Выберите удобный формат участия</h2>
            <p>Не нужен опыт и особые навыки — всему обучим на месте. Главное — желание.</p>
          </div>
          <div className="p-cards-grid">
            <div className="p-pcard">
              <div className="p-pcard-icon">🙌</div>
              <h3>Прийти лично — руки и время</h3>
              <p>Плетение маскировочных изделий, упаковка гуманитарных посылок, помощь на мероприятиях и акциях по всему Приморскому краю. Приходите одни или с детьми — всему научим на месте, опыт не нужен.</p>
              <div className="p-pcard-tags">
                <span className="p-tag">Без опыта</span>
                <span className="p-tag">С детьми</span>
                <span className="p-tag">Весь край</span>
              </div>
              <a href="#form" className="p-btn p-btn-primary">Узнать ближайшую точку →</a>
            </div>
            <div className="p-pcard">
              <div className="p-pcard-icon">📦</div>
              <h3>Передать материалы и ресурсы</h3>
              <p>Ткань, нити, тёплые вещи, продукты питания, транспорт — по актуальному списку нужд. Можно передать из любого города края. Расскажем, что сейчас нужно больше всего.</p>
              <div className="p-pcard-tags">
                <span className="p-tag">Из любого города</span>
                <span className="p-tag">Актуальный список</span>
              </div>
              <a href="#form" className="p-btn p-btn-dark">Получить список нужд →</a>
            </div>
            <div className="p-pcard">
              <div className="p-pcard-icon">🏫</div>
              <h3>Школам, клубам и организациям</h3>
              <p>Проведём урок мужества, патриотический турнир или совместный культурный проект. Полностью берём подготовку на себя. Бесплатно для образовательных учреждений Приморского края.</p>
              <div className="p-pcard-tags">
                <span className="p-tag">Бесплатно</span>
                <span className="p-tag">Весь край</span>
                <span className="p-tag">Любой возраст</span>
              </div>
              <a href="#form" className="p-btn p-btn-dark">Стать партнёром →</a>
            </div>
            <div className="p-pcard">
              <div className="p-pcard-icon">📢</div>
              <h3>Информационная поддержка</h3>
              <p>Рассказывайте о наших акциях и привлекайте новых участников. Подходит для блогеров, телеграм-каналов, местных СМИ и активных жителей Приморья — даже небольшая аудитория имеет значение.</p>
              <div className="p-pcard-tags">
                <span className="p-tag">Удалённо</span>
                <span className="p-tag">Любая аудитория</span>
              </div>
              <a href="#form" className="p-btn p-btn-dark">Стать инфопартнёром →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORIES ── */}
      <section className="p-section">
        <div className="p-container">
          <div className="p-section-header">
            <span className="p-section-label gold">Живые истории</span>
            <h2>Не лозунги — конкретные люди и события</h2>
            <p>Жители Приморья, которые уже делают что-то важное рядом с вами</p>
          </div>
          <div className="p-stories-grid">
            <div className="p-story-card">
              <div className="p-story-img s1">🎖</div>
              <div className="p-story-body">
                <h4>Ветераны Приморья — вместе с молодёжью</h4>
                <p>Регулярные встречи, где ветераны передают живую историю — не по учебнику, а лично. Студенты и школьники слушают, задают вопросы и остаются помогать.</p>
                <div className="p-story-quote">«Когда слышишь это от живого человека — это совсем другое.»</div>
              </div>
            </div>
            <div className="p-story-card">
              <div className="p-story-img s2">🧵</div>
              <div className="p-story-body">
                <h4>Школьники за столами мастерской</h4>
                <p>Ребята остаются после уроков, чтобы плести изделия и собирать посылки. За одним столом — ученики начальных классов, старшеклассники и пенсионеры.</p>
                <div className="p-story-quote">«Я не знала, что умею что-то важное. Теперь знаю.»</div>
              </div>
            </div>
            <div className="p-story-card">
              <div className="p-story-img s3">❤️</div>
              <div className="p-story-body">
                <h4>Семьи военнослужащих — не одни</h4>
                <p>Адресная поддержка семей тех, кто сейчас несёт службу. Гуманитарные посылки, психологическая поддержка, совместные мероприятия для детей.</p>
                <div className="p-story-quote">«Знать, что тебя не забыли — это уже очень много.»</div>
              </div>
            </div>
          </div>
          <div className="p-trust-row">
            <div className="p-trust-badge"><span>✅</span> Официальная НКО, ОГРН 1242500028583</div>
            <div className="p-trust-badge"><span>📋</span> Открытые отчёты о каждом мероприятии</div>
            <div className="p-trust-badge"><span>🗺</span> Работаем по всему Приморскому краю</div>
            <div className="p-trust-badge"><span>🏫</span> Партнёры — школы, ветеранские организации, клубы</div>
          </div>
        </div>
      </section>

      {/* ── DONATION ── */}
      <section className="p-section-alt" id="donate">
        <div className="p-container">
          <div className="p-donation-inner">
            <div className="p-donation-info">
              <span className="p-section-label">Финансовая поддержка</span>
              <h2>Помочь деятельности организации</h2>
              <p>
                АНО «ПАТРИОТ ДВ» — официально зарегистрированная некоммерческая организация.
                Добровольные пожертвования направляются исключительно на уставную деятельность.
              </p>
              <div className="p-donation-amounts">
                {["100 ₽", "300 ₽", "500 ₽", "1 000 ₽", "Своя"].map(a => (
                  <button
                    key={a}
                    className={`p-amount-btn${activeAmount === a ? " active" : ""}`}
                    onClick={() => setActiveAmount(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <p className="p-amount-desc">{AMOUNT_DESCS[activeAmount]}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted-c)" }}>
                Финансовая отчётность публикуется в открытом доступе в соответствии с
                требованиями Федерального закона «О некоммерческих организациях».
                Жертвователь вправе получить подтверждение о принятии пожертвования.
              </p>
            </div>
            <div className="p-donation-card">
              <h3>Выберите удобный способ перевода</h3>
              <div className="p-pay-method">
                <div className="p-pay-icon">💳</div>
                <div>
                  <div className="p-pay-label">Перевод по номеру карты</div>
                  <div className="p-pay-value">5228 6005 8695 8904</div>
                </div>
                <CopyBtn text="5228600586958904" label="Копировать" />
              </div>
              <div className="p-pay-method">
                <div className="p-pay-icon">📲</div>
                <div>
                  <div className="p-pay-label">СБП — по номеру телефона (любой банк)</div>
                  <div className="p-pay-value">+7-908-451-53-85</div>
                </div>
                <CopyBtn text="+79084515385" label="Копировать" />
              </div>
              <div className="p-pay-method">
                <div className="p-pay-icon">🏦</div>
                <div>
                  <div className="p-pay-label">Расчётный счёт организации</div>
                  <div className="p-pay-value">Реквизиты — в VK</div>
                </div>
                <a href="https://vk.com/patriotdv" target="_blank" rel="noreferrer" className="p-copy-btn">
                  Запросить →
                </a>
              </div>
              <div className="p-payment-purpose">
                <div className="p-pp-label">⚠️ Обязательное назначение платежа — скопируйте текст</div>
                <div className="p-pp-text">{PURPOSE_TEXT}</div>
                <CopyBtn text={PURPOSE_TEXT} label="📋 Скопировать назначение платежа" />
              </div>
              <div className="p-donation-trust">
                🔒 Все поступившие средства учитываются в соответствии с требованиями
                Федерального закона «О некоммерческих организациях».
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="p-section">
        <div className="p-container">
          <div className="p-section-header">
            <span className="p-section-label navy">Частые вопросы</span>
            <h2>Ответы на то, что волнует больше всего</h2>
          </div>
          <div className="p-faq-list">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="p-final-cta">
        <div className="p-container">
          <h2>Станьте частью живой истории Приморья</h2>
          <p>
            Не нужен опыт, много времени или особые навыки. Нужно только желание
            сделать что-то важное рядом с теми, кто служит Отечеству.
          </p>
          <div className="p-btn-group" style={{ justifyContent: "center" }}>
            <a href="#form" className="p-btn p-btn-primary">Заполнить заявку →</a>
            <a href="#donate" className="p-btn p-btn-gold">Поддержать финансово</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="p-footer">
        <div className="p-container">
          <div className="p-footer-inner">
            <div className="p-footer-col">
              <h5>АНО «ПАТРИОТ ДВ»</h5>
              <p>Региональная некоммерческая организация Приморского края</p>
              <p>ОГРН 1242500028583</p>
              <p>ИНН 2502079223</p>
              <p>г. Артём, Приморский край</p>
            </div>
            <div className="p-footer-col">
              <h5>Деятельность</h5>
              <p>Историческая и культурная память</p>
              <p>Патриотическое воспитание</p>
              <p>Волонтёрские мастерские</p>
              <p>Поддержка семей военнослужащих</p>
            </div>
            <div className="p-footer-col">
              <h5>Контакты и отчёты</h5>
              <a href="https://vk.com/patriotdv" target="_blank" rel="noreferrer">
                Сообщество ВКонтакте →
              </a>
              <p>Телефон: +7-908-451-53-85</p>
              <p style={{ marginTop: "10px", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
                Финансовая отчётность публикуется в открытом доступе в соответствии
                с требованиями законодательства РФ.
              </p>
            </div>
          </div>
          <div className="p-footer-bottom">
            © 2024–2026 АНО содействия сохранению исторического наследия и патриотического воспитания «ПАТРИОТ ДВ» ·
            Все права защищены
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <a href="#form" className="p-sticky-cta">Хочу участвовать →</a>
    </>
  );
}
