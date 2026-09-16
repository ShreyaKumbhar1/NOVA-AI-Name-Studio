import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const FavoritesContext = createContext(null);

const FAVORITES_STORAGE_KEY = 'nova_favorites_v1';
const COMPARISON_STORAGE_KEY = 'nova_comparison_v1';

export function FavoritesProvider({ children }) {
  const { addToast } = useToast();

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [comparisonList, setComparisonList] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPARISON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to persist favorites:', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonList));
    } catch (e) {
      console.warn('Failed to persist comparison list:', e);
    }
  }, [comparisonList]);

  const isFavorite = useCallback((nameIdOrName) => {
    return favorites.some(
      (f) => f.id === nameIdOrName || f.name.toLowerCase() === String(nameIdOrName).toLowerCase()
    );
  }, [favorites]);

  const toggleFavorite = useCallback((candidate) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.id === candidate.id || f.name.toLowerCase() === candidate.name.toLowerCase()
      );
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Favorites',
          message: `"${candidate.name}" has been removed from your saved list.`
        });
        return prev.filter(
          (f) => f.id !== candidate.id && f.name.toLowerCase() !== candidate.name.toLowerCase()
        );
      } else {
        addToast({
          type: 'success',
          title: 'Added to Favorites',
          message: `"${candidate.name}" saved to your shortlist.`
        });
        return [{ ...candidate, isFavorite: true, favoritedAt: new Date().toISOString() }, ...prev];
      }
    });
  }, [addToast]);

  const removeFavorite = useCallback((candidateId) => {
    setFavorites((prev) => prev.filter((f) => f.id !== candidateId));
    addToast({
      type: 'info',
      title: 'Removed',
      message: 'Name removed from favorites.'
    });
  }, [addToast]);

  const isInComparison = useCallback((candidateId) => {
    return comparisonList.some((c) => c.id === candidateId);
  }, [comparisonList]);

  const addToComparison = useCallback((candidate) => {
    setComparisonList((prev) => {
      if (prev.some((c) => c.id === candidate.id)) {
        addToast({
          type: 'info',
          title: 'Already in Name Lab',
          message: `"${candidate.name}" is already in comparison.`
        });
        return prev;
      }
      if (prev.length >= 4) {
        addToast({
          type: 'error',
          title: 'Comparison Full',
          message: 'Name Lab supports comparing up to 4 names side-by-side.'
        });
        return prev;
      }
      addToast({
        type: 'success',
        title: 'Added to Name Lab',
        message: `"${candidate.name}" added to comparison matrix.`
      });
      return [...prev, candidate];
    });
  }, [addToast]);

  const removeFromComparison = useCallback((candidateId) => {
    setComparisonList((prev) => prev.filter((c) => c.id !== candidateId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonList([]);
  }, []);

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    addToast({
      type: 'info',
      title: 'Favorites Cleared',
      message: 'All saved names have been removed.'
    });
  }, [addToast]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        comparisonList,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        isInComparison,
        addToComparison,
        removeFromComparison,
        clearComparison,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
