import { useState, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const T = {
  navy:"#0F172A",navyMid:"#1E293B",navyLight:"#334155",
  white:"#FFFFFF",sky:"#0EA5E9",skyLight:"#E0F2FE",
  red:"#EF4444",redLight:"#FEE2E2",amber:"#F59E0B",amberLight:"#FEF3C7",
  green:"#10B981",greenLight:"#D1FAE5",slateBg:"#F1F5F9",
  muted:"#64748B",border:"#E2E8F0",text:"#0F172A",textLight:"#F8FAFC",
};

const PATIENTS = [
  {patient_id:"P001",age:82,aria_category:"Very Remote",atsi_status:"yes",diagnosis:"Heart Failure | CKD | Hypertension",smoking_status:"former",num_meds:12,ed_visits:4,missed_appts:3,days_since_gp:145,telehealth_6m:"no",lives_alone:"yes",dist_to_hosp_km:287,risk_probability:94.2,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0412 345 001"},
  {patient_id:"P002",age:75,aria_category:"Remote",atsi_status:"no",diagnosis:"Type 2 Diabetes | COPD | Depression",smoking_status:"current",num_meds:10,ed_visits:3,missed_appts:4,days_since_gp:112,telehealth_6m:"no",lives_alone:"yes",dist_to_hosp_km:154,risk_probability:88.7,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0423 456 002"},
  {patient_id:"P003",age:68,aria_category:"Very Remote",atsi_status:"yes",diagnosis:"COPD | Hypertension | Heart Failure",smoking_status:"current",num_meds:9,ed_visits:5,missed_appts:2,days_since_gp:98,telehealth_6m:"no",lives_alone:"no",dist_to_hosp_km:312,risk_probability:85.1,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0434 567 003"},
  {patient_id:"P004",age:91,aria_category:"Outer Regional",atsi_status:"no",diagnosis:"CKD | Asthma | Type 2 Diabetes | COPD",smoking_status:"never",num_meds:13,ed_visits:2,missed_appts:5,days_since_gp:203,telehealth_6m:"yes",lives_alone:"yes",dist_to_hosp_km:67,risk_probability:79.4,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0445 678 004"},
  {patient_id:"P005",age:59,aria_category:"Remote",atsi_status:"yes",diagnosis:"Depression | Type 2 Diabetes | Heart Failure",smoking_status:"current",num_meds:10,ed_visits:7,missed_appts:2,days_since_gp:300,telehealth_6m:"no",lives_alone:"yes",dist_to_hosp_km:214,risk_probability:76.8,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0456 789 005"},
  {patient_id:"P006",age:71,aria_category:"Very Remote",atsi_status:"no",diagnosis:"Hypertension | COPD | Heart Failure | CKD",smoking_status:"current",num_meds:9,ed_visits:1,missed_appts:6,days_since_gp:64,telehealth_6m:"no",lives_alone:"no",dist_to_hosp_km:207,risk_probability:72.3,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0467 890 006"},
  {patient_id:"P007",age:64,aria_category:"Outer Regional",atsi_status:"no",diagnosis:"Type 2 Diabetes | CKD | Hypertension",smoking_status:"never",num_meds:6,ed_visits:3,missed_appts:4,days_since_gp:72,telehealth_6m:"yes",lives_alone:"no",dist_to_hosp_km:70,risk_probability:61.5,risk_tier:"MEDIUM",recommended_intervention:"Telehealth Consult",phone:"0478 901 007"},
  {patient_id:"P008",age:78,aria_category:"Remote",atsi_status:"no",diagnosis:"CKD | Depression",smoking_status:"never",num_meds:4,ed_visits:1,missed_appts:0,days_since_gp:10,telehealth_6m:"yes",lives_alone:"yes",dist_to_hosp_km:268,risk_probability:54.2,risk_tier:"MEDIUM",recommended_intervention:"Telehealth Consult",phone:"0489 012 008"},
  {patient_id:"P009",age:55,aria_category:"Outer Regional",atsi_status:"yes",diagnosis:"Asthma | Depression",smoking_status:"former",num_meds:5,ed_visits:2,missed_appts:2,days_since_gp:55,telehealth_6m:"yes",lives_alone:"no",dist_to_hosp_km:42,risk_probability:47.8,risk_tier:"MEDIUM",recommended_intervention:"Proactive Phone Call",phone:"0491 123 009"},
  {patient_id:"P010",age:83,aria_category:"Outer Regional",atsi_status:"no",diagnosis:"Hypertension | Asthma",smoking_status:"never",num_meds:7,ed_visits:3,missed_appts:1,days_since_gp:78,telehealth_6m:"yes",lives_alone:"yes",dist_to_hosp_km:397,risk_probability:44.1,risk_tier:"MEDIUM",recommended_intervention:"Proactive Phone Call",phone:"0402 234 010"},
  {patient_id:"P011",age:42,aria_category:"Outer Regional",atsi_status:"no",diagnosis:"Type 2 Diabetes",smoking_status:"never",num_meds:1,ed_visits:1,missed_appts:0,days_since_gp:87,telehealth_6m:"yes",lives_alone:"no",dist_to_hosp_km:47,risk_probability:28.3,risk_tier:"LOW",recommended_intervention:"Proactive Phone Call",phone:"0413 345 011"},
  {patient_id:"P012",age:33,aria_category:"Outer Regional",atsi_status:"yes",diagnosis:"Asthma",smoking_status:"never",num_meds:1,ed_visits:1,missed_appts:1,days_since_gp:76,telehealth_6m:"yes",lives_alone:"yes",dist_to_hosp_km:10,risk_probability:18.6,risk_tier:"LOW",recommended_intervention:"Proactive Phone Call",phone:"0424 456 012"},
];

const DEFAULT_APPOINTMENTS = [
  {id:1,date:"2026-04-07",time:"09:00",patient:"P001",type:"Telehealth",tier:"HIGH",clinician:"Dr. Sarah Chen",status:"Confirmed"},
  {id:2,date:"2026-04-07",time:"10:30",patient:"P003",type:"In-Person",tier:"HIGH",clinician:"Dr. James Wu",status:"Scheduled"},
  {id:3,date:"2026-04-08",time:"14:00",patient:"P007",type:"Follow-Up",tier:"MEDIUM",clinician:"Dr. Sarah Chen",status:"Pending"},
  {id:4,date:"2026-04-09",time:"11:00",patient:"P002",type:"Telehealth",tier:"HIGH",clinician:"Dr. Priya Sharma",status:"Scheduled"},
  {id:5,date:"2026-04-10",time:"09:30",patient:"P009",type:"In-Person",tier:"MEDIUM",clinician:"Dr. James Wu",status:"Confirmed"},
  {id:6,date:"2026-04-11",time:"15:00",patient:"P011",type:"Follow-Up",tier:"LOW",clinician:"Dr. Sarah Chen",status:"Scheduled"},
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useAnimatedNumber(target,duration=1200,decimals=0){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let s=0,step=target/(duration/16);
    const t=setInterval(()=>{s+=step;if(s>=target){setVal(target);clearInterval(t);}else setVal(parseFloat(s.toFixed(decimals)));},16);
    return()=>clearInterval(t);
  },[target,duration,decimals]);
  return val;
}

function useVisible(delay=0){
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay);return()=>clearTimeout(t);},[delay]);
  return v;
}

const riskColor=t=>t==="HIGH"?T.red:t==="MEDIUM"?T.amber:T.green;
const riskBg=t=>t==="HIGH"?T.redLight:t==="MEDIUM"?T.amberLight:T.greenLight;
const iIcon={"Home Visit":"🏠","Telehealth Consult":"💻","Proactive Phone Call":"📞"};

// ─── Shared Components ────────────────────────────────────────────────────────
function RiskBadge({tier}){
  return <span style={{display:"inline-block",padding:"2px 9px",borderRadius:10,fontSize:11,fontWeight:700,letterSpacing:"0.05em",background:riskBg(tier),color:riskColor(tier)}}>{tier}</span>;
}

function StatCard({label,value,sub,accent,icon,delay=0,prefix="",suffix="",decimals=0}){
  const v=useVisible(delay);
  const n=useAnimatedNumber(typeof value==="number"?value:0,1200,decimals);
  return(
    <div style={{background:T.white,borderRadius:14,padding:"22px 24px",border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",borderTop:`3px solid ${accent}`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:`opacity 0.5s ease ${delay}ms,transform 0.5s ease ${delay}ms`,cursor:"default"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 28px rgba(0,0,0,0.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)";}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{fontSize:12,color:T.muted,fontWeight:500,letterSpacing:"0.04em",textTransform:"uppercase"}}>{label}</div>
        <div style={{fontSize:20}}>{icon}</div>
      </div>
      <div style={{fontSize:36,fontWeight:700,color:T.text,lineHeight:1,marginBottom:4}}>
        {prefix}{typeof value==="number"?n.toLocaleString():value}{suffix}
      </div>
      {sub&&<div style={{fontSize:12,color:T.muted,fontStyle:"italic"}}>{sub}</div>}
    </div>
  );
}

function HBar({label,value,max,color,count,delay=0}){
  const [w,setW]=useState(0);
  useEffect(()=>{setTimeout(()=>setW((value/max)*100),delay);},[value,max,delay]);
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:13,color:T.text,fontWeight:500}}>{label}</span>
        <span style={{fontSize:12,color:T.muted}}>{count}{typeof count==="number"?` (${Math.round(value)}%)`:""}</span>
      </div>
      <div style={{height:8,background:T.slateBg,borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:color,borderRadius:4,transition:`width 0.9s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`}}/>
      </div>
    </div>
  );
}

function RiskRing({pct,size=140,stroke=12,color,animate=true}){
  const r=(size-stroke)/2,circ=2*Math.PI*r;
  const [off,setOff]=useState(circ);
  useEffect(()=>{if(animate)setTimeout(()=>setOff(circ-(pct/100)*circ),200);},[pct,circ,animate]);
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.slateBg} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{transition:animate?"stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)":"none"}}/>
    </svg>
  );
}

function Modal({title,children,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div style={{background:T.white,borderRadius:18,padding:"32px 36px",width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div style={{fontSize:17,fontWeight:700,color:T.text}}>{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:T.muted}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
function ToastContainer({toasts}){
  return(
    <div style={{position:"fixed",bottom:28,right:28,zIndex:2000,display:"flex",flexDirection:"column",gap:10,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{background:t.type==="error"?T.red:t.type==="warn"?T.amber:T.navy,color:T.white,padding:"13px 20px",borderRadius:12,fontSize:13,fontWeight:500,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",maxWidth:340,animation:"toastIn 0.3s ease",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:16}}>{t.type==="error"?"❌":t.type==="warn"?"⚠️":"✅"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Login / Registration Page ────────────────────────────────────────────────
function PageLogin({onLogin}){
  const [tab,setTab]=useState("login");
  const [role,setRole]=useState("doctor");
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const DEMO={
    doctor:{email:"doctor@rews.health.au",password:"demo1234",name:"Dr. Sarah Chen"},
    patient:{email:"patient@rews.health.au",password:"demo1234",name:"P001 — Pat One"},
  };

  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  function getUsers(){
    try{ return JSON.parse(localStorage.getItem("rews_users")||"[]"); }catch{ return []; }
  }
  function saveUsers(u){ localStorage.setItem("rews_users",JSON.stringify(u)); }

  function handleLogin(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(()=>{
      const users=getUsers();
      // check demo accounts
      const demo=DEMO[role];
      if(form.email===demo.email&&form.password===demo.password){
        onLogin({name:demo.name,email:form.email,role});
      } else {
        const user=users.find(u=>u.email===form.email&&u.password===form.password&&u.role===role);
        if(user){ onLogin(user); }
        else { setError("Invalid email or password for selected role."); }
      }
      setLoading(false);
    },600);
  }

  function handleRegister(e){
    e.preventDefault();
    setError("");
    if(!form.name||!form.email||!form.password){ setError("All fields are required."); return; }
    if(form.password.length<6){ setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(()=>{
      const users=getUsers();
      if(users.find(u=>u.email===form.email)){ setError("An account with this email already exists."); setLoading(false); return; }
      const newUser={name:form.name,email:form.email,password:form.password,role};
      saveUsers([...users,newUser]);
      onLogin(newUser);
      setLoading(false);
    },600);
  }

  const inp={width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"};

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg, ${T.navy} 0%, #1a2d4a 60%, #0c1f35 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Sans,sans-serif"}}>
      <div style={{width:420,background:T.white,borderRadius:20,boxShadow:"0 24px 80px rgba(0,0,0,0.35)",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:T.navy,padding:"32px 36px 28px",textAlign:"center"}}>
          <div style={{fontSize:42,fontWeight:700,color:T.white,letterSpacing:"-0.03em",lineHeight:1}}>REWS</div>
          <div style={{fontSize:11,color:T.sky,letterSpacing:"0.14em",textTransform:"uppercase",marginTop:5,fontWeight:500}}>Rural Early Warning System</div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`}}>
          {["login","register"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);setError("");}} style={{flex:1,padding:"14px",background:"none",border:"none",fontFamily:"inherit",fontSize:14,fontWeight:tab===t?700:400,color:tab===t?T.sky:T.muted,cursor:"pointer",borderBottom:`2px solid ${tab===t?T.sky:"transparent"}`,transition:"all 0.15s"}}>
              {t==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>
        {/* Form */}
        <div style={{padding:"28px 36px 32px"}}>
          {/* Role selector */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,color:T.muted,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>I am a</div>
            <div style={{display:"flex",gap:10}}>
              {["doctor","patient"].map(r=>(
                <button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:"10px",borderRadius:10,border:`2px solid ${role===r?T.sky:T.border}`,background:role===r?T.skyLight:"none",color:role===r?T.sky:T.muted,fontFamily:"inherit",fontSize:14,fontWeight:role===r?700:400,cursor:"pointer",transition:"all 0.15s"}}>
                  {r==="doctor"?"👨‍⚕️ Doctor":"🧑 Patient"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={tab==="login"?handleLogin:handleRegister}>
            {tab==="register"&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Full Name</div>
                <input value={form.name} onChange={set("name")} placeholder="Your full name" style={inp}
                  onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            )}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Email</div>
              <input type="email" value={form.email} onChange={set("email")} placeholder={DEMO[role].email} style={inp}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Password</div>
              <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" style={inp}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            {error&&<div style={{padding:"10px 14px",borderRadius:9,background:T.redLight,color:T.red,fontSize:13,fontWeight:500,marginBottom:16}}>{error}</div>}
            <button type="submit" disabled={loading} style={{width:"100%",padding:"12px",borderRadius:10,background:loading?"#94a3b8":T.sky,border:"none",color:T.white,fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",transition:"background 0.15s"}}>
              {loading?"Please wait…":tab==="login"?"Sign In →":"Create Account →"}
            </button>
          </form>

          {tab==="login"&&(
            <div style={{marginTop:18,padding:"12px 14px",borderRadius:9,background:T.slateBg,fontSize:12,color:T.muted}}>
              <strong style={{color:T.text}}>Demo credentials:</strong><br/>
              Doctor: {DEMO.doctor.email} / demo1234<br/>
              Patient: {DEMO.patient.email} / demo1234
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function PageDashboard({onNavigate}){
  const high=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;
  const med=PATIENTS.filter(p=>p.risk_tier==="MEDIUM").length;
  const low=PATIENTS.filter(p=>p.risk_tier==="LOW").length;
  const avgGP=Math.round(PATIENTS.reduce((s,p)=>s+p.days_since_gp,0)/PATIENTS.length);
  const urgent=PATIENTS.filter(p=>p.risk_tier==="HIGH").slice(0,5);
  const v=useVisible(50);
  const sparkDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const sparkData=[{h:8,m:4,l:3},{h:9,m:5,l:2},{h:7,m:6,l:3},{h:10,m:4,l:2},{h:11,m:3,l:2},{h:9,m:5,l:3},{h:high,m:med,l:low}];

  return(
    <div>
      <div style={{marginBottom:28,opacity:v?1:0,transform:v?"translateY(0)":"translateY(12px)",transition:"opacity 0.4s,transform 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:T.muted,fontWeight:500}}>Quick jump:</span>
          {[{label:"👥 Patients",page:"patients"},{label:"⚠️ Active Alerts",page:"alerts"},{label:"📅 Schedule",page:"schedule"},{label:"💰 Revenue",page:"revenue"},{label:"📊 Analytics",page:"analytics"}].map(item=>(
            <button key={item.page} onClick={()=>onNavigate(item.page)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${T.border}`,background:T.white,color:T.text,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.target.style.borderColor=T.sky;e.target.style.color=T.sky;}}
              onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.text;}}
            >{item.label}</button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:28}}>
        <StatCard label="Total Patients" value={PATIENTS.length} icon="👥" accent={T.sky} delay={0} sub="Active monitoring"/>
        <StatCard label="High Risk" value={high} icon="🚨" accent={T.red} delay={80} sub="Urgent outreach needed"/>
        <StatCard label="Assigned Today" value={3} icon="✅" accent={T.green} delay={160} sub="Interventions logged"/>
        <StatCard label="Active Alerts" value={high+Math.floor(med/2)} icon="⚠️" accent={T.amber} delay={240} sub="Requiring action"/>
        <StatCard label="Avg Days Since GP" value={avgGP} icon="📅" accent={T.sky} delay={320} sub="Cohort average"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:"opacity 0.5s ease 400ms,transform 0.5s ease 400ms"}}>
            <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700,fontSize:14,color:T.text}}>🚨 Recent Alerts</div>
              <button onClick={()=>onNavigate("alerts")} style={{fontSize:12,color:T.sky,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>View all →</button>
            </div>
            {urgent.map((p,i)=>(
              <div key={p.patient_id} style={{padding:"14px 22px",borderBottom:i<urgent.length-1?`1px solid ${T.border}`:"none",display:"flex",alignItems:"center",gap:14,opacity:v?1:0,transform:v?"translateX(0)":"translateX(-12px)",transition:`opacity 0.4s ease ${500+i*60}ms,transform 0.4s ease ${500+i*60}ms`}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontWeight:700,color:T.text,fontSize:14}}>{p.patient_id}</span>
                    <RiskBadge tier={p.risk_tier}/>
                    <span style={{fontSize:11,color:T.muted}}>{p.age}y · {p.aria_category}</span>
                  </div>
                  <div style={{fontSize:12,color:T.muted}}>
                    {p.days_since_gp>90?`No GP contact in ${p.days_since_gp} days`:""}{p.missed_appts>=3?` · ${p.missed_appts} missed appointments`:""}{p.ed_visits>=4?` · ED visit spike (${p.ed_visits}×)`:""}
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>window.open(`tel:${p.phone.replace(/\s/g,"")}`)} style={{padding:"6px 12px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Contact Now</button>
                  <button onClick={()=>onNavigate("patients")} style={{padding:"6px 12px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>View</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 600ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>7-Day Risk Trend</div>
            <div style={{display:"flex",gap:8,alignItems:"flex-end",height:80}}>
              {sparkData.map((d,i)=>{
                const total=d.h+d.m+d.l;
                return(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:1,height:64}}>
                      {[{v:d.h,c:T.red},{v:d.m,c:T.amber},{v:d.l,c:T.green}].map((s,j)=>(
                        <div key={j} style={{flex:s.v/total,background:s.c,borderRadius:j===0?"3px 3px 0 0":j===2?"0 0 3px 3px":"0",minHeight:2}}/>
                      ))}
                    </div>
                    <div style={{fontSize:10,color:T.muted,marginTop:4}}>{sparkDays[i]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:16,marginTop:12}}>
              {[{c:T.red,l:"HIGH"},{c:T.amber,l:"MEDIUM"},{c:T.green,l:"LOW"}].map(item=>(
                <div key={item.l} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:10,height:10,borderRadius:2,background:item.c}}/>
                  <span style={{fontSize:11,color:T.muted}}>{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 480ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Risk Distribution</div>
            <HBar label="HIGH Risk" value={high/PATIENTS.length*100} max={100} color={T.red} count={high} delay={600}/>
            <HBar label="MEDIUM Risk" value={med/PATIENTS.length*100} max={100} color={T.amber} count={med} delay={700}/>
            <HBar label="LOW Risk" value={low/PATIENTS.length*100} max={100} color={T.green} count={low} delay={800}/>
          </div>

          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 560ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:16}}>Quick Actions</div>
            {[{label:"👥 Add New Patient",color:T.sky},{label:"🤖 Run Risk Model",color:T.navy},{label:"📄 Export Report",color:T.green}].map((a,i)=>(
              <button key={i} style={{display:"block",width:"100%",padding:"10px 16px",borderRadius:9,background:a.color,border:"none",color:T.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:i<2?10:0,textAlign:"left",transition:"opacity 0.15s"}}
                onMouseEnter={e=>e.target.style.opacity="0.88"} onMouseLeave={e=>e.target.style.opacity="1"}
              >{a.label}</button>
            ))}
          </div>

          <div style={{background:T.navy,borderRadius:14,padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 640ms"}}>
            <div style={{fontWeight:700,fontSize:13,color:T.textLight,marginBottom:14,letterSpacing:"0.05em",textTransform:"uppercase"}}>System Status</div>
            {[{label:"Model",val:"Random Forest"},{label:"AUC Score",val:"0.749"},{label:"Last Run",val:"Today 11:52"},{label:"Data Freshness",val:"✓ Current"},{label:"Patients Scored",val:"500"}].map(item=>(
              <div key={item.label} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(255,255,255,0.07)`}}>
                <span style={{fontSize:12,color:"rgba(248,250,252,0.5)"}}>{item.label}</span>
                <span style={{fontSize:12,fontWeight:600,color:T.sky}}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Patients ─────────────────────────────────────────────────────────────────
function PagePatients({addToast}){
  const [filter,setFilter]=useState("ALL");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(PATIENTS[0]);
  const [assigned,setAssigned]=useState({});
  const [ringKey,setRingKey]=useState(0);
  const v=useVisible(50);
  const filters=["ALL","HIGH","MEDIUM","LOW","ATSI","Lives Alone"];
  const filtered=PATIENTS.filter(p=>{
    const mt=filter==="ALL"||(filter==="ATSI"?p.atsi_status==="yes":filter==="Lives Alone"?p.lives_alone==="yes":p.risk_tier===filter);
    const ms=!search||p.patient_id.toLowerCase().includes(search.toLowerCase())||p.diagnosis.toLowerCase().includes(search.toLowerCase());
    return mt&&ms;
  });
  const handleSelect=(p)=>{setSelected(p);setRingKey(k=>k+1);};
  const risk=selected?parseFloat(selected.risk_probability):0;
  const rc=selected?riskColor(selected.risk_tier):T.sky;

  function handleAssign(){
    setAssigned(a=>({...a,[selected.patient_id]:true}));
    addToast(`Alert sent — ${selected.recommended_intervention} assigned for ${selected.patient_id}. Care team notified.`);
  }

  function handleContactNow(){
    window.open(`tel:${selected.phone.replace(/\s/g,"")}`);
    addToast(`Calling ${selected.patient_id} on ${selected.phone}…`,"info");
  }

  return(
    <div style={{display:"flex",height:"calc(100vh - 60px)",overflow:"hidden",margin:"-32px"}}>
      <div style={{width:320,background:T.white,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search patient or diagnosis…"
            style={{width:"100%",padding:"9px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"}}
            onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            {filters.map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 10px",borderRadius:14,fontSize:11,fontWeight:filter===f?700:400,border:`1.5px solid ${filter===f?riskColor(f)||T.sky:T.border}`,background:filter===f?riskBg(f)||T.skyLight:"none",color:filter===f?riskColor(f)||T.sky:T.muted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s"}}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{overflowY:"auto",flex:1}}>
          {filtered.map((p,i)=>{
            const isSel=selected?.patient_id===p.patient_id;
            const r=parseFloat(p.risk_probability);
            return(
              <div key={p.patient_id} onClick={()=>handleSelect(p)} style={{padding:"13px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isSel?T.skyLight:T.white,borderLeft:`3px solid ${isSel?T.sky:"transparent"}`,transition:"background 0.12s",opacity:v?1:0,transform:v?"translateX(0)":"translateX(-12px)",transitionDelay:`${Math.min(i*25,400)}ms`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontWeight:700,color:T.text,fontSize:14}}>{p.patient_id}</span>
                    <span style={{fontSize:11,color:T.muted}}>{p.age}y</span>
                    {p.atsi_status==="yes"&&<span style={{fontSize:10,background:"#EDE9FE",color:"#7C3AED",padding:"1px 6px",borderRadius:8,fontWeight:600}}>ATSI</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <RiskBadge tier={p.risk_tier}/>
                    <span style={{fontSize:13,fontWeight:700,color:riskColor(p.risk_tier)}}>{p.risk_probability}%</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:T.muted,marginBottom:5,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.diagnosis}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{height:4,flex:1,background:T.slateBg,borderRadius:2,overflow:"hidden",marginRight:10}}>
                    <div style={{height:"100%",width:`${r}%`,background:riskColor(p.risk_tier),borderRadius:2}}/>
                  </div>
                  <span style={{fontSize:10,color:p.days_since_gp>90?T.red:T.muted,fontWeight:p.days_since_gp>90?700:400}}>{p.days_since_gp}d GP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{flex:1,background:T.slateBg,overflowY:"auto",padding:"32px 36px"}}>
        {selected&&(()=>{
          const timeline=[{label:"Last GP Visit",days:selected.days_since_gp,icon:"🏥"},{label:"Last ED Visit",days:selected.ed_visits>0?42:null,icon:"🚑"},{label:"Last Telehealth",days:selected.telehealth_6m==="yes"?18:null,icon:"💻"},{label:"Today",days:0,icon:"📅"}];
          return(
            <div style={{maxWidth:860,margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
                <div style={{display:"flex",alignItems:"center",gap:28}}>
                  <div style={{position:"relative"}}>
                    <RiskRing key={ringKey} pct={risk} size={130} stroke={11} color={rc}/>
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                      <div style={{fontSize:22,fontWeight:700,color:rc,lineHeight:1}}>{selected.risk_probability}%</div>
                      <div style={{fontSize:10,color:T.muted}}>risk</div>
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:28,fontWeight:700,color:T.text,marginBottom:4}}>{selected.patient_id}</div>
                    <div style={{fontSize:13,color:T.muted,marginBottom:10}}>{selected.age} yrs · {selected.aria_category}{selected.atsi_status==="yes"?" · ATSI":""}</div>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      {[selected.smoking_status!=="never"&&`🚬 ${selected.smoking_status}`,selected.lives_alone==="yes"&&"👤 Lives alone",selected.telehealth_6m==="yes"&&"💻 Telehealth capable",`${selected.dist_to_hosp_km}km to hospital`].filter(Boolean).map((chip,i)=>(
                        <span key={i} style={{padding:"3px 10px",borderRadius:12,fontSize:11,background:T.white,border:`1px solid ${T.border}`,color:T.muted,fontWeight:500}}>{chip}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <RiskBadge tier={selected.risk_tier}/>
              </div>

              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:20}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:16}}>Clinical Profile</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px 24px"}}>
                  {[["Age",`${selected.age} years`],["ARIA Category",selected.aria_category],["ATSI Status",selected.atsi_status==="yes"?"Yes":"No"],["Diagnosis",selected.diagnosis],["Smoking",selected.smoking_status],["Medications",`${selected.num_meds} active`],["ED Visits (12m)",selected.ed_visits],["Missed Appts",selected.missed_appts],["Days Since GP",selected.days_since_gp],["Telehealth (6m)",selected.telehealth_6m==="yes"?"✓ Yes":"✗ No"],["Lives Alone",selected.lives_alone==="yes"?"Yes":"No"],["Phone",selected.phone]].map(([k,v],i)=>(
                    <div key={i} style={{borderBottom:`1px solid ${T.border}`,paddingBottom:10}}>
                      <div style={{fontSize:11,color:T.muted,marginBottom:3}}>{k}</div>
                      <div style={{fontSize:13,fontWeight:600,color:T.text}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:T.navy,borderRadius:14,padding:"22px 26px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:"rgba(248,250,252,0.5)",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:8}}>Recommended Intervention</div>
                  <div style={{fontSize:20,fontWeight:700,color:T.white,marginBottom:4}}>{iIcon[selected.recommended_intervention]} {selected.recommended_intervention}</div>
                  <div style={{fontSize:12,color:T.sky}}>Model confidence: {selected.risk_probability}% · AUC 0.749</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {assigned[selected.patient_id]?(
                    <div style={{padding:"10px 20px",borderRadius:10,background:T.greenLight,color:T.green,fontWeight:700,fontSize:13}}>✓ Assigned</div>
                  ):(
                    <button onClick={handleAssign} style={{padding:"10px 20px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"opacity 0.15s"}}
                      onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>Assign Intervention</button>
                  )}
                  <button onClick={handleContactNow} style={{padding:"10px 20px",borderRadius:10,background:T.green,border:"none",color:T.white,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>📞 Contact Now</button>
                </div>
              </div>

              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px"}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:18}}>Patient Timeline</div>
                <div style={{display:"flex",alignItems:"center"}}>
                  {timeline.map((item,i)=>{
                    const c=item.days===0?T.sky:item.days===null?"#CBD5E1":item.days<30?T.green:item.days<90?T.amber:T.red;
                    return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                        {i>0&&<div style={{position:"absolute",top:18,right:"50%",width:"100%",height:2,background:T.border,zIndex:0}}/>}
                        <div style={{width:36,height:36,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,zIndex:1}}>{item.icon}</div>
                        <div style={{fontSize:11,color:T.text,fontWeight:600,marginTop:8,textAlign:"center"}}>{item.label}</div>
                        <div style={{fontSize:10,color:c,fontWeight:700,marginTop:2}}>{item.days===0?"Today":item.days===null?"N/A":`${item.days}d ago`}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── Active Alerts ────────────────────────────────────────────────────────────
function PageAlerts({onNavigate,addToast}){
  const [modal,setModal]=useState(null);
  const [dismissed,setDismissed]=useState([]);
  const [filter,setFilter]=useState("ALL");
  const v=useVisible(50);
  const alerts=PATIENTS.filter(p=>p.risk_tier==="HIGH"||(p.risk_tier==="MEDIUM"&&p.days_since_gp>90)).filter(p=>!dismissed.includes(p.patient_id)).filter(p=>filter==="ALL"||p.risk_tier===filter).map(p=>({...p,severity:p.risk_probability>=85?"CRITICAL":"HIGH",reason:[p.days_since_gp>90&&`No GP contact in ${p.days_since_gp} days`,p.missed_appts>=3&&`${p.missed_appts} missed appointments`,p.ed_visits>=3&&`ED visit spike (${p.ed_visits}×)`,p.lives_alone==="yes"&&p.aria_category==="Very Remote"&&"Isolated — Very Remote + lives alone"].filter(Boolean).join(" · "),generated:`${Math.floor(Math.random()*5)+1}h ago`}));
  const sevColor=s=>s==="CRITICAL"?T.red:T.amber;

  function handleContactCall(patient){
    window.open(`tel:${patient.phone.replace(/\s/g,"")}`);
    addToast(`Calling ${patient.patient_id} on ${patient.phone}…`);
    setModal(null);
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,opacity:v?1:0,transition:"opacity 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:T.red,boxShadow:`0 0 0 3px ${T.redLight}`,animation:"pulse 1.5s infinite"}}/>
          <span style={{fontWeight:700,fontSize:16,color:T.text}}>{alerts.length} Unresolved Alerts</span>
          <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`}</style>
        </div>
        <div style={{display:"flex",gap:8}}>
          {["ALL","CRITICAL","HIGH","MEDIUM"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 14px",borderRadius:16,fontSize:12,fontWeight:600,border:`1.5px solid ${filter===f?sevColor(f)||T.sky:T.border}`,background:filter===f?riskBg(f)||T.skyLight:"none",color:filter===f?sevColor(f)||T.sky:T.muted,cursor:"pointer",fontFamily:"inherit"}}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {alerts.map((a,i)=>(
          <div key={a.patient_id} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,borderLeft:`4px solid ${sevColor(a.severity)}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 22px",display:"flex",alignItems:"center",gap:20,opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",transition:`opacity 0.5s ease ${i*60}ms,transform 0.5s ease ${i*60}ms`}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:700,background:a.severity==="CRITICAL"?T.redLight:T.amberLight,color:sevColor(a.severity)}}>{a.severity}</span>
                <span style={{fontWeight:700,color:T.text,fontSize:15}}>{a.patient_id}</span>
                <span style={{fontSize:12,color:T.muted}}>{a.age}y · {a.aria_category}</span>
                <span style={{fontSize:11,color:T.muted,marginLeft:"auto"}}>{a.generated}</span>
              </div>
              <div style={{fontSize:12,color:T.muted,marginBottom:4}}>{a.diagnosis}</div>
              <div style={{fontSize:12,color:T.text,fontWeight:500}}>{a.reason}</div>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>setModal(a)} style={{padding:"8px 14px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Contact Now</button>
              <button onClick={()=>onNavigate("schedule")} style={{padding:"8px 14px",borderRadius:8,background:T.navy,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Schedule</button>
              <button onClick={()=>setDismissed(d=>[...d,a.patient_id])} style={{padding:"8px 14px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(
        <Modal title={`Contact ${modal.patient_id}`} onClose={()=>setModal(null)}>
          <div style={{fontSize:13,color:T.muted,marginBottom:20}}>{modal.age}y · {modal.aria_category} · {modal.dist_to_hosp_km}km from hospital</div>
          <div onClick={()=>handleContactCall(modal)} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${T.border}`,marginBottom:10,cursor:"pointer",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.background=T.slateBg;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background="none"}}>
            <div style={{width:44,height:44,borderRadius:12,background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📞</div>
            <div>
              <div style={{fontWeight:700,color:T.text,fontSize:14}}>Call Patient</div>
              <div style={{fontSize:12,color:T.muted}}>Mobile: {modal.phone}</div>
            </div>
          </div>
          {[{icon:"💻",label:"Start Telehealth",sub:"Video consult via MyHealth",color:T.green},{icon:"📧",label:"Send SMS Reminder",sub:"Appointment reminder template",color:T.navy}].map((opt,i)=>(
            <div key={i} onClick={()=>setModal(null)} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${T.border}`,marginBottom:10,cursor:"pointer",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=opt.color;e.currentTarget.style.background=T.slateBg;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background="none";}}>
              <div style={{width:44,height:44,borderRadius:12,background:opt.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{opt.icon}</div>
              <div>
                <div style={{fontWeight:700,color:T.text,fontSize:14}}>{opt.label}</div>
                <div style={{fontSize:12,color:T.muted}}>{opt.sub}</div>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
function PageSchedule({appointments,setAppointments,addToast}){
  const [view,setView]=useState("Month");
  const [selDay,setSelDay]=useState(8);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({patient:"P001",date:`2026-04-08`,time:"09:00",clinician:"Dr. Sarah Chen",type:"Telehealth"});
  const v=useVisible(50);
  const daysInMonth=30;
  const typeColor=t=>t==="Telehealth"?T.sky:t==="In-Person"?T.navy:T.amber;
  const statusColor=s=>s==="Confirmed"?T.green:s==="Scheduled"?T.sky:s==="Pending"?T.amber:T.muted;
  const apptDays=appointments.map(a=>parseInt(a.date.split("-")[2]));
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  function handleAddAppointment(e){
    e.preventDefault();
    if(!form.patient||!form.date||!form.time||!form.clinician){ addToast("Please fill in all fields.","error"); return; }
    const patient=PATIENTS.find(p=>p.patient_id===form.patient);
    const newAppt={
      id:Date.now(),
      date:form.date,
      time:form.time,
      patient:form.patient,
      type:form.type,
      tier:patient?patient.risk_tier:"MEDIUM",
      clinician:form.clinician,
      status:"Scheduled",
    };
    setAppointments(a=>[...a,newAppt]);
    setSelDay(parseInt(form.date.split("-")[2]));
    setShowForm(false);
    addToast(`Appointment scheduled for ${form.patient} on ${form.date} at ${form.time}.`);
  }

  const inp={width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"};

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{fontWeight:700,fontSize:16,color:T.text}}>April 2026</div>
        <div style={{display:"flex",gap:4,background:T.slateBg,borderRadius:10,padding:4}}>
          {["Month","Week","Day"].map(vi=>(
            <button key={vi} onClick={()=>setView(vi)} style={{padding:"6px 18px",borderRadius:8,background:view===vi?T.white:"none",border:"none",fontWeight:view===vi?700:400,color:view===vi?T.text:T.muted,cursor:"pointer",fontFamily:"inherit",fontSize:13,boxShadow:view===vi?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>{vi}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:20}}>
        <div>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",marginBottom:20}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
                <div key={d} style={{padding:"10px",textAlign:"center",fontSize:12,fontWeight:600,color:T.muted,borderBottom:`1px solid ${T.border}`,background:T.slateBg}}>{d}</div>
              ))}
              {Array.from({length:daysInMonth},(_,i)=>{
                const day=i+1;
                const hasAppt=apptDays.includes(day);
                const isToday=day===8;
                const isSel=day===selDay;
                return(
                  <div key={day} onClick={()=>setSelDay(day)} style={{padding:"10px 8px",minHeight:56,borderBottom:`1px solid ${T.border}`,borderRight:(i+1)%7===0?"none":`1px solid ${T.border}`,background:isToday?T.skyLight:isSel?"#F0F9FF":T.white,cursor:"pointer",transition:"background 0.12s",position:"relative"}}>
                    <div style={{fontSize:13,fontWeight:isToday||isSel?700:400,width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:isToday?T.sky:"none",color:isToday?T.white:isSel?T.navy:T.text}}>{day}</div>
                    {hasAppt&&(
                      <div style={{display:"flex",gap:2,marginTop:3,flexWrap:"wrap"}}>
                        {appointments.filter(a=>parseInt(a.date.split("-")[2])===day).map(a=>(
                          <div key={a.id} style={{width:6,height:6,borderRadius:"50%",background:typeColor(a.type)}}/>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,fontWeight:700,fontSize:13,color:T.text}}>Upcoming Appointments</div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:T.slateBg}}>
                  {["Date","Time","Patient","Type","Risk","Clinician","Status"].map(h=>(
                    <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:T.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)).map((a,i)=>(
                  <tr key={a.id} style={{borderBottom:i<appointments.length-1?`1px solid ${T.border}`:"none"}}>
                    <td style={{padding:"12px 16px",fontSize:13,color:T.text}}>{a.date.slice(5)}</td>
                    <td style={{padding:"12px 16px",fontSize:13,fontWeight:500,color:T.text}}>{a.time}</td>
                    <td style={{padding:"12px 16px",fontSize:13,fontWeight:700,color:T.text}}>{a.patient}</td>
                    <td style={{padding:"12px 16px"}}><span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:600,background:typeColor(a.type)+"22",color:typeColor(a.type)}}>{a.type}</span></td>
                    <td style={{padding:"12px 16px"}}><RiskBadge tier={a.tier}/></td>
                    <td style={{padding:"12px 16px",fontSize:12,color:T.muted}}>{a.clinician}</td>
                    <td style={{padding:"12px 16px"}}><span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:600,background:statusColor(a.status)+"22",color:statusColor(a.status)}}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:T.text}}>April {selDay}</div>
              <button onClick={()=>setShowForm(f=>!f)} style={{padding:"6px 12px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Add</button>
            </div>
            {appointments.filter(a=>parseInt(a.date.split("-")[2])===selDay).length===0?(
              <div style={{fontSize:12,color:T.muted,fontStyle:"italic",textAlign:"center",padding:"20px 0"}}>No appointments</div>
            ):appointments.filter(a=>parseInt(a.date.split("-")[2])===selDay).map(a=>(
              <div key={a.id} style={{padding:"10px 12px",borderRadius:9,background:T.slateBg,marginBottom:8,borderLeft:`3px solid ${typeColor(a.type)}`}}>
                <div style={{fontWeight:600,fontSize:13,color:T.text}}>{a.time} — {a.patient}</div>
                <div style={{fontSize:11,color:T.muted,marginTop:2}}>{a.type} · {a.clinician}</div>
                <div style={{marginTop:4}}><RiskBadge tier={a.tier}/></div>
              </div>
            ))}
          </div>
          {showForm&&(
            <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 20px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.text,marginBottom:14}}>New Appointment</div>
              <form onSubmit={handleAddAppointment}>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Patient</div>
                  <select value={form.patient} onChange={set("patient")} style={inp}>
                    {PATIENTS.map(p=><option key={p.patient_id} value={p.patient_id}>{p.patient_id} — {p.diagnosis.split(" | ")[0]}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Date</div>
                  <input type="date" value={form.date} onChange={set("date")} style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Time</div>
                  <input type="time" value={form.time} onChange={set("time")} style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Clinician</div>
                  <select value={form.clinician} onChange={set("clinician")} style={inp}>
                    {["Dr. Sarah Chen","Dr. James Wu","Dr. Priya Sharma"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Type</div>
                  <select value={form.type} onChange={set("type")} style={inp}>
                    <option>Telehealth</option><option>In-Person</option><option>Follow-Up</option>
                  </select>
                </div>
                <button type="submit" style={{width:"100%",padding:"10px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Confirm Appointment</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Revenue ──────────────────────────────────────────────────────────────────
function PageRevenue(){
  const v=useVisible(50);
  const kpis=[{label:"Total Projected Savings",val:244700,prefix:"$",accent:T.green,icon:"💰"},{label:"Prevented ED Admissions",val:124000,prefix:"$",accent:T.sky,icon:"🏥"},{label:"Reduced Hospital Stays",val:89500,prefix:"$",accent:T.navy,icon:"🛏️"},{label:"Telehealth vs Transport",val:31200,prefix:"$",accent:T.amber,icon:"💻"}];
  const breakdown=[{label:"Prevented Admissions",val:124000,pct:50.7,color:T.sky},{label:"Reduced LOS",val:89500,pct:36.6,color:T.green},{label:"Telehealth Savings",val:31200,pct:12.7,color:T.amber}];
  const funding=[{label:"Government Health Funding",val:58,color:T.navy},{label:"NDIS Contributions",val:22,color:T.sky},{label:"Rural Health Grants",val:13,color:T.green},{label:"Gap (Unfunded)",val:7,color:T.red}];
  const table=[{type:"Home Visit",assigned:67,cost:350,total:23450,saving:85750,roi:"3.7×"},{type:"Telehealth Consult",assigned:110,cost:180,total:19800,saving:124300,roi:"6.3×"},{type:"Proactive Phone Call",assigned:33,cost:45,total:1485,saving:34650,roi:"23.3×"}];

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
        {kpis.map((k,i)=><StatCard key={i} {...k} value={k.val} delay={i*80} decimals={0}/>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:20,marginBottom:20}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:20}}>Cost Savings Breakdown</div>
          {breakdown.map((b,i)=>(
            <div key={i} style={{marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:13,color:T.text,fontWeight:500}}>{b.label}</span>
                <span style={{fontSize:13,fontWeight:700,color:b.color}}>${b.val.toLocaleString()}</span>
              </div>
              <HBar label="" value={b.pct} max={100} color={b.color} count={`${b.pct}%`} delay={400+i*100}/>
            </div>
          ))}
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:20}}>Funding Allocation</div>
          {funding.map((f,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:T.text}}>{f.label}</span>
                <span style={{fontSize:12,fontWeight:700,color:f.color}}>{f.val}%</span>
              </div>
              <HBar label="" value={f.val} max={100} color={f.color} count="" delay={500+i*80}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",marginBottom:20}}>
        <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.border}`,fontWeight:700,fontSize:14,color:T.text}}>Cost per Intervention</div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:T.slateBg}}>{["Intervention Type","# Assigned","Avg Cost","Total Cost","Projected Saving","ROI"].map(h=><th key={h} style={{padding:"10px 18px",textAlign:"left",fontSize:11,fontWeight:600,color:T.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{table.map((row,i)=><tr key={i} style={{borderBottom:i<table.length-1?`1px solid ${T.border}`:"none"}}><td style={{padding:"13px 18px",fontSize:13,fontWeight:600,color:T.text}}>{row.type}</td><td style={{padding:"13px 18px",fontSize:13,color:T.text}}>{row.assigned}</td><td style={{padding:"13px 18px",fontSize:13,color:T.text}}>${row.cost}</td><td style={{padding:"13px 18px",fontSize:13,color:T.text}}>${row.total.toLocaleString()}</td><td style={{padding:"13px 18px",fontSize:13,fontWeight:700,color:T.green}}>${row.saving.toLocaleString()}</td><td style={{padding:"13px 18px"}}><span style={{padding:"3px 9px",borderRadius:8,fontSize:12,fontWeight:700,background:T.greenLight,color:T.green}}>{row.roi}</span></td></tr>)}</tbody>
        </table>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button style={{padding:"12px 28px",borderRadius:10,background:T.navy,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>📄 Export Funding Report</button>
      </div>
    </div>
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────────
function PageAnalytics(){
  const v=useVisible(50);
  const high=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;
  const med=PATIENTS.filter(p=>p.risk_tier==="MEDIUM").length;
  const low=PATIENTS.filter(p=>p.risk_tier==="LOW").length;
  const diagData=["Type 2 Diabetes","Heart Failure","COPD","CKD","Hypertension","Depression","Asthma"].map(d=>({label:d,count:PATIENTS.filter(p=>p.diagnosis.includes(d)).length})).sort((a,b)=>b.count-a.count);
  const predictors=[{label:"Days since GP visit",or:3.41},{label:"ED visits (12m)",or:2.87},{label:"Lives alone",or:2.23},{label:"Polypharmacy (≥5 meds)",or:2.1},{label:"Missed appointments",or:1.96},{label:"Very Remote ARIA",or:1.72}];
  const ariaData=[{label:"Outer Regional",count:PATIENTS.filter(p=>p.aria_category==="Outer Regional").length,color:T.sky},{label:"Remote",count:PATIENTS.filter(p=>p.aria_category==="Remote").length,color:T.amber},{label:"Very Remote",count:PATIENTS.filter(p=>p.aria_category==="Very Remote").length,color:T.red}];

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
        {[{label:"AUC-ROC",val:"0.749",accent:T.sky,icon:"🎯"},{label:"Sensitivity",val:"81.2%",accent:T.green,icon:"✅"},{label:"Specificity",val:"74.6%",accent:T.navy,icon:"🔍"},{label:"F1 Score",val:"0.73",accent:T.amber,icon:"📊"}].map((m,i)=>(
          <div key={i} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",borderTop:`3px solid ${m.accent}`,padding:"20px 22px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",transition:`opacity 0.5s ease ${i*70}ms,transform 0.5s ease ${i*70}ms`}}>
            <div style={{fontSize:12,color:T.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>{m.icon} {m.label}</div>
            <div style={{fontSize:34,fontWeight:700,color:m.accent}}>{m.val}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:20}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Risk Distribution</div>
          <HBar label="HIGH" value={high/PATIENTS.length*100} max={100} color={T.red} count={high} delay={300}/>
          <HBar label="MEDIUM" value={med/PATIENTS.length*100} max={100} color={T.amber} count={med} delay={400}/>
          <HBar label="LOW" value={low/PATIENTS.length*100} max={100} color={T.green} count={low} delay={500}/>
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>ARIA Remoteness</div>
          {ariaData.map((a,i)=><HBar key={a.label} label={a.label} value={a.count/PATIENTS.length*100} max={100} color={a.color} count={a.count} delay={350+i*80}/>)}
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>ATSI vs Non-ATSI Risk</div>
          {[{label:"ATSI — HIGH",v:80,c:T.red},{label:"ATSI — MEDIUM",v:15,c:T.amber},{label:"Non-ATSI — HIGH",v:45,c:T.red},{label:"Non-ATSI — MEDIUM",v:40,c:T.amber}].map((b,i)=>(
            <HBar key={b.label} label={b.label} value={b.v} max={100} color={b.c} count={`${b.v}%`} delay={400+i*70}/>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:20}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Diagnosis Prevalence</div>
          {diagData.map((d,i)=><HBar key={d.label} label={d.label} value={d.count/PATIENTS.length*100} max={100} color={T.sky} count={d.count} delay={400+i*60}/>)}
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Top Predictors (Odds Ratios)</div>
          {predictors.map((p,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:T.text,fontWeight:500}}>{p.label}</span>
                <span style={{fontSize:13,fontWeight:700,color:T.navy}}>{p.or}×</span>
              </div>
              <HBar label="" value={(p.or/3.5)*100} max={100} color={T.navy} count="" delay={450+i*70}/>
            </div>
          ))}
          <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.muted,fontStyle:"italic"}}>Logistic regression trained on synthetic rural cohort. For demonstration purposes.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function PageSettings({addToast}){
  const v=useVisible(50);
  return(
    <div style={{maxWidth:680,opacity:v?1:0,transition:"opacity 0.4s"}}>
      {[{title:"Model Configuration",fields:[["Risk Model","Random Forest (AUC 0.749)"],["Score Threshold (HIGH)","70%"],["Score Threshold (MEDIUM)","40%"],["Retrain Frequency","Weekly"]]},{title:"Notifications",fields:[["Alert Email","coordinator@rews.health.au"],["SMS Alerts","Enabled"],["Daily Report","07:00 AEST"]]},{title:"Data",fields:[["Data Source","patients_500_signal.csv"],["Last Updated","05 Apr 2026 11:52"],["Total Records","500"]]}].map((section,si)=>(
      <div key={si} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:20,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",transition:`opacity 0.5s ease ${si*100}ms,transform 0.5s ease ${si*100}ms`}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>{section.title}</div>
          {section.fields.map(([k,val])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:`1px solid ${T.border}`}}>
              <span style={{fontSize:13,color:T.muted}}>{k}</span>
              <input defaultValue={val} style={{padding:"6px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",color:T.text,outline:"none",width:240,transition:"border-color 0.15s"}}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
          ))}
        </div>
      ))}
      <button onClick={()=>addToast("Settings saved successfully.")} style={{padding:"12px 28px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save Settings</button>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV=[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"patients",icon:"👥",label:"Patients"},{id:"alerts",icon:"⚠️",label:"Active Alerts"},{id:"schedule",icon:"📅",label:"Schedule"},{id:"revenue",icon:"💰",label:"Revenue & Funding"},{id:"analytics",icon:"📊",label:"Analytics"},{id:"settings",icon:"⚙️",label:"Settings"}];
const PAGE_TITLES={dashboard:"Dashboard",patients:"Patients",alerts:"Active Alerts",schedule:"Schedule & Calendar",revenue:"Revenue & Funding",analytics:"Analytics",settings:"Settings"};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App(){
  const [currentUser,setCurrentUser]=useState(()=>{
    try{ return JSON.parse(localStorage.getItem("rews_user")||"null"); }catch{ return null; }
  });
  const [page,setPage]=useState("dashboard");
  const [appointments,setAppointments]=useState(DEFAULT_APPOINTMENTS);
  const [toasts,setToasts]=useState([]);

  function addToast(msg,type="success"){
    const id=Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4000);
  }

  function handleLogin(user){
    localStorage.setItem("rews_user",JSON.stringify(user));
    setCurrentUser(user);
  }

  function handleLogout(){
    localStorage.removeItem("rews_user");
    setCurrentUser(null);
  }

  if(!currentUser) return <PageLogin onLogin={handleLogin}/>;

  const alertCount=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;

  const renderPage=()=>{
    switch(page){
      case "dashboard": return <PageDashboard onNavigate={setPage}/>;
      case "patients":  return <PagePatients addToast={addToast}/>;
      case "alerts":    return <PageAlerts onNavigate={setPage} addToast={addToast}/>;
      case "schedule":  return <PageSchedule appointments={appointments} setAppointments={setAppointments} addToast={addToast}/>;
      case "revenue":   return <PageRevenue/>;
      case "analytics": return <PageAnalytics/>;
      case "settings":  return <PageSettings addToast={addToast}/>;
      default: return <PageDashboard onNavigate={setPage}/>;
    }
  };

  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"DM Sans,sans-serif",background:T.slateBg}}>
      {/* Sidebar */}
      <div style={{width:240,background:T.navy,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:50}}>
        <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:34,fontWeight:700,color:T.white,letterSpacing:"-0.02em",lineHeight:1}}>REWS</div>
          <div style={{fontSize:10,color:T.sky,letterSpacing:"0.12em",textTransform:"uppercase",marginTop:4,fontWeight:500}}>Rural Early Warning</div>
        </div>
        <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
          {NAV.map(item=>{
            const isActive=page===item.id;
            return(
              <button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",borderRadius:10,border:"none",background:isActive?"rgba(14,165,233,0.15)":"none",color:isActive?T.sky:T.textLight,fontSize:13,fontWeight:isActive?600:400,cursor:"pointer",fontFamily:"inherit",marginBottom:2,textAlign:"left",transition:"background 0.15s,color 0.15s",position:"relative"}}
                onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="rgba(255,255,255,0.05)";}}
                onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="none";}}>
                {isActive&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:20,background:T.sky,borderRadius:"0 2px 2px 0"}}/>}
                <span style={{fontSize:15}}>{item.icon}</span>
                <span>{item.label}</span>
                {item.id==="alerts"&&alertCount>0&&<span style={{marginLeft:"auto",background:T.red,color:T.white,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{alertCount}</span>}
              </button>
            );
          })}
        </nav>
        {/* User info + logout */}
        <div style={{padding:"14px 16px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:13,flexShrink:0}}>
              {currentUser.name.charAt(0)}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:T.white,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{currentUser.name}</div>
              <div style={{fontSize:10,color:T.sky,textTransform:"capitalize"}}>{currentUser.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{width:"100%",padding:"7px",borderRadius:8,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.15)"}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{marginLeft:240,flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{height:60,background:T.white,borderBottom:`1px solid ${T.border}`,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40}}>
          <div style={{fontSize:17,fontWeight:700,color:T.text}}>{PAGE_TITLES[page]}</div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{fontSize:12,color:T.muted}}>{new Date().toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</div>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setPage("alerts")}>
              <span style={{fontSize:20}}>🔔</span>
              {alertCount>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,background:T.red,borderRadius:"50%",fontSize:9,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{alertCount}</span>}
            </div>
            <div style={{width:34,height:34,borderRadius:"50%",background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>{currentUser.name.charAt(0)}</div>
          </div>
        </div>
        <div style={{flex:1,padding:"32px",overflowY:page==="patients"?"hidden":"auto"}}>
          <div key={page} style={{animation:"pageIn 0.35s ease"}}>
            <style>{`@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {renderPage()}
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts}/>
    </div>
  );
}
