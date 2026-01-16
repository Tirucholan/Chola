
import React, { useState, useEffect } from 'react';
import { AppStatus, UserProfile, Quest } from './types';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.WELCOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [availableAccounts, setAvailableAccounts] = useState<UserProfile[]>([]);

  useEffect(() => {
    const savedAccounts = localStorage.getItem('chola_vault_accounts');
    if (savedAccounts) {
      setAvailableAccounts(JSON.parse(savedAccounts));
    }

    const currentSession = localStorage.getItem('chola_active_session');
    if (currentSession) {
      const { user: savedUser, quests: savedQuests } = JSON.parse(currentSession);
      setUser(savedUser);
      setQuests(savedQuests);
      setStatus(AppStatus.DASHBOARD);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('chola_active_session', JSON.stringify({ user, quests }));
      setAvailableAccounts(prev => {
        const otherAccounts = prev.filter(a => a.name !== user.name);
        const updated = [user, ...otherAccounts];
        localStorage.setItem('chola_vault_accounts', JSON.stringify(updated));
        return updated;
      });
    } else {
      localStorage.removeItem('chola_active_session');
    }
  }, [user, quests]);

  const handleEnter = () => {
    if (user) setStatus(AppStatus.DASHBOARD);
    else setStatus(AppStatus.AUTH);
  };

  const handleBack = () => {
    if (status === AppStatus.AUTH) setStatus(AppStatus.WELCOME);
    else if (status === AppStatus.ONBOARDING) setStatus(AppStatus.AUTH);
    else if (status === AppStatus.DASHBOARD) {
      setUser(null);
      setQuests([]);
      setStatus(AppStatus.AUTH);
    }
  };

  const handleAuthSuccess = (userData: Partial<UserProfile>) => {
    const existingAccount = availableAccounts.find(a => a.name === userData.name);
    if (existingAccount) {
      setUser(existingAccount);
      setStatus(AppStatus.DASHBOARD);
    } else {
      setUser({
        name: userData.name || 'Guest User',
        email: userData.email || '',
        avatar: null,
        level: 1,
        xp: 0,
        maxXp: 100,
        rank: 'Initiate',
        focusAreas: [],
        bio: 'Awaiting protocol initialization.',
        lastLevelUpDate: new Date().toISOString(),
        lastPlannedDate: '', // Empty initially to trigger planning
        ...userData
      } as UserProfile);
      setStatus(AppStatus.ONBOARDING);
    }
  };

  const handleOnboardingComplete = (data: { title: string; bio: string; quests: Quest[] }) => {
    if (user) {
      setUser({
        ...user,
        rank: data.title,
        bio: data.bio,
        lastLevelUpDate: new Date().toISOString()
      });
      setQuests(data.quests);
    }
    setStatus(AppStatus.DASHBOARD);
  };

  return (
    <div className="h-full w-full bg-[#080808] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-900/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-900/5 blur-[120px] rounded-full"></div>
      <div className="relative z-10 w-full h-full overflow-hidden">
        {status === AppStatus.WELCOME && <WelcomePage onEnter={handleEnter} />}
        {status === AppStatus.AUTH && <AuthPage onAuthSuccess={handleAuthSuccess} onBack={handleBack} availableAccounts={availableAccounts} />}
        {status === AppStatus.ONBOARDING && user && <Onboarding userName={user.name} onComplete={handleOnboardingComplete} onBack={handleBack} />}
        {status === AppStatus.DASHBOARD && user && <Dashboard user={user} setUser={setUser} quests={quests} setQuests={setQuests} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default App;
