"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Globe,
  Filter,
  PlayCircle,
  FileText,
  ArrowRight,
  X,
  ChevronLeft,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  content: string;
  summary: string | null;
  category: string | null;
  language: string | null;
  mediaType: string | null;
  mediaUrl: string | null;
  imageUrl: string | null;
}

const LANGUAGES = ["All", "English", "French", "Spanish"];
const CATEGORIES = [
  "All",
  "Menstrual Health",
  "Nutrition",
  "Herbal Wellness",
  "Fitness",
  "Entrepreneurship",
];

export default function LearnTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState("All");
  const [selectedCat, setSelectedCat] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    fetchArticles(1);
  }, [selectedLang, selectedCat]);

  const fetchArticles = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedLang !== "All") params.set("language", selectedLang);
      if (selectedCat !== "All") params.set("category", selectedCat);
      params.set("page", pageNum.toString());
      params.set("limit", "10");
      const res = await fetch(`/api/articles?${params}`);
      const data = await res.json();
      if (data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      if (pageNum === 1) {
        setArticles(data);
      } else {
        setArticles((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  if (selectedArticle) {
    return (
      <div className="px-5 pt-12 pb-28">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-1 text-rose-500 text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {selectedArticle.imageUrl && (
          <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          {selectedArticle.category && (
            <span className="text-[10px] font-medium bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
              {selectedArticle.category}
            </span>
          )}
          {selectedArticle.language && (
            <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Globe size={10} />
              {selectedArticle.language}
            </span>
          )}
          {selectedArticle.mediaType === "video" && (
            <span className="text-[10px] font-medium bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <PlayCircle size={10} />
              Video
            </span>
          )}
        </div>

        <h1 className="text-lg font-bold text-slate-800 mb-3">
          {selectedArticle.title}
        </h1>

        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {selectedArticle.content}
          </p>
        </div>

        {selectedArticle.mediaType === "video" && (
          <div className="mt-4 bg-purple-50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle size={18} className="text-purple-500" />
              <p className="font-semibold text-sm text-purple-700">
                Watch Video
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Video content available for this resource
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-rose-500" />
          <h1 className="text-xl font-bold text-slate-800">Learn</h1>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-xl transition-all ${
            showFilters ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-500"
          }`}
        >
          {showFilters ? <X size={18} /> : <Filter size={18} />}
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Educative resources to empower women
      </p>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm mb-4 animate-slide-up">
          {/* Language Filter */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
              <Globe size={12} />
              Language
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLang === lang
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-rose-50 text-slate-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCat === cat
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-rose-50 text-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Articles */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 mt-3">Loading resources...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">📚</p>
          <p className="text-sm text-slate-500">
            No resources found for this filter
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-50 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex">
                {article.imageUrl && (
                  <div className="w-24 h-28 flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    {article.mediaType === "video" ? (
                      <PlayCircle size={12} className="text-purple-500" />
                    ) : (
                      <FileText size={12} className="text-rose-400" />
                    )}
                    {article.category && (
                      <span className="text-[9px] font-medium text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                    )}
                    {article.language && article.language !== "English" && (
                      <span className="text-[9px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                        {article.language}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-slate-800 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center pr-3">
                  <ArrowRight size={14} className="text-slate-300" />
                </div>
              </div>
            </button>
          ))}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="w-full mt-4 bg-white border border-rose-100 text-rose-500 py-3 rounded-2xl font-semibold text-xs active:scale-[0.98] transition-transform shadow-sm"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Community Banner */}
      <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-800 mb-1.5">
          Community & Empowerment
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          CycleTrack connects wellness with income opportunities through
          community-based production and training. Resources available in
          multiple languages.
        </p>
      </div>
    </div>
  );
}
