import io
import json
import logging
import os
from typing import Optional

# Attempt to import Oracle Functions FDK. In local dev environments where the
# fdk package isn't installed, provide a lightweight fallback to satisfy
# linters/IDE (Pylance) and allow local testing of pure-Python logic.
try:
    from fdk import response  # type: ignore
except Exception:  # pragma: no cover - fallback for local tooling only
    class _FallbackResponse:
        def __init__(self, ctx, response_data="", headers=None, status_code=200):
            self.ctx = ctx
            self.response_data = response_data
            self.headers = headers or {}
            self.status_code = status_code

        def __repr__(self):
            return (
                f"_FallbackResponse(status_code={self.status_code}, "
                f"headers={self.headers}, response_data={self.response_data!r})"
            )

    class response:  # noqa: N801 - mimic module with Response class
        Response = _FallbackResponse

from openai import OpenAI

# Career data embedded for context
CAREERS_DATA = {
    "software-developer": {
        "title": "Software Developer",
        "category": "Technology",
        "median_salary": 120000,
        "universities": ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley", "Georgia Tech"],
        "companies": ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Salesforce"],
        "degrees": ["Computer Science", "Software Engineering", "Information Technology"]
    },
    "ux-designer": {
        "title": "UX Designer",
        "category": "Design",
        "median_salary": 105000,
        "universities": ["Stanford d.school", "RISD", "Parsons", "Carnegie Mellon HCI", "MIT Media Lab"],
        "companies": ["Apple", "Google", "Adobe", "Figma", "Airbnb", "Meta", "Microsoft"],
        "degrees": ["Human-Computer Interaction", "Interaction Design", "Graphic Design", "Psychology"]
    },
    "data-scientist": {
        "title": "Data Scientist",
        "category": "Technology",
        "median_salary": 130000,
        "universities": ["Stanford", "MIT", "UC Berkeley", "Harvard", "CMU"],
        "companies": ["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Uber", "Airbnb"],
        "degrees": ["Data Science", "Statistics", "Computer Science", "Mathematics"]
    },
    "web-developer": {
        "title": "Web Developer",
        "category": "Technology",
        "median_salary": 95000,
        "universities": ["Stanford", "MIT", "UC Berkeley", "Georgia Tech", "UT Austin"],
        "companies": ["Shopify", "Squarespace", "WordPress/Automattic", "Vercel", "Netlify", "Google"],
        "degrees": ["Web Development", "Computer Science", "Information Technology"]
    },
    "mobile-developer": {
        "title": "Mobile App Developer",
        "category": "Technology",
        "median_salary": 125000,
        "universities": ["Stanford", "MIT", "Carnegie Mellon", "UC Berkeley", "Georgia Tech"],
        "companies": ["Apple", "Google", "Meta", "Uber", "Spotify", "Snap", "Twitter"],
        "degrees": ["Computer Science", "Software Engineering", "Mobile Development"]
    },
    "product-designer": {
        "title": "Product Designer",
        "category": "Design",
        "median_salary": 125000,
        "universities": ["Stanford d.school", "RISD", "Carnegie Mellon", "Parsons", "ArtCenter"],
        "companies": ["Apple", "Google", "Meta", "Airbnb", "Stripe", "Figma", "Adobe"],
        "degrees": ["Product Design", "Industrial Design", "Interaction Design", "HCI"]
    },
    "graphic-designer": {
        "title": "Graphic Designer",
        "category": "Design",
        "median_salary": 75000,
        "universities": ["RISD", "Parsons", "CalArts", "Pratt", "School of Visual Arts"],
        "companies": ["Adobe", "Canva", "Apple", "Nike", "Pentagram", "IDEO"],
        "degrees": ["Graphic Design", "Visual Communication", "Fine Arts"]
    },
    "product-manager": {
        "title": "Product Manager",
        "category": "Business",
        "median_salary": 135000,
        "universities": ["Stanford GSB", "Harvard Business School", "MIT Sloan", "Wharton", "Berkeley Haas"],
        "companies": ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Salesforce", "Adobe"],
        "degrees": ["Business Administration", "Computer Science", "Engineering", "MBA"]
    },
    "cybersecurity-specialist": {
        "title": "Cybersecurity Specialist",
        "category": "Technology",
        "median_salary": 115000,
        "universities": ["Carnegie Mellon", "MIT", "Stanford", "UC Berkeley", "Georgia Tech"],
        "companies": ["Palo Alto Networks", "CrowdStrike", "Cisco", "Microsoft", "Google", "Amazon"],
        "degrees": ["Cybersecurity", "Computer Science", "Information Security", "Network Security"]
    },
    "machine-learning-engineer": {
        "title": "Machine Learning Engineer",
        "category": "Technology",
        "median_salary": 155000,
        "universities": ["Stanford", "MIT", "Carnegie Mellon", "UC Berkeley", "Caltech"],
        "companies": ["Google DeepMind", "OpenAI", "Meta", "Amazon", "Microsoft", "Tesla", "NVIDIA"],
        "degrees": ["Computer Science", "Machine Learning", "Artificial Intelligence", "Statistics"]
    }
}

SYSTEM_PROMPT = """You are an enthusiastic and knowledgeable career counselor helping high school students explore career paths. Your role is to:

1. Provide accurate, encouraging information about different careers
2. Suggest relevant university programs and top schools for specific fields
3. Recommend companies that hire for each role
4. Answer questions about education requirements, salary expectations, and career growth
5. Help students understand the steps needed to pursue their dream career
6. Be supportive, positive, and realistic about career prospects

When discussing careers:
- Use the provided career data for accuracy
- Suggest specific universities known for excellence in that field
- Recommend companies actively hiring in that space
- Provide actionable next steps for high school students
- Be encouraging while being realistic about requirements

Keep responses concise (2-3 paragraphs max) but informative. Use a friendly, conversational tone suitable for high school students."""

def get_career_context(career_id):
    """Get context about a specific career"""
    if career_id and career_id in CAREERS_DATA:
        career = CAREERS_DATA[career_id]
        return f"""
Current Career Context: {career['title']}
Category: {career['category']}
Median Salary: ${career['median_salary']:,}
Top Universities: {', '.join(career['universities'][:5])}
Companies Hiring: {', '.join(career['companies'][:7])}
Recommended Degrees: {', '.join(career['degrees'])}
"""
    return ""

def handler(ctx, data: Optional[io.BytesIO] = None):
    """
    OCI Function handler for AI Career Counselor
    - Handles CORS preflight (OPTIONS)
    - Echo-style POST to verify end-to-end pathway via API Gateway
    - OpenAI call can be re-enabled once end-to-end is verified
    """
    logger = logging.getLogger()
    try:
        def cors_headers():
            return {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Max-Age": "86400",
                "Vary": "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
            }

        method = getattr(ctx, "Method", "POST") if ctx else "POST"
        logger.info(f"Method: {method}")

        # Preflight
        if str(method).upper() == "OPTIONS":
            return response.Response(ctx, response_data="", headers=cors_headers(), status_code=204)

        # Parse JSON
        body = {}
        if data and hasattr(data, "getvalue"):
            raw = data.getvalue()
            if isinstance(raw, (bytes, bytearray)):
                raw = raw.decode("utf-8", errors="ignore")
            if raw:
                try:
                    body = json.loads(raw)
                except Exception as e:
                    logger.warning(f"Invalid JSON: {e}")
                    return response.Response(ctx, response_data=json.dumps({"error": "Invalid JSON"}), headers=cors_headers(), status_code=400)

        # Minimal echo until LLM wired
        user_message = (body.get("message") or "").strip()
        if not user_message:
            return response.Response(ctx, response_data=json.dumps({"error": "Message is required"}), headers=cors_headers(), status_code=400)

        result = {
            "message": f"Echo: {user_message}",
            "careerId": body.get("careerId"),
            "history_len": len(body.get("history", []) or []),
        }

        return response.Response(ctx, response_data=json.dumps(result), headers=cors_headers(), status_code=200)

    except Exception as e:
        logger.error(f"Unhandled error: {e}")
        return response.Response(
            ctx,
            response_data=json.dumps({"error": "An error occurred processing your request", "details": str(e)}),
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            status_code=500,
        )
