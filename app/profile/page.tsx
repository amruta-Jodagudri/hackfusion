'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(user)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setProfile(user)
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handlePrivacyChange = (checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      privacy: { ...prev.privacy, isPrivate: checked }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(profile)
    setIsEditing(false)
  }

  if (!user) return <div>Please log in to view your profile.</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src={profile.profilePicture} />
            <AvatarFallback>{profile.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={profile.profilePicture}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="private-account"
                checked={profile.privacy.isPrivate}
                onCheckedChange={handlePrivacyChange}
              />
              <Label htmlFor="private-account">Private Account</Label>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        ) : (
          <div className="space-y-4">
            <p>{profile.bio}</p>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}
      </div>
    </div>
  )
}

