# AuraEdit 🚀

AuraEdit is a **production-grade AI coding workspace** that converts

high-level ideas into **fully working applications**, generated

**file-by-file** using a deterministic Gemini orchestration engine.

This is NOT a demo AI app.

This is a **real build system**.

---

## ✨ Core Principles

- **One Message = One File**

- AI is **stateless**

- App owns the **state**

- Deterministic builds

- Resume-safe generation

- Multi-API key failover

- Production-first mindset

---

## 🧠 How AuraEdit Works

1. User discusses the app idea in **real Gemini**

2. Gemini generates a **MASTER PROMPT**

3. AuraEdit receives:

   - Final spec

   - File list

   - Folder structure

4. AuraEdit:

   - Builds a file queue

   - Generates ONE FILE at a time

   - Validates output

   - Writes to disk

   - Tracks progress

5. User sees:

   - Live file tree

   - Real progress numbers

   - Build completion status

---

## 🏗️ Tech Stack

- **Next.js 14** (App Router)

- **TypeScript**

- **Google Gemini API**

- **File-by-file AI orchestration**

- **Edge middleware**

- **Full SEO support**

---

## 🔐 Environment Setup

Copy `.env.example` → `.env`

```bash

cp .env.example .env