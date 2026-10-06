# Academia NDT · Inspección Soldadura Chile

App gratuita e instalable (PWA) para aprender ensayos no destructivos. Diseño creado en Google Stitch y AI Studio; contenido de Inspección Soldadura Chile.

- `src/data/content.ts`: lecciones, quizzes y práctica visual (contenido en revisión técnica).
- `src/components/screens/`: Ruta, Aprender, Taller (práctica visual y simuladores) y Avance.
- `public/img/`: ilustraciones propias. `public/sw.js`: uso sin conexión (sube `CACHE` al publicar cambios).

## Desarrollo

```
npm install --legacy-peer-deps
npm run dev      # vista local
npm run build    # genera dist/ para publicar
```

Al hacer push a `main`, GitHub Actions compila la app y la publica en GitHub Pages.
