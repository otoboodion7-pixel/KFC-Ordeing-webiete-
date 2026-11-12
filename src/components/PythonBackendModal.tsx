import React, { useState } from 'react';
import { X, Terminal, Copy, Check, Code, ShieldCheck } from 'lucide-react';

interface PythonBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonBackendModal: React.FC<PythonBackendModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pythonCode = `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from supabase import create_client, Client

app = FastAPI(title="KFC Python Backend API", version="1.0.0")

# Supabase connection
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class CartItemModel(string, Any):
    cartItemId: str
    itemId: str
    name: str
    quantity: number
    price: float

class OrderCreateModel(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    items: List[dict]
    subtotal: float
    total: float
    payment_method: str

@app.get("/")
def read_root():
    return {"status": "online", "service": "KFC Python FastAPI Backend by Stark Industries"}

@app.get("/api/menu")
def get_menu():
    response = supabase.table("menu_items").select("*").execute()
    return {"data": response.data}

@app.post("/api/orders")
def create_order(order: OrderCreateModel):
    try:
        res = supabase.table("orders").insert(order.dict()).execute()
        return {"success": True, "order": res.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`;

  const sqlSchema = `-- Supabase SQL Schema for KFC Ordering
create table if not exists orders (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  items jsonb not null,
  subtotal numeric not null,
  total numeric not null,
  status text not null,
  payment_method text not null
);

create table if not exists menu_items (
  id text primary key,
  name text not null,
  category text not null,
  description text,
  price numeric not null,
  image text,
  calories int,
  rating numeric
);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-cyan-500/40 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-white">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-zinc-950 via-cyan-950/60 to-zinc-950 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/40 rounded-xl flex items-center justify-center text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-cyan-300">Python FastAPI Backend & Supabase</h3>
              <p className="text-xs text-zinc-400">Architecture requested by Mr. Stark</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-cyan-400" /> Python FastAPI Server (`main.py`)
              </h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-cyan-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
              {pythonCode}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Supabase SQL Migration Script
            </h4>
            <pre className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-xs font-mono text-amber-200 overflow-x-auto leading-relaxed">
              {sqlSchema}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
