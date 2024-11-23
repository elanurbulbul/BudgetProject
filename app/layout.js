"use client";

import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BudgetProvider } from "./context/BudgetContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <BudgetProvider>
            <main className="p-4">{children}</main>
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
