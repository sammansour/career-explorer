# Changelog

All notable changes to the CareerExplorer project will be documented in this file.

## [1.0.1] - 2026-01-28

### Changed
- **Updated all dependencies to latest stable versions**
  - Upgraded React from 18.2.0 to 18.3.1
  - Upgraded React Router from 6.20.0 to 6.22.0
  - Upgraded Framer Motion from 10.16.16 to 11.0.0
  - Upgraded ESLint from 8.57.1 to 9.15.0 (major version update)
  - Upgraded Vite from 5.0.8 to 5.4.11
  - Upgraded Tailwind CSS from 3.3.6 to 3.4.15
  - Upgraded all other dependencies to latest versions

### Fixed
- **Resolved all npm deprecation warnings:**
  - ✅ Fixed `eslint@8.57.1` deprecation by upgrading to ESLint 9
  - ✅ Fixed `@humanwhocodes/object-schema` deprecation (resolved with ESLint 9)
  - ✅ Fixed `@humanwhocodes/config-array` deprecation (resolved with ESLint 9)
  - ✅ Fixed `glob@7.2.3` deprecation (transitive dependency updated)
  - ✅ Fixed `rimraf@3.0.2` deprecation (transitive dependency updated)
  - ✅ Fixed `inflight@1.0.6` memory leak (transitive dependency updated)

### Updated
- Migrated from `.eslintrc.cjs` to new `eslint.config.js` flat config format (ESLint 9 requirement)
- Updated npm scripts to work with ESLint 9 (removed legacy flags)
- Added `globals` package for ESLint global variable definitions
- Added `@eslint/js` package for ESLint JavaScript configs

### Technical Notes
- ESLint 9 introduces a new "flat config" system that replaces the old `.eslintrc.*` format
- All deprecated packages have been updated to their latest supported versions
- No breaking changes to the application code - all updates are dependency-only
- Backward compatible with existing functionality

## [1.0.0] - 2026-01-28

### Initial Release
- Complete career exploration platform for high school students
- 40+ detailed career profiles
- Interactive career quiz with personalized recommendations
- Favorites system for saving and comparing careers
- Beautiful responsive UI with Tailwind CSS and Framer Motion
- Complete OCI deployment configuration with Terraform
- Comprehensive documentation and deployment guides
