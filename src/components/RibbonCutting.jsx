import { useEffect, useRef } from 'react';

// Responsive px value between min and max based on viewport width
const clampPx = (min, max) => Math.max(min, Math.min(max, min + (max - min) * (window.innerWidth / 1440)));

export default function RibbonCutting({ onComplete }) {
    const overlayRef = useRef(null);
    const afRef = useRef(null);

    useEffect(() => {
        const ro = overlayRef.current;
        if (!ro) return;

        const cc = ro.querySelector('#rc-canvas');
        const ctx = cc.getContext('2d');
        const scWrap = ro.querySelector('#sc-wrap');
        const scTop = ro.querySelector('#sc-top');
        const scBot = ro.querySelector('#sc-bot');
        const rTop = ro.querySelector('#r-top');
        const rTopShine = ro.querySelector('#r-top-shine');
        const rTopShadow = ro.querySelector('#r-top-shadow');
        const rBot = ro.querySelector('#r-bot');
        const rBotShine = ro.querySelector('#r-bot-shine');
        const rBotShadow = ro.querySelector('#r-bot-shadow');
        const bowLayer = ro.querySelector('#bow-layer');
        const sparkLayer = ro.querySelector('#spark-layer');
        const tlH1 = ro.querySelector('#tl-h1');
        const tlP = ro.querySelector('#tl-p');

        const getH = () => window.innerHeight;
        const getW = () => window.innerWidth;

        function resize() {
            cc.width = getW(); cc.height = getH();
            positionRibbon();
        }

        function positionRibbon() {
            const cy = getH() / 2;
            [rTop, rTopShine, rTopShadow].forEach(el => el.setAttribute('y', cy - 29));
            [rBot, rBotShine, rBotShadow].forEach(el => el.setAttribute('y', cy - 29));
        }

        resize();
        window.addEventListener('resize', resize);

        let startTime = null, cutDone = false, particles = [], sparks = [];
        let brandShown = false, brandDone = false;

        const COLORS = ['#ff4444', '#ff8800', '#ffdd00', '#ff44aa', '#44aaff', '#fff', '#ff6666', '#ffaa44', '#cc0022', '#ff99bb'];
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const lerp = (a, b, t) => a + (b - a) * t;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

        function spawnParticles() {
            const cx = getW() / 2, cy = getH() / 2;
            for (let i = 0; i < 220; i++) {
                const a = Math.random() * Math.PI * 2, spd = 5 + Math.random() * 18;
                particles.push({
                    x: cx + (Math.random() - .5) * 40, y: cy + (Math.random() - .5) * 10,
                    vx: Math.cos(a) * spd * (0.3 + Math.random() * 0.7), vy: Math.sin(a) * spd - 10 - Math.random() * 8,
                    w: 5 + Math.random() * 12, h: 3 + Math.random() * 7,
                    rot: Math.random() * 360, rv: (Math.random() - .5) * 14,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    life: 1, decay: 0.007 + Math.random() * 0.005,
                    shape: Math.random() < 0.25 ? 'circle' : 'rect'
                });
            }
            for (let i = 0; i < 60; i++) {
                const a = Math.random() * Math.PI * 2, spd = 6 + Math.random() * 14;
                sparks.push({ x: cx, y: cy, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 5, life: 1, decay: 0.025 + Math.random() * 0.03, len: 8 + Math.random() * 18 });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, cc.width, cc.height);
            particles.forEach(p => {
                ctx.save(); ctx.globalAlpha = Math.max(0, p.life);
                ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180); ctx.fillStyle = p.color;
                if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
                else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
                p.x += p.vx; p.y += p.vy; p.vy += 0.38; p.vx *= 0.985; p.rot += p.rv; p.life -= p.decay;
            });
            sparks.forEach(s => {
                ctx.save(); ctx.globalAlpha = Math.max(0, s.life) * 0.9;
                ctx.strokeStyle = '#ffcc44'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * s.len / 10, s.y - s.vy * s.len / 10); ctx.stroke(); ctx.restore();
                s.x += s.vx; s.y += s.vy; s.vy += 0.25; s.life -= s.decay;
            });
            particles = particles.filter(p => p.life > 0);
            sparks = sparks.filter(s => s.life > 0);
        }

        function showSparkBurst() {
            sparkLayer.innerHTML = '';
            for (let i = 0; i < 24; i++) {
                const a = (i / 24) * 360, len = i % 3 === 0 ? 20 : i % 2 === 0 ? 14 : 9;
                const r1 = 14, rad = a * Math.PI / 180;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', 60 + Math.cos(rad) * r1); line.setAttribute('y1', 60 + Math.sin(rad) * r1);
                line.setAttribute('x2', 60 + Math.cos(rad) * (r1 + len)); line.setAttribute('y2', 60 + Math.sin(rad) * (r1 + len));
                line.setAttribute('stroke', i % 3 === 0 ? '#fff' : i % 2 === 0 ? '#ffcc44' : '#ff6680');
                line.setAttribute('stroke-width', i % 3 === 0 ? '3' : '2');
                line.setAttribute('stroke-linecap', 'round');
                sparkLayer.appendChild(line);
            }
            sparkLayer.style.opacity = '1';
            sparkLayer.style.transform = 'translate(-50%,-50%) scale(0)';
            sparkLayer.style.transition = 'none';
            requestAnimationFrame(() => {
                sparkLayer.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
                sparkLayer.style.transform = 'translate(-50%,-50%) scale(1)';
                setTimeout(() => {
                    sparkLayer.style.transition = 'transform 0.4s ease-in, opacity 0.35s ease-in';
                    sparkLayer.style.transform = 'translate(-50%,-50%) scale(2.5)';
                    sparkLayer.style.opacity = '0';
                }, 320);
            });
        }

        function splitRibbon() {
            const cy = getH() / 2, topY = cy - 29;
            [rTop, rTopShine, rTopShadow].forEach(el => {
                el.style.transition = 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.9s ease';
                el.style.transformOrigin = `50% ${topY}px`;
                el.style.transform = 'translateY(-90px) rotate(-4deg)';
                el.style.opacity = '0';
            });
            [rBot, rBotShine, rBotShadow].forEach(el => {
                el.style.transition = 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.9s ease';
                el.style.transformOrigin = `50% ${topY + 58}px`;
                el.style.transform = 'translateY(90px) rotate(3deg)';
                el.style.opacity = '0';
            });
            bowLayer.style.transition = 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.8s ease';
            bowLayer.style.transform = 'translateX(calc(-50% + 60px)) translateY(calc(-50% - 50px)) rotate(15deg) scale(0.6)';
            bowLayer.style.opacity = '0';
        }

        // ---- BRAND REVEAL ELEMENTS ----
        const brReveal = ro.querySelector('#brand-reveal');
        const brLogoWrap = ro.querySelector('#br-logo-wrap');
        const brWordmark = ro.querySelector('#br-wordmark');
        const brTagline = ro.querySelector('#br-tagline');
        const brTagline2 = ro.querySelector('#br-tagline2');
        const brUnderline = ro.querySelector('#br-underline');

        function showBrandReveal() {
            brReveal.style.transition = 'opacity 0.4s ease';
            brReveal.style.opacity = '1';

            brLogoWrap.style.transition = 'transform 0.7s cubic-bezier(0.34,1.4,0.64,1), opacity 0.5s ease';
            brLogoWrap.style.transform = 'scale(1)';
            brLogoWrap.style.opacity = '1';

            setTimeout(() => {
                brWordmark.style.transition = 'transform 0.55s cubic-bezier(0.34,1.3,0.64,1), opacity 0.45s ease';
                brWordmark.style.transform = 'translateX(0)';
                brWordmark.style.opacity = '1';
            }, 180);

            setTimeout(() => {
                brTagline.style.transition = 'transform 0.5s ease, opacity 0.45s ease';
                brTagline.style.transform = 'translateY(0)';
                brTagline.style.opacity = '1';
            }, 380);

            setTimeout(() => {
                brUnderline.style.transition = 'width 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
                brUnderline.style.width = '100%';
            }, 500);

            setTimeout(() => {
                brTagline2.style.transition = 'transform 0.6s ease, opacity 0.5s ease';
                brTagline2.style.transform = 'translateY(0)';
                brTagline2.style.opacity = '1';
            }, 650);
        }

        function animate(ts) {
            if (!startTime) startTime = ts;
            const e = ts - startTime;

            if (e < 700) {
                const t = easeOut(clamp(e / 700, 0, 1));
                tlH1.style.opacity = t;
                tlH1.style.letterSpacing = lerp(20, 12, t) + 'px';
                tlP.style.opacity = t * 0.8;
            }
            if (e > 500 && e < 1800) {
                const t = easeOut(clamp((e - 500) / 1300, 0, 1));
                scWrap.style.left = lerp(-160, getW() / 2 - 105, t) + 'px';
                const snip = 0.5 + 0.5 * Math.sin((e - 500) / 180);
                const angle = snip * 0.6 * 22;
                scTop.setAttribute('transform', `rotate(${-angle},38,55)`);
                scBot.setAttribute('transform', `rotate(${angle},38,55)`);
            }
            if (e > 1800 && e < 2200) {
                const t = easeOut(clamp((e - 1800) / 400, 0, 1));
                scWrap.style.left = lerp(getW() / 2 - 105, getW() / 2 - 30, t) + 'px';
                const opening = t < 0.5 ? t * 2 : 2 - t * 2;
                const angle = opening * 22;
                scTop.setAttribute('transform', `rotate(${-angle},38,55)`);
                scBot.setAttribute('transform', `rotate(${angle},38,55)`);
            }
            if (e > 2200 && !cutDone) {
                cutDone = true;
                showSparkBurst(); spawnParticles(); splitRibbon();
                setTimeout(() => {
                    scWrap.style.transition = 'left 0.7s ease,opacity 0.5s ease,transform 0.7s ease';
                    scWrap.style.left = (getW() / 2 + 80) + 'px';
                    scWrap.style.opacity = '0';
                    scWrap.style.transform = 'translateY(-50%) rotate(20deg)';
                }, 80);
            }
            if (e > 2200) drawParticles();
            if (e > 2500 && e < 3200) {
                const t = easeOut(clamp((e - 2500) / 700, 0, 1));
                tlH1.style.opacity = 1 - t; tlP.style.opacity = (1 - t) * 0.8;
            }

            // Show brand at 2.7s (500ms after cut)
            if (e > 2700 && !brandShown) {
                brandShown = true;
                showBrandReveal();
            }

            // Brand exits at 5.2s
            if (e > 5200 && !brandDone) {
                brandDone = true;
                brReveal.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                brReveal.style.opacity = '0';
                brReveal.style.transform = 'scale(1.04)';
            }

            // Overlay fades out 6.2s → 7.3s
            if (e > 6200 && e < 7300) {
                ro.style.opacity = 1 - easeOut(clamp((e - 6200) / 1100, 0, 1));
            }

            if (e > 7300) {
                ro.style.display = 'none';
                window.removeEventListener('resize', resize);
                onComplete?.();
                return;
            }

            afRef.current = requestAnimationFrame(animate);
        }

        const t = setTimeout(() => { afRef.current = requestAnimationFrame(animate); }, 400);
        return () => { clearTimeout(t); if (afRef.current) cancelAnimationFrame(afRef.current); window.removeEventListener('resize', resize); };
    }, [onComplete]);

    const overlayStyle = {
        position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        background: 'rgba(0,0,0,0.65)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.3s',
    };

    return (
        <div ref={overlayRef} style={overlayStyle}>
            <canvas id="rc-canvas" style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }} />

            {/* Tagline */}
            <div id="tagline" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,calc(-50% - 130px))', zIndex: 35, textAlign: 'center', pointerEvents: 'none' }}>
                <h1 id="tl-h1" style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,4vw,42px)', color: '#fff', letterSpacing: '20px', textTransform: 'uppercase', textShadow: '0 2px 20px rgba(0,0,0,0.8)', opacity: 0, whiteSpace: 'nowrap', margin: 0 }}>Grand Opening</h1>
                <p id="tl-p" style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(11px,1.5vw,15px)', color: 'rgba(255,255,255,0.75)', letterSpacing: '5px', textTransform: 'uppercase', marginTop: 8, opacity: 0 }}>Welcome to something special</p>
            </div>

            {/* SVG Ribbon */}
            <svg id="ribbon-svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 10, pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c0001a" /><stop offset="15%" stopColor="#e8001f" />
                        <stop offset="30%" stopColor="#ff1a35" /><stop offset="48%" stopColor="#cc0018" />
                        <stop offset="65%" stopColor="#ff1a35" /><stop offset="82%" stopColor="#e8001f" />
                        <stop offset="100%" stopColor="#c0001a" />
                    </linearGradient>
                    <linearGradient id="rg-shine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="25%" stopColor="rgba(255,255,255,0.35)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="75%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                    <linearGradient id="rg-shadow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
                        <stop offset="8%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="92%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
                    </linearGradient>
                </defs>
                <rect id="r-top" x="0" y="0" width="100%" height="58" fill="url(#rg)" />
                <rect id="r-top-shine" x="0" y="0" width="100%" height="58" fill="url(#rg-shine)" opacity="0.7" />
                <rect id="r-top-shadow" x="0" y="0" width="100%" height="58" fill="url(#rg-shadow)" />
                <rect id="r-bot" x="0" y="0" width="100%" height="58" fill="url(#rg)" />
                <rect id="r-bot-shine" x="0" y="0" width="100%" height="58" fill="url(#rg-shine)" opacity="0.7" />
                <rect id="r-bot-shadow" x="0" y="0" width="100%" height="58" fill="url(#rg-shadow)" />
            </svg>

            {/* Bow */}
            <div id="bow-layer" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 20, pointerEvents: 'none' }}>
                <svg width="220" height="180" viewBox="0 0 220 180" fill="none" style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ff2040" /><stop offset="40%" stopColor="#cc0018" /><stop offset="100%" stopColor="#8a0010" />
                        </linearGradient>
                        <linearGradient id="bg2" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff2040" /><stop offset="40%" stopColor="#cc0018" /><stop offset="100%" stopColor="#8a0010" />
                        </linearGradient>
                        <linearGradient id="bg-shine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                        <linearGradient id="knot-g" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ff3050" /><stop offset="100%" stopColor="#aa0015" />
                        </linearGradient>
                    </defs>
                    <path d="M110 98 C90 70,30 55,10 72 C-8 88,15 118,45 108 C70 100,92 92,110 102Z" fill="url(#bg1)" stroke="#8a0010" strokeWidth="0.8" />
                    <path d="M110 98 C90 70,30 55,10 72 C-8 88,15 118,45 108 C70 100,92 92,110 102Z" fill="url(#bg-shine)" opacity="0.5" />
                    <path d="M110 98 C130 70,190 55,210 72 C228 88,205 118,175 108 C150 100,128 92,110 102Z" fill="url(#bg2)" stroke="#8a0010" strokeWidth="0.8" />
                    <path d="M110 98 C130 70,190 55,210 72 C228 88,205 118,175 108 C150 100,128 92,110 102Z" fill="url(#bg-shine)" opacity="0.5" />
                    <path d="M96 102 C80 115,60 148,68 162 C75 174,95 168,100 150 C104 135,104 118,110 106Z" fill="url(#bg1)" stroke="#8a0010" strokeWidth="0.8" />
                    <path d="M124 102 C140 115,160 148,152 162 C145 174,125 168,120 150 C116 135,116 118,110 106Z" fill="url(#bg2)" stroke="#8a0010" strokeWidth="0.8" />
                    <ellipse cx="110" cy="102" rx="16" ry="14" fill="url(#knot-g)" stroke="#8a0010" strokeWidth="1" />
                    <ellipse cx="104" cy="98" rx="5" ry="4" fill="rgba(255,255,255,0.25)" />
                </svg>
            </div>

            {/* Scissors */}
            <div id="sc-wrap" style={{ position: 'absolute', left: -160, top: '50%', transform: 'translateY(-50%)', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))', zIndex: 30 }}>
                <svg width="130" height="110" viewBox="0 0 130 110" fill="none">
                    <defs>
                        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e8e8e8" /><stop offset="50%" stopColor="#c0c0c0" /><stop offset="100%" stopColor="#a0a0a0" />
                        </linearGradient>
                        <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#d0d0d0" /><stop offset="40%" stopColor="#f0f0f0" /><stop offset="100%" stopColor="#b8b8b8" />
                        </linearGradient>
                    </defs>
                    <g id="sc-top">
                        <circle cx="16" cy="18" r="13" fill="url(#sg)" stroke="#888" strokeWidth="1.2" />
                        <circle cx="16" cy="18" r="7" fill="none" stroke="#aaa" strokeWidth="1.5" />
                        <circle cx="16" cy="18" r="3" fill="#bbb" />
                        <path d="M28 18 L38 52 L125 50 L125 44 L38 46 Z" fill="url(#sg2)" stroke="#999" strokeWidth="0.8" />
                        <line x1="38" y1="47" x2="124" y2="47" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                    </g>
                    <g id="sc-bot">
                        <circle cx="16" cy="92" r="13" fill="url(#sg)" stroke="#888" strokeWidth="1.2" />
                        <circle cx="16" cy="92" r="7" fill="none" stroke="#aaa" strokeWidth="1.5" />
                        <circle cx="16" cy="92" r="3" fill="#bbb" />
                        <path d="M28 92 L38 58 L125 60 L125 66 L38 64 Z" fill="url(#sg2)" stroke="#999" strokeWidth="0.8" />
                        <line x1="38" y1="63" x2="124" y2="63" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                    </g>
                    <circle cx="38" cy="55" r="5" fill="#d0d0d0" stroke="#999" strokeWidth="1.5" />
                    <circle cx="38" cy="55" r="2" fill="#bbb" />
                </svg>
            </div>

            {/* Spark burst */}
            <svg id="spark-layer" width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0, zIndex: 40 }} />

            {/* Brand Reveal */}
            <div id="brand-reveal" style={{
                position: 'absolute', inset: 0, zIndex: 60,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', opacity: 0,
            }}>
                <div id="br-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: 0, transform: 'scale(0.6)', opacity: 0 }}>
                    <div id="br-icon" style={{
                        width: clampPx(44, 84), height: clampPx(44, 84), borderRadius: 16,
                        background: 'linear-gradient(135deg,#EC5F36,#D84E28)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 32px rgba(236,95,54,0.55)', flexShrink: 0,
                    }}>
                        <img src="./logoOnly.png" alt="" />
                    </div>
                    <div id="br-wordmark" style={{ display: 'flex', flexDirection: 'column', marginLeft: 14, opacity: 0, transform: 'translateX(-16px)' }}>
                        <div id="br-name" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                            Domestic<span style={{ color: '#EC5F36' }}>Pro</span>
                        </div>
                        <div id="br-tagline" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(9px,1.1vw,12px)', fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: 4, textTransform: 'uppercase', marginTop: 4, opacity: 0, transform: 'translateY(8px)' }}>
                            Trusted Home Services
                        </div>
                    </div>
                </div>
                <div id="br-underline" style={{ width: 0, height: 2, background: 'linear-gradient(90deg,#EC5F36,rgba(236,95,54,0))', borderRadius: 1, marginTop: 10 }} />
                <div id="br-tagline2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(10px,1.3vw,14px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: 2, marginTop: 18, opacity: 0, transform: 'translateY(12px)' }}>
                    Your home, expertly cared for
                </div>
            </div>
        </div>
    );
}