"use client";
import { ThemeProvider } from "./context/ThemeContext";
import { BudgetProvider } from "./context/BudgetContext";
import "./output.css"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <BudgetProvider>
            <main >{children}</main>
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
