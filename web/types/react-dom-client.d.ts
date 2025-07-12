declare module 'react-dom/client' {
  import { Root } from 'react-dom/client';
  
  export function createRoot(container: Element | null): Root;
  
  export interface Root {
    render(children: React.ReactElement): void;
    unmount(): void;
  }
} 