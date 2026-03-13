# Bestie / Buddy - Interactive Landing Page Funnel

Multi-step interactive funnel for BUDDY, built with Next.js, React, and Supabase.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL from `supabase-schema.sql` in the SQL Editor
3. Copy `.env.local.example` to `.env.local` and add your Supabase URL and anon key

### 3. Add assets

Replace placeholder assets in these locations:

- **Logo**: Update `src/components/shared/Logo.tsx` with your logo image
- **Characters (Bestie & Amigo)**: Update `src/components/shared/Characters.tsx` with character images
- **Recommendations**: Edit `src/data/recommendations.ts` with content from "5 Recommendations" folder
- **Videos**: Place Box1.mp4, Box2.mp4, Box3.mp4, Box4.mp4 in `public/videos/`
- **Happy Kids photo**: Add to Step8 component

### 4. Brand colors

Edit `tailwind.config.ts` and `globals.css` to match your logo colors.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

- `src/components/steps/` - Each funnel step (1-15)
- `src/components/shared/` - Logo, characters, progress bar, gift animation
- `src/context/FunnelContext.tsx` - Global funnel state
- `src/lib/supabase.ts` - Supabase client and helpers
