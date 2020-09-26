export function scrollAnimation(container: Element, target: number, _current?: number) {
  const current = !!_current ? _current : container.scrollTop;
  const down = target > current;
  const dist = Math.max(10, Math.abs(current - target) / 20);
  const next = current + dist * (down ? 1 : -1);
  const realNext = (down && next < target) || (!down && next > target) ? next : target;
  container.scrollTop = realNext;
  if (realNext !== target) {
    setTimeout(() => {
      scrollAnimation(container, target, realNext);
    }, 1);
  }
}
