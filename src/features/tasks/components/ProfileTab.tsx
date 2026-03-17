'use client';

import { Card } from '@/components/ui/card';
import { User, Mail, Calendar, CheckCircle, AlertCircle, Shield, Package } from 'lucide-react';
import { User as UserType } from '@/src/features/auth/types/User';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProfileTabProps {
  user: UserType;
  hasSubscription: boolean;
}

export function ProfileTab({ user, hasSubscription }: ProfileTabProps) {
  // Get user's full name
  const fullName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.firstName || user?.email?.split('@')[0];

  // Get user's initials for avatar
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="space-y-8">
      {/* User Profile Card */}
      <Card className="p-6">
        <h2 className="font-heading font-bold text-xl text-rich-black mb-6">
          Profile Information
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-tomato flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{initials}</span>
            </div>
          </div>
          
          {/* User Details */}
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                <User className="w-5 h-5 text-tomato" />
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Full Name</p>
                <p className="font-medium text-rich-black">{fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-tomato" />
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Email</p>
                <p className="font-medium text-rich-black">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                user?.isEmailVerified ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {user?.isEmailVerified ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Email Status</p>
                <p className={`font-medium ${user?.isEmailVerified ? 'text-green-600' : 'text-amber-600'}`}>
                  {user?.isEmailVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-tomato" />
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Role</p>
                <p className="font-medium text-rich-black capitalize">{user?.roleName || 'User'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tomato/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-tomato" />
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Member Since</p>
                <p className="font-medium text-rich-black">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                user?.isDeactivated ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <CheckCircle className={`w-5 h-5 ${user?.isDeactivated ? 'text-red-600' : 'text-green-600'}`} />
              </div>
              <div>
                <p className="text-sm text-rich-black/60">Account Status</p>
                <p className={`font-medium ${user?.isDeactivated ? 'text-red-600' : 'text-green-600'}`}>
                  {user?.isDeactivated ? 'Deactivated' : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-tomato" />
            </div>
            <div>
              <p className="text-sm text-rich-black/60 mb-1">Active Subscriptions</p>
              <p className="font-heading font-bold text-3xl text-rich-black">
                {hasSubscription ? '1' : '0'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-tomato" />
            </div>
            <div>
              <p className="text-sm text-rich-black/60 mb-1">Account Status</p>
              <p className="font-heading font-bold text-xl text-rich-black">Active</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscriptions Card */}
      <Card className="p-8">
        <h2 className="font-heading font-bold text-2xl text-rich-black mb-6">
          Your Subscriptions
        </h2>
        {hasSubscription ? (
          <div className="space-y-4">
            <p className="text-rich-black/70">
              Your subscription is now active. Our team will contact you shortly to begin your service.
            </p>
            <Link href="/">
              <Button variant="outline">Browse More Services</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-rich-black/20 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-rich-black mb-2">
              No Active Subscriptions
            </h3>
            <p className="text-rich-black/70 mb-6">
              Browse our services to get started
            </p>
            <Link href="/">
              <Button className="bg-tomato hover:bg-tomato-600">
                Browse Services
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}

