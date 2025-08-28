"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className='border-t border-gray-300 px-4 py-6'>
      <div className="container">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <h3>Stack</h3>
                <ul>
                    <li>Next.js</li>
                    <li>Supabase</li>
                    <li>TailwindCss</li>
                </ul>
            </div>
            <div>
                <h3>Pages</h3>
                <ul>
                    <li>Index</li>
                    <li>login</li>
                    <li>dashboard</li>
                </ul>
            </div>
            <div>
                <h3>Tables</h3>
                <ul>
                    <li>conversation</li>
                    <li>user?</li>
                    <li>organization</li>
                </ul>
            </div>
        </div>

      </div>
    </footer>
  );
}