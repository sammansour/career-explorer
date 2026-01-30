import io
import json
import logging
import os
from fdk import response
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

def handler(ctx, data: io.BytesIO = None):
    """
    OCI Function handler for AI Career Counselor
    """
    try:
        # Get OpenAI API key from environment
        openai_api_key = os.getenv('OPENAI_API_KEY')
        if not openai_api_key:
            return response.Response(
                ctx,
                response_data=json.dumps({"error": "OpenAI API key not configured"}),
                headers={"Content-Type": "application/json"},
                status_code=500
            )

        # Parse request body
        try:
            body = json.loads(data.getvalue())
        except (ValueError, AttributeError):
            return response.Response(
                ctx,
                response_data=json.dumps({"error": "Invalid JSON in request body"}),
                headers={"Content-Type": "application/json"},
                status_code=400
            )

        user_message = body.get('message', '').strip()
        career_id = body.get('careerId')
        conversation_history = body.get('history', [])
        
        if not user_message:
            return response.Response(
                ctx,
                response_data=json.dumps({"error": "Message is required"}),
                headers={"Content-Type": "application/json"},
                status_code=400
            )

        # Initialize OpenAI client
        client = OpenAI(api_key=openai_api_key)

        # Build messages for OpenAI
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Add career context if available
        career_context = get_career_context(career_id)
        if career_context:
            messages.append({
                "role": "system",
                "content": f"The student is currently viewing: {career_context}"
            })

        # Add conversation history (limit to last 10 messages to manage tokens)
        for msg in conversation_history[-10:]:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })

        # Add current user message
        messages.append({"role": "user", "content": user_message})

        # Call OpenAI API
        chat_completion = client.chat.completions.create(
            model=os.getenv('OPENAI_MODEL', 'gpt-4o-mini'),  # Default to GPT-4o-mini (cheaper)
            messages=messages,
            max_tokens=500,
            temperature=0.7,
            presence_penalty=0.1,
            frequency_penalty=0.1
        )

        assistant_message = chat_completion.choices[0].message.content

        # Return response
        return response.Response(
            ctx,
            response_data=json.dumps({
                "message": assistant_message,
                "careerId": career_id,
                "timestamp": chat_completion.created
            }),
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        )

    except Exception as e:
        logging.getLogger().error(f"Error in career counselor function: {str(e)}")
        return response.Response(
            ctx,
            response_data=json.dumps({
                "error": "An error occurred processing your request",
                "details": str(e)
            }),
            headers={"Content-Type": "application/json"},
            status_code=500
        )
