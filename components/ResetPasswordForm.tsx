'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
      {isPending ? 'Resetting...' : 'Reset Password'}
    </Button>
  );
}

export default function ResetPasswordForm({ userId, token }: { userId: string; token: string }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clientError, setClientError] = useState('');
  const [formState, setFormState] = useState({ success: '', error: '', isPending: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError('');
  
    if (password !== confirmPassword) {
      setClientError("Passwords don't match");
      return;
    }
  
    if (password.length < 8) {
      setClientError('Password must be at least 8 characters long');
      return;
    }
  
    setFormState({ success: '', error: '', isPending: true });
  
    try {
      const data = { password, confirmPassword }; // Send data as JSON
      const result = await axios.post(
        `https://campuscartbackend.onrender.com/api/auth/reset-password/${userId}/${token}`,
        data,
        { headers: { 'Content-Type': 'application/json' } } // Specify JSON format
      );
      console.log(result)
      setFormState({ success: 'Password reset successfully', error: '', isPending: false });
    } catch (error: any) {
      setFormState({ success: '', error: error.response?.data?.message || 'An error occurred', isPending: false });
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="token" value={token} />
      
      <div>
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      {clientError && (
        <Alert variant="destructive">
          <AlertDescription>{clientError}</AlertDescription>
        </Alert>
      )}
      
      {formState.error && (
        <Alert variant="destructive">
          <AlertDescription>{formState.error}</AlertDescription>
        </Alert>
      )}
      
      {formState.success && (
        <Alert>
          <AlertDescription>{formState.success}</AlertDescription>
        </Alert>
      )}
      
      <SubmitButton isPending={formState.isPending} />
    </form>
  );
}
