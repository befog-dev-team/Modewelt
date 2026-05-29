"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import LoadingButton from "../../LoadingButton";
import { Button } from "../../ui/button";
import { useUpdateJobMutation } from "./updateJobMutation";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

export default function EditJobDialog({
    job,
    open,
    onClose,
}) {
    const [formData, setFormData] = useState({
        jobTitle: job.jobTitle || "",
        company: job.company || "",
        location: job.location || "",
        workplaceType: job.workplaceType || "Remote",
        jobType: job.jobType || "full-time",
        description: job.description || "",
        requirements: job.requirements || "",
        benefits: job.benefits || "",
        salaryAmount: job.salaryAmount || "",
        salaryType: job.salaryType || "yearly",
        salaryCountry: job.salaryCountry || "India",
        salaryCurrency: job.salaryCurrency || "₹ (INR)",
        jobLevel: job.jobLevel || "Beginner",
        expirationDate: job.expirationDate || "",
        skills: job.skills || [],
    });

    const mutation = useUpdateJobMutation();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate({ jobId: job.id, formData }, {
            onSuccess: onClose
        });
    }

    function handleOpenChange(open) {
        if (!open || !mutation.isPending) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Job Post</DialogTitle>
                    <DialogDescription>
                        Update the details of your job posting.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input 
                                id="jobTitle" 
                                name="jobTitle" 
                                value={formData.jobTitle} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input 
                                id="company" 
                                name="company" 
                                value={formData.company} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                                id="location" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workplaceType">Workplace Type</Label>
                            <select
                                id="workplaceType"
                                name="workplaceType"
                                className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-gray-800 dark:text-white px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc3fb4]/30 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.workplaceType}
                                onChange={handleInputChange}
                            >
                                <option value="Remote" className="dark:bg-gray-900">Remote</option>
                                <option value="On-site" className="dark:bg-gray-900">On-site</option>
                                <option value="Hybrid" className="dark:bg-gray-900">Hybrid</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobType">Job Type</Label>
                            <select
                                id="jobType"
                                name="jobType"
                                className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-gray-800 dark:text-white px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc3fb4]/30 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.jobType}
                                onChange={handleInputChange}
                            >
                                <option value="Full-time" className="dark:bg-gray-900">Full-time</option>
                                <option value="Part-time" className="dark:bg-gray-900">Part-time</option>
                                <option value="Contract" className="dark:bg-gray-900">Contract</option>
                                <option value="Internship" className="dark:bg-gray-900">Internship</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            rows={4}
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="salaryAmount">Salary Amount</Label>
                            <Input 
                                id="salaryAmount" 
                                name="salaryAmount" 
                                type="number"
                                value={formData.salaryAmount} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiry Date</Label>
                            <Input 
                                id="expirationDate" 
                                name="expirationDate" 
                                type="date"
                                value={formData.expirationDate} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={mutation.isPending}
                        className="bg-[#fc3fb4] hover:bg-[#d92e96]"
                    >
                        Save Changes
                    </LoadingButton>
                    <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
