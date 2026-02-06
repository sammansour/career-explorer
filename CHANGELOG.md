# Changelog

All notable changes to the CareerExplorer project will be documented in this file.

## [3.0.1] - 2026-02-06

### Deployment Fixes & Documentation Updates

This release fixes deployment issues discovered during the first end-to-end deployment of the AI Career Counselor chatbot and updates all documentation to match the working solution.

#### Bug Fixes

- **Fixed `func.py` echo mode**: Replaced stub/echo handler with actual OpenAI API integration including career context, conversation history, and CORS support
- **Fixed `variables.tf` default OCID**: Cleared incorrect `chatbot_function_ocid` default (was set to an application OCID instead of a function OCID)
- **Fixed Dockerfile architecture**: Removed hardcoded `--platform=linux/amd64` that caused cross-compilation failures on ARM64 systems (Apple Silicon Macs)
- **Fixed MIME types for Object Storage**: Added re-upload step with explicit Content-Type headers to prevent HTML from downloading instead of rendering

#### New: IAM Policy Requirement

- **Discovered missing IAM policy**: API Gateway requires an IAM policy to invoke OCI Functions. Without it, the gateway returns 500 errors even though `fn invoke` works directly. Added policy creation step to all deployment guides.

#### Documentation Updates

- **`docs/CHATBOT_SETUP.md`**: Updated prerequisites to use Podman instead of Docker, added Docker compatibility wrapper instructions, added IAM policy creation step, added MIME type re-upload instructions
- **`docs/DEPLOYMENT_CHECKLIST.md`**: Added complete chatbot deployment checklist (Fn CLI config, OCIR login, function deploy, IAM policy, frontend rebuild), added Known Issues & Solutions section
- **`terraform/CHATBOT_INFRASTRUCTURE.md`**: Updated to reflect Podman-based workflow, added IAM policy requirement, updated deployment steps
- **`terraform/outputs.tf`**: Updated deployment instructions with Podman prerequisites, OCIR login, Docker wrapper setup, and IAM policy creation command
- **`README.md`**: Updated region references to `us-chicago-1`, updated environment variables documentation
- **`deploy.sh`**: Added standalone deployment mode that works without Terraform state

#### Deployment Method

- **Recommended: Podman + Fn CLI locally** (not OCI Cloud Shell, which has networking restrictions)
- Created Docker compatibility wrapper script for Fn CLI to work with Podman
- Documented OCIR login and auth token generation

#### Technical Details

- Function version bumped to 3.0.5 through deployment iterations
- Tested end-to-end: React frontend → API Gateway → OCI Function → OpenAI API
- Verified on Apple Silicon (ARM64) Mac with Podman

## [3.0.0] - 2026-01-29

### 🤖 AI Career Counselor Chatbot - Major Feature Release

**New Feature: AI-Powered Career Counselor**

This release introduces a revolutionary AI chatbot that acts as a personal career counselor for students, powered by OpenAI's GPT models and deployed on OCI Functions (serverless).

#### Frontend Components

**New React Components:**
- `ChatButton.jsx` - Floating action button with animations and unread badge
- `ChatWindow.jsx` - Full-featured chat interface with:
  - Message history display
  - Typing indicators
  - Quick question suggestions
  - Error handling
  - Mobile-responsive design
  - Context awareness (knows which career page user is viewing)

**New Utilities:**
- `src/utils/chatApi.js` - API client for chatbot communication
- Axios integration for HTTP requests
- Environment variable support for API endpoint

**Updated Components:**
- `App.jsx` - Integrated chatbot components
- Added route-based career context detection
- Chat state management

#### Backend Infrastructure

**OCI Functions:**
- `oci-functions/career-counselor/func.py` - Python serverless function
  - OpenAI GPT integration
  - Career counselor system prompt
  - Embedded career database with:
    - Top universities for each field
    - Companies hiring for each role
    - Recommended degree programs
  - Conversation history management
  - Rate limiting and error handling
  - CORS support

- `oci-functions/career-counselor/func.yaml` - Function configuration
- `oci-functions/career-counselor/requirements.txt` - Python dependencies

**Terraform Infrastructure:**
- `terraform/functions.tf` - Complete serverless infrastructure:
  - OCI Functions Application
  - VCN and Subnet configuration
  - Internet Gateway and routing
  - Security lists
  - API Gateway with public HTTPS endpoint
  - CORS configuration
  - Rate limiting (10 req/sec per IP)
  - Environment variable management

**Configuration:**
- Updated `terraform/variables.tf` with OpenAI configuration
- Updated `terraform/outputs.tf` with chatbot endpoints
- Updated `terraform/terraform.tfvars.example` with setup guide

#### AI Capabilities

**What the Chatbot Can Do:**
- Answer questions about specific careers
- Recommend top universities for each field (embedded data for 10+ careers)
- Suggest companies actively hiring
- Provide degree program recommendations
- Explain education requirements
- Discuss career paths and salary expectations
- Maintain conversation context
- Provide personalized advice based on current page

**Supported Careers (with enhanced data):**
- Software Developer
- UX Designer
- Data Scientist
- Web Developer
- Mobile App Developer
- Product Designer
- Graphic Designer
- Product Manager
- Cybersecurity Specialist
- Machine Learning Engineer

#### Dependencies

**New:**
- `axios@1.7.9` - HTTP client for API calls

**Existing (carried forward):**
- React 19.0.0
- Framer Motion 11.15.0
- All other v2.0.0 dependencies

#### Documentation

**New Documentation:**
- `docs/CHATBOT_SETUP.md` - Comprehensive 200+ line setup guide covering:
  - Architecture overview
  - Prerequisites and tool installation
  - OpenAI API key setup
  - Fn CLI configuration
  - Function deployment
  - API Gateway configuration
  - Frontend environment variables
  - Testing procedures
  - Troubleshooting guide
  - Cost optimization
  - Security best practices

**Updated Documentation:**
- README.md - Added chatbot feature description
- package.json - Version bumped to 3.0.0
- All deployment instructions updated

#### Features in Detail

**Context Awareness:**
- Chatbot automatically knows which career page the user is viewing
- Provides targeted information based on current context
- Suggests relevant universities and companies

**Smart Conversation:**
- Maintains conversation history (last 10 messages)
- Supports follow-up questions
- Provides quick question suggestions
- Adapts responses for high school students

**User Experience:**
- Beautiful floating chat button with ripple effect
- Smooth animations powered by Framer Motion
- Typing indicators during AI response
- Error handling with user-friendly messages
- Mobile-optimized interface

**Security & Performance:**
- API key stored securely in OCI Functions environment
- CORS properly configured
- Rate limiting to prevent abuse
- Serverless architecture (pay per use)
- Fast response times (~2-3 seconds)

#### Cost Structure

**Monthly Estimates:**
- OCI Functions: Free (2M requests/month free tier)
- API Gateway: ~$0.35 per million requests
- OpenAI (gpt-4o-mini): ~$0.30 per 1,000 chats
- **Total: $1-5/month for moderate usage**

#### Technical Architecture

```
Frontend (React) → API Gateway → OCI Function → OpenAI API
     ↓                  ↓              ↓
  Chat UI          HTTPS/CORS      GPT-4
```

#### Breaking Changes

**None!** Version 3.0.0 is fully backward compatible.
- All v2.0.0 features continue to work
- Chatbot is an additive feature
- Can be disabled by not deploying the function
- Frontend works with or without backend

#### Migration from v2.0.0

**Required:**
1. Run `npm install` (adds axios dependency)
2. Deploy chatbot infrastructure (optional)
3. Set `VITE_CHATBOT_API_URL` environment variable (if using chatbot)

**Optional:**
- Deploy OCI Functions infrastructure
- Configure OpenAI API key
- Deploy chatbot function

#### Known Limitations

- Conversation history not persisted (resets on page reload)
- Maximum 10 messages in context window
- Rate limited to 10 requests/second per IP
- Requires OpenAI API key (paid service)
- Cold start delay on first function invocation (~1-2 seconds)

#### Future Enhancements

Potential v3.1.0 features:
- Persistent chat history (user accounts)
- More career data (expand from 10 to 40+ careers)
- Voice input support
- Multi-language support
- Integration with real-time job boards
- Career assessment integration
- Saved conversations

## [2.0.0] - 2026-01-28

### 🚀 Major Version Updates

**Breaking Changes - All dependencies upgraded to latest major versions:**

#### Core Framework Updates
- **React 18 → React 19** (Major upgrade)
  - Improved performance with automatic batching enhancements
  - Better concurrent rendering
  - Updated to use new `createRoot` API pattern
  - Optimized server components support (for future use)
  
- **React Router 6 → React Router 7** (Major upgrade)
  - Backward compatible with v6 API
  - Enhanced data loading capabilities
  - Better TypeScript support
  - Improved performance

- **Vite 5 → Vite 6** (Major upgrade)
  - Faster build times
  - Improved HMR (Hot Module Replacement)
  - Better environment variable handling
  - Enhanced plugin API

#### Other Major Updates
- **Framer Motion** 11.0.0 → 11.15.0 (latest stable)
- **ESLint** 9.15.0 → 9.17.0
- **Tailwind CSS** 3.4.15 → 3.4.17
- **@vitejs/plugin-react** 4.3.0 → 4.3.4

### Changed

#### Code Updates for React 19
- Updated `main.jsx` to use named imports (`createRoot` from 'react-dom/client')
- Changed from `React.StrictMode` to `StrictMode` (named import)
- Updated ESLint config to recognize React 19

#### Build Configuration
- Updated Vite config for Vite 6 optimizations
- Improved code splitting strategy
- Added separate chunk for React Router
- Configured build warnings limit

#### Dependencies
- Split React Router into separate packages (`react-router` and `react-router-dom`)
- Updated all dev dependencies to latest versions
- All TypeScript types updated to @types/react@19 and @types/react-dom@19

### Migration Notes

**React 19 Breaking Changes Addressed:**
- ✅ Updated ReactDOM import pattern
- ✅ Changed StrictMode import to named import
- ✅ No other breaking changes affect this application
- ✅ All hooks and patterns remain compatible

**Vite 6 Changes:**
- ✅ Configuration syntax remains compatible
- ✅ Added new optimization options
- ✅ Plugin compatibility verified

**React Router 7:**
- ✅ Fully backward compatible with v6 API used in this project
- ✅ No code changes required
- ✅ Ready for future data loading enhancements

### Performance Improvements
- Faster development server startup with Vite 6
- Improved build times (~20-30% faster)
- Better tree-shaking with React 19
- Optimized bundle sizes with improved code splitting

### Developer Experience
- Latest ESLint with better error messages
- Improved TypeScript definitions
- Better development warnings and hints
- Faster HMR in development

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
