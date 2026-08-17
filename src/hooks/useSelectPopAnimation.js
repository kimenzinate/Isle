import { useEffect, useRef, useState } from 'react';

export function useSelectPopAnimation(selectedId) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [popId, setPopId] = useState(null);

  useEffect(() => {
    if (!selectedId || prefersReducedMotion) {
      return undefined;
    }

    setPopId(null);

    const frame = requestAnimationFrame(() => {
      setPopId(selectedId);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedId, prefersReducedMotion]);

  return popId;
}

export function useMultiSelectPopAnimation(selectedIds) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [popId, setPopId] = useState(null);
  const prevIdsRef = useRef(selectedIds);

  useEffect(() => {
    if (prefersReducedMotion) {
      prevIdsRef.current = selectedIds;
      return undefined;
    }

    const prev = new Set(prevIdsRef.current);
    const added = selectedIds.find((id) => !prev.has(id));

    prevIdsRef.current = selectedIds;

    if (!added) {
      return undefined;
    }

    setPopId(null);

    const frame = requestAnimationFrame(() => {
      setPopId(added);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedIds, prefersReducedMotion]);

  return popId;
}
