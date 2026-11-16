# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Language conventions

- **Conversation with the user** (CLI, Claude app, web): French.
- **Everything on GitHub**: English. This covers commit messages, branch names, PR titles and descriptions, issues, and review comments.
- **Everything in the code**: English. This covers comments, TODOs, log messages, identifiers, and documentation files such as this one. User-facing copy goes through next-intl (`messages/`), never hardcoded.

## Project facts

- Next.js 16 App Router with next-intl (`fr`, `en`), MDX blog content under `content/`, deployed on Vercel.
- Node.js **24.x** is pinned via `engines.node` and `.nvmrc`. Run `nvm use` in the repo before anything else: the husky hooks run through Yarn, which refuses to execute under any other Node version.
- Vercel installs with `pnpm install --no-frozen-lockfile` (see `vercel.json`). Both `pnpm-lock.yaml` and `package-lock.json` are tracked; keep them in sync when changing dependencies (`pnpm install` then `npm install --package-lock-only`).
- Vercel refuses to deploy dependencies with known critical CVEs. If a preview builds fine but fails at "Deploying outputs", read the reason with `vercel inspect <deployment-id> --logs`.

## Workflow

- Work on a dedicated branch and open a PR. Every PR gets Vercel preview deployments; wait for them to be green before asking for a merge.
- Verify locally before pushing: `next build`, `eslint`, and a quick `next start` smoke test on `/fr`, `/en` and one blog post.
