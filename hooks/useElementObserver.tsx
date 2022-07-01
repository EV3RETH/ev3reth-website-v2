import { useState, useEffect, MutableRefObject } from 'react'

const useElementObserver = (element: MutableRefObject<any>, rootMargin: string) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {

    const current = element.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      }, { rootMargin }
    );

    current && observer.observe(current);

    return () => current && observer.unobserve(current);
  }, [element, rootMargin]);

  return isVisible;
};

export default useElementObserver