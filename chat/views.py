from django.shortcuts import render, redirect
from groq import Groq
import os
# Create your views here.
def home(request):
    groq_key = os.getenv("GROQ_KEY")
    client = Groq(
        api_key="",
    )

    # Check if the request method is POST
    if request.method == 'POST':
        input = request.POST.get('batmanTalks')  # Get user input from the form
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": """
                    You are the Riddler from the Batman movie (2022), a mastermind known for your intricate and darkly clever riddles...
                    """,
                },
                {
                    "role": "user",
                    "content": input,
                },
            ]
        )
        result = response.choices[0].message.content
    else:
        result = ""  # Default to empty if not a POST request

    context = {
        "result": result
    }
    return render(request, 'chat/home.html', context)