# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Database backup and restore

This project uses MongoDB for users, orders, carts, and products.

Important: if backend falls back to the in-memory MongoDB server, data will not persist after restart. To keep records, make sure `backend/.env` points to a real MongoDB instance.

From `backend/`:

```bash
npm run backup:db
```

This exports each collection into `backend/backups/backup-<timestamp>/`.

Custom backup path:

```bash
npm run backup:db -- ./backups/my-manual-backup
```

Restore from backup:

```bash
npm run restore:db -- ./backups/my-manual-backup
```

Replace existing data while restoring:

```bash
npm run restore:db -- ./backups/my-manual-backup --drop
```
