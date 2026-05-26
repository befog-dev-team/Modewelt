"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Loader2, AlertTriangle, User, Bell, Shield, Lock, Palette,
    ChevronRight, LogOut, Trash2, Eye, EyeOff, Moon, Sun, Check, KeyRound
} from "lucide-react";
import { useSession } from "../SessionProvider";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { logout } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import EditProfile from "@/components/Profile/EditProfile";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const NOTIF_KEY = "mw-notifications";
const PRIVACY_KEY = "mw-privacy";
const DEFAULT_NOTIF = { newFollower: true, postLike: true, postComment: true, mentions: true, jobAlerts: false, weeklyDigest: false };
const DEFAULT_PRIVACY = { privateAccount: false, showActivity: true, showProfileViews: true, allowMessages: true };

function loadLS(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

// ─── Section list ─────────────────────────────────────────────────────────────
const SECTIONS = [
    { id: "profile",       label: "Edit Profile",    icon: User },
    { id: "notifications", label: "Notifications",   icon: Bell },
    { id: "privacy",       label: "Account Privacy", icon: Shield },
    { id: "security",      label: "Security",        icon: Lock },
    { id: "appearance",    label: "Appearance",      icon: Palette },
    { id: "account",       label: "Account",         icon: AlertTriangle },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection]   = useState("profile");
    const [deleteOpen, setDeleteOpen]         = useState(false);
    const [deleteLoading, setDeleteLoading]   = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const router       = useRouter();
    const queryClient  = useQueryClient();
    const { user }     = useSession();

    // ── Notifications (persisted) ──
    const [notifications, setNotifications] = useState(DEFAULT_NOTIF);
    useEffect(() => { setNotifications(loadLS(NOTIF_KEY, DEFAULT_NOTIF)); }, []);
    const toggleNotification = (key) => {
        setNotifications(prev => {
            const next = { ...prev, [key]: !prev[key] };
            localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
            return next;
        });
        toast.success("Notification preference saved");
    };

    // ── Privacy (persisted) ──
    const [privacy, setPrivacy] = useState(DEFAULT_PRIVACY);
    useEffect(() => { setPrivacy(loadLS(PRIVACY_KEY, DEFAULT_PRIVACY)); }, []);
    const togglePrivacy = (key) => {
        setPrivacy(prev => {
            const next = { ...prev, [key]: !prev[key] };
            localStorage.setItem(PRIVACY_KEY, JSON.stringify(next));
            return next;
        });
        toast.success("Privacy setting updated");
    };

    // ── Theme (persisted) ──
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("mw-theme") : "light";
        if (saved === "dark") { document.documentElement.classList.add("dark"); setTheme("dark"); }
        else { document.documentElement.classList.remove("dark"); setTheme("light"); }
    }, []);
    const applyTheme = (t) => {
        t === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
        localStorage.setItem("mw-theme", t);
        setTheme(t);
        toast.success(`${t === "dark" ? "Dark" : "Light"} mode enabled`);
    };

    // ── Password change ──
    const [pwForm, setPwForm]               = useState({ current: "", next: "", confirm: "" });
    const [showPw, setShowPw]               = useState({ current: false, next: false, confirm: false });
    const [pwLoading, setPwLoading]         = useState(false);
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (pwForm.next !== pwForm.confirm) { toast.error("New passwords do not match"); return; }
        if (pwForm.next.length < 4) { toast.error("Password must be at least 4 characters"); return; }
        setPwLoading(true);
        try {
            await axios.patch("/api/users/change-password", {
                currentPassword: pwForm.current,
                newPassword:     pwForm.next,
            });
            toast.success("Password changed successfully!");
            setPwForm({ current: "", next: "", confirm: "" });
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to change password. Check your current password.");
        } finally {
            setPwLoading(false);
        }
    };

    // ── Delete account ──
    const { mutate: deleteAccount } = useMutation({
        mutationFn: async () => { await axios.delete("/api/users/delete-account"); },
        onSuccess: async () => {
            toast.success("Your account has been deleted.");
            await logout(); queryClient.clear(); router.push("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete account");
            setDeleteLoading(false);
        },
    });
    const handleDeleteAccount = () => { setDeleteLoading(true); deleteAccount(); };

    const handleLogout = async () => {
        try { await logout(); queryClient.clear(); router.push("/"); }
        catch { toast.error("Logout failed. Please try again."); }
    };

    if (!user) return null;

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 bg-cover bg-center -z-10 opacity-[0.25]"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770977882753-e2a85226e17d?q=80&w=2000&auto=format&fit=crop')" }} />
            <div className="fixed inset-0 bg-white/75 dark:bg-black/80 -z-10" />

            <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

                {/* ─── Sidebar ───────────────────────────────────────────────── */}
                <aside className="w-full lg:w-[280px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-100 dark:border-gray-800 shadow-sm lg:min-h-screen flex flex-col">
                    <div className="px-5 py-6 border-b border-gray-100 dark:border-gray-800">
                        <Link href={`/profile/${user.username}`} className="flex items-center gap-3 group">
                            <UserAvatar avatarUrl={user.avatarUrl} size={100} className="rounded-full h-12 w-12 object-cover ring-2 ring-[#fc3fb4]/20 group-hover:ring-[#fc3fb4]/50 transition-all" />
                            <div className="overflow-hidden">
                                <p className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#a45286] transition-colors">{user.displayName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">@{user.username}</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="p-3 space-y-1 flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1">Settings</p>
                        {SECTIONS.map(({ id, label, icon: Icon }) => (
                            <button key={id} onClick={() => setActiveSection(id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                                    ${activeSection === id
                                        ? "bg-[#fc3fb4]/10 text-[#a45286]"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                    }`}>
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${activeSection === id ? "text-[#fc3fb4]" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </div>
                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === id ? "text-[#fc3fb4] rotate-90" : "text-gray-300"}`} />
                            </button>
                        ))}
                    </nav>

                    <div className="px-4 pb-6">
                        <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <LogOut className="w-4 h-4" /> Log Out
                        </button>
                    </div>
                </aside>

                {/* ─── Main Content ───────────────────────────────────────────── */}
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-2xl mx-auto space-y-6">

                        {/* EDIT PROFILE */}
                        {activeSection === "profile" && (
                            <Section title="Edit Profile" subtitle="Update your public profile information">
                                <div className="space-y-3">
                                    <ProfileRow label="Display Name"    value={user.displayName} />
                                    <ProfileRow label="Username"        value={`@${user.username}`} />
                                    <ProfileRow label="Email"           value={user.email || "Not set"} />
                                    <ProfileRow label="Headline"        value={user.profileHeadline || "Not set"} />
                                    <ProfileRow label="Location"        value={user.location || "Not set"} />
                                    <ProfileRow label="Bio"             value={user.bio || "Not set"} multiline />
                                    <div className="pt-3">
                                        <button onClick={() => setEditProfileOpen(true)}
                                            className="px-5 py-2 bg-[#a45286] text-white text-sm font-semibold rounded-lg hover:bg-[#8a3e70] transition-colors">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </Section>
                        )}

                        {/* NOTIFICATIONS */}
                        {activeSection === "notifications" && (
                            <Section title="Notifications" subtitle="Choose what you want to be notified about">
                                <div className="divide-y divide-gray-100">
                                    <ToggleRow label="New Follower"   desc="When someone follows you"                  value={notifications.newFollower}  onChange={() => toggleNotification("newFollower")} />
                                    <ToggleRow label="Post Likes"     desc="When someone likes your post"               value={notifications.postLike}     onChange={() => toggleNotification("postLike")} />
                                    <ToggleRow label="Post Comments"  desc="When someone comments on your post"         value={notifications.postComment}  onChange={() => toggleNotification("postComment")} />
                                    <ToggleRow label="Mentions"       desc="When someone mentions you"                  value={notifications.mentions}     onChange={() => toggleNotification("mentions")} />
                                    <ToggleRow label="Job Alerts"     desc="New job postings matching your profile"     value={notifications.jobAlerts}    onChange={() => toggleNotification("jobAlerts")} />
                                    <ToggleRow label="Weekly Digest"  desc="A weekly summary of activity on your network" value={notifications.weeklyDigest} onChange={() => toggleNotification("weeklyDigest")} />
                                </div>
                                <p className="text-xs text-gray-400 mt-4">Preferences are saved to your browser.</p>
                            </Section>
                        )}

                        {/* PRIVACY */}
                        {activeSection === "privacy" && (
                            <Section title="Account Privacy" subtitle="Control who can see your content and how you appear">
                                <div className="divide-y divide-gray-100">
                                    <ToggleRow
                                        label="Private Account"
                                        desc="Only approved followers can see your posts and profile"
                                        value={privacy.privateAccount} onChange={() => togglePrivacy("privateAccount")}
                                        icon={privacy.privateAccount ? <EyeOff className="w-4 h-4 text-[#fc3fb4]" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                    />
                                    <ToggleRow label="Show Activity Status"        desc="Let others see when you were last active"          value={privacy.showActivity}      onChange={() => togglePrivacy("showActivity")} />
                                    <ToggleRow label="Profile View Notifications"  desc="Get notified when someone views your profile"      value={privacy.showProfileViews}  onChange={() => togglePrivacy("showProfileViews")} />
                                    <ToggleRow label="Allow Direct Messages"       desc="Allow other users to send you messages"            value={privacy.allowMessages}     onChange={() => togglePrivacy("allowMessages")} />
                                </div>
                                <p className="text-xs text-gray-400 mt-4">Preferences are saved to your browser.</p>
                            </Section>
                        )}

                        {/* SECURITY */}
                        {activeSection === "security" && (
                            <>
                                <Section title="Change Password" subtitle="Update your account password">
                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <PwField label="Current Password" id="current" value={pwForm.current}
                                            show={showPw.current} onToggleShow={() => setShowPw(p => ({ ...p, current: !p.current }))}
                                            onChange={v => setPwForm(p => ({ ...p, current: v }))} />
                                        <PwField label="New Password" id="next" value={pwForm.next}
                                            show={showPw.next}    onToggleShow={() => setShowPw(p => ({ ...p, next: !p.next }))}
                                            onChange={v => setPwForm(p => ({ ...p, next: v }))} />
                                        <PwField label="Confirm New Password" id="confirm" value={pwForm.confirm}
                                            show={showPw.confirm} onToggleShow={() => setShowPw(p => ({ ...p, confirm: !p.confirm }))}
                                            onChange={v => setPwForm(p => ({ ...p, confirm: v }))} />
                                        <div className="pt-1">
                                            <button type="submit" disabled={pwLoading || !pwForm.current || !pwForm.next || !pwForm.confirm}
                                                className="flex items-center gap-2 px-5 py-2 bg-[#a45286] text-white text-sm font-semibold rounded-lg hover:bg-[#8a3e70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                                                {pwLoading ? "Saving..." : "Change Password"}
                                            </button>
                                        </div>
                                    </form>
                                </Section>

                                <Section title="Account Info" subtitle="Connected accounts and active sessions">
                                    <div className="space-y-4">
                                        <ActionRow
                                            label="Connected Accounts"
                                            desc={user.googleId ? "Google account connected" : "No external accounts linked"}
                                            badge={user.googleId ? <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Google</span> : null}
                                        />
                                        <ActionRow
                                            label="Active Sessions"
                                            desc="Log out of Modewelt on all devices"
                                            action={<button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:underline">Log out all</button>}
                                        />
                                    </div>
                                </Section>
                            </>
                        )}

                        {/* APPEARANCE */}
                        {activeSection === "appearance" && (
                            <Section title="Appearance" subtitle="Customize how Modewelt looks for you">
                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-gray-700">Theme</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: "light", label: "Light", icon: <Sun  className="w-5 h-5" /> },
                                            { id: "dark",  label: "Dark",  icon: <Moon className="w-5 h-5" /> },
                                        ].map(t => (
                                            <button key={t.id} onClick={() => applyTheme(t.id)}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-medium text-sm
                                                    ${theme === t.id ? "border-[#fc3fb4] bg-pink-50 text-[#a45286]" : "border-gray-200 hover:border-gray-300 text-gray-600"}`}>
                                                {t.icon}
                                                {t.label}
                                                {theme === t.id && <Check className="w-4 h-4 ml-auto text-[#fc3fb4]" />}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Your preference is saved and applies on every visit.</p>
                                </div>
                            </Section>
                        )}

                        {/* ACCOUNT */}
                        {activeSection === "account" && (
                            <>
                                <Section title="Account" subtitle="Manage your account data">
                                    <div className="space-y-4">
                                        <ActionRow
                                            label="Download Your Data"
                                            desc="Get a copy of all data associated with your account"
                                            action={<button className="text-sm font-semibold text-[#a45286] hover:underline">Request Export</button>}
                                        />
                                        <ActionRow
                                            label="Deactivate Account"
                                            desc="Temporarily hide your profile and content"
                                            action={<button className="text-sm font-semibold text-orange-500 hover:underline">Deactivate</button>}
                                        />
                                    </div>
                                </Section>

                                <Section title="Danger Zone" subtitle="Irreversible — proceed with caution" danger>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-red-600">Delete Account</h3>
                                            <p className="text-sm text-gray-500 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
                                        </div>
                                        <Button variant="destructive" className="flex-shrink-0" onClick={() => setDeleteOpen(true)}>
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                                        </Button>
                                    </div>
                                </Section>
                            </>
                        )}

                    </div>
                </main>
            </div>

            {/* ─── Edit Profile Modal ──────────────────────────────────────── */}
            {editProfileOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                            <button onClick={() => setEditProfileOpen(false)}
                                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                        </div>
                        <EditProfile user={user} closeModal={() => setEditProfileOpen(false)} />
                    </div>
                </div>
            )}

            {/* ─── Delete Dialog ───────────────────────────────────────────── */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" /> Delete Account?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This action is <strong>irreversible</strong>. All your posts, connections, and profile data will be permanently deleted.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={deleteLoading}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteLoading}>
                            {deleteLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ─── Reusable sub-components ─────────────────────────────────────────────────

function Section({ title, subtitle, children, danger = false }) {
    return (
        <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border ${danger ? "border-red-200 dark:border-red-900/50" : "border-gray-100 dark:border-gray-800"} overflow-hidden`}>
            <div className={`px-6 py-4 border-b ${danger ? "border-red-100 bg-red-50/50 dark:bg-red-950/20" : "border-gray-100 dark:border-gray-800"}`}>
                <h2 className={`text-base font-semibold ${danger ? "text-red-700 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>{title}</h2>
                {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            <div className="px-6 py-5">{children}</div>
        </div>
    );
}

function ProfileRow({ label, value, multiline = false }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-36 flex-shrink-0 pt-0.5">{label}</span>
            <span className={`text-sm text-gray-700 dark:text-gray-300 ${multiline ? "whitespace-pre-wrap" : "truncate"}`}>{value}</span>
        </div>
    );
}

function ToggleRow({ label, desc, value, onChange, icon }) {
    return (
        <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
                {icon && <span>{icon}</span>}
                <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
            </div>
            <button onClick={onChange} role="switch" aria-checked={value}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${value ? "bg-[#fc3fb4]" : "bg-gray-200 dark:bg-gray-700"}`}>
                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${value ? "translate-x-4" : "translate-x-0"}`} />
            </button>
        </div>
    );
}

function ActionRow({ label, desc, action, badge }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
            <div className="flex items-center gap-2">{badge}{action}</div>
        </div>
    );
}

function PwField({ label, id, value, show, onToggleShow, onChange }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fc3fb4]/40 focus:border-[#fc3fb4]"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    autoComplete="new-password"
                />
                <button type="button" onClick={onToggleShow}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
