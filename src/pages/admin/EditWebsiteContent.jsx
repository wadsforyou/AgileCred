import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Upload, Save, RotateCcw, Check, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONTENT_DEFAULTS } from "@/data/siteContentDefaults";
import { invalidateSiteContentCache } from "@/lib/useSiteContent";

export default function EditWebsiteContent() {
  const { toast } = useToast();
  const [records, setRecords] = useState({});
  const [edits, setEdits] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [savedKey, setSavedKey] = useState(null);

  useEffect(() => {
    let active = true;
    base44.entities.SiteContent
      .list()
      .then((recs) => {
        if (!active) return;
        const map = {};
        (recs || []).forEach((r) => {
          if (r.page_key) map[r.page_key] = r;
        });
        setRecords(map);
        const e = {};
        SITE_CONTENT_DEFAULTS.forEach((d) => {
          const rec = map[d.page_key];
          e[d.page_key] = {
            heading: rec?.heading ?? d.heading,
            subheading: rec?.subheading ?? d.subheading,
            image_url: rec?.image_url ?? d.image_url,
          };
        });
        setEdits(e);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        const e = {};
        SITE_CONTENT_DEFAULTS.forEach((d) => {
          e[d.page_key] = {
            heading: d.heading,
            subheading: d.subheading,
            image_url: d.image_url,
          };
        });
        setEdits(e);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const updateField = (pageKey, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [pageKey]: { ...prev[pageKey], [field]: value },
    }));
    setSavedKey(null);
  };

  const handleImage = async (pageKey, file) => {
    if (!file) return;
    setUploading(pageKey);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updateField(pageKey, "image_url", file_url);
    } catch {
      toast({ title: "Upload failed", description: "Could not upload the image. Please try again.", variant: "destructive" });
    }
    setUploading(null);
  };

  const handleSave = async (pageKey) => {
    const data = edits[pageKey];
    if (!data) return;
    setSaving(pageKey);
    try {
      const existing = records[pageKey];
      let saved;
      if (existing) {
        saved = await base44.entities.SiteContent.update(existing.id, {
          heading: data.heading,
          subheading: data.subheading,
          image_url: data.image_url,
        });
      } else {
        saved = await base44.entities.SiteContent.create({
          page_key: pageKey,
          heading: data.heading,
          subheading: data.subheading,
          image_url: data.image_url,
        });
      }
      setRecords((prev) => ({ ...prev, [pageKey]: saved }));
      invalidateSiteContentCache();
      setSavedKey(pageKey);
      toast({ title: "Saved", description: "Banner content updated. It is now live on the public website." });
    } catch {
      toast({ title: "Save failed", description: "Could not save the changes. Please try again.", variant: "destructive" });
    }
    setSaving(null);
  };

  const handleReset = async (pageKey) => {
    const def = SITE_CONTENT_DEFAULTS.find((d) => d.page_key === pageKey);
    if (!def) return;
    setEdits((prev) => ({
      ...prev,
      [pageKey]: {
        heading: def.heading,
        subheading: def.subheading,
        image_url: def.image_url,
      },
    }));
    const existing = records[pageKey];
    if (existing) {
      try {
        await base44.entities.SiteContent.delete(existing.id);
        setRecords((prev) => {
          const next = { ...prev };
          delete next[pageKey];
          return next;
        });
        invalidateSiteContentCache();
        toast({ title: "Reset to default", description: "The saved override was removed. The public site now shows the default banner." });
      } catch {
        toast({ title: "Reset failed", description: "Could not remove the saved override.", variant: "destructive" });
      }
    } else {
      setSavedKey(pageKey);
      toast({ title: "Reset to default", description: "Edits cleared — no saved override existed." });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Edit Website Content</h1>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Update the banner heading, subheading and image for each public page. Layout, design and all other
            text remain unchanged. Saved changes appear on the live website immediately.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0"
          style={{ backgroundColor: "hsl(var(--brand-blue))" }}
        >
          <ExternalLink className="w-4 h-4" /> View Public Website
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-5">
        {SITE_CONTENT_DEFAULTS.map((def) => {
          const edit = edits[def.page_key] || { heading: def.heading, subheading: def.subheading, image_url: def.image_url };
          const isDirty =
            edit.heading !== def.heading ||
            edit.subheading !== def.subheading ||
            edit.image_url !== def.image_url;
          const hasOverride = !!records[def.page_key];
          return (
            <div key={def.page_key} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-12">
                {/* Image preview */}
                <div className="lg:col-span-4 relative bg-slate-100 min-h-[180px]">
                  <img
                    src={edit.image_url}
                    alt={def.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <span className="text-xs font-semibold text-white drop-shadow">{def.label}</span>
                    {hasOverride && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        Edited
                      </span>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="lg:col-span-8 p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Banner Heading
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={edit.heading}
                      onChange={(e) => updateField(def.page_key, "heading", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Banner Subheading
                    </label>
                    <textarea
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={edit.subheading}
                      onChange={(e) => updateField(def.page_key, "subheading", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Banner Image
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                        {uploading === def.page_key ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" /> Upload new image
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files[0] && handleImage(def.page_key, e.target.files[0])}
                        />
                      </label>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 truncate max-w-[220px]">
                        <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                        {edit.image_url ? "Current image set" : "Default image"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleSave(def.page_key)}
                      disabled={saving === def.page_key}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                      style={{ backgroundColor: "hsl(var(--brand-green))" }}
                    >
                      {saving === def.page_key ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : savedKey === def.page_key ? (
                        <>
                          <Check className="w-4 h-4" /> Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save changes
                        </>
                      )}
                    </button>
                    {(isDirty || hasOverride) && (
                      <button
                        onClick={() => handleReset(def.page_key)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset to default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}