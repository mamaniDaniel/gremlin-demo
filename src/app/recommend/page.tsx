"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DeveloperSummary, SkillRecommendation } from "@/lib/types";

const LEVEL_COLORS: Record<string, string> = {
  senior: "bg-green-500/20 text-green-400 border-green-500/30",
  mid: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  junior: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function RecommendPage() {
  const [developers, setDevelopers] = useState<DeveloperSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [result, setResult] = useState<SkillRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/developers")
      .then((res) => res.json())
      .then((data: DeveloperSummary[]) => setDevelopers(data))
      .catch(() => setError("Failed to load developers"));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setResult(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/recommend?dev=${selectedId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SkillRecommendation) => setResult(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Skill <span className="text-blue-400">Recommender</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Discover skills from your network and projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/explorer"
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md border border-gray-700 hover:border-gray-500"
            >
              Graph Explorer
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md border border-gray-700 hover:border-gray-500"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Developer Selector */}
        <div className="mb-8">
          <label htmlFor="dev-select" className="block text-sm font-medium text-gray-300 mb-2">
            Select a developer
          </label>
          <select
            id="dev-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full max-w-xs bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Choose developer...</option>
            {developers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.role}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-r-transparent" />
            Loading recommendations...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-8">
            {/* Own Skills */}
            <section>
              <h2 className="text-lg font-semibold mb-3 text-gray-200">
                {result.developer}&apos;s Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.ownSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Network Recommendations */}
            <section>
              <h2 className="text-lg font-semibold mb-1 text-gray-200">
                Skills from Network
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Skills known by {result.developer}&apos;s collaborators that {result.developer} doesn&apos;t have yet
              </p>
              {result.recommendations.fromNetwork.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  No new skills found in network
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.recommendations.fromNetwork.map((rec, i) => (
                    <div
                      key={`${rec.skill}-${rec.knownBy}-${i}`}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{rec.skill}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${LEVEL_COLORS[rec.level] || "bg-gray-700 text-gray-300"}`}
                        >
                          {rec.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Known by <span className="text-gray-200">{rec.knownBy}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Project Recommendations */}
            <section>
              <h2 className="text-lg font-semibold mb-1 text-gray-200">
                Skills from Projects
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Skills used by {result.developer}&apos;s projects that {result.developer} doesn&apos;t know yet
              </p>
              {result.recommendations.fromProjects.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  All project skills are already covered
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.fromProjects.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-sm bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Empty state */}
        {!selectedId && !loading && !error && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-1">Select a developer to see recommendations</p>
            <p className="text-sm">
              Based on their network connections and project history
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
