# Razgon 2D Studio — Remotion video

A 1920×1080, 30fps animated 2D story composition. The timeline is set to 14,046 frames (about 7m48s) and split into five narration sections.

## Add the five narration files

Place the five WAV recordings in `public/audio/` with these exact names:

- `part-1.wav`
- `part-2.wav`
- `part-3.wav`
- `part-4.wav`
- `part-5.wav`

The composition already has the five audio sections timed to the recording durations previously checked (75.08s, 106.60s, 97.80s, 92.20s, 96.52s). The original uploaded archive is preserved at the repository root.

## Run

```bash
cd video
npm install
npm run dev
```

## Render MP4

```bash
npm run render
```

Output: `video/out/fast-healing.mp4`

The emergency sequence is staged as a safe response: characters move away from the smoke and wait for trained responders; the animation does not depict entering a smoke-filled area.
