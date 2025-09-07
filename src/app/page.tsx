"use client";

import {useEffect, useState} from "react";

import {getAuth} from "firebase/auth";

import AuthGuard from "@/components/auth-guard";
import GridLoader from "@/components/media/grid-loader";
import MasonryGrid from "@/components/media/masonry-grid";

export default function Home() {
  return (
    <AuthGuard>
      <div className="mt-12 sm:mt-20 sm:text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
          Your personal{" "}
          <span className="font-montserrat bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text tracking-tight text-transparent dark:from-pink-400 dark:to-pink-600">
            memory vault
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Upload, transform, and manage your photos and videos with AI-powered
          tools. Create stunning visuals with just a few clicks.
        </p>
      </div>

      <h2 className="mt-20 mb-2 text-2xl font-medium text-gray-900 sm:mt-32 dark:text-white">
        Your Media Collection
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Click on any item to edit and transform it
      </p>

      <MediaGrid />
    </AuthGuard>
  );
}

function MediaGrid() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          setItems([]);
          setLoading(false);
          return;
        }
        const idToken = await user.getIdToken();
        const res = await fetch("/api/media?page=1&pageSize=50", {
          headers: {Authorization: `Bearer ${idToken}`},
        });
        if (!res.ok) throw new Error("Failed to load media");
        const data = await res.json();
        setItems(data.media || []);
      } catch (e: any) {
        setError(e.message || "Failed to load media");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
    const onUploaded = () => {
      // Refetch to ensure list is in sync with server
      fetchMedia();
    };
    window.addEventListener("media:uploaded", onUploaded);
    return () => {
      window.removeEventListener("media:uploaded", onUploaded);
    };
  }, []);

  if (loading) return <GridLoader />;
  if (error)
    return (
      <div className="py-24 text-center">
        <h3 className="mb-2 text-lg">Oops, failed to load media try again.</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  return <MasonryGrid media={items} />;
}
