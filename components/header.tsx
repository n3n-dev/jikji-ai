'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './logo';
import { ShinyButton } from './ui/shiny-button';
import { scrollToSection } from '@/lib/scroll-to-section';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
  subItem?: boolean;
};

type NavSection = {
  label: string;
  href: string;
  items?: NavItem[];
  hideChevron?: boolean;
};

function NavLink({
  href,
  className,
  children,
  onClick,
  external,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (external || !href.startsWith('#')) {
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== '/') {
          sessionStorage.setItem('pendingScroll', href);
          router.push('/');
        } else {
          scrollToSection(href);
        }
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function DesktopDropdown({
  section,
  isLight,
}: {
  section: NavSection;
  isLight: boolean;
}) {
  const linkCls = isLight
    ? 'flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black transition-colors py-6'
    : 'flex items-center gap-1 text-sm font-medium text-[#8E9399] hover:text-[#E3E5E8] transition-colors py-6';

  if (!section.items || section.items.length === 0) {
    return (
      <NavLink href={section.href} className={linkCls}>
        {section.label}
      </NavLink>
    );
  }

  return (
    <div className="relative group/nav">
      <NavLink href={section.href} className={linkCls}>
        {section.label}
        {!section.hideChevron && (
          <ChevronDown className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform" />
        )}
      </NavLink>

      <div className="absolute top-full left-0 hidden group-hover/nav:block w-56 pt-2">
        <div className={`border rounded-2xl p-2 ${isLight ? 'bg-white/80 border-black/10' : ''}`} style={{ background: isLight ? undefined : 'rgba(26,27,30,0.98)', borderColor: isLight ? undefined : 'rgba(159,122,94,0.18)', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.4), 0 24px 48px 0 rgba(0,0,0,0.36), inset 0 1px 0 rgba(159,122,94,0.06)' }}>
          {section.items.map((item, idx) =>
            item.subItem ? (
              <NavLink
                key={idx}
                href={item.href}
                external={item.external}
                className={`flex items-center pl-7 pr-4 py-2 text-xs rounded-lg transition-colors ${isLight ? 'text-black/50 hover:text-black hover:bg-black/5' : 'text-[#8E9399] hover:text-[#E3E5E8] hover:bg-white/5'}`}
              >
                <span className={`mr-2 w-1 h-1 rounded-full shrink-0 ${isLight ? 'bg-black/30' : 'bg-[#9F7A5E]'}`} />
                {item.label}
              </NavLink>
            ) : item.disabled ? (
              <div
                key={idx}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-not-allowed select-none ${isLight ? 'text-black/30' : 'text-[#8E9399]/40'}`}
              >
                {item.label}
                {item.badge && (
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-current ${isLight ? 'bg-black/8' : 'bg-[rgba(159,122,94,0.08)]'}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            ) : (
              <NavLink
                key={idx}
                href={item.href}
                external={item.external}
                className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-colors ${isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-[#8E9399] hover:text-[#E3E5E8] hover:bg-white/5'}`}
              >
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.external && (
                    <ArrowUpRight
                      className={`w-3.5 h-3.5 shrink-0 opacity-70`}
                    />
                  )}
                </span>
              </NavLink>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function MobileNavSection({
  section,
  closeMenu,
}: {
  section: NavSection;
  closeMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!section.items || section.items.length === 0) {
    return (
      <div className="border-b border-white/10 last:border-0 py-2">
        <div className="flex items-center justify-between w-full text-left py-2 text-white/80 hover:text-white">
          <NavLink
            href={section.href}
            onClick={closeMenu}
            className="font-medium flex-1"
          >
            {section.label}
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-white/10 last:border-0 py-2">
      <div className="flex items-center justify-between w-full text-left py-2 text-white/80 hover:text-white">
        <NavLink
          href={section.href}
          onClick={closeMenu}
          className="font-medium flex-1"
        >
          {section.label}
        </NavLink>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-2 border-l border-white/10 ml-2">
              {section.items.map((item, idx) =>
                item.subItem ? (
                  <NavLink
                    key={idx}
                    href={item.href}
                    external={item.external}
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-xs text-white/45 hover:text-white py-1 pl-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                    {item.label}
                  </NavLink>
                ) : item.disabled ? (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-white/25 py-1 cursor-not-allowed select-none"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-current">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={idx}
                    href={item.href}
                    external={item.external}
                    onClick={closeMenu}
                    className="block text-sm text-white/60 hover:text-white py-1"
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SupportButton({
  section,
  isLight,
}: {
  section: NavSection;
  isLight: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between gap-4 pl-4 pr-2 py-2 rounded-xl text-sm font-medium transition-colors border ${isLight
          ? 'bg-black/5 border-black/10 text-black/70 hover:bg-black/10 hover:text-black'
          : 'bg-[#1A1B1E] text-[#8E9399] hover:text-[#E3E5E8]'
          }`}
        style={isLight ? undefined : { borderColor: 'rgba(159,122,94,0.22)' }}
      >
        {section.label}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && section.items && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 min-w-max pt-2 z-50"
          >
            <div
              className={`border rounded-2xl p-2 ${isLight ? 'bg-white/80 border-black/10' : ''}`}
              style={{ background: isLight ? undefined : 'rgba(26,27,30,0.98)', borderColor: isLight ? undefined : 'rgba(159,122,94,0.18)', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.4), 0 24px 48px 0 rgba(0,0,0,0.36), inset 0 1px 0 rgba(159,122,94,0.06)' }}
            >
              {section.items.map((item, idx) =>
                item.disabled ? (
                  <div key={idx} className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-not-allowed select-none whitespace-nowrap ${isLight ? 'text-black/30' : 'text-[#8E9399]/40'}`}>
                    {item.label}
                    {item.badge && (
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-current ${isLight ? 'bg-black/8' : 'bg-[rgba(159,122,94,0.08)]'}`}>
                        {item.badge}
                        {/* external: true 로 변경 추후 */}
                      </span>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={idx}
                    href={item.href}
                    external={item.external}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-colors ${isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-[#8E9399] hover:text-[#E3E5E8]'}`}
                  >
                    <span className="flex items-center gap-1">
                      {item.label}
                      {item.external && (
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 shrink-0 opacity-70`}
                        />
                      )}
                    </span>
                  </NavLink>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const darkSection = document.getElementById('region');
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        setIsLight(rect.bottom < 64);
      }
    };
    checkTheme();
    window.addEventListener('scroll', checkTheme, { passive: true });
    return () => window.removeEventListener('scroll', checkTheme);
  }, []);

  const navSections = [
    { label: t.nav.products.label, href: '/products' },
    t.nav.ai_infrastructure,
    t.nav.pricing,
    t.nav.company,
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 max-w-[100vw] lg:max-w-none ${isLight
        ? 'border-black/10 bg-white/90'
        : 'bg-[#111111]/80'
        }`}
      style={isLight ? undefined : { borderColor: 'rgba(159,122,94,0.18)' }}
    >
      <div className="w-full max-w-[100vw] m-0 lg:mx-auto lg:max-w-[1200px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Logo light={isLight} />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navSections.map((section, idx) => (
            <DesktopDropdown key={idx} section={section} isLight={isLight} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 py-4">
          <SupportButton section={t.nav.support} isLight={isLight} />
          <ShinyButton
            className="!py-2 !px-5 !text-sm"
            onClick={() => window.open('https://jikjicloud.io/', '_blank')}
          >
            {t.nav.console}
          </ShinyButton>
        </div>

        <button
          className={`lg:hidden py-4 transition-colors ${isLight ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#111111] border-b border-white/10 p-6 max-h-[calc(100vh-70px)] overflow-y-auto"
            style={{ borderColor: 'rgba(159,122,94,0.18)' }}
          >
            <div className="flex flex-col gap-2 mb-6">
              {navSections.map((section, idx) => (
                <MobileNavSection
                  key={idx}
                  section={section}
                  closeMenu={() => setIsMenuOpen(false)}
                />
              ))}
            </div>

            <div className="h-px my-4" style={{ background: 'rgba(159,122,94,0.18)' }} />

            <div className="flex flex-col gap-4">
              <ShinyButton
                className="!py-3 !px-4 !text-sm w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://jikjicloud.io/', '_blank');
                }}
              >
                {t.nav.console}
              </ShinyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
