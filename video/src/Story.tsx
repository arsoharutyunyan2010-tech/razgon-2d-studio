import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const W = 1920;
const H = 1080;

const parts = [
  {file: 'part-1.wav', duration: 2252, title: 'THE IMPOSSIBLE DISCOVERY', subtitle: 'What if your body healed 10× faster?'},
  {file: 'part-2.wav', duration: 3198, title: 'A NEW KIND OF NORMAL', subtitle: 'Every small injury becomes a new question.'},
  {file: 'part-3.wav', duration: 2934, title: 'THE PEOPLE AROUND YOU', subtitle: 'Mia, Dr. Lee and the people who notice.'},
  {file: 'part-4.wav', duration: 2766, title: 'THE BIG TEST', subtitle: 'A public event changes everything.'},
  {file: 'part-5.wav', duration: 2896, title: 'THE REAL SUPERPOWER', subtitle: 'Knowing when to help — and when to wait.'},
];

const palette = {
  ink: '#10182b', navy: '#172743', blue: '#4e8cff', cyan: '#65e0e8',
  cream: '#f5f1e8', coral: '#ff806b', gold: '#ffd166', green: '#76d6a5',
};

const Person: React.FC<{x:number;y:number;scale?:number;color:string;hair?:string;pose?:'idle'|'run'|'talk';label?:string}> = ({
  x,y,scale=1,color,hair='#27334b',pose='idle',label
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 13 + x) * (pose === 'run' ? 8 : 3);
  const arm = pose === 'run' ? Math.sin(frame / 4) * 32 : pose === 'talk' ? Math.sin(frame / 9) * 13 : 0;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${scale})`}>
      <ellipse cx="0" cy="198" rx="61" ry="13" fill="#081225" opacity=".25"/>
      <path d="M-30 100 L-39 185 Q-38 198 -22 198 L-8 198 L0 135 L10 198 L28 198 Q43 197 40 182 L29 100Z" fill="#253653"/>
      <path d="M-39 111 Q-57 127 -65 163" stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" transform={`rotate(${arm} -39 111)`}/>
      <path d="M39 111 Q57 127 65 163" stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" transform={`rotate(${-arm} 39 111)`}/>
      <rect x="-42" y="53" width="84" height="83" rx="26" fill={color}/>
      <rect x="-12" y="35" width="24" height="27" rx="9" fill="#d99673"/>
      <circle cx="0" cy="0" r="48" fill="#e9b18d"/>
      <path d="M-47 -5 Q-48 -56 0 -54 Q50 -54 48 -3 Q31 -31 6 -31 Q-18 -30 -47 -5Z" fill={hair}/>
      <circle cx="-16" cy="4" r="4" fill="#1a2335"/><circle cx="16" cy="4" r="4" fill="#1a2335"/>
      <path d="M-9 22 Q0 29 9 22" stroke="#9d554d" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {label && <text x="0" y="236" textAnchor="middle" fill={palette.cream} fontSize="17" fontWeight="700">{label}</text>}
    </g>
  );
};

const SceneArt: React.FC<{part:number}> = ({part}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame / 22), [-1,1], [.2,.55]);
  const isEmergency = part === 4;
  return (
    <svg width={W} height={H} viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={isEmergency ? '#35243b' : '#183b62'}/>
          <stop offset="1" stopColor={isEmergency ? '#a34f45' : '#10182b'}/>
        </linearGradient>
        <radialGradient id="halo"><stop stopColor={isEmergency ? '#ff9b70' : '#65e0e8'} stopOpacity={glow}/><stop offset="1" stopColor="#65e0e8" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#sky)"/>
      <circle cx="1450" cy="250" r="420" fill="url(#halo)"/>
      {Array.from({length:24},(_,i)=><circle key={i} cx={(i*173+83)%1920} cy={(i*97+45)%520} r={(i%3)+2} fill="#fff" opacity=".25"/>)}
      <path d="M0 760 Q280 650 540 755 T1080 735 T1620 730 T1920 760 V1080 H0Z" fill="#111d31"/>
      <path d="M0 900 Q400 810 760 910 T1480 880 T1920 900 V1080 H0Z" fill="#0b1425"/>
      {part === 0 && <g opacity=".95">
        <circle cx="960" cy="420" r="220" fill="none" stroke={palette.cyan} strokeWidth="4" strokeDasharray="12 18"/>
        <circle cx="960" cy="420" r="150" fill="none" stroke={palette.blue} strokeWidth="2"/>
        <path d="M960 260 L960 580 M800 420 L1120 420" stroke={palette.cyan} strokeWidth="3" opacity=".7"/>
        <Person x={960} y={510} scale={1.25} color={palette.blue} hair="#17233c"/>
      </g>}
      {part === 1 && <g>
        <rect x="260" y="250" width="1400" height="480" rx="34" fill="#eaf3f7" opacity=".08" stroke="#8ec9e8" strokeWidth="3"/>
        <path d="M400 650 L400 400 L650 400 L650 650 M1270 650 L1270 400 L1520 400 L1520 650" fill="none" stroke="#83c5e8" strokeWidth="9" opacity=".35"/>
        <Person x={730} y={500} scale={1.05} color={palette.blue} label="YOU"/>
        <Person x={1160} y={500} scale={1.05} color={palette.coral} hair="#382a39" label="MIA"/>
        <path d="M900 330 Q960 250 1020 330" stroke={palette.gold} strokeWidth="8" fill="none" strokeLinecap="round"/>
      </g>}
      {part === 2 && <g>
        <rect x="240" y="230" width="1440" height="520" rx="32" fill="#f5f1e8" opacity=".08" stroke="#8ec9e8" strokeWidth="3"/>
        <Person x={650} y={510} scale={1.0} color={palette.blue} label="YOU"/>
        <Person x={960} y={510} scale={1.0} color={palette.coral} hair="#392a3a" label="MIA"/>
        <Person x={1290} y={510} scale={1.0} color={palette.green} hair="#34404d" label="DR. LEE"/>
        <path d="M810 340 Q960 250 1110 340" stroke={palette.cyan} strokeWidth="5" fill="none" strokeDasharray="9 14"/>
      </g>}
      {part === 3 && <g>
        <rect x="180" y="260" width="1560" height="500" rx="35" fill="#eaf3f7" opacity=".07" stroke="#8ec9e8" strokeWidth="3"/>
        <path d="M300 650 L300 380 L1620 380 L1620 650" stroke="#eaf3f7" strokeWidth="10" fill="none" opacity=".25"/>
        <Person x={620} y={520} scale={1.0} color={palette.blue} label="YOU"/>
        <Person x={1040} y={520} scale={1.0} color={palette.gold} hair="#29334b" label="SAM"/>
        <circle cx="1460" cy="420" r="80" fill={palette.coral} opacity=".18"/>
        <path d="M1390 500 Q1450 420 1510 500" stroke={palette.coral} strokeWidth="18" fill="none" strokeLinecap="round"/>
      </g>}
      {part === 4 && <g>
        <path d="M250 760 L250 430 L690 430 L690 760 M1230 760 L1230 430 L1670 430 L1670 760" fill="#f3a17d" opacity=".12" stroke="#ffc08c" strokeWidth="8"/>
        {Array.from({length:9},(_,i)=><path key={i} d={`M${750+i*48} ${560-(i%3)*40} q-70 -100 0 -190 q65 90 0 190`} fill="#ff9a68" opacity={.12+(i%3)*.06}/>)}
        <Person x={560} y={540} scale={1.0} color={palette.blue} pose="run" label="YOU"/>
        <Person x={1080} y={540} scale={1.0} color={palette.coral} hair="#392a3a" label="MIA"/>
        <Person x={1440} y={540} scale={.95} color={palette.green} hair="#34404d" label="DR. LEE"/>
        <path d="M840 650 Q960 580 1080 650" stroke={palette.gold} strokeWidth="8" fill="none" strokeDasharray="12 14"/>
      </g>}
    </svg>
  );
};

const Part: React.FC<{index:number;title:string;subtitle:string}> = ({index,title,subtitle}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame,[0,24,100,150],[0,1,1,0],{extrapolateRight:'clamp'});
  const drift = interpolate(frame,[0,90],[36,0],{extrapolateRight:'clamp'});
  return (
    <AbsoluteFill>
      <SceneArt part={index}/>
      <AbsoluteFill style={{justifyContent:'flex-end',padding:'0 120px 90px',opacity:fade,transform:`translateY(${drift}px)`}}>
        <div style={{fontFamily:'Arial, sans-serif',color:palette.cyan,fontSize:24,letterSpacing:8,fontWeight:800,marginBottom:18}}>RAZGON 2D STUDIO  /  CHAPTER 0{index+1}</div>
        <div style={{fontFamily:'Arial, sans-serif',color:'#fff',fontSize:62,fontWeight:900,letterSpacing:1,maxWidth:1250,lineHeight:1.05,textShadow:'0 8px 30px #0008'}}>{title}</div>
        <div style={{fontFamily:'Arial, sans-serif',color:'#e6eef8',fontSize:28,marginTop:20,maxWidth:1100}}>{subtitle}</div>
      </AbsoluteFill>
      <div style={{position:'absolute',right:90,top:70,color:'#fff',fontFamily:'Arial',fontSize:18,letterSpacing:4,opacity:.65}}>10× HEALING</div>
    </AbsoluteFill>
  );
};

export const FastHealing: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background:palette.ink}}>
      {parts.map((part,index)=>{
        const start = from;
        from += part.duration;
        return (
          <Sequence key={part.file} from={start} durationInFrames={part.duration}>
            <Part index={index} title={part.title} subtitle={part.subtitle}/>
            <Audio src={staticFile(`audio/${part.file}`)} volume={1}/>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
