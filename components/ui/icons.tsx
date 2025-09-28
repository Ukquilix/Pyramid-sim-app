
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const PlayIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.53-2.475M15 19.128v-3.86a2.25 2.25 0 0 1 3-1.732a2.25 2.25 0 0 1-3 1.732V19.128ZM12.75 5.106a2.25 2.25 0 0 1 3.495-2.253a2.25 2.25 0 0 1-3.495 2.253M12.75 5.106V3.36a2.25 2.25 0 0 0-3.495 2.253a2.25 2.25 0 0 0 3.495-2.253v1.746Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 19.128a9.38 9.38 0 0 1-2.625.372A9.337 9.337 0 0 1 2.994 18.55a4.125 4.125 0 0 1 7.53-2.475M9.75 19.128v-3.86a2.25 2.25 0 0 0-3-1.732a2.25 2.25 0 0 0 3 1.732V19.128Z" />
    </svg>
);

export const DjedIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 10h12M6 14h12M6 18h12M10 3v18h4V3h-4z" />
    </svg>
);

export const ScrollTextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5v9.75M15.75 7.5v9.75M8.25 17.25h7.5M12 14.25h.008v.008H12v-.008Zm0-2.25h.008v.008H12V12Zm0-2.25h.008v.008H12V9.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-1.5m18 1.5V21M21 3v1.5M3 12h1.5M21 12h-1.5M12 3V1.5m0 19.5v-1.5" />
    </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a6.5 6.5 0 0 1 6.5 6.5c0 2.122-.99 4.02-2.5 5.253m-11.5 0A6.499 6.499 0 0 1 12 4.5m0 15V19.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 10.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13.5h10m-10 2.5h10" />
    </svg>
);
