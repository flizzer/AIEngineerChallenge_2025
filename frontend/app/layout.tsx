import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Engineer Challenge - Chat Interface',
  description: 'A modern chat interface for the AI Engineer Challenge backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-unc-gray to-unc-white">
        {children}
      </body>
    </html>
  );
} 