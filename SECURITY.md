# Security Policy

RevyHubX is a developer utility for public Stellar workflows. It must never ask for private keys, seed phrases, or wallet recovery material.

## Supported Version

Security fixes target the `main` branch.

## Reporting

Open a private security advisory or contact the maintainers before publicly disclosing an issue that could expose users, wallet data, or deployment credentials.

## Maintainer Checks

Before release or deployment, maintainers should run:

```bash
npm audit --audit-level=moderate
npm run lint
npm run test
npm run build
```

## Scope

- Public key validation and public Horizon lookups are in scope.
- Friendbot usage is testnet-only and has no real asset value.
- The app does not store wallet keys or submit signed transactions.
