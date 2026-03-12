import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6eaec7a6-a363-4c65-a5d5-2508d509e0f6/files/5d540144-7ba4-435e-9d90-e81b73816598.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const stats = [
  { v: "120+", l: "волонтёров" },
  { v: "40+", l: "акций проведено" },
  { v: "15+", l: "школ-партнёров" },
];

const pillars = [
  { i: "📜", t: "Историческая память", d: "Проекты со школами, музеями и ветеранскими организациями Приморья." },
  { i: "🎖", t: "Патриотическое воспитание", d: "Уроки мужества, встречи с ветеранами, турниры. Бесплатно." },
  { i: "🤝", t: "Поддержка служащих", d: "Гуманитарные акции, мастерские, помощь семьям военнослужащих." },
  { i: "👨‍👩‍👧", t: "Единство поколений", d: "Школьники, пенсионеры и предприниматели за одним столом." },
];

const steps = [
  { n: 1, t: "Определяем приоритеты", d: "Воспитательные программы, историческая память, поддержка ветеранов." },
  { n: 2, t: "Привлекаем участников", d: "Волонтёры, школы, предприятия Приморского края." },
  { n: 3, t: "Реализуем вместе", d: "Акции, уроки мужества, культурные мероприятия." },
  { n: 4, t: "Публикуем отчёт", d: "Фото, видео, цифры — в открытом доступе." },
];

const directions = [
  { i: "🙌", t: "Прийти лично", d: "Плетение сетей, упаковка посылок. Без опыта, можно с детьми.", cta: "Узнать адрес" },
  { i: "📦", t: "Передать материалы", d: "Ткань, вещи, транспорт. Из любого города Приморья.", cta: "Список нужд" },
  { i: "🏫", t: "Школам и организациям", d: "Проведём урок мужества или турнир. Полностью бесплатно.", cta: "Стать партнёром" },
  { i: "📢", t: "Инфоподдержка", d: "Для блогеров и жителей Приморского края.", cta: "Написать нам" },
];

const faqs = [
  { q: "Нет опыта — можно прийти?", a: "Да. Всему обучим на месте. Важно только желание помочь." },
  { q: "Живу не в Артёме?", a: "Работаем по всему Приморью. Можно помочь дистанционно." },
  { q: "Сколько времени нужно?", a: "2–3 часа в неделю или разово — подберём удобный формат." },
  { q: "Можно прийти с детьми?", a: "Да. Дети участвуют рядом со взрослыми и ветеранами." },
  { q: "Как узнаю, что помощь дошла?", a: "Публикуем фото- и видеоотчёты в группе ВКонтакте." },
  { q: "Безопасно ли переводить деньги?", a: "Да. Официальная НКО, ОГРН 1242500028583. Финотчётность открыта." },
];

const navLinks = [
  { l: "Главная", to: "#hero" },
  { l: "О миссии", to: "#mission" },
  { l: "Как помочь", to: "#dir" },
  { l: "Контакты", to: "#footer" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", city: "", format: "", agree: false });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-patriot-dark font-golos text-white overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-patriot-dark/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-patriot-red to-patriot-gold flex items-center justify-center text-sm font-bold font-oswald">ПДВ</div>
            <span className="font-oswald font-bold text-lg tracking-wide hidden sm:block">ПАТРИОТ ДВ</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(nl => (
              <a key={nl.l} href={nl.to} className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium tracking-wide">
                {nl.l}
              </a>
            ))}
          </div>

          <a href="#form" className="hidden md:flex items-center gap-2 bg-patriot-red hover:bg-patriot-red-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg btn-glow transition-all duration-300">
            Хочу участвовать
          </a>

          <button className="md:hidden text-white/80 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-patriot-dark-2/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {navLinks.map(nl => (
              <a key={nl.l} href={nl.to} className="text-white/80 hover:text-white py-1 transition-colors" onClick={() => setMenuOpen(false)}>
                {nl.l}
              </a>
            ))}
            <a href="#form" className="bg-patriot-red text-white text-sm font-semibold px-5 py-3 rounded-lg text-center mt-2" onClick={() => setMenuOpen(false)}>
              Хочу участвовать
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Владивосток" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-patriot-dark/70 via-patriot-dark/60 to-patriot-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-patriot-dark/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-patriot-red/20 border border-patriot-red/40 text-patriot-gold text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-patriot-gold rounded-full animate-pulse" />
              Официальная НКО · Приморский край · ОГРН 1242500028583
            </div>

            <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
              Каждый может сделать{" "}
              <span className="text-gradient-gold">что-то конкретное</span>{" "}
              для тех, кто служит Родине
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8 animate-fade-up animate-delay-200">
              Сохраняем историческое наследие, воспитываем молодёжь, поддерживаем тех, кто служит Отечеству.
              За одним столом — школьники, ветераны и предприниматели.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-up animate-delay-300">
              <a href="#form" className="bg-patriot-red hover:bg-patriot-red-dark text-white font-bold px-8 py-4 rounded-xl text-base btn-glow transition-all duration-300 flex items-center gap-2">
                Хочу участвовать
                <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#dir" className="border border-white/30 hover:border-white/60 text-white/90 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300">
                Как помочь
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 animate-fade-up animate-delay-400">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-oswald text-3xl sm:text-4xl font-bold text-gradient-gold">{s.v}</div>
                  <div className="text-white/50 text-xs mt-1 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-patriot-red/30 to-patriot-gold/20 blur-3xl absolute -inset-8" />
              <div className="relative bg-patriot-dark-3/80 backdrop-blur border border-white/10 rounded-2xl p-6 space-y-4 w-72">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-patriot-red to-patriot-gold flex items-center justify-center text-lg">🎖</div>
                  <div>
                    <div className="font-semibold text-sm">АНО «ПАТРИОТ ДВ»</div>
                    <div className="text-white/40 text-xs">г. Артём, Приморский край</div>
                  </div>
                </div>
                {[
                  { i: "Phone", t: "+7-908-451-53-85" },
                  { i: "Globe", t: "vk.com/patriotdv" },
                  { i: "Shield", t: "ИНН 2502079223" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-patriot-gold">
                      <Icon name={r.i as "Phone"} size={14} />
                    </div>
                    <span className="text-white/70">{r.t}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="bg-patriot-red/10 border border-patriot-red/20 rounded-lg px-4 py-2 text-center text-xs text-patriot-gold font-medium">
                    Отчётность открыта · НДС не облагается
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-white/30" />
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 bg-patriot-dark-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-patriot-red/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              О миссии
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">
              Содействие сохранению<br />
              <span className="text-gradient-gold">исторического наследия</span> Приморья
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Мы объединяем жителей Приморского края вокруг общих ценностей — памяти, чести и взаимопомощи.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <AnimSection key={i} delay={i * 100}>
                <div className="bg-patriot-dark-3 border border-white/5 hover:border-patriot-red/30 rounded-2xl p-6 h-full card-hover transition-all duration-300">
                  <div className="text-4xl mb-4">{p.i}</div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-3">{p.t}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.d}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-patriot-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              Как мы работаем
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">
              От идеи до <span className="text-gradient-red">результата</span>
            </h2>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <AnimSection key={i} delay={i * 120}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-patriot-red/40 to-transparent z-0 -translate-y-px" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-patriot-red to-patriot-red-dark flex items-center justify-center font-oswald text-2xl font-bold text-white mb-5 shadow-lg shadow-patriot-red/20">
                      {s.n}
                    </div>
                    <h3 className="font-oswald text-xl font-bold text-white mb-3">{s.t}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="dir" className="py-24 bg-patriot-dark-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,16,46,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimSection className="text-center mb-16">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              Как помочь
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">
              Выберите удобный<br />
              <span className="text-gradient-gold">формат участия</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Каждый вклад важен — неважно, сколько у вас времени или возможностей.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directions.map((d, i) => (
              <AnimSection key={i} delay={i * 100}>
                <div className="group bg-patriot-dark-3 border border-white/5 hover:border-patriot-red/30 rounded-2xl p-6 h-full card-hover flex flex-col">
                  <div className="text-4xl mb-4">{d.i}</div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-3">{d.t}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">{d.d}</p>
                  <a
                    href="#form"
                    className="w-full text-center border border-patriot-red/40 hover:bg-patriot-red hover:border-patriot-red text-patriot-red hover:text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300"
                  >
                    {d.cta} →
                  </a>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-24 bg-patriot-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.05)_0%,_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">
              О вас помнят.{" "}
              <span className="text-gradient-gold">Вы не одни.</span>
            </h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: "🎖", t: "Ветераны Приморья", q: "Когда слышишь от живого человека — совсем другое." },
              { i: "🧵", t: "Школьники в мастерской", q: "Я не знала, что умею что-то важное. Теперь знаю." },
              { i: "❤️", t: "Семьи военнослужащих", q: "Знать, что тебя не забыли — это уже много." },
            ].map((s, i) => (
              <AnimSection key={i} delay={i * 150}>
                <div className="relative bg-patriot-dark-3 border border-white/5 rounded-2xl p-8 h-full">
                  <div className="absolute top-6 right-6 text-6xl opacity-10 font-oswald font-bold">"</div>
                  <div className="text-4xl mb-6">{s.i}</div>
                  <p className="text-white/80 text-lg leading-relaxed italic mb-6">«{s.q}»</p>
                  <div className="text-patriot-gold text-sm font-semibold uppercase tracking-wider">{s.t}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-24 bg-patriot-dark-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(200,16,46,0.1)_0%,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <AnimSection className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              Форма участия
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">
              Выберите формат<br />
              <span className="text-gradient-gold">участия</span>
            </h2>
            <p className="text-white/50">Свяжемся в течение рабочего дня</p>
          </AnimSection>

          {submitted ? (
            <AnimSection>
              <div className="bg-patriot-dark-3 border border-patriot-gold/30 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🎖</div>
                <h3 className="font-oswald text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-white/50">Свяжемся с вами в течение рабочего дня. Спасибо!</p>
              </div>
            </AnimSection>
          ) : (
            <AnimSection>
              <form onSubmit={handleSubmit} className="bg-patriot-dark-3 border border-white/5 rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-patriot-dark-4 border border-white/10 focus:border-patriot-red/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Телефон или @vk</label>
                    <input
                      type="text"
                      required
                      placeholder="+7 или @username"
                      value={formData.contact}
                      onChange={e => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-patriot-dark-4 border border-white/10 focus:border-patriot-red/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Город Приморья</label>
                  <input
                    type="text"
                    placeholder="Владивосток, Артём, Находка..."
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-patriot-dark-4 border border-white/10 focus:border-patriot-red/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Формат участия</label>
                  <select
                    value={formData.format}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-patriot-dark-4 border border-white/10 focus:border-patriot-red/50 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-patriot-dark-4">Выберите формат...</option>
                    <option value="personal" className="bg-patriot-dark-4">Прийти лично</option>
                    <option value="materials" className="bg-patriot-dark-4">Передать материалы</option>
                    <option value="school" className="bg-patriot-dark-4">Школа / организация</option>
                    <option value="info" className="bg-patriot-dark-4">Инфоподдержка</option>
                    <option value="finance" className="bg-patriot-dark-4">Финансовая помощь</option>
                    <option value="unsure" className="bg-patriot-dark-4">Не решил(а)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-patriot-red hover:bg-patriot-red-dark text-white font-bold py-4 rounded-xl btn-glow transition-all duration-300 font-oswald text-lg tracking-wide"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-white/30 text-xs flex items-center justify-center gap-1.5">
                  <Icon name="Lock" size={12} />
                  Контакты не передаются третьим лицам
                </p>
              </form>
            </AnimSection>
          )}
        </div>
      </section>

      {/* DONATE */}
      <section className="py-24 bg-patriot-dark relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              Поддержать финансово
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">
              Финансовая поддержка<br />
              <span className="text-gradient-gold">организации</span>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { v: "100 ₽", d: "метр ткани для плетения" },
              { v: "500 ₽", d: "тёплые вещи для посылки" },
              { v: "1 000 ₽", d: "полная комплектация посылки" },
            ].map((a, i) => (
              <AnimSection key={i} delay={i * 100}>
                <div className="bg-patriot-dark-3 border border-white/5 hover:border-patriot-gold/30 rounded-2xl p-6 text-center card-hover transition-all duration-300">
                  <div className="font-oswald text-3xl font-bold text-gradient-gold mb-2">{a.v}</div>
                  <div className="text-white/50 text-sm">{a.d}</div>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection>
            <div className="bg-patriot-dark-3 border border-white/5 rounded-2xl p-8">
              <h3 className="font-oswald text-xl font-bold text-white mb-6 text-center">Способы перевода</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { i: "💳", l: "Карта Сбербанк", v: "5228 6005 8695 8904" },
                  { i: "📲", l: "СБП", v: "+7-908-451-53-85" },
                  { i: "🏦", l: "Расчётный счёт", v: "Реквизиты в VK" },
                ].map((m, i) => (
                  <div key={i} className="bg-patriot-dark-4 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{m.i}</div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{m.l}</div>
                    <div className="text-white font-semibold text-sm font-mono">{m.v}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs text-center leading-relaxed">
                Добровольное пожертвование на уставную деятельность АНО «ПАТРИОТ ДВ», ИНН 2502079223, ОГРН 1242500028583. НДС не облагается.
              </p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-patriot-dark-2">
        <div className="max-w-3xl mx-auto px-6">
          <AnimSection className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-patriot-gold uppercase tracking-widest mb-4 border border-patriot-gold/30 px-4 py-1.5 rounded-full">
              Вопросы и ответы
            </div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">
              Часто <span className="text-gradient-gold">спрашивают</span>
            </h2>
          </AnimSection>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div
                  className="bg-patriot-dark-3 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between px-6 py-5 gap-4">
                    <h3 className="font-semibold text-white text-base">{f.q}</h3>
                    <div className={`text-patriot-gold flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>
                      <Icon name="Plus" size={18} />
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-patriot-dark border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-patriot-red to-patriot-gold flex items-center justify-center text-sm font-bold font-oswald">ПДВ</div>
                <span className="font-oswald font-bold text-xl tracking-wide">ПАТРИОТ ДВ</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                АНО содействия сохранению исторического наследия и патриотического воспитания «ПАТРИОТ ДВ»
              </p>
            </div>

            <div>
              <h4 className="font-oswald font-bold text-base text-white mb-4 uppercase tracking-wider">Контакты</h4>
              <div className="space-y-3">
                <a href="tel:+79084515385" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Icon name="Phone" size={14} className="text-patriot-gold" />
                  +7-908-451-53-85
                </a>
                <a href="https://vk.com/patriotdv" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Icon name="Globe" size={14} className="text-patriot-gold" />
                  vk.com/patriotdv
                </a>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Icon name="MapPin" size={14} className="text-patriot-gold" />
                  г. Артём, Приморский край
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-oswald font-bold text-base text-white mb-4 uppercase tracking-wider">Реквизиты</h4>
              <div className="space-y-2 text-sm text-white/40">
                <div>ОГРН: 1242500028583</div>
                <div>ИНН: 2502079223</div>
                <div className="pt-2 text-xs leading-relaxed">Отчётность по ФЗ «О некоммерческих организациях»</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">© 2024–2026 АНО «ПАТРИОТ ДВ». Все права защищены.</p>
            <div className="flex gap-6">
              {navLinks.map(nl => (
                <a key={nl.l} href={nl.to} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                  {nl.l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
