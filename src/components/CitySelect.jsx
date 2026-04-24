// CitySelect.jsx — Searchable Indian city dropdown with portal (fixes overflow clipping)
import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import INDIAN_CITIES from "./indianCities";
import { ChevronDown, Search, X, MapPin } from "lucide-react";

const CSS = `
  .cs-wrap    { position: relative; width: 100%; font-family: 'Plus Jakarta Sans', sans-serif; }

  .cs-trigger {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 9px 13px; border-radius: 10px; border: 2px solid #E5E2DE;
    background: #fff; font-size: 13px; color: #1a1a2e;
    cursor: pointer; transition: border-color .2s, box-shadow .2s;
    text-align: left; outline: none;
  }
  .cs-trigger.open, .cs-trigger:focus {
    border-color: #EC5F36;
    box-shadow: 0 0 0 3px rgba(236,95,54,0.10);
  }
  .cs-trigger-placeholder { color: #d1c9c5; flex: 1; font-size: 13px; }
  .cs-trigger-value       { color: #1a1a2e; flex: 1; font-size: 13px; font-weight: 600; }
  .cs-trigger-chevron     { color: #9ca3af; flex-shrink: 0; transition: transform .2s; }
  .cs-trigger-chevron.open { transform: rotate(180deg); }

  .cs-clear {
    background: none; border: none; cursor: pointer; padding: 2px;
    display: flex; align-items: center; color: #9ca3af;
    border-radius: 4px; transition: color .15s;
  }
  .cs-clear:hover { color: #EC5F36; }

  /* Portal dropdown — fixed position, very high z-index */
  .cs-dropdown {
    position: fixed;
    height: 14rem;
    background: #fff; border: 2px solid #EC5F36;
    border-radius: 12px; box-shadow: 0 12px 36px rgba(236,95,54,0.20);
    z-index: 99999; overflow: hidden;
    animation: cs-pop .15s ease-out;
    box-sizing: border-box;
    max-width: calc(100vw - 16px);
  }
  @keyframes cs-pop {
    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  .cs-search-wrap {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; border-bottom: 1px solid #F0EBE8;
    background: #FFF8F5;
  }
  .cs-search-ico { color: #EC5F36; flex-shrink: 0; }
  .cs-search-inp {
    flex: 1; border: none; background: transparent; outline: none;
    font-size: 13px; color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-width: 0;
  }
  .cs-search-inp::placeholder { color: #d1c9c5; }

  .cs-count {
    padding: 5px 13px 6px; font-size: 10px; font-weight: 700;
    color: #9ca3af; letter-spacing: .04em; text-transform: uppercase;
    border-bottom: 1px solid #F0EBE8; background: #FAFAFA;
  }

  .cs-list {
    max-height: 180px; overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* smooth scroll on iOS */
    scrollbar-width: thin; scrollbar-color: #F0E8E4 transparent;
  }
  .cs-list::-webkit-scrollbar       { width: 3px; }
  .cs-list::-webkit-scrollbar-thumb { background: #F0E8E4; border-radius: 4px; }

  .cs-item {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 13px; cursor: pointer; font-size: 13px;
    color: #374151; font-weight: 500; transition: background .12s;
    border: none; background: none; width: 100%; text-align: left;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cs-item:hover      { background: #FFF2EE; color: #EC5F36; }
  .cs-item.active     { background: #FFF2EE; color: #EC5F36; font-weight: 700; }
  .cs-item-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #EC5F36; flex-shrink: 0; opacity: 0;
  }
  .cs-item.active .cs-item-dot { opacity: 1; }

  .cs-empty {
    padding: 16px; text-align: center;
    font-size: 12px; color: #9ca3af; font-weight: 500;
  }
`;

export default function CitySelect({
  value,
  onChange,
  placeholder = "Select city",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!open || cities.length > 0) return;

    import("./indianCities.json").then((module) => {
      const sorted = module.default.indianCities.sort((a, b) =>
        a.localeCompare(b)
      );
      setCities(sorted);
    });
  }, [open]);

  const allCities = cities;

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 280;
    const dropdownWidth = Math.max(rect.width, 200); // minimum 200px wide
    const GUTTER = 8; // minimum gap from screen edge

    const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    const rawLeft = rect.left;
    const maxLeft = window.innerWidth - dropdownWidth - GUTTER;
    const clampedLeft = Math.max(GUTTER, Math.min(rawLeft, maxLeft));

    setDropdownStyle({
      left: clampedLeft,
      width: dropdownWidth,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + 4, top: "auto" }
        : { top: rect.bottom + 4 }),
    });
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target) &&
        !e.target.closest(".cs-dropdown")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reposition on scroll or resize
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      updatePosition();
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCities;
    const startsWith = allCities.filter((c) => c.toLowerCase().startsWith(q));
    const contains = allCities.filter(
      (c) => !c.toLowerCase().startsWith(q) && c.toLowerCase().includes(q),
    );
    return [...startsWith, ...contains];
  }, [query, allCities]);

  const select = (city) => {
    onChange(city);
    setOpen(false);
    setQuery("");
  };

  const dropdown = open ? (
    <div className="cs-dropdown" style={dropdownStyle}>
      <div className="cs-search-wrap">
        <Search size={14} className="cs-search-ico" strokeWidth={2} />
        <input
          ref={searchRef}
          className="cs-search-inp"
          placeholder="Search city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="cs-clear"
            onClick={() => setQuery("")}
          >
            <X size={11} strokeWidth={2.5} />
          </button>
        )}
      </div>
      {query && filtered.length > 0 && (
        <div className="cs-count">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>
      )}
      <div className="cs-list">
        {cities.length === 0 ? (
          <div className="cs-empty">Loading cities...</div>
        ) : filtered.length > 0 ? (
          filtered.map((city) => (
            <button
              key={city}
              type="button"
              className={`cs-item${value === city ? " active" : ""}`}
              onClick={() => select(city)}
            >
              <span className="cs-item-dot" />
              {city}
            </button>
          ))
        ) : (
          <div className="cs-empty">
            No city found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <style>{CSS}</style>
      <div className="cs-wrap" ref={wrapRef}>
        <button
          ref={triggerRef}
          type="button"
          className={`cs-trigger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
        >
          <MapPin
            size={14}
            color={value ? "#EC5F36" : "#d1c9c5"}
            strokeWidth={2}
            style={{ flexShrink: 0 }}
          />
          {value ? (
            <span className="cs-trigger-value">{value}</span>
          ) : (
            <span className="cs-trigger-placeholder">{placeholder}</span>
          )}
          {value && (
            <button
              type="button"
              className="cs-clear"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              aria-label="Clear city"
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          )}
          <ChevronDown
            size={14}
            className={`cs-trigger-chevron${open ? " open" : ""}`}
            strokeWidth={2.5}
          />
        </button>

        {createPortal(dropdown, document.body)}
      </div>
    </>
  );
}