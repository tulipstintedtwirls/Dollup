import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Living Story AI',
  description: 'Convert stories into cinematic scenes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
