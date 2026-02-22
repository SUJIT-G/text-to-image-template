"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function GeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{caption: string, image: string} | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    // API Call to Cloudflare Worker
    const res = await fetch('/api/worker/generate-post', { method: 'POST' });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">AI Post Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-zinc-900 border-zinc-800">
          <label className="text-sm text-zinc-400 mb-2 block">What are we promoting?</label>
          <Textarea 
            placeholder="e.g. A new coffee blend for remote workers..." 
            className="bg-zinc-950 border-zinc-800 mb-4"
          />
          <Button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90"
          >
            {loading ? "Thinking..." : "Generate Magic"}
          </Button>
        </Card>

        <Card className="p-6 bg-zinc-900 border-zinc-800 min-h-[300px] flex flex-col items-center justify-center">
          {result ? (
            <div className="space-y-4">
              <img src={result.image} alt="AI Generated" className="rounded-lg w-full" />
              <p className="text-sm text-zinc-300">{result.caption}</p>
            </div>
          ) : (
            <p className="text-zinc-500 italic">Generated content will appear here</p>
          )}
        </Card>
      </div>
    </div>
  );
}
