'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false)
  const [showEmail, setShowEmail] = useState(user?.privacy.showEmail || false)

  const handleTwoFactorChange = (checked: boolean) => {
    setTwoFactorEnabled(checked)
    updateUser({ ...user, twoFactorEnabled: checked })
  }

  const handleShowEmailChange = (checked: boolean) => {
    setShowEmail(checked)
    updateUser({ ...user, privacy: { ...user.privacy, showEmail: checked } })
  }

  if (!user) return <div>Please log in to view your settings.</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Privacy</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-email"
              checked={showEmail}
              onCheckedChange={handleShowEmailChange}
            />
            <Label htmlFor="show-email">Show email on profile</Label>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Security</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="two-factor"
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorChange}
            />
            <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

