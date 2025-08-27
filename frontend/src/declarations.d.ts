// declarations.d.ts
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.svg';
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
  }
}