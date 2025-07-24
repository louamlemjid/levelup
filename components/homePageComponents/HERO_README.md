# Hero Section Documentation

## Overview
An astonishing hero section designed for a 3D website design company portfolio, featuring a blue cat 3D model (Capoo) in the center with dynamic CSS lighting effects.

## Components Created

### 1. **Hero.tsx** (Main Component)
The main hero section that orchestrates all components and effects:
- **Grid Layout**: 3-column responsive layout
- **Dynamic Lighting**: Blue and white CSS lighting effects with animated gradients
- **Background**: Dark gradient with animated grid pattern
- **Scroll Indicator**: Animated scroll prompt at the bottom

### 2. **LeftSideHero.tsx** 
Company branding and call-to-action section:
- **Company Name**: "LEVEL UP" with gradient text effect
- **Description**: "Scale your business by attracting clients"
- **CTA Buttons**: "Start Your Project" and "View Portfolio"
- **Blue Lighting**: Gradient overlay for blue lighting effect
- **Animations**: Staggered entrance animations with Framer Motion

### 3. **RightSideHero.tsx**
Interactive countdown and success animations:
- **Countdown**: 0-100% animated percentage counter
- **Website Card**: Slides down when countdown completes
- **User Counter**: Counts from +2 to +1000 clients
- **Coin Animation**: Money coins drop from top when users reach 1000
- **White Lighting**: Gradient overlay for white lighting effect

### 4. **capoo3dModel.tsx** (Already existed)
3D blue cat model with:
- GLTF model loading from `/capoo/scene.gltf`
- Floating animation
- Auto-rotation with orbit controls
- Environmental lighting

## Features Implemented

### ✨ **Visual Effects**
- **Dynamic CSS Lighting**: Animated blue and white gradients
- **Particle System**: Floating particles around the 3D model
- **Glow Effects**: Animated box-shadow around the cat model
- **Grid Background**: Subtle animated grid pattern

### 🎯 **Animations**
- **Entrance Animations**: Staggered component reveals
- **Countdown Timer**: 0-100% with scale effects
- **Website Card**: Slide-down and floating animation
- **User Counter**: Incremental counting with color changes
- **Coin Drop**: Physics-based falling coins
- **3D Model**: Floating and auto-rotation

### 📱 **Responsive Design**
- **Mobile-First**: Responsive grid layout
- **Breakpoints**: Adapts to different screen sizes
- **Typography**: Responsive font scaling
- **Layout**: Stack vertically on mobile, 3-column on desktop

## Usage

```tsx
import Hero from '@/components/homePageComponents/hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  );
}
```

## Timeline

1. **0-5s**: Left side animates in with company info
2. **0-5s**: Right side countdown starts (0-100%)
3. **5.5s**: Website card slides down
4. **7.5s**: User counter starts (+2 to +1000)
5. **15s**: Coins start dropping when users reach 1000
6. **Continuous**: 3D model floats and rotates
7. **Continuous**: Dynamic lighting effects

## Technical Stack
- **React 19** with TypeScript
- **Framer Motion** for animations
- **React Three Fiber** for 3D rendering
- **Tailwind CSS** for styling
- **Three.js** for 3D graphics

## File Structure
```
components/homePageComponents/
├── hero.tsx              # Main hero component
├── leftSideHero.tsx      # Company branding section
├── rightSideHero.tsx     # Countdown and animations
├── capoo3dModel.tsx      # 3D cat model
└── HeroExample.tsx       # Usage example
```

## Customization

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Cyan (#22D3EE)
- Background: Dark gradient
- Text: White with gradients

### Timing
All animation timings can be adjusted in the respective component files using Framer Motion's transition properties.

### 3D Model
Replace `/capoo/scene.gltf` with your own GLTF model in the `capoo3dModel.tsx` file.
