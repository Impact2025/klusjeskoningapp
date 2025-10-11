'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../AppProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, LogIn } from 'lucide-react';
import ScreenWrapper from '../ScreenWrapper';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function ParentLoginScreen() {
  const { setScreen, registerFamily, loginParent, isLoading } = useApp();
  const { toast } = useToast();

  // Check if there's a pending checkout or register flag to default to registration mode
  const [isRegistering, setIsRegistering] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasPendingCheckout = sessionStorage.getItem('pendingCheckout') === 'premium';
      const shouldShowRegister = sessionStorage.getItem('showRegister') === 'true';
      // Clear the showRegister flag after reading
      if (shouldShowRegister) {
        sessionStorage.removeItem('showRegister');
      }
      return hasPendingCheckout || shouldShowRegister;
    }
    return false;
  });

  // Form state
  const [familyName, setFamilyName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      loginParent(email, password);
    } else {
      toast({ variant: 'destructive', title: 'Fout', description: 'Vul e-mailadres en wachtwoord in.' });
    }
  };

  const handleRegister = () => {
    if (familyName && city && email && password) {
        if(password.length < 6) {
            toast({ variant: 'destructive', title: 'Fout', description: 'Wachtwoord moet minimaal 6 tekens lang zijn.' });
            return;
        }
        registerFamily(familyName, city, email, password);
    } else {
      toast({ variant: 'destructive', title: 'Fout', description: 'Vul alle velden in om te registreren.' });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isLoading) return;
    if(isRegistering) {
        handleRegister();
    } else {
        handleLogin();
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // Clear fields on mode switch
    setFamilyName('');
    setCity('');
    setEmail('');
    setPassword('');
  }

  return (
    <ScreenWrapper className="p-6">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => setScreen('landing')}>
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Button>
        <h2 className="font-brand text-3xl text-center flex-grow text-primary">Ouder Portaal</h2>
        <div className="w-10"></div>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <h3 className="text-xl font-bold text-center mb-4">{isRegistering ? 'Nieuw Gezin Aanmaken' : 'Inloggen'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <Label htmlFor="familyName">Familienaam</Label>
                <Input id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="De Klussers" required />
              </div>
              <div>
                <Label htmlFor="city">Woonplaats</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Klusdorp" required />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">E-mailadres</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ouder@email.com" required />
          </div>
          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimaal 6 tekens" required />
          </div>

          <Button type="submit" size="lg" className="w-full text-lg shadow-md bg-success hover:bg-success/90 text-white" disabled={isLoading}>
             {isRegistering ? <><Users className="mr-2 h-6 w-6" /> Registreren</> : <><LogIn className="mr-2 h-6 w-6" /> Inloggen</>}
          </Button>
        </form>
        
        <div className="my-4 flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OF</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button variant="outline" onClick={toggleMode} className="w-full" disabled={isLoading}>
          {isRegistering ? 'Al een account? Log hier in.' : 'Nog geen account? Registreer hier.'}
        </Button>

        {!isRegistering && (
          <Button variant="link" onClick={() => setScreen('recoverCode')} className="mx-auto mt-4" disabled={isLoading}>
            Wachtwoord vergeten?
          </Button>
        )}
      </main>
    </ScreenWrapper>
  );
}
